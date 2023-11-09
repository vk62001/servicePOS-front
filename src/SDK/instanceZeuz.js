import axios from 'axios';

const URI = import.meta.env.VITE_REACT_API_ZEUS;
console.log(URI,import.meta.env.VITE_REACT_API_ZEUS_credentials )

export const APISQZeus = axios.create({
    baseURL: URI,
    timeout: 15000,
  //   headers :{
  //     Authorization: `Basic ${import.meta.env.VITE_REACT_API_ZEUS_credentials}`, 
  //     ContentType: 'application/json'
  // }
  });

