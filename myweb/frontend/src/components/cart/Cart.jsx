import { 
  Container, Paper, Typography, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, 
  Button, IconButton, Box 
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

export default function Cart({ cartItems, updateQuantity, removeItem }) {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, bgcolor: 'background.paper' }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Ваша корзина
        </Typography>
        
        {cartItems.length > 0 ? (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'background.default' }}>
                    <TableCell>Товар</TableCell>
                    <TableCell align="center">Количество</TableCell>
                    <TableCell align="right">Цена</TableCell>
                    <TableCell align="right">Действия</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <img 
                            src={`/images/${item.image}`} 
                            alt={item.name} 
                            style={{ width: 60, marginRight: 16 }}
                          />
                          <div>
                            <Typography>{item.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item.specs[0]}
                            </Typography>
                          </div>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Button 
                          size="small" 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          color="error"
                        >
                          -
                        </Button>
                        <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                        <Button 
                          size="small" 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          color="secondary"
                        >
                          +
                        </Button>
                      </TableCell>
                      <TableCell align="right">
                        {(item.price * item.quantity).toLocaleString()} ₽
                      </TableCell>
                      <TableCell align="right">
                        <IconButton 
                          onClick={() => removeItem(item.id)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ mt: 3, textAlign: 'right' }}>
              <Typography variant="h5" color="primary">
                Итого: {total.toLocaleString()} ₽
              </Typography>
              <Button 
                variant="contained" 
                size="large" 
                sx={{ mt: 2, bgcolor: 'secondary.main' }}
              >
                Оформить заказ
              </Button>
            </Box>
          </>
        ) : (
          <Typography variant="body1" color="text.secondary">
            Корзина пуста
          </Typography>
        )}
      </Paper>
    </Container>
  );
}