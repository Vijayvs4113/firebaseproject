import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from './Components/navbar';
import { HomePage } from './pages/main/Main-page';
import { Login } from './pages/Login';
import { Createpost } from './pages/create-post/Createpost';

function App() {
  return (
    <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element = {<HomePage />}/>
            <Route path='/login' element = {<Login />} />
            <Route path='/createpost' element = {<Createpost />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;

// 05:49:13