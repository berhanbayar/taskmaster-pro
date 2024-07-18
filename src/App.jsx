import React from 'react';
import Navbar from './components/header/Navbar';
import List from './components/content/List';
import { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState(null);
  fetch('https://localhost:7101/api/Tasks')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    //console.log("data", data)
    setData(data);
  })
  .catch(error => {
    console.log("error:", error)
  });
  return (
    <div className='h-screen bg-customBg'>
      <List data={data}/>
    </div>
  )
}

export default App