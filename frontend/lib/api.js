import axios from 'axios';

const api = axios.create({
  baseURL: "https://hrms-lite-7uyb.onrender.com",
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const message =
      err.response?.data?.detail ||
      err.message ||
      'Something went wrong';
    return Promise.reject(message);
  }
);

export default api;
