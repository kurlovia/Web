import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import PriceFilter from './filters/PriceFilter';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({});

  // Загрузка товаров
  useEffect(() => {
    axios.get('/api/products')
      .then(res => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch(error => console.error('Ошибка загрузки товаров:', error));
  }, []);

  // Применение фильтров
  useEffect(() => {
    let result = [...products];
    
    if (filters.min_price) {
      result = result.filter(p => p.price >= filters.min_price);
    }
    
    if (filters.max_price) {
      result = result.filter(p => p.price <= filters.max_price);
    }
    
    setFilteredProducts(result);
  }, [filters, products]);

  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      <Grid item xs={12} md={3}>
        <PriceFilter onFilter={setFilters} />
      </Grid>
      
      <Grid item xs={12} md={9}>
        <Typography variant="h4" gutterBottom>
          Каталог товаров ({filteredProducts.length})
        </Typography>
        
        <Grid container spacing={3}>
          {filteredProducts.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}