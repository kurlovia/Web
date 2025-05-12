import { useState } from 'react';
import { Card, CardMedia, CardContent, Button } from '@mui/material';

export default function ProductCard({ product }) {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={`/images/${product.images[currentImage]}`}
      />
      <div style={{ display: 'flex' }}>
        {product.images.map((img, index) => (
          <Button key={index} onClick={() => setCurrentImage(index)}>
            {index + 1}
          </Button>
        ))}
      </div>
      <CardContent>
        <h3>{product.name}</h3>
        <p>{product.price} ₽</p>
        <p>{product.specs}</p>
        <Button variant="contained">В корзину</Button>
      </CardContent>
    </Card>
  );
}