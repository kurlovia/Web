import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Typography, Container } from '@mui/material';
import ProductCard from './ProductCard';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Ошибка загрузки товаров:', err));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Каталог товаров
      </Typography>
      <Grid container spacing={3}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}