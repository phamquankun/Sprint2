import axiosClient from "./axiosClient";

const currenciesApi = {
    getAll(params) {
        const url = '/api/common/currencies';
        return axiosClient.get(url, {params})
    }, 
}

export default currenciesApi;