import React, { useState } from 'react';
import { FaFilter, FaSearch } from 'react-icons/fa';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import ProductCard from '../../components/ProductCard/ProductCard';
import './CatalogCategory.css';

const LaptopsCatalog = () => {
  const [filter, setFilter] = useState('');
  
  const products = [
    {
      id: 1,
      name: "Игровой ноутбук ThunderX Pro",
      price: 129990,
      image: "/images/gaming-laptop.jpg",
      description: "Мощный игровой ноутбук с топовой видеокартой",
      specs: [
        "Процессор: Intel Core i9-13900HX",
        "Видеокарта: NVIDIA RTX 4080 12GB",
        "Экран: 17.3\" QHD 240Hz",
        "Оперативная память: 32GB DDR5",
        "Накопитель: 2TB NVMe SSD",
        "Вес: 2.9 кг"
      ],
      shortSpecs: "i9-13900HX, RTX 4080, 32GB RAM"
    },
    {
      id: 2,
      name: "Ультрабук SlimBook Air",
      price: 74990,
      image: "/images/ultrabook.jpg",
      description: "Легкий и стильный ультрабук для работы",
      specs: [
        "Процессор: Apple M2",
        "Экран: 13.3\" Retina 2560x1600",
        "Оперативная память: 16GB",
        "Накопитель: 1TB SSD",
        "Вес: 1.24 кг",
        "Аккумулятор: до 18 часов"
      ],
      shortSpecs: "Apple M2, 16GB, 1TB SSD"
    }
    // Добавьте другие ноутбуки по аналогии
  ];

  const breadcrumbs = [
    { path: '/', name: 'Главная' },
    { path: '/catalog', name: 'Каталог' },
    { path: '/catalog/laptops', name: 'Ноутбуки' }
  ];

  return (
    <div className="category-page">
      <Breadcrumbs items={breadcrumbs} />
      
      <div className="category-header">
        <h1>Ноутбуки и ультрабуки</h1>
        <div className="category-controls">
          <div className="search-box">
            <FaSearch />
            <input 
              type="text" 
              placeholder="Поиск ноутбуков..." 
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

export default LaptopsCatalog;