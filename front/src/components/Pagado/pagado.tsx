import React from "react";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div>{children}</div>
        {/* <button
          onClick={onClose}
          className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700 transition-all mt-4"
        >
          Cerrar
        </button> */}
      </div>
    </div>
  );
};

export default Modal;
