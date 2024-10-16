import axios from 'axios';

const URI = import.meta.env.VITE_REACT_API_ZEUS;

export const APISQZeus = axios.create({
    baseURL: URI,
    timeout: 15000,
  });

