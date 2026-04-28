import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

export const register = (nom, email, password, type_user) =>
  api.post('/auth/register', { nom, email, password, type_user });

export const login = (email, password) =>
  api.post('/auth/login', { email, password });
