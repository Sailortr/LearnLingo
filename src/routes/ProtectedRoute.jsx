import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // AuthContext'imiz
import Spinner from "../components/UI/Spinner"; // Yükleme göstergesi

/**
 * Yetkilendirme gerektiren rotaları korur.
 * Kullanıcı giriş yapmamışsa ana sayfaya yönlendirir.
 * @param {object} props
 * @param {React.ReactNode} props.children - Korunacak olan ve kullanıcı giriş yapmışsa gösterilecek olan bileşen(ler).
 */
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Yetkilendirme durumu kontrol edilirken yükleme göstergesi
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!currentUser) {
    // Kullanıcı giriş yapmamışsa, ana sayfaya yönlendir.
    // State olarak mevcut konumu (location) gönderiyoruz ki,
    // giriş yaptıktan sonra kullanıcı buraya geri dönebilsin (bu, bir login sayfası olsaydı daha anlamlı olurdu).
    // Mevcut modal yapımızda, ana sayfaya yönlendirmek ve header'daki login butonunu kullanmasını beklemek daha uygun olabilir.
    return <Navigate to="/" state={{ from: location }} replace />;
    // Veya bir login sayfasına yönlendirme:
    // return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children; // Kullanıcı giriş yapmışsa, istenen içeriği göster
};

export default ProtectedRoute;
