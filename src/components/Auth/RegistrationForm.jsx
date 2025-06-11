import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";

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
});

const RegistrationForm = ({ onSubmitSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registrationSchema) });

  const handleRegister = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(userCredential.user, { displayName: data.name });
      if (onSubmitSuccess) onSubmitSuccess(userCredential.user);
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
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

      <div>
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className={`w-full px-4 py-3 rounded-lg border text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-white text-base font-semibold rounded-xl transition-colors duration-200"
      >
        Sign Up
      </button>
    </form>
  );
};

export default RegistrationForm;
