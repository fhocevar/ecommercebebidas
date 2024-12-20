import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // URL do backend
});

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const fetchProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};