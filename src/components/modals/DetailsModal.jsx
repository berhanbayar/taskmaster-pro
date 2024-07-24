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
    // <div className="fixed inset-0 flex items-center justify-center z-50">
    //   <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
    //   <div className="bg-white p-6 rounded-lg shadow-lg z-10 max-w-sm mx-auto">
    //     <h2 className="text-2xl font-bold mb-4">{title}</h2>
    //     <div className="mb-4">
    //       <p>{description}</p>
    //     </div>
    //     <button
    //       className="bg-red-500 text-white px-4 py-2 rounded"
    //       onClick={onClose}
    //     >
    //       Close
    //     </button>
    //   </div>
    // </div>,
    <div>
      <div
        className="fixed inset-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t-lg bg-gray-800">
              <h3 className="text-lg font-semibold text-white">
                View Detail Task
              </h3>
              <button
                type="button"
                className="text-white bg-transparent hover:bg-white hover:text-gray-800 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                onClick={onClose}
              >
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <div className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Title
                  </label>
                  <input
                  
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    className="pointer-events-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    value={description}
                    className=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-4 text-center"
                onClick={onClose}
              >
                Close

              </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default DetailsModal;
