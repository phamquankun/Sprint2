import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import currenciesApi from '../../apis/currenciesApi';


export const getCurrency = createAsyncThunk(
    'currency/changeCurrency',
    async (payload) => {
        const data = await currenciesApi.getAll();
        const data1 = data.map(x => x.code)
        // console.log('type of payload', payload)
        const data2 = data1.filter((allNameObject) => payload.includes(allNameObject));
        // console.log('check data 2', data2)
        return data2
    }
)

const headerSlice = createSlice({
    name: 'currency',
    initialState: {
        value: ''
    },

    reducers: {
        getData: (state, action) => {
            state.value = action.payload;
        },
    },
    extraReducers: {
        [getCurrency.fulfilled]: (state, action) => {
            state.value = action.payload
        },
    }
})

const { actions ,reducer } = headerSlice
export const { getData } = actions
export default reducer