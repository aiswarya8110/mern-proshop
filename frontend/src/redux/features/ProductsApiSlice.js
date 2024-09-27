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
        }),
        createSampleProduct: builder.mutation({
            query: ()=>({
                url: PRODUCTS_URL+"/create",
                method: "POST"
            })
        }),
        updateProduct: builder.mutation({
            query: ({productId, data })=>{
                console.log(productId, data);
                return (
                    {
                        url: `${PRODUCTS_URL}/${productId}/update`,
                        method: "PUT",
                        body: data,
                    }
                )
            }
        }),
        deleteProduct: builder.mutation({
            query: (productId)=>({
                url: `${PRODUCTS_URL}/${productId}/delete`,
                method: "DELETE",
            })
        })
    })
});

export const { useGetProductsQuery, useGetProductDetailsQuery, useCreateSampleProductMutation, useUpdateProductMutation, useDeleteProductMutation } = productsAPI;