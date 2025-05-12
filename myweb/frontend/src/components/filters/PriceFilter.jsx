import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { 
  TextField,
  Button,
  Box,
  Slider
} from '@mui/material';

export default function PriceFilter({ onFilter }) {
  const [priceRange, setPriceRange] = useState([0, 100000]);

  const handleApply = () => {
    onFilter({
      min_price: priceRange[0],
      max_price: priceRange[1]
    });
  };

  return (
    <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Фильтр по цене
      </Typography>
      
      <Slider
        value={priceRange}
        onChange={(e, newValue) => setPriceRange(newValue)}
        valueLabelDisplay="auto"
        min={0}
        max={100000}
        step={1000}
      />
      
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <TextField
          label="От"
          value={priceRange[0]}
          onChange={(e) => setPriceRange([e.target.value, priceRange[1]])}
          type="number"
        />
        
        <TextField
          label="До"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], e.target.value])}
          type="number"
        />
      </Box>
      
      <Button 
        variant="contained" 
        onClick={handleApply}
        fullWidth
        sx={{ mt: 2 }}
      >
        Применить фильтр
      </Button>
    </Box>
  );
}