import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Добавляем интерсепторы при необходимости
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      // Обработка 401 ошибки
    }
    return Promise.reject(error);
  }
);

export default instance;