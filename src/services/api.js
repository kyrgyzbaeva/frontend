import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backendnodejs-production-8ed1.up.railway.app',
});

export default api;