// src/api/authService.js (complet)
import axios from '../utils/axiosConfig';

export const authService = {
  login: async (email, password) => {
    const response = await axios.post('/login', {
      username: email,
      password,
    });
    return response.data;
  },

  register: async (email, password) => {
    return axios.post('/register', { email, password });
  },

  getMe: async () => {
    return axios.get('/auth/me');
  }
};