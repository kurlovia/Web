import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import MainPage from './components/pages/MainPage';
import CartPage from './components/cart/Cart';
import ComparePage from './components/compare/ComparePage';
import Configurator from './components/configurator/Configurator';
import Header from './components/layout/Header';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/configurator" element={<Configurator />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;  // Добавлен экспорт по умолчанию