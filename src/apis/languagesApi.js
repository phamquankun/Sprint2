import axiosClient from "./axiosClient";

const languagesApi = {
    getAll(params) {
        const url = '/api/common/languages';
        return axiosClient.get(url, {params})
    }, 
}

export default languagesApi;