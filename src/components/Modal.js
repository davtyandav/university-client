import React from "react";

const Modal = ({isOpen, onClose, children, width = "400px"}) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-[2rem] shadow-2xl relative flex flex-col overflow-hidden max-h-[90vh]"
                style={{width}}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 z-10 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    ✕
                </button>
                <div className="p-8 overflow-y-auto scrollbar-hide">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;