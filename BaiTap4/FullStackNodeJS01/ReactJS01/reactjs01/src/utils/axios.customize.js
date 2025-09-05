import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
});

// Request Interceptor
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log('[Axios Request]', {
    method: config.method,
    url: config.baseURL + config.url,
    params: config.params,
    data: config.data,
    headers: config.headers,
  });

  return config;
});

// Response Interceptor
instance.interceptors.response.use(
  (response) => {
    console.log('[Axios Response]', {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error('[Axios Error]', {
      url: error.config?.url,
      message: error.message,
      response: error.response,
    });
    return Promise.reject(error);
  }
);

export default instance;
