import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        searchTerm: '',
    },
    reducers: {
        updateSearchTerm : (state, action)=>{
            state.searchTerm = action.payload;
        }
    }
});

export const { updateSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;