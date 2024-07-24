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
            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
            </div>
        </header>
    );
};

export default Navbar;
