import axios from 'axios';

axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: 'https://amazon-backend-mern.herokuapp.com',
});

export default instance;
