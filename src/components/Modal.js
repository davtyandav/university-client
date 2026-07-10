import React from "react";

const Modal = ({isOpen, onClose, children, width = "400px"}) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded border border-slate-200/80 shadow-2xl relative flex flex-col overflow-hidden max-h-[90vh] transition-all"
                style={{width}}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-700 transition-colors text-sm"
                >
                    ✕
                </button>

                <div className="p-6 overflow-y-auto scrollbar-hide">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;