import { configureStore } from "@reduxjs/toolkit" 
import { apiSlice } from './api/apiSlice'
import { setupListeners } from "@reduxjs/toolkit/query"
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
    reducer: {
        //dynamically refer to apiSlice
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
    },
    //this adds on apiSlice middleware 
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    //gives access to redux dev tools
    devTools: true
})

setupListeners(store.dispatch)