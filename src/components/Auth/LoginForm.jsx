import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";

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
  } = useForm({ resolver: yupResolver(loginSchema) });

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (onSubmitSuccess) onSubmitSuccess(userCredential.user);
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
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
          {showPassword ? "👁" : "🙈"}
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
