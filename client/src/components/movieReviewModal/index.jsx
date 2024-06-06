
import React from 'react';
import { ImCross } from "react-icons/im";

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative px-7 rounded-lg shadow-xl w-full max-w-xl">
        <button
          onClick={onClose}
          className="absolute top-12 right-10 text-red-600 font-semibold text-sm"
        >
          <ImCross />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
