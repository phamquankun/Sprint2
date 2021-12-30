import axiosClient from "./axiosClient";

const userApi = {
    register(data) {
        const url = '/api/register';
        return axiosClient.post(url, data)
    },
    login(data) {
        const url = '/api/login';
        return axiosClient.post(url, data)
    }, 
}

export default userApi;