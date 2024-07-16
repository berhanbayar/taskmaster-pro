import React from 'react'
import Navbar from '../header/Navbar';
import { FaTrash, FaEdit } from 'react-icons/fa';

function List() {
  const tasks = [
    {
      title: 'GraphQL API',
      status: 'Complete',
      dueDate: 'March 17, 2023',
      createdBy: 'Leslie Alexander',
    },
    {
      title: 'New benefits plan',
      status: 'In progress',
      dueDate: 'May 5, 2023',
      createdBy: 'Leslie Alexander',
    },
    {
      title: 'Onboarding emails',
      status: 'In progress',
      dueDate: 'May 25, 2023',
      createdBy: 'Courtney Henry',
    },
    {
      title: 'iOS app',
      status: 'In progress',
      dueDate: 'June 7, 2023',
      createdBy: 'Leonard Krasner',
    },
    {
      title: 'Marketing site redesign',
      status: 'Archived',
      dueDate: 'June 10, 2023',
      createdBy: 'Courtney Henry',
    },
  ];

  const Task = ({ title, status, dueDate, createdBy }) => (
    <div className="flex justify-between items-center p-4 border-b ">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">
          Due on {dueDate} · Created by {createdBy}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        {/* STATUS DURUMU */}

        {/* <span
          className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
            status === 'Complete'
              ? 'bg-green-100 text-green-800'
              : status === 'In progress'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {status}
        </span> */}

        {/* STATUS DURUMU */}

        {/* CHECKBOX */}

        {/* <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" /> */}
        
        {/* CHECKBOX */}
        <button className="p-2 text-yellow-500 hover:bg-yellow-100 rounded">
          <FaEdit />
        </button>
        <button className="p-2 text-red-500 hover:bg-red-100 rounded">
          <FaTrash />
        </button>
      </div>
    </div>
  );

   
  return (
     <div className="flex flex-col items-center justify-center h-screen bg-customBg p-4">
     <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg sm:rounded-t-none sm:rounded-b-lg">
       {/* CardHeader Bileşeni */}
       <Navbar />
       
       {/* Kartın İçeriği */}
        <div className="max-w-2xl mx-auto  bg-white shadow rounded">
          {tasks.map((task, index) => (
            <Task key={index} {...task} />
          ))}
        </div>
     </div>
   </div>
  )
}

export default List