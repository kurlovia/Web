import React from 'react';
import './FeaturedProducts.css';

const products = [
  {
    id: 1,
    name: 'BERLOSE RTX 4090',
    description: 'Мощная видеокарта для геймеров',
    price: 199999,
    specs: '32GB GDDR6X | 16384 ядер'
  },
  {
    id: 2,
    name: 'PERILZE Ryzen 9',
    description: 'Процессор для профессиональных задач',
    price: 89999,
    specs: '16 ядер | 4.9GHz'
  }
];

const FeaturedProducts = () => {
  return (
    <section className="featured-products">
      <h2>Рекомендуемые сборки</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <div className="product-specs">{product.specs}</div>
            <div className="product-footer">
              <span className="product-price">{product.price.toLocaleString()} ₽</span>
              <button className="buy-button">Купить</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;