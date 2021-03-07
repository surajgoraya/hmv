import axios from 'axios';

const instance = axios.create({
    baseURL: '/api',
    headers: { 'content-type': 'application/json' },
    timeout: 2000,
});

export default instance;
