import { apiSlice } from './apiSlice';
import { PRODUCTS_URL } from '../../constants';

const productsAPI = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getProducts: builder.query({
            query: ({ pageNumber, searchTerm })=> (
            `${PRODUCTS_URL}/page/${pageNumber}/search/${searchTerm}`),
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
        }),
        createProductReview: builder.mutation({
            query: ({ productId, data })=>({
                url: `${PRODUCTS_URL}/${productId}`,
                method: "POST",
                body: data,
            })
        }),
        getTopProducts: builder.query({
            query: ()=> PRODUCTS_URL+"/top",
        }),
    })
});

export const { 
useGetProductsQuery, 
useGetProductDetailsQuery, 
useCreateSampleProductMutation, 
useUpdateProductMutation, 
useDeleteProductMutation, 
useCreateProductReviewMutation, 
useGetTopProductsQuery 
} = productsAPI;