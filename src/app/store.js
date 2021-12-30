import { configureStore } from "@reduxjs/toolkit";
import headerReducer from '../components/Header/headerSlice'
import userReducer from '../pages/Auth/userSlice'

const rootReducer = {
    currency: headerReducer,
    user: userReducer,
}
const store = configureStore({
    reducer: rootReducer
})

export default store;