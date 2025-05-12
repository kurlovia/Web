import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

export default function CategoryCard({ category }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={`/images/${category.image}`}
        alt={category.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {category.name}
        </Typography>
        <Button variant="contained" color="primary">
          Смотреть товары
        </Button>
      </CardContent>
    </Card>
  );
}