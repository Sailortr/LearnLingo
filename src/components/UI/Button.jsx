import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  isLoading = false,
  ...props
}) => {
  const baseStyle =
    "inline-flex items-center justify-center font-semibold border rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150";

  const variants = {
    primary:
      "bg-yellow-500 text-white hover:bg-yellow-600 border-transparent focus:ring-yellow-400",
    secondary:
      "bg-gray-700 text-white hover:bg-gray-800 border-transparent focus:ring-gray-600",
    outline:
      "bg-transparent text-yellow-600 border-yellow-500 hover:bg-yellow-50 focus:ring-yellow-400",
    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100 border-transparent focus:ring-gray-300",
    link: "bg-transparent text-yellow-600 hover:text-yellow-700 underline border-transparent p-0 focus:ring-yellow-400",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
  };

  const disabledStyle = "disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${disabledStyle} ${className}`}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
