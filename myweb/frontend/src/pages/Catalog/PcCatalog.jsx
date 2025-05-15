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
      name: "Игровой ПК",
      price: 89990,
      // image: "/images/gaming-pc.jpg",
      description: "Мощный игровой компьютер для профессиональных геймеров",
      specs: [
        "Процессор: Intel Core i7-13700KF",
        "Видеокарта: NVIDIA RTX 4070 12GB",
        "Оперативная память: 32GB DDR5",
        "Накопитель: 1TB NVMe SSD",
        "Охлаждение: Liquid Cooler 240mm"
      ]
    },
    {
      id: 2,
      name: "Офисный ПК",
      price: 42990,
      // image: "/images/office-pc.jpg",
      description: "Надежный компьютер для офисной работы",
      specs: [
        "Процессор: Intel Core i5-13400",
        "Оперативная память: 16GB DDR4",
        "Накопитель: 512GB SSD",
        "Видеокарта: Intel UHD Graphics 730"
      ]
    }
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