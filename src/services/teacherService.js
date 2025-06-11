import { db } from "../../firebase/firebaseConfig.js";
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
  documentId,
} from "firebase/firestore";

const TEACHERS_COLLECTION = "teachers";

export const getTeachers = async ({
  filters = {},
  limit = 4,
  lastVisibleDoc = null,
} = {}) => {
  try {
    const teachersRef = collection(db, TEACHERS_COLLECTION);
    let q = query(teachersRef);

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

    q = query(q, orderBy("rating", "desc"));

    if (lastVisibleDoc) {
      q = query(q, startAfter(lastVisibleDoc));
    }

    q = query(q, firestoreLimit(limit + 1));

    const querySnapshot = await getDocs(q);

    let teachers = [];
    querySnapshot.forEach((docSnap) => {
      teachers.push({ id: docSnap.id, ...docSnap.data() });
    });

    const hasMore = teachers.length > limit;
    if (hasMore) {
      teachers.pop();
    }

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
    if (error.code === "failed-precondition") {
      console.warn(
        "Firestore Index Required: Bu sorgu için bir kompozit index oluşturmanız gerekiyor. Lütfen tarayıcı konsolundaki Firebase hata mesajını ve linkini kontrol edin."
      );
    }
    throw error;
  }
};

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

export const uploadTeachersFromJson = async (teachersArray) => {
  if (!teachersArray || teachersArray.length === 0) {
    console.warn("TeacherService: No teachers to upload.");
    return;
  }

  const batch = writeBatch(db);
  const teachersRef = collection(db, TEACHERS_COLLECTION);

  teachersArray.forEach((teacher) => {
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
