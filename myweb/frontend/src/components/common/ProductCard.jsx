import React from 'react';
import { Button } from './Button';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <div className="product-specs">
          {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
            <div key={key} className="spec-row">
              <span className="spec-name">{key}:</span>
              <span className="spec-value">{value}</span>
            </div>
          ))}
        </div>
        <div className="product-footer">
          <span className="product-price">{product.price.toLocaleString()} ₽</span>
          <Button variant="primary">В корзину</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;