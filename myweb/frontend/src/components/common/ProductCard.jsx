import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import './CatalogCategory.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <>
      <div 
        className="product-card"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="card-image">
          <img src={product.image || '/default-product.jpg'} alt={product.name} />
        </div>
        <div className="card-content">
          <h3>{product.name}</h3>
          <p className="price">{product.price.toLocaleString()} ₽</p>
          <p className="specs">{product.shortSpecs}</p>
          <button 
            className="card-button"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
          >
            В корзину
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="product-modal">
          <div className="modal-content">
            <button 
              className="close-modal" 
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <div className="product-details">
              <div className="product-image">
                <img src={product.image || '/default-product.jpg'} alt={product.name} />
              </div>
              <div className="product-info">
                <h2>{product.name}</h2>
                <p className="price">{product.price.toLocaleString()} ₽</p>
                <p className="description">{product.description}</p>
                
                <div className="specifications">
                  <h4>Характеристики:</h4>
                  <ul>
                    {product.specifications.map((spec, index) => (
                      <li key={index}>
                        <strong>{spec.name}:</strong> {spec.value}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="product-actions">
                  <button 
                    className="action-btn add-to-cart"
                    onClick={handleAddToCart}
                  >
                    Добавить в корзину
                  </button>
                  <Link 
                    to="/cart" 
                    className="action-btn buy-now"
                    onClick={handleBuyNow}
                  >
                    Купить сейчас
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;