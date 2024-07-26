import React, { useState } from 'react';
import Navbar from '../header/Navbar';
import { FaTrash, FaEdit, FaEye, FaEyeSlash } from 'react-icons/fa';
import { BiDetail } from 'react-icons/bi';
import DetailsModal from '../modals/DetailsModal';
import CreateTaskModal from '../modals/CreateTaskModal';
import DeleteModal from '../modals/DeleteModal';
import { useToast } from '../ToastContext';


function List({ data }) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const { notify } = useToast();

  const openCreateModal = (task) => {
    setSelectedTask(task);
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setSelectedTask(null);
  };

  const openDetailModal = (task) => {
    setSelectedTask(task);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedTask(null);
  };

  const openDeleteModal = (task) => {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedTask(null);
  };


  const handleSave = (savedTask) => {
    // Handle saved task if needed (e.g., update local state)
    // Optionally, you can re-fetch the tasks here to update the list
    console.log('Task saved:', savedTask);
};

  const updateTaskStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`https://localhost:7101/api/Tasks/UpdateTaskStatus/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus }) // Beklenen formatta veri gönderimi
      });

      if (response.ok) {
        if (newStatus == 'In Progress') {
          notify('Task ' + newStatus, 'warning');
        } else {
          notify('Task ' + newStatus, 'success');
        }
      } else {
        console.error('Failed to update task status', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleViewedTask = (id, currentStatus) => {
    const newStatus = currentStatus === 'Complete' ? 'In Progress' : 'Complete';
    updateTaskStatus(id, newStatus);
  };  

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
    } else {
      console.error('Failed to delete task', response.statusText);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-customBg p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg sm:rounded-t-none sm:rounded-b-lg">
        <Navbar />
        {data?.length > 0 ? (
          data?.sort((a, b) => b.id - a.id).map(item => (
            <div key={item.id} className={`flex justify-between items-center p-4 border-b ${item.status === 'Complete' ? 'opacity-50' : ''}`}>
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500">Due on {item.createdAt}</p>
                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1  ${item.status === 'Complete' ? 'text-green-800 bg-green-200 ring-green-600/20' : 'text-yellow-800 bg-yellow-200 ring-yellow-600/20'} rounded`}>
                  {item.status}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-green-700 hover:bg-green-100 rounded" 
                        onClick={() => openDetailModal(item)}>
                  <BiDetail />
                </button>
                <button className="p-2 text-yellow-500 hover:bg-yellow-100 rounded"
                        onClick={() => openCreateModal(item)}>
                  <FaEdit />
                </button>
                <button className="p-2 text-blue-500 hover:bg-blue-100 rounded" 
                        onClick={() => toggleViewedTask(item.id, item.status)}>
                        {item.status === 'Complete' ? <FaEyeSlash /> : <FaEye />}
                </button>
                <button className="p-2 text-red-500 hover:bg-red-100 rounded" onClick={() => openDeleteModal(item)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-between items-center p-4 border-b ">
            <p className="text-lg font-semibold items-center">Şu anda yapmanız gereken hiçbir görev yok</p>
          </div>
        )}
      </div>
      {isDetailModalOpen && selectedTask && (
        <DetailsModal
          isOpen={isDetailModalOpen}
          onClose={closeDetailModal}
          initialTitle={selectedTask.title}
          initialDescription={selectedTask.description}
        />
      )}

      {isCreateModalOpen && (
        <CreateTaskModal
          isOpen={isCreateModalOpen}
          onSave={handleSave}
          onClose={closeCreateModal}
          initialTitle={selectedTask.title}
          initialDescription={selectedTask.description}
          taskId={selectedTask.id}
          // Diğer gerekli prop'lar burada tanımlanabilir
        />
      )}

      {isDeleteModalOpen && selectedTask &&(
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          taskId={selectedTask.id}
          taskTitle={selectedTask.title}
        // Diğer gerekli prop'lar burada tanımlanabilir
        />
      )}

      
    </div>
  );
}

export default List;
