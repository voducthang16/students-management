import axios from "axios";

const instance = axios.create({
    baseURL: "https://dummyjson.com/",
    headers: {
        value: 'test123'
    },
    // timeout: 1000
});

instance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        console.log(error)
        if (error.response && error.response.status === 404) {
            // handle error: inform user, go to login, etc
            return {
                code: error.code,
                status: error.response.status,
                message: error.message,
                // data: error.response.data
            }
        } else if (error.code === 'ERR_NETWORK') {
            alert('Network Error')
        }
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);

export default instance;