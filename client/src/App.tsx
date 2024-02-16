import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { Counter } from './features/counter/Counter';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage';


function App() {
  return (
    <div className='app'>
      <BrowserRouter>
      <Routes>
        <Route path ="/" element={<LoginPage />}/>
        <Route path ="/home" element={<HomePage />}/>
        <Route path ="/profile/:userId" element={<ProfilePage />}/>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
