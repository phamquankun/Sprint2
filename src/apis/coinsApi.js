
import axiosClient from "./axiosClient";

const coinsApi = {
    getAll(params) {
        const url = '/api/common/coins';
        return axiosClient.get(url, {params})
    }, 
}

export default coinsApi;