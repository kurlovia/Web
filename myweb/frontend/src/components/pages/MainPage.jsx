import { Grid, Typography, Button } from '@mui/material';
import CategoryCard from './CategoryCard';

const categories = [
  { id: 1, name: 'Игровые ПК', image: 'gaming-pcs.jpg' },
  { id: 2, name: 'Ноутбуки', image: 'laptops.jpg' },
  { id: 3, name: 'Комплектующие', image: 'components.jpg' }
];

export default function MainPage() {
  return (
    <div className="main-page">
      <Typography variant="h2" gutterBottom>Соберите свой идеальный ПК</Typography>
      <Grid container spacing={4}>
        {categories.map(category => (
          <Grid item xs={12} md={4} key={category.id}>
            <CategoryCard category={category} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}