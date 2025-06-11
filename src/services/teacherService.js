import { db } from "../../firebase/firebaseConfig.js"; // Firestore instance'ınız
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
  startAfter,
  writeBatch,
  documentId, // Favorites sayfası için gerekli
} from "firebase/firestore";

const TEACHERS_COLLECTION = "teachers";

/**
 * Filtrelere ve sayfalama parametrelerine göre öğretmenleri Firestore'dan getirir.
 * @returns {Promise<{teachers: Array<object>, lastVisible: object|null, hasMore: boolean}>}
 */
export const getTeachers = async ({
  filters = {},
  limit = 4,
  lastVisibleDoc = null,
} = {}) => {
  try {
    const teachersRef = collection(db, TEACHERS_COLLECTION);
    let q = query(teachersRef);

    // ---- FİLTRELER ----
    if (filters.language) {
      q = query(q, where("languages", "array-contains", filters.language));
    }
    if (filters.level) {
      q = query(q, where("levels", "array-contains", filters.level));
    }
    if (filters.price_per_hour) {
      const price = parseFloat(filters.price_per_hour);
      if (!isNaN(price)) {
        q = query(q, where("price_per_hour", "<=", price));
      }
    }

    // ---- SIRALAMA VE ÖNEMLİ UYARI ----
    // DİKKAT: Firestore, bir alana göre filtreleme (`where`) yaparken başka bir alana göre sıralama (`orderBy`)
    // yapıyorsanız, özel bir 'Kompozit Index' oluşturmanızı gerektirir.
    // Bu kodu çalıştırdığınızda konsolda bir hata ve index oluşturma linki görebilirsiniz.
    // O linke tıklayarak index'i kolayca oluşturabilirsiniz.
    q = query(q, orderBy("rating", "desc"));

    // ---- SAYFALAMA ----
    if (lastVisibleDoc) {
      q = query(q, startAfter(lastVisibleDoc));
    }

    // `hasMore` kontrolü için limitten BİR FAZLA döküman çekiyoruz.
    q = query(q, firestoreLimit(limit + 1));

    const querySnapshot = await getDocs(q);

    let teachers = [];
    querySnapshot.forEach((docSnap) => {
      teachers.push({ id: docSnap.id, ...docSnap.data() });
    });

    // `hasMore` durumunu kontrol et
    const hasMore = teachers.length > limit;
    if (hasMore) {
      // Fazladan çektiğimiz son elemanı listeden çıkar
      teachers.pop();
    }

    // Bir sonraki sayfa için son görünen dökümanı ayarla
    const newLastVisibleDoc = teachers[teachers.length - 1]
      ? querySnapshot.docs[teachers.length - 1]
      : null;

    return {
      teachers,
      lastVisible: newLastVisibleDoc,
      hasMore,
    };
  } catch (error) {
    console.error("TeacherService GetTeachers Error: ", error);
    // Hata mesajına index linkini de ekleyip konsola basabiliriz
    if (error.code === "failed-precondition") {
      console.warn(
        "Firestore Index Required: Bu sorgu için bir kompozit index oluşturmanız gerekiyor. Lütfen tarayıcı konsolundaki Firebase hata mesajını ve linkini kontrol edin."
      );
    }
    throw error;
  }
};

/**
 * Belirli bir ID'ye sahip öğretmeni Firestore'dan getirir.
 */
export const getTeacherById = async (teacherId) => {
  try {
    const teacherDocRef = doc(db, TEACHERS_COLLECTION, teacherId);
    const docSnap = await getDoc(teacherDocRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.warn(`TeacherService: No teacher found with ID ${teacherId}`);
      return null;
    }
  } catch (error) {
    console.error("TeacherService GetTeacherById Error: ", error);
    throw error;
  }
};

/**
 * Verilen ID listesindeki tüm öğretmenlerin bilgilerini Firestore'dan getirir. (FavoritesPage için)
 */
export const getTeachersByIds = async (idArray) => {
  if (!idArray || idArray.length === 0) {
    return [];
  }
  try {
    const teachersRef = collection(db, TEACHERS_COLLECTION);
    const q = query(teachersRef, where(documentId(), "in", idArray));
    const querySnapshot = await getDocs(q);
    const teachers = [];
    querySnapshot.forEach((docSnap) => {
      teachers.push({ id: docSnap.id, ...docSnap.data() });
    });
    return teachers;
  } catch (error) {
    console.error("TeacherService GetTeachersByIds Error: ", error);
    throw error;
  }
};

// src/services/teacherService.js

// ... diğer importlar ve fonksiyonlar aynı kalacak ...

export const uploadTeachersFromJson = async (teachersArray) => {
  if (!teachersArray || teachersArray.length === 0) {
    console.warn("TeacherService: No teachers to upload.");
    return;
  }

  const batch = writeBatch(db);
  const teachersRef = collection(db, TEACHERS_COLLECTION);

  teachersArray.forEach((teacher) => {
    // --- DEĞİŞİKLİK BURADA ---
    // Firestore'un otomatik ID oluşturması yerine, JSON dosyasındaki teacher.id'yi kullanıyoruz.
    const docRef = doc(db, TEACHERS_COLLECTION, teacher.id);

    batch.set(docRef, teacher);
  });

  try {
    await batch.commit();
    console.log(
      `TeacherService: Successfully uploaded ${teachersArray.length} teachers.`
    );
  } catch (error) {
    console.error("TeacherService Upload Error: ", error);
    throw error;
  }
};
