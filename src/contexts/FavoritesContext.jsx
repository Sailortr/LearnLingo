import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";
import { db } from "../firebase/firebaseConfig";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [favoriteTeacherIds, setFavoriteTeacherIds] = useState(new Set());
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(false);
  const [favoritesError, setFavoritesError] = useState(null);

  const fetchFavorites = useCallback(async () => {
    if (!currentUser) {
      setFavoriteTeacherIds(new Set());
      setIsLoadingFavorites(false);
      return;
    }

    setIsLoadingFavorites(true);
    setFavoritesError(null);
    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setFavoriteTeacherIds(new Set(userData.favorites || []));
      } else {
        await setDoc(userDocRef, { favorites: [] }, { merge: true });
        setFavoriteTeacherIds(new Set());
      }
    } catch (error) {
      setFavoritesError("Error removing favorite");
    } finally {
      setIsLoadingFavorites(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const addFavoriteTeacher = async (teacherId) => {
    if (!currentUser || favoriteTeacherIds.has(teacherId)) return;
    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, { favorites: arrayUnion(teacherId) });
      setFavoriteTeacherIds((prevIds) => new Set(prevIds).add(teacherId));
    } catch (error) {
      setFavoritesError("Error removing favorite");
    }
  };

  const removeFavoriteTeacher = async (teacherId) => {
    if (!currentUser || !favoriteTeacherIds.has(teacherId)) return;
    try {
      const userDocRef = doc(db, "users", currentUser.uid);

      await updateDoc(userDocRef, { favorites: arrayRemove(teacherId) });

      setFavoriteTeacherIds((prevIds) => {
        const newIds = new Set(prevIds);
        newIds.delete(teacherId);
        return newIds;
      });
    } catch (error) {
      setFavoritesError("Error removing favorite");
    }
  };

  const isFavorite = (teacherId) => favoriteTeacherIds.has(teacherId);

  const value = {
    favoriteTeacherIds,
    addFavoriteTeacher,
    removeFavoriteTeacher,
    isFavorite,
    isLoadingFavorites,
    favoritesError,
    refreshFavorites: fetchFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
