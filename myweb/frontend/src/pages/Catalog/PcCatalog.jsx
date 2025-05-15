import React, { useState } from 'react';
import { FaFilter, FaSearch } from 'react-icons/fa';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import ProductCard from '../../components/ProductCard/ProductCard';
import './CatalogCategory.css';

const PcCatalog = () => {
  const [filter, setFilter] = useState('');
  
  // Пример данных товаров
  const products = [
    { id: 1, name: "Игровой ПК", price: 70000, specs: "RTX 3080, 32GB RAM" },
    { id: 2, name: "Офисный ПК", price: 35000, specs: "Intel Core i5, 16GB RAM" }
  ];

  const breadcrumbs = [
    { path: '/', name: 'Главная' },
    { path: '/catalog', name: 'Каталог' },
    { path: '/catalog/pc', name: 'Персональные компьютеры' }
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
              placeholder="Поиск..." 
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