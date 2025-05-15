import React from 'react';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <div className="product-image">
        {/* Здесь будет изображение */}
        <div className="image-placeholder"></div>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="specs">{product.specs}</p>
        <p className="price">{product.price.toLocaleString()} руб.</p>
        <button 
          onClick={() => addToCart(product)}
          className="add-to-cart-btn"
        >
          В корзину
        </button>
      </div>
    </div>
  );
};

export default ProductCard;