import React, { useState } from 'react'
import { Routes, Route, useParams } from 'react-router-dom';
import EditPage from './pages/EditPage';
import HomePage from './pages/homePage';



function App() {
  const [currentId, setCurrentId] = useState(null);
  return (
  
    
    <div>
     <Routes>
      <Route path="/" element={<HomePage currentId={currentId} setCurrentId={setCurrentId}  />} />
      <Route path="/updatepost/:id" element={<EditPage />} />
    </Routes>
    </div>
    
  );
}

export default App;


/*

 const handleDelete = async(id: any) => {
  await deletePost(result.id);
 }
 */