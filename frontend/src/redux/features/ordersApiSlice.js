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
         })
        }
    )
})

export const { usePlaceOrderMutation, useGetMyOrdersQuery, useGetOrderByIdQuery } = ordersApiSlice;