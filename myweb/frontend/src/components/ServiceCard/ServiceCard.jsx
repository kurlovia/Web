import React from 'react';
import './ServiceCard.css';

const ServiceCard = ({ title, description, icon, image }) => {
  return (
    <div className="service-card">
      <div className="card-image" style={{ backgroundImage: `url(${image})` }}>
        <div className="card-icon">{icon}</div>
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="card-link">Подробнее →</div>
      </div>
    </div>
  );
};

export default ServiceCard;