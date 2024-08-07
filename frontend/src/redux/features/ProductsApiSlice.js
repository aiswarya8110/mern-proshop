import { apiSlice } from './apiSlice';
import { PRODUCTS_URL } from '../../constants';

const productsAPI = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getProducts: builder.query({
            query: ()=> PRODUCTS_URL,
            keepUnusedDataFor: 2
        }),
        getProductDetails: builder.query({
            query: (productId)=> PRODUCTS_URL+"/"+productId,
            keepUnusedDataFor: 5
        })
    })
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productsAPI;