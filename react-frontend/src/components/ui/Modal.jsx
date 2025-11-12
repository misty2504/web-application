import React from "react";

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div onClick={onClose} className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[100] animate-fadeIn">
      <div onClick={(e) => e.stopPropagation()} className="bg-white text-gray-900 rounded-2xl shadow-2xl p-6 w-11/12 max-w-md transform animate-scaleIn relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl transition-colors"
        >
          &times;
        </button>
        <div className="pt-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
