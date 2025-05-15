import React, { useState } from 'react';
import { FaFilter, FaSearch } from 'react-icons/fa';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import ProductCard from '../../components/ProductCard/ProductCard';
import './CatalogCategory.css';

const ComponentsCatalog = () => {
  const [filter, setFilter] = useState('');
  
  const products = [
    { id: 1, name: "Видеокарта NVIDIA", price: 45000, specs: "RTX 3070, 8GB GDDR6" },
    { id: 2, name: "Процессор AMD", price: 25000, specs: "Ryzen 7 5800X" }
  ];

  const breadcrumbs = [
    { path: '/', name: 'Главная' },
    { path: '/catalog', name: 'Каталог' },
    { path: '/catalog/components', name: 'Комплектующие' }
  ];

  return (
    <div className="category-page">
      <Breadcrumbs items={breadcrumbs} />
      
      <div className="category-header">
        <h1>Компьютерные комплектующие</h1>
        <div className="category-controls">
          {/* Такие же элементы управления как в PcCatalog */}
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

export default ComponentsCatalog;