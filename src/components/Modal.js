import React from "react";

const Modal = ({ isOpen, onClose, children, width = "1000px" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-6 relative"  style={{ width }} >
        <button onClick={onClose}  className="absolute top-4 right-4 text-gray-400 text-xl hover:text-gray-600">
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;