import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './features/apiSlice';
import cartSliceReducer from './features/cartSlice';
import authSliceReducer from './features/authSlice';
import searchSliceReducer from './features/searchSlice';
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartSliceReducer,
        auth: authSliceReducer,
        search: searchSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV === "development", 
});

export default store;