import React from 'react'
import Navbar from '../header/Navbar';
import { FaTrash, FaEdit } from 'react-icons/fa';

function List({data}){
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
        {/* CardHeader Bileşeni */}
        <Navbar />

        {/* Kartın İçeriği */}
        {data?.length > 0 ? (
          data?.map(item => (
            <div key={item.id} className="flex justify-between items-center p-4 border-b ">
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500">
                  Due on {item.createdAt}
                </p>
              </div>
              <div className="flex items-center space-x-2">
               
                <button className="p-2 text-yellow-500 hover:bg-yellow-100 rounded">
                  <FaEdit />
                </button>
                <button className="p-2 text-red-500 hover:bg-red-100 rounded"
                  onClick={() => deleteTask(item.id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-between items-center p-4 border-b ">
            <p className="text-lg font-semibold items-center">Şuanda yapmanız gereken hiçbir görev yok</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default List