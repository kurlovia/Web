import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import Header from './components/layout/Header';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Пока оставим остальные маршруты закомментированными */}
          {/* <Route path="/cart" element={<Cart />} /> */}
          {/* <Route path="/compare" element={<ComparePage />} /> */}
          {/* <Route path="/configurator" element={<Configurator />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;