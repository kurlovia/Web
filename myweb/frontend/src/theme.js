import { createTheme } from '@mui/material/styles';

export default createTheme({
  palette: {
    primary: { main: '#1976d2' },    // Синий
    secondary: { main: '#4caf50' },  // Зеленый
    error: { main: '#f44336' },      // Красный
    background: { 
      default: '#f5f5f5',            // Серый фон
      paper: '#ffffff'               // Белый для карточек
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  }
});