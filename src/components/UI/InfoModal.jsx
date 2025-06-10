import React from "react";

const InfoModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl p-8 m-4 max-w-sm w-full text-center transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-lg text-gray-800 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="px-8 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default InfoModal;
