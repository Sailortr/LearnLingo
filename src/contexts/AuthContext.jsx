import React, { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

// Bu yardımcı fonksiyonu context dışında tutmak daha iyi bir pratiktir.
const getFriendlyErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password. Please try again.";
    case "auth/email-already-in-use":
      return "This email address is already registered.";
    case "auth/weak-password":
      return "The password must be at least 6 characters long.";
    default:
      return "An unexpected error occurred. Please try again later.";
  }
};

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setCurrentUser(user);
        setLoading(false);
        setAuthError(null);
      },
      (error) => {
        console.error("Auth state change error:", error);
        setAuthError(error.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const register = async (email, password, name) => {
    setAuthError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(
        userDocRef,
        {
          uid: user.uid,
          displayName: name,
          email: user.email,
          favorites: [],
        },
        { merge: true }
      );
      return user;
    } catch (error) {
      console.error("Registration error:", error);
      setAuthError(error.message);
      // Hatayı, onu çağıran formun yakalayabilmesi için fırlat
      throw error;
    }
  };

  const login = async (email, password) => {
    setAuthError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.error("Login error:", error);
      setAuthError(error.message);
      // === İSTEDİĞİNİZ ANA DEĞİŞİKLİK BURADA ===
      // Hatayı, onu çağıran LoginForm'un yakalayabilmesi için tekrar fırlatıyoruz.
      throw error;
    }
  };

  const logout = async () => {
    setLoading(true);
    setAuthError(null);
    try {
      await firebaseSignOut(auth);
      setLoading(false);
    } catch (error) {
      console.error("Logout error:", error);
      setAuthError(error.message);
      setLoading(false);
      throw error;
    }
  };

  const value = {
    currentUser,
    loading,
    authError,
    register,
    login,
    logout,
    setAuthError,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
