import React, { useState, useRef } from 'react';
import { FaFilter, FaSearch, FaTimes } from 'react-icons/fa';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import ProductCard from '../../components/ProductCard/ProductCard';
import './CatalogCategory.css';

const LaptopsCatalog = () => {
  const [filter, setFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('none');
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [inputValues, setInputValues] = useState([0, 200000]);
  const progressRef = useRef(null);
  
  const products = [
    {
      id: 1,
      name: "Игровой ноутбук ThunderX Pro",
      price: 129990,
      image: "/assets/gaming-laptop.jpg",
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
      image: "/assets/ultrabook.jpg",
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

    const handlePriceChange = (e, index) => {
    const newValues = [...inputValues];
    newValues[index] = parseInt(e.target.value);
    setInputValues(newValues);
    
    // Обновляем ползунок
    if (index === 0) {
      if (newValues[0] > newValues[1]) {
        newValues[1] = newValues[0];
      }
    } else {
      if (newValues[1] < newValues[0]) {
        newValues[0] = newValues[1];
      }
    }
    
    setPriceRange([newValues[0], newValues[1]]);
  };

  // Применяем фильтры
  const applyFilters = () => {
    setPriceRange([...inputValues]);
    setShowFilters(false);
  };

  // Сбрасываем фильтры
  const resetFilters = () => {
    setSortBy('none');
    setPriceRange([0, 200000]);
    setInputValues([0, 200000]);
  };

  // Фильтрация и сортировка товаров
  const filteredProducts = products
    .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

  return (
    <div className="category-page">
      <Breadcrumbs items={breadcrumbs} />
      
      <div className="category-header">
        <h1>Ноутбуки</h1>
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
          <button 
            className="filter-btn"
            onClick={() => setShowFilters(true)}
          >
            <FaFilter /> Фильтры
          </button>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {showFilters && (
        <div className="filters-modal">
          <div className="filters-content">
            <div className="filters-header">
              <h3 className="filters-title">Фильтры</h3>
              <button 
                className="close-filters"
                onClick={() => setShowFilters(false)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="filter-section">
              <h4>Сортировка</h4>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="none">Без сортировки</option>
                <option value="price-asc">Цена по возрастанию</option>
                <option value="price-desc">Цена по убыванию</option>
              </select>
            </div>

            <div className="filter-section">
              <h4>Диапазон цен</h4>
              <div className="price-range">
                <div className="slider">
                  <div 
                    className="progress"
                    ref={progressRef}
                    style={{
                      left: `${(priceRange[0] / 200000) * 100}%`,
                      right: `${100 - (priceRange[1] / 200000) * 100}%`
                    }}
                  ></div>
                </div>
                <div className="range-input">
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    step="1000"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(e, 0)}
                  />
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(e, 1)}
                  />
                </div>
                <div className="price-inputs">
                  <div>
                    <span>От: </span>
                    <input
                      type="number"
                      value={inputValues[0]}
                      onChange={(e) => handlePriceChange(e, 0)}
                      min="0"
                      max={inputValues[1]}
                    />
                  </div>
                  <div>
                    <span>До: </span>
                    <input
                      type="number"
                      value={inputValues[1]}
                      onChange={(e) => handlePriceChange(e, 1)}
                      min={inputValues[0]}
                      max="200000"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button 
              className="apply-filters"
              onClick={applyFilters}
            >
              Применить фильтры
            </button>
            <button
  className="reset-filters"
  onClick={resetFilters}
>
  Сбросить фильтры
</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LaptopsCatalog;