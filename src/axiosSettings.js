import axios from 'axios';

const axiosSettings = axios.create({
  baseURL: 'http://yummy-recipes-ch3-harith.herokuapp.com/api/v1.0/'
})

axiosSettings.interceptors.request.use((config) => {
  // Do this before the request is sent:
  if (localStorage.getItem('accessToken')) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  }
  return config;
});

export default axiosSettings;
