import { USERS_URL } from '../../constants';
import { apiSlice } from './apiSlice';

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>(
        {
            loginUser: builder.mutation({
                query: (data)=>(
                    {
                        url: USERS_URL+"/login",
                        body: data,
                        method: "POST"
                    }
                )
            }),
            logoutUser: builder.mutation({
                query: ()=>{
                    return {
                        url: USERS_URL+"/logout",
                        method: "POST"
                    }
                }
            }),
            registerUser: builder.mutation({
                query: (data)=>{
                    return {
                        url: USERS_URL,
                        method: "POST",
                        body: data
                    }
                }
            })
        }
    )
})

export const { useLoginUserMutation, useLogoutUserMutation, useRegisterUserMutation } = userApiSlice;