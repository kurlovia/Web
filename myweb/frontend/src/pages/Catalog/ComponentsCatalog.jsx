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
      shortSpecs: "24GB GDDR6X, DLSS 3",
      // image: "/gpu.jpg",
      description: "Флагманская видеокарта для 4K игр и профессиональных задач",
      specifications: [
        { name: "Чипсет", value: "NVIDIA GeForce RTX 4090" },
        { name: "Память", value: "24GB GDDR6X" },
        { name: "Тактовая частота", value: "2235-2520 MHz" },
        { name: "Разъемы", value: "3x DisplayPort, 1x HDMI" },
        { name: "Рекомендуемый БП", value: "850W" }
      ]
    },
    {
      id: 2,
      name: "Процессор AMD Ryzen 9 7950X",
      price: 64990,
      shortSpecs: "16 ядер, 4.5-5.7 GHz",
      // image: "/cpu.jpg",
      description: "Топовый процессор для профессиональных рабочих станций",
      specifications: [
        { name: "Ядра/потоки", value: "16/32" },
        { name: "Тактовая частота", value: "4.5-5.7 GHz" },
        { name: "Кэш L3", value: "64MB" },
        { name: "TDP", value: "170W" },
        { name: "Сокет", value: "AM5" }
      ]
    },
    // Добавьте еще 4-6 комплектующих
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