import instance from './axios.customize';

export const createUserApi = (name, email, password) =>
  instance.post('/user/register', { name, email, password });

export const loginApi = (email, password) =>
  instance.post('/user/login', { email, password });

export const getAccountApi = () => instance.get('/user/account');

export const forgotPasswordApi = (email) =>
  instance.post('/user/forgot-password', { email });

export const resetPasswordApi = (token, password) =>
  instance.post('/user/reset-password', { token, password });
