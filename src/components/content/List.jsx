import React from 'react'
import Navbar from '../header/Navbar';

function List() {
    const items = [
        'Öğe 1',
        'Öğe 2',
        'Öğe 3',
        'Öğe 4',
        'Öğe 5',
    ];
  return (
     <div className="flex flex-col items-center justify-center h-screen bg-customBg p-4">
     <div className="w-full max-w-md bg-white shadow-lg rounded-lg sm:rounded-t-none sm:rounded-b-lg">
       {/* CardHeader Bileşeni */}
       <Navbar />
       
       {/* Kartın İçeriği */}
       <div className="p-6">
         <ul className="list-disc pl-5">
           {items.map((item, index) => (
             <li key={index} className="mb-2">
               {item}
             </li>
           ))}
         </ul>
       </div>
     </div>
   </div>
  )
}

export default List