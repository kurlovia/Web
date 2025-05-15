import React, { useState } from 'react';
import { FaFilter, FaSearch } from 'react-icons/fa';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import ProductCard from '../../components/ProductCard/ProductCard';
import './CatalogCategory.css';

const LaptopsCatalog = () => {
  const [filter, setFilter] = useState('');
  
  const products = [
    { id: 1, name: "Игровой ноутбук", price: 85000, specs: "RTX 3060, 16GB RAM" },
    { id: 2, name: "Ультрабук", price: 60000, specs: "13.3\", 1.2kg" }
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
        <h1>Ноутбуки</h1>
        <div className="category-controls">
          {/* Такие же элементы управления */}
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