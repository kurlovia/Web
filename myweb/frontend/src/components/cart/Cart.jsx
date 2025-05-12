import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  IconButton
} from '@mui/material';
import { Box, Typography, etc } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  // Загрузка корзины при монтировании
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      // В реальном проекте здесь будет запрос к вашему API
      const mockCart = [
        { id: 1, name: 'Игровой компьютер', price: 89990, quantity: 1 },
        { id: 2, name: 'Ноутбук ASUS', price: 65000, quantity: 2 }
      ];
      setCartItems(mockCart);
      calculateTotal(mockCart);
    } catch (error) {
      console.error('Ошибка загрузки корзины:', error);
    }
  };

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotal(sum);
  };

  const removeItem = (itemId) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedItems = cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
  };

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Ваша корзина
      </Typography>
      
      {cartItems.length === 0 ? (
        <Typography variant="body1">Корзина пуста</Typography>
      ) : (
        <>
          <List>
            {cartItems.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem>
                  <ListItemText
                    primary={item.name}
                    secondary={`${item.price} ₽ × ${item.quantity}`}
                  />
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >-</Button>
                    
                    <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                    
                    <Button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >+</Button>
                    
                    <IconButton
                      onClick={() => removeItem(item.id)}
                      color="error"
                      sx={{ ml: 2 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
          
          <Box sx={{ mt: 3, textAlign: 'right' }}>
            <Typography variant="h6">
              Итого: {total} ₽
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              sx={{ mt: 2 }}
            >
              Оформить заказ
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}