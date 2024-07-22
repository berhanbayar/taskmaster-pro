import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';

function DetailsModal({ isOpen, onClose, initialTitle, initialDescription }) {
  const [title, setTitle] = useState(initialTitle || '');
  const [description, setDescription] = useState(initialDescription || '');

  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
  }, [initialTitle, initialDescription]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10 max-w-sm mx-auto">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="mb-4">
          <p>{description}</p>
        </div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>,
    document.body
  );
}

export default DetailsModal;
