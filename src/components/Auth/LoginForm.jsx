import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// 1. ADIM: Gerekli context ve yardımcı fonksiyonları import et
import { useAuth } from "../../contexts/AuthContext";
import { getFriendlyErrorMessage } from "../../utils/firebaseErrors";

// Doğrulama şeması (Yup Schema)
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm = ({ onSubmitSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  // 2. ADIM: Yeni state'leri ekle
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState(""); // Firebase'den gelen hataları tutmak için

  // 3. ADIM: AuthContext'ten login fonksiyonunu al
  const { login } = useAuth();

  // 4. ADIM: handleLogin fonksiyonunu güncelle
  const handleLogin = async (data) => {
    setApiError(""); // Her yeni denemede önceki hatayı temizle
    try {
      // Artık doğrudan Firebase'i değil, context'teki login fonksiyonunu çağırıyoruz.
      // Bu, mimarimizi tutarlı hale getirir.
      await login(data.email, data.password);

      // Başarılı olursa, üst bileşene haber ver (modalı kapatmak için)
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      // Hata yakalanırsa, anlamlı mesaja çevir ve state'e ata
      const friendlyMessage = getFriendlyErrorMessage(error.code);
      setApiError(friendlyMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
      {/* 5. ADIM: Hata mesajını formun üstünde göster */}
      {apiError && (
        <div className="p-3 bg-red-100 border border-red-300 rounded-lg text-center">
          <p className="text-sm font-medium text-red-700">{apiError}</p>
        </div>
      )}

      <div>
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className={`w-full px-4 py-3 rounded-lg border text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          {...register("password")}
          className={`w-full px-4 py-3 rounded-lg border text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
        />
        <span
          className="absolute right-4 top-3.5 text-gray-500 cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? "👁️" : "🙈"}
        </span>
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-semibold rounded-xl transition-colors duration-200"
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
