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
            }),
            getUserProfile: builder.query({
                query: ()=> USERS_URL+"/profile",
            }),
            updateUserProfile: builder.mutation({
                query: (userDetails)=>{
                    return {
                        url: USERS_URL+"/profile",
                        method: "PUT",
                        body: userDetails,
                    }
                }
            }),
            getAllUsers: builder.query({
                query: ()=> USERS_URL
            }),
            deleteUser: builder.mutation({
                query: (userId)=>({
                    url: `${USERS_URL}/${userId}/delete`,
                    method: "DELETE",
                })
            }),
            updateUser: builder.mutation({
                query: ({ userId, data})=>({
                    url: `${USERS_URL}/${userId}/update`,
                    method: "PUT",
                    body: data,
                })
            }),
            getUserById: builder.query({
                query: (userId)=> `${USERS_URL}/${userId}`,
            }),
        }
    )
})

export const { useLoginUserMutation, useLogoutUserMutation, useRegisterUserMutation, useGetUserProfileQuery, useUpdateUserProfileMutation, useGetAllUsersQuery, useDeleteUserMutation, useUpdateUserMutation, useGetUserByIdQuery } = userApiSlice;