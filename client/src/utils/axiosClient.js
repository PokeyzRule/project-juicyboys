import axios from 'axios';

const client = (token = null) => {
    const defaultOptions = {
        baseURL: 'http://localhost:5000',
        headers: {
            token: token ?? '',
            'Content-Type': 'application/json'
        },
    };

    return {
        get: (url, options = {}) => axios.get(url, { ...defaultOptions, ...options }),
        post: (url, data, options = {}) => axios.post(url, data, { ...defaultOptions, ...options }),
        put: (url, data, options = {}) => axios.put(url, data, { ...defaultOptions, ...options }),
        delete: (url, options = {}) => axios.delete(url, { ...defaultOptions, ...options }),
    };
};

const token = JSON.parse(localStorage.getItem('token'));
const axiosClient = client(token);

export default axiosClient