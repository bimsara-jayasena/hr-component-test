import { useState } from "react";
import News from "./Pages/News.tsx";
import {Route,Routes}  from  'react-router-dom';
import Application from "./Pages/Application.tsx";
function App() {
  

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<News/>}/>
       <Route path="/Apply/:id" element={<Application/>}/>
      </Routes>
    
        
     
     
     
    </div>
  );
}

export default App;

