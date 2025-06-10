import React, { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

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
    setLoading(true);
    setAuthError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });

      setCurrentUser(auth.currentUser);
      setLoading(false);
      return userCredential.user;
    } catch (error) {
      console.error("Registration error:", error);
      setAuthError(error.message);
      setLoading(false);
      throw error;
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setAuthError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);
      return userCredential.user;
    } catch (error) {
      console.error("Login error:", error);
      setAuthError(error.message);
      setLoading(false);
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
