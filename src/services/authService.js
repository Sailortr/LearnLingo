import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  GoogleAuthProvider, // Google ile giriş için örnek
  signInWithPopup, // Google ile giriş için örnek
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig"; // Firebase instance'larınız
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"; // Kullanıcı dökümanı için

/**
 * Yeni bir kullanıcı kaydeder, profilini günceller ve Firestore'a kullanıcı dökümanı oluşturur.
 * @param {string} email - Kullanıcının e-postası.
 * @param {string} password - Kullanıcının şifresi.
 * @param {string} name - Kullanıcının adı.
 * @returns {Promise<object>} Firebase User objesi.
 * @throws {Error} Kayıt sırasında bir hata oluşursa.
 */
export const registerUser = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Firebase Authentication profiline ismi ekle
    await updateProfile(user, { displayName: name });

    // Firestore'da kullanıcı için bir döküman oluştur/güncelle
    // (Bu, AuthContext'teki örnekten biraz daha detaylı)
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(
      userDocRef,
      {
        uid: user.uid,
        displayName: name,
        email: user.email,
        photoURL: user.photoURL, // Varsa
        createdAt: serverTimestamp(), // Firestore sunucu zaman damgası
        favorites: [], // Başlangıçta boş favori dizisi
        // Diğer başlangıç kullanıcı bilgileri eklenebilir
      },
      { merge: true }
    ); // merge:true, var olan dökümanla birleştirir, üzerine yazmaz

    return user; // Güncellenmiş user objesini döndürmek için auth.currentUser'ı beklemek yerine
  } catch (error) {
    console.error("AuthService Register Error: ", error.code, error.message);
    // Firebase hata kodlarını daha kullanıcı dostu mesajlara çevirebilirsiniz
    // Örneğin: if (error.code === 'auth/email-already-in-use') throw new Error('Bu e-posta adresi zaten kullanımda.');
    throw error;
  }
};

/**
 * Mevcut bir kullanıcıyı e-posta ve şifre ile giriş yapar.
 * @param {string} email - Kullanıcının e-postası.
 * @param {string} password - Kullanıcının şifresi.
 * @returns {Promise<object>} Firebase User objesi.
 * @throws {Error} Giriş sırasında bir hata oluşursa.
 */
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("AuthService Login Error: ", error.code, error.message);
    throw error;
  }
};

/**
 * Google ile giriş yapmak için bir pop-up açar.
 * @returns {Promise<object>} Firebase User objesi.
 * @throws {Error} Google ile giriş sırasında bir hata oluşursa.
 */
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Google ile ilk kez giriş yapan kullanıcı için Firestore'a döküman oluştur/güncelle
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);
    if (!userDocSnap.exists()) {
      await setDoc(
        userDocRef,
        {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: serverTimestamp(),
          favorites: [],
        },
        { merge: true }
      );
    }
    return user;
  } catch (error) {
    console.error(
      "AuthService Google Sign-In Error: ",
      error.code,
      error.message
    );
    throw error;
  }
};

/**
 * Mevcut kullanıcının oturumunu kapatır.
 * @returns {Promise<void>}
 * @throws {Error} Çıkış sırasında bir hata oluşursa.
 */
export const logoutUser = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("AuthService Logout Error: ", error.code, error.message);
    throw error;
  }
};

/**
 * Kullanıcının şifresini sıfırlamak için e-posta gönderir.
 * @param {string} email - Şifresi sıfırlanacak kullanıcının e-postası.
 * @returns {Promise<void>}
 * @throws {Error} E-posta gönderimi sırasında bir hata oluşursa.
 */
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error(
      "AuthService Password Reset Error: ",
      error.code,
      error.message
    );
    throw error;
  }
};

/**
 * Mevcut giriş yapmış kullanıcıyı döndürür (nadiren doğrudan kullanılır, AuthContext tercih edilir).
 * @returns {object|null} Firebase User objesi veya null.
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};
