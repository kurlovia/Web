import React, { useState } from 'react';
import { FaFilter, FaSearch } from 'react-icons/fa';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import ProductCard from '../../components/ProductCard/ProductCard';
import './CatalogCategory.css';

const PcCatalog = () => {
  const [filter, setFilter] = useState('');
  
  const products = [
    {
      id: 1,
      name: "Игровой ПК StormForce",
      price: 89990,
      shortSpecs: "RTX 4070, i7-13700KF, 32GB",
      // image: "/gaming-pc.jpg",
      description: "Мощный игровой компьютер для профессиональных геймеров и стримеров",
      specifications: [
        { name: "Процессор", value: "Intel Core i7-13700KF" },
        { name: "Видеокарта", value: "NVIDIA GeForce RTX 4070 12GB" },
        { name: "Оперативная память", value: "32GB DDR5 5600MHz" },
        { name: "Накопитель", value: "1TB NVMe SSD + 2TB HDD" },
        { name: "Охлаждение", value: "Liquid Cooler 240mm" }
      ]
    },
    {
      id: 2,
      name: "Офисный ПК BusinessPro",
      price: 42990,
      shortSpecs: "i5-13400, 16GB, 512GB SSD",
      // image: "/office-pc.jpg",
      description: "Надежный компьютер для офисной работы и повседневных задач",
      specifications: [
        { name: "Процессор", value: "Intel Core i5-13400" },
        { name: "Видеокарта", value: "Intel UHD Graphics 730" },
        { name: "Оперативная память", value: "16GB DDR4 3200MHz" },
        { name: "Накопитель", value: "512GB NVMe SSD" },
        { name: "Корпус", value: "Mini Tower, 15L" }
      ]
    },
    // Добавьте еще 4-6 компьютеров
  ];

  const breadcrumbs = [
    { path: '/', name: 'Главная' },
    { path: '/catalog', name: 'Каталог' },
    { path: '/catalog/pc', name: 'Компьютеры' }
  ];

  return (
    <div className="category-page">
      <Breadcrumbs items={breadcrumbs} />
      
      <div className="category-header">
        <h1>Персональные компьютеры</h1>
        <div className="category-controls">
          <div className="search-box">
            <FaSearch />
            <input 
              type="text" 
              placeholder="Поиск компьютеров..." 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <button className="filter-btn">
            <FaFilter /> Фильтры
          </button>
        </div>
      </div>

      <div className="products-grid">
        {products
          .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
          .map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default PcCatalog;