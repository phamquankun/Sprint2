import { configureStore } from "@reduxjs/toolkit";
import headerReducer from '../components/Header/headerSlice'


const rootReducer = {
    currency: headerReducer,
}
const store = configureStore({
    reducer: rootReducer
})

export default store;