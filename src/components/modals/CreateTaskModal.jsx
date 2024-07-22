import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect} from 'react';


const CreateTaskModal = ({ isOpen, onClose, initialTitle, initialDescription, taskId, onSave }) => {
    const [title, setTitle] = useState(initialTitle || '');
    const [description, setDescription] = useState(initialDescription || '');
    const [isEditing, setIsEditing] = useState(false);
    
    useEffect(() => {
      console.log("taskid:", taskId);
      if (taskId) {
          // Eğer bir id varsa, düzenleme modunda olduğunu belirt
          setIsEditing(true);
          console.log("evet editleme modundayiz");
      } else {
          setIsEditing(false);
          console.log("degiliz");
          
      }
  }, [taskId]);


    if (!isOpen) return null;

    
  //   const handleSave = async () => {
  //     if (!title) {
  //         alert("title is required.")
  //         return;
  //     }
  //     try {
  //         // Task verilerini içeren bir nesne oluşturun
  //         const newTask = {
  //             title: title,
  //             description: description,
  //             createdAt: isEditing ? createdAt : now, // Düzenleme modunda eski tarih, yeni görevde güncel tarih
  //             updatedAt: now
  //         };

  //         const url = isEditing ? `https://localhost:7101/api/Tasks/${taskId}` : 'https://localhost:7101/api/Tasks';
  //         // API'ye POST isteği gönderin
  //         const response = await fetch('https://localhost:7101/api/Tasks', {
  //             method: 'POST',
  //             headers: {
  //                 'Content-Type': 'application/json'
  //             },
  //             body: JSON.stringify(newTask)
  //         });

  //         if (response.ok) {
  //             const savedTask = await response.json();
  //             alert("Task saved successfully");
  //             onSave(savedTask);
  //             onClose();

  //         } else {
  //             const errorMessage = await response.text();
  //             alert(`Failed to save task: ${errorMessage}`);
  //         }
  //     } catch (error) {
  //         console.error("Error saving task:", error);
  //         alert("Failed to save task");
  //     }
  // };
    
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
        alert("Failed to save task yarram");
    }
};

    return ReactDOM.createPortal(
      <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10 max-w-sm mx-auto">
        <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Task' : 'Create Task'}</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 placeholder:lowercase"
            placeholder='Enter the title of the task'
            
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 placeholder:lowercase"
            rows="4"
            placeholder='You can enter the description of the task.'
            
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={handleSave}
        >
          Save
           
        </button>
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
  };
  
  export default CreateTaskModal;