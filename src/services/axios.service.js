
import axios from 'axios';

const baseUrl = "https://mtml-api.hestawork.com/api/";

const axiosInstance = axios.create({ baseURL: `${baseUrl}` });
axiosInstance.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        console.log(
            `axiosInstance -> interceptors -> request -> error`,
            error
        );
        return Promise.reject(error);
    }
);



export {
    axiosInstance
};