import React from 'react';
import Navbar from './components/header/Navbar';
import List from './components/content/List';
import { useState, useEffect } from 'react';

const App = () => {
  const [tasks, setTasks] = useState(null);
  fetch('https://localhost:7101/api/Tasks')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    //console.log("data", data)
    setTasks(data);
  })
  .catch(error => {
    console.log("error:", error)
  });
  return (
    <div className='h-screen bg-customBg'>
      <List data={tasks}/>
    </div>
    
  )
}

export default App