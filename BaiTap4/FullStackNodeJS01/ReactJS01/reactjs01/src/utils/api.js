import instance from './axios.customize';

export const createUserApi = (name, email, password) =>
  instance.post('/api/register', { name, email, password });

export const loginApi = (email, password) =>
  instance.post('/api/login', { email, password });

export const getAccountApi = () => instance.get('/api/account');

export const forgotPasswordApi = (email) =>
  instance.post('/api/forgot-password', { email });

export const resetPasswordApi = (token, password) =>
  instance.post('/api/reset-password', { token, password });
