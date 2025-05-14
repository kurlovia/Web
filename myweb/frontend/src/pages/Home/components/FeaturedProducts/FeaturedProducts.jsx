import { FaStar, FaShoppingCart } from 'react-icons/fa';
import React from 'react';
import './FeaturedProducts.css';

const products = [
  {
    id: 1,
    name: "ONE",
    price: "95 095 ₽",
    description: "Ваше идеальное начало в мире игр и творчества",
    specs: [
      "Процессор: Intel Core i5-12400F",
      "Видеокарта: NVIDIA GeForce RTX 3060 dual",
      "Охлаждение: DeepCool AG400 BK ARGB V2",
      "Оперативная память: 16GB Kingston FURY Beast RGB DDR4",
      "Материнская плата: ASUS PRIME B760M-K D4",
      "SSD накопитель: 500GB ADATA LEGEND 860",
      "Блок питания: 550W DeepCool PF550",
      "Корпус: DeepCool CH360"
    ],
    image: "/assets/alpha1.jpg"
  },
  {
    id: 2,
    name: "LUMEN",
    price: "320 000 ₽",
    description: "Мощность и элегантность. Безграничные возможности.",
    specs: [
      "Процессор: Intel® Core™ i7-14700F",
      "Видеокарта: MSI GeForce RTX 5080 VENTUS 3X",
      "Охлаждение: DeepCool LE360 V2 Black",
      "Оперативная память: 32GB TEAMGROUP T-Force Delta RGB Black",
      "Материнская плата: MSI B760 GAMING PLUS",
      "SSD накопитель: 1TB ADATA LEGEND 860",
      "Блок питания: 850W DeepCool PN850M ",
      "Корпус: LUMEN PLUS Silver"
    ],
    image: "/assets/alpha2.jpg"
  },
    {
    id: 3,
    name: "LEADER",
    price: "266 000 ₽",
    description: "Идеальный игровой компьютер для 2K: мощь и эффектный прозрачный корпус.",
    specs: [
      "Процессор: Intel® Core™ i7-14700F",
      "Видеокарта: MSI GeForce RTX 5070 Ti VENTUS 3X",
      "Охлаждение: DeepCool LE360 V2 Black",
      "Оперативная память: 32GB TEAMGROUP T-Force Delta RGB Black",
      "Материнская плата: MSI B760 GAMING PLUS",
      "SSD накопитель: 1TB ADATA LEGEND 860",
      "Блок питания: 750W DeepCool PL750D",
      "Корпус: JONSBO TK-3 Black"
    ],
    image: "/assets/alpha3.jpg"
  },
    {
    id: 4,
    name: "CHAMPION",
    price: "177 700 ₽",
    description: "Производительный игровой компьютер в стиле минимализм с информативным ЖК-экраном.",
    specs: [
      "Процессор: Intel® Core™ i5-14400F",
      "Видеокарта: Palit GeForce RTX 5060 Ti INFINITY 3",
      "Охлаждение: DeepCool LD240",
      "Оперативная память: 32GB TEAMGROUP T-Force Delta RGB Black",
      "Материнская плата: MSI B760 GAMING PLUS",
      "SSD накопитель: 1TB ADATA LEGEND 860",
      "Блок питания: 650W DeepCool PL650D",
      "Корпус: JONSBO D41 STD Screen Black"
    ],
    image: "/assets/alpha4.jpg"
  },
  // Добавьте другие товары по аналогии
];

const FeaturedProducts = () => {
  return (
    <section className="featured-products">
      <h2 className="section-title">Хит продаж</h2>
      
      <div className="products-container">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-header">
              <h3>{product.name}</h3>
              <span className="product-price">{product.price}</span>
            </div>
            
            <div className="product-image-container">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-badge"><FaStar style={{marginRight: 5}} /> TOP </div>
            </div>
            
            <div className="product-content">
              <p className="product-description">{product.description}</p>
              
              <div className="product-specs">
                {product.specs.map((spec, index) => (
                  <div key={index} className="spec-item">
                    <span className="spec-icon">•</span>
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
              <button className="buy-button"> <FaShoppingCart style={{marginRight: 10}} /> КУПИТЬ </button>
              
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;