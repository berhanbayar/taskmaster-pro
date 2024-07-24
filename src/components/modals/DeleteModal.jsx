import ReactDOM from 'react-dom';
import {useEffect, useState } from 'react';

const DeleteModal = ({isOpen, onClose, taskId}) => {

const [TaskId, setTaskId] = useState(null);

async function deleteTask(id) {
    console.log("silenecek id:", id);
    const response = await fetch(`https://localhost:7101/api/Tasks/delete/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      alert("Task deleted successfully");
      onClose(true);
    } else {
      console.error('Failed to delete task', response.statusText);
    }
  }

useEffect(() => {
    setTaskId(taskId);
  }, [taskId]);

if (!isOpen) return null;
 
return ReactDOM.createPortal (
    <div>
        <div
          id="popup-modal"
          tabIndex="-1"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow0">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
               
              >
                
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                
                <h3 className="mb-5 text-lg font-normal text-gray-500 ">
                  Are you sure you want to delete this task?
                </h3>
                <button
                  onClick={() => deleteTask(taskId)}
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={onClose}
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>,
    document.body
  );
};

export default DeleteModal;
