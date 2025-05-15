import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <>
<div className="product-card" onClick={() => setIsModalOpen(true)}>
  <div className="product-image">
    <img src={product.image || '/images/default-product.jpg'} alt={product.name} />
  </div>
  <div className="product-info">
    <h3>{product.name}</h3>
    <p className="product-price">{product.price} ₽</p>
    {product.shortSpecs && (
      <div className="product-specs">
        {product.shortSpecs}
      </div>
    )}
    <button 
      className="add-to-cart-btn"
      onClick={handleAddToCart}
    >
      В корзину
    </button>
  </div>
</div>

      {isModalOpen && (
        <div className="product-modal">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
            <div className="modal-product">
              <div className="modal-image">
                <img src={product.image || '/images/default-product.jpg'} alt={product.name} />
              </div>
              <div className="modal-details">
                <h2>{product.name}</h2>
                <p className="modal-price">{product.price} ₽</p>
                <p className="modal-description">{product.description}</p>
                <div className="modal-specs">
                  {product.specs && (
                    <>
                      <h4>Характеристики:</h4>
                      <ul>
                        {product.specs.map((spec, index) => (
                          <li key={index}>{spec}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
                <div className="modal-actions">
                  <button className="modal-btn add-cart" onClick={handleAddToCart}>
                    Добавить в корзину
                  </button>
                  <Link 
                    to="/cart" 
                    className="modal-btn buy-now"
                    onClick={handleAddToCart}
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