import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './features/apiSlice';
import cartSliceReducer from './features/cartSlice';
import authSliceReducer from './features/authSlice';
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartSliceReducer,
        auth: authSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV === "development", 
});

export default store;