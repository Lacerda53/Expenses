import axios from 'axios';

const api = axios.create({
    baseURL: 'http://sofit-mobile-challenge.herokuapp.com/'
})

export default api;