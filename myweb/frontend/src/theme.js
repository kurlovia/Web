import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // синий
    },
    secondary: {
      main: '#4caf50', // зеленый
    },
    error: {
      main: '#f44336', // красный
    },
    background: {
      default: '#f5f5f5', // серый
      paper: '#ffffff',
    },
  },
});

export default theme;