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
      name: "Игровой ноутбук ThunderX",
      price: 129990,
      shortSpecs: "RTX 4080, i9-13900HX, 32GB",
      // image: "/gaming-laptop.jpg",
      description: "Экстремальная производительность для игр и творческих задач",
      specifications: [
        { name: "Процессор", value: "Intel Core i9-13900HX" },
        { name: "Видеокарта", value: "NVIDIA GeForce RTX 4080 12GB" },
        { name: "Экран", value: "17.3\" QHD 240Hz" },
        { name: "Оперативная память", value: "32GB DDR5" },
        { name: "Накопитель", value: "2TB NVMe SSD" }
      ]
    },
    {
      id: 2,
      name: "Ультрабук SlimBook Air",
      price: 74990,
      shortSpecs: "13.3\", M2, 16GB, 1TB",
      // image: "/ultrabook.jpg",
      description: "Стильный и легкий ультрабук для работы в движении",
      specifications: [
        { name: "Процессор", value: "Apple M2" },
        { name: "Экран", value: "13.3\" Retina 2560x1600" },
        { name: "Вес", value: "1.24 кг" },
        { name: "Аккумулятор", value: "До 18 часов работы" },
        { name: "Порты", value: "2x Thunderbolt 4" }
      ]
    },
    // Добавьте еще 4-6 ноутбуков
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