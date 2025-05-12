import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Header() {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Главная
          </Button>
          <Button color="inherit" component={Link} to="/products">
            Каталог
          </Button>
          <Button color="inherit" component={Link} to="/register">
            Регистрация
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/cart"
            startIcon={<ShoppingCartIcon />}
          >
            Корзина
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}