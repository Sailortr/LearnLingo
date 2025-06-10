import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext"; // AuthContext'in doğru yolda olduğundan emin olun

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
