import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// 1. Gerekli context ve yardımcı fonksiyonları import et
import { useAuth } from "../../contexts/AuthContext";
import { getFriendlyErrorMessage } from "../../utils/firebaseErrors";

// 2. Doğrulama şemasını 'confirmPassword' içerecek şekilde güncelle
const registrationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match") // Şifrelerin eşleştiğini kontrol et
    .required("Please confirm your password"),
});

const RegistrationForm = ({ onSubmitSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationSchema),
  });

  // 3. Yeni state'leri ekle
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState(""); // Firebase'den gelen hataları tutmak için

  // 4. AuthContext'ten register fonksiyonunu al
  const { register: registerUser } = useAuth();

  // 5. handleRegister fonksiyonunu güncelle
  const handleRegister = async (data) => {
    setApiError(""); // Her yeni denemede önceki hatayı temizle
    try {
      // Context'teki register fonksiyonunu çağır
      await registerUser(data.email, data.password, data.name);

      // Başarılı olursa, üst bileşene haber ver (modalı kapatmak için)
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      // Hata yakalanırsa, anlamlı mesaja çevir ve state'e ata
      const friendlyMessage = getFriendlyErrorMessage(error.code);
      setApiError(friendlyMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
      {/* 6. Hata mesajını formun üstünde göster */}
      {apiError && (
        <div className="p-3 mb-2 bg-red-100 border border-red-300 rounded-lg text-center">
          <p className="text-sm font-medium text-red-700">{apiError}</p>
        </div>
      )}

      {/* Name Input */}
      <div>
        <input
          type="text"
          placeholder="Name"
          {...register("name")}
          className={`w-full px-4 py-3 rounded-lg border text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email Input */}
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

      {/* Password Input (with toggle) */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          {...register("password")}
          className={`w-full px-4 py-3 pr-10 rounded-lg border text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
        />
        <span
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer select-none"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? "🙈" : "👁️"}
        </span>
      </div>
      {errors.password && (
        <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
      )}

      {/* Confirm Password Input */}
      <div>
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
          className={`w-full px-4 py-3 rounded-lg border text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
            errors.confirmPassword ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-semibold rounded-xl transition-colors duration-200"
      >
        Sign Up
      </button>
    </form>
  );
};

export default RegistrationForm;
