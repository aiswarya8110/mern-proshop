import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState:{
        userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
    },
    reducers: {
        setUserInfo: (state, action)=>{
            state.userInfo = action.payload;

            localStorage.setItem("userInfo", JSON.stringify(!action.payload ? "" : action.payload))
        },
        removeUserInfo: (state, _)=>{
            state.userInfo = null;

            localStorage.removeItem("userInfo");
        }
    }
});

export const { setUserInfo, removeUserInfo } = authSlice.actions;

export default authSlice.reducer;