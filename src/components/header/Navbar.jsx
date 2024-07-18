import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import Modal from '../modals/CreateTaskModal'

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [task, setTask] = useState({
        title: "",
        description: ""
    });

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSave = (newTitle, newDescription) => {
        setTask({ title: newTitle, description: newDescription });
    };
    return (
        <header className="bg-gray-800 text-white text-center py-4 rounded-t-lg flex justify-between items-center px-4">
            <h1 className="text-2xl font-bold">TaskMaster Pro</h1>
            <div className="flex justify-end my-5"> 
            <button className="flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    onClick={openModal}>
                <FaPlus className="mr-2" />
                Add task
            </button>
                <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    initialTitle={task.title}
                    initialDescription={task.description}
                    onSave={handleSave}
                />
                {/* <div className="mt-4">
                    <h2 className="text-xl font-bold">Task Details</h2>
                    <p><strong>Title:</strong> {task.title}</p>
                    <p><strong>Description:</strong> {task.description}</p>
                </div> */}
            </div>
        </header>
    );
};

export default Navbar;
