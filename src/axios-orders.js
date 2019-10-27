import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-ingredient-builder.firebaseio.com/'
});

export default instance;