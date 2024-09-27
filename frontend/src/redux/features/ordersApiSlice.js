import { ORDERS_URL } from "../../constants";
import { apiSlice } from "./apiSlice";

const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>(
        {
         placeOrder: builder.mutation({
            query: (order)=> (
                {
                    url: ORDERS_URL,
                    method: "POST",
                    body: order,
                }
            )
         }),

         getOrderById: builder.query({
            query: (id)=> `${ORDERS_URL}/${id}`
         }),

         getMyOrders: builder.query({
            query: ()=> `${ORDERS_URL}/myorders`
         }),

         updateToPaid: builder.mutation({
            query: (id, details)=> (
            {
                url: `${ORDERS_URL}/${id}/pay`,
                method: "PUT",
                body: details,    
            })
         }),

         getAllOrders: builder.query({
            query: ()=> ORDERS_URL
         }),

         updateToDelivered: builder.mutation({
            query: (orderId)=>({
                url: `${ORDERS_URL}/${orderId}/deliver`,
                method: "PATCH",
            })
         })
        }
    )
})

export const { usePlaceOrderMutation, useGetMyOrdersQuery, useGetOrderByIdQuery, useUpdateToPaidMutation, useGetAllOrdersQuery, useUpdateToDeliveredMutation } = ordersApiSlice;