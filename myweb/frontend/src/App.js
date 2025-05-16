import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header/Header';
import Home from './pages/Home/HomePage';
import Catalog from './pages/Catalog/Catalog';
import Cart from './pages/Cart/Cart';
import Profile from './pages/Profile/ProfilePage';
import PcCatalog from './pages/Catalog/PcCatalog';
import ComponentsCatalog from './pages/Catalog/ComponentsCatalog';
import LaptopsCatalog from './pages/Catalog/LaptopsCatalog';
import Checkout from './pages/Checkout/Checkout';
import OrderSuccess from './pages/OrderSuccess/OrderSuccess';
import ServicesPage from './pages/Services/ServicesPage';
import ServiceDetail from './pages/Services/ServiceDetail/ServiceDetail';
import './styles/colors.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
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
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:serviceId" component={ServiceDetail} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;