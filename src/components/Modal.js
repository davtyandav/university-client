import React from "react";

const Modal = ({ isOpen, onClose, children, width = "400px" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-6 relative"  style={{ width }} >
       
        <button onClick={onClose}  className="absolute top-4 right-4 text-gray-400 text-xl hover:text-gray-600">
<h2 className="absolute top-2 right-3 text-red-500 text-xl font-bold z-[9999] cursor-pointer">
    X
</h2>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;