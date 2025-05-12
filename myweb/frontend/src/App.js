import MainPage from './components/pages/MainPage';
import CartPage from './components/cart/CartPage';
import ComparePage from './components/compare/ComparePage';
import Configurator from './components/configurator/Configurator';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function App() {
  const [comparedItems, setComparedItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const addToCompare = (product) => {
    if (!comparedItems.some(item => item.id === product.id)) {
      setComparedItems([...comparedItems, product]);
    }
  };

  // ... другие функции для корзины

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header compareCount={comparedItems.length} cartCount={cartItems.length} />
        <Routes>
          <Route path="/" element={
            <>
              <ProductFilters  />
              <ProductList 
                onAddToCompare={addToCompare}
                onAddToCart={addToCart}
              />
            </>
          } />
          <Route path="/compare" element={
            <ComparePage 
              comparedItems={comparedItems}
              removeFromCompare={removeFromCompare}
            />
          } />
          <Route path="/cart" element={
            <CartPage 
              cartItems={cartItems}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          } />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}