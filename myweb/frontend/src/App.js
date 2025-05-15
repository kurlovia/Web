import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header/Header';
import Home from './pages/Home/HomePage';
import Catalog from './pages/Catalog/Catalog';
import PcCatalog from './pages/Catalog/PcCatalog';
import ComponentsCatalog from './pages/Catalog/ComponentsCatalog';
import LaptopsCatalog from './pages/Catalog/LaptopsCatalog';
import Cart from './pages/Cart/Cart';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/pc" element={<PcCatalog />} />
          <Route path="/catalog/components" element={<ComponentsCatalog />} />
          <Route path="/catalog/laptops" element={<LaptopsCatalog />} />
          <Route path="/cart" element={<Cart />} />
          
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;