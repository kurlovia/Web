import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { 
  FaArrowRight, 
  FaDesktop, 
  FaMicrochip, 
  FaLaptop,
  FaHome,
  FaTools,
  FaShoppingCart,
  FaUser,
  FaFilter,
  FaBreadSlice
} from 'react-icons/fa';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import './Catalog.css';

// Данные категорий
const categories = [
  {
    id: 1,
    name: "Персональные компьютеры",
    description: "Готовые сборки для работы и игр",
    icon: <FaDesktop size={40} />,
    link: "/catalog/pc"
  },
  {
    id: 2,
    name: "Компьютерные комплектующие",
    description: "Компоненты для сборки вашего ПК",
    icon: <FaMicrochip size={40} />,
    link: "/catalog/components"
  },
  {
    id: 3,
    name: "Ноутбуки",
    description: "Мобильные решения для любых задач",
    icon: <FaLaptop size={40} />,
    link: "/catalog/laptops"
  }
];

const Catalog = () => {
  const breadcrumbs = [
    { path: '/', name: 'Главная' },
    { path: '/catalog', name: 'Каталог' }
  ];

  return (
    <div className="catalog-page">
      <Header />
      
      <div className="catalog-container">
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="catalog-header">
          <h1>Каталог товаров</h1>
          <p className="catalog-description">
            Все необходимые компоненты для игровых компьютеров, ноутбуков и обустройства вашей игровой или профессиональной зоны
          </p>
        </div>

        <div className="categories-grid">
          {categories.map(category => (
            <div key={category.id} className="category-card">
              <div className="category-icon">
                {category.icon}
              </div>
              <div className="category-info">
                <h3>{category.name}</h3>
                <p className="category-description">{category.description}</p>
                <Link to={category.link} className="category-link">
                  Подробнее <FaArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;