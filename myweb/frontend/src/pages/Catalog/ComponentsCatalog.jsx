import React, { useState } from 'react';
import { FaFilter, FaSearch } from 'react-icons/fa';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import ProductCard from '../../components/ProductCard/ProductCard';
import './CatalogCategory.css';

const ComponentsCatalog = () => {
  const [filter, setFilter] = useState('');
  
  const products = [
    {
      id: 1,
      name: "Видеокарта NVIDIA RTX 4090",
      price: 189990,
      image: "/images/rtx4090.jpg",
      description: "Флагманская видеокарта для 4K игр",
      specs: [
        "Чипсет: NVIDIA GeForce RTX 4090",
        "Видеопамять: 24GB GDDR6X",
        "Тактовая частота: 2235-2520 MHz",
        "Разъемы: 3x DisplayPort, 1x HDMI",
        "Рекомендуемый БП: 850W"
      ],
      shortSpecs: "RTX 4090, 24GB GDDR6X"
    },
    {
      id: 2,
      name: "Процессор AMD Ryzen 9 7950X",
      price: 64990,
      image: "/images/ryzen9.jpg",
      description: "16-ядерный процессор для профессиональных задач",
      specs: [
        "Ядра/потоки: 16/32",
        "Тактовая частота: 4.5-5.7 GHz",
        "Кэш L3: 64MB",
        "TDP: 170W",
        "Сокет: AM5"
      ],
      shortSpecs: "16 ядер, 4.5-5.7 GHz"
    }
    // Добавьте другие комплектующие по аналогии
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
          <div className="search-box">
            <FaSearch />
            <input 
              type="text" 
              placeholder="Поиск комплектующих..." 
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

export default ComponentsCatalog;