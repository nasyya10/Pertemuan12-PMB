import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.3:3000',
});

export const getItems = () => api.get('/items');
export const addItem = (data) => api.post('/items', data);
export const updateItem = (id, data) => api.put(`/items/${id}`, data);
export const deleteItem = (id) => api.delete(`/items/${id}`);

export default api;