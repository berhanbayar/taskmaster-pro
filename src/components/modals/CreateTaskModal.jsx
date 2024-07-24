import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';


const CreateTaskModal = ({ isOpen, onClose, initialTitle, initialDescription, taskId, onSave }) => {
  const [title, setTitle] = useState(initialTitle || '');
  const [description, setDescription] = useState(initialDescription || '');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (taskId) {
      // Eğer bir id varsa, düzenleme modunda olduğunu belirt
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [taskId]);


  if (!isOpen) return null;


  const handleSave = async () => {
    if (!title) {
      alert("Title is required.");
      return;
    }

    try {
      const taskData = {
        id: taskId, // Düzenleme modunda id geçiyoruz
        title: title,
        description: description
      };

      const response = await fetch('https://localhost:7101/api/Tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
      });

      if (response.ok) {
        const savedTask = await response.json();
        alert("Task saved successfully");
        onSave(savedTask);
        onClose();
      } else {
        const errorMessage = await response.text();
        alert(`Failed to save task: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error saving task:", error);
      alert("Failed to save task");
    }
  };

  return ReactDOM.createPortal(
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
                {isEditing ? 'Edit Task' : 'Add New Task'}
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
            <form className="p-4 md:p-5">
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
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder={isEditing ? 'Edit task title here' : 'Type title for your task'}
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
                    onChange={(e) => setDescription(e.target.value)}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder={isEditing ? 'Edit task description here' : 'Write task description here'}
                    // placeholder=""
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex place-items-end  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-4 text-center"
                onClick={handleSave}
              >
                {isEditing ? 'Save Task' : 'Add Task'}

              </button>
              
            </form>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};



export default CreateTaskModal;