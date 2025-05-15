import React from 'react';
import { Link } from 'react-router-dom';
import { FaBreadSlice } from 'react-icons/fa';
import './Breadcrumbs.css';

const Breadcrumbs = ({ items }) => {
  return (
    <div className="breadcrumbs">
      {items.map((item, index) => (
        <span key={item.path} className="breadcrumb-item">
          {index > 0 && <span className="separator">/</span>}
          {index === items.length - 1 ? (
            <span className="current">{item.name}</span>
          ) : (
            <Link to={item.path}>
              {index === 0 && <FaBreadSlice className="home-icon" />}
              {item.name}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;