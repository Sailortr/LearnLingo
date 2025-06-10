import React, { useEffect, useCallback, useState } from "react";
import BookingForm from "./BookingForm";

const BookingModal = ({ isOpen, onClose, teacher, onBookingSubmitSuccess }) => {
  // teacher: { avatar_url, name, surname }
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleEscKey = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose();
        setShowSuccessMessage(false);
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "auto";
    }
    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, handleEscKey]);

  if (!isOpen) {
    return null;
  }

  const handleInternalSubmitSuccess = (data) => {
    setShowSuccessMessage(true);
    if (onBookingSubmitSuccess) {
      onBookingSubmitSuccess(data);
    }
  };

  const handleCloseModal = () => {
    onClose();
    setShowSuccessMessage(false);
  };

  const teacherFullName = teacher
    ? `${teacher.name} ${teacher.surname}`
    : "Selected Teacher";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300 ease-in-out px-4"
      onClick={handleCloseModal}
      aria-labelledby="booking-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 m-4 w-full max-w-lg transform transition-all duration-300 ease-in-out scale-100 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {showSuccessMessage ? (
          <div className="text-center py-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-green-500 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Success!
            </h3>
            <p className="text-gray-600 mb-6">
              Your lesson request has been sent successfully.
            </p>
            <button
              onClick={handleCloseModal}
              className="px-6 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-start mb-4">
              <h3
                id="booking-modal-title"
                className="text-2xl font-bold text-gray-900"
              >
                Book trial lesson
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {teacher && (
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-200">
                <img
                  src={
                    teacher.avatar_url ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      teacherFullName
                    )}&background=FBBF24&color=fff&size=40`
                  }
                  alt={teacherFullName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-xs text-gray-500">Your teacher</p>
                  <p className="font-semibold text-gray-800">
                    {teacherFullName}
                  </p>
                </div>
              </div>
            )}
            <p className="text-sm text-gray-600 mb-6">
              Our experienced tutor will assess your current language level,
              discuss your learning goals, and tailor the lesson to your
              specific needs.
            </p>
            <BookingForm onSubmitSuccess={handleInternalSubmitSuccess} />
          </>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
