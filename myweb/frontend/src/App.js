import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/cart/Cart';
import RegisterForm from './components/auth/RegisterForm';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;