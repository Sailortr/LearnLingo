import React, { useEffect, useCallback } from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

const AuthModal = ({
  isOpen,
  onClose,
  mode = "login",
  onFormSubmitSuccess,
}) => {
  const handleEscKey = useCallback(
    (event) => {
      if (event.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, handleEscKey]);

  if (!isOpen) return null;

  const title = mode === "login" ? "Log In" : "Registration";
  const description =
    mode === "login"
      ? "Welcome back! Please enter your credentials to access your account and continue your search for a teacher."
      : "Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 sm:p-10 w-full max-w-[480px] m-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-[32px] font-bold text-[#121417] leading-[40px]">
              {title}
            </h2>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {mode === "login" ? (
          <LoginForm onSubmitSuccess={onFormSubmitSuccess} />
        ) : (
          <RegistrationForm onSubmitSuccess={onFormSubmitSuccess} />
        )}
      </div>
    </div>
  );
};

export default AuthModal;
