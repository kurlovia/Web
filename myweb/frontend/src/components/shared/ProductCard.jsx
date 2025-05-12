import { Card, CardMedia, CardContent, Button, Typography } from '@mui/material';
import { ShoppingCart, Compare } from '@mui/icons-material';

export default function ProductCard({ product, onAddToCart, onAddToCompare }) {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={`/images/${product.image}`}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {Object.entries(product.specs).map(([key, value]) => (
            <div key={key}>{`${key}: ${value}`}</div>
          ))}
        </Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>
          {product.price.toLocaleString()} ₽
        </Typography>
      </CardContent>
      <Button 
        variant="contained" 
        startIcon={<ShoppingCart />}
        onClick={() => onAddToCart(product)}
        sx={{ m: 1 }}
      >
        В корзину
      </Button>
      <Button 
        variant="outlined" 
        startIcon={<Compare />}
        onClick={() => onAddToCompare(product)}
        sx={{ m: 1 }}
      >
        Сравнить
      </Button>
    </Card>
  );
}