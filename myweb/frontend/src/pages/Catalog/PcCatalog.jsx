import React, { useState, useRef } from 'react';
import { FaFilter, FaSearch, FaTimes } from 'react-icons/fa';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import ProductCard from '../../components/ProductCard/ProductCard';
import './CatalogCategory.css';

const PcCatalog = () => {
  const [filter, setFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('none');
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [inputValues, setInputValues] = useState([0, 200000]);
  const progressRef = useRef(null);
  
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
        <h1>Персональне Компьютеры</h1>
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

export default PcCatalog;