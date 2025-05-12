import { Card, CardMedia, CardContent, Chip, Button } from '@mui/material';

export default function ProductCard({ product }) {
  return (
    <Card sx={{ maxWidth: 345, height: '100%' }}>
      <CardMedia
        component="img"
        height="200"
        image={`/images/${product.image}`}
      />
      <CardContent>
        <Chip label="Топ продаж" color="primary" sx={{ mb: 1 }} />
        <h3>{product.name}</h3>
        <ul>
          {product.specs.map((spec, i) => (
            <li key={i}>{spec}</li>
          ))}
        </ul>
        <div className="price-block">
          <span className="price">{product.price} ₽</span>
          <Button variant="contained" color="primary">
            В корзину
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}