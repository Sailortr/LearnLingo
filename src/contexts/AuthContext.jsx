import React, { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";

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
    // ...
    try {
      // ...
    } catch (error) {
      const message = getFriendlyErrorMessage(error.code);
      toast.error(message); // alert yerine toast.error kullan
      // ...
    }
  };

  const login = async (email, password) => {
    // ...
    try {
      // ...
    } catch (error) {
      const message = getFriendlyErrorMessage(error.code);
      toast.error(message); // alert yerine toast.error kullan
      // ...
    }
  };

  const getFriendlyErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "Invalid email or password. Please try again.";
      case "auth/email-already-in-use":
        return "This email address is already registered.";
      default:
        return "An unexpected error occurred. Please try again.";
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
