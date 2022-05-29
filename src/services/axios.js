import axios from 'axios';

const defaultOptions = {
  baseURL: "http://178.63.13.157:8090/mock-api/api/",
};

const instance = axios.create(defaultOptions)


instance.interceptors.request.use(
    config => {

        return config;
    },
    error => {
        return Promise.reject(error);
    },
);


instance.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        return Promise.reject(error.response);
    }
);

export default instance;

export const createAPIRequest = config => instance(config);