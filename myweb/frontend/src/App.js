import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import ProfilePage from './pages/Profile/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
         </Routes>
    </BrowserRouter>
  );
}

export default App;