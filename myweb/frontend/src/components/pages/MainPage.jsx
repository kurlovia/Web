import React from 'react';
import { Grid, Typography } from '@mui/material';
import CategoryCard from '../shared/CategoryCard';

const categories = [
  { id: 1, name: 'Игровые ПК', image: 'gaming-pcs.jpg' },
  { id: 2, name: 'Ноутбуки', image: 'laptops.jpg' },
  { id: 3, name: 'Комплектующие', image: 'components.jpg' }
];

export default function MainPage() {
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h2" gutterBottom>
        Категории товаров
      </Typography>
      <Grid container spacing={3}>
        {categories.map(category => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <CategoryCard category={category} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}