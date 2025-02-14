import React from 'react';
import '../styles/modal.css';

const Modal = ({isOpen, onClose, children, width = "400px", height = "auto"}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{width: width, height: height}}>
                <button className="modal-close" onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
