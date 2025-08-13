import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    CategoryId: 0,
    currentPage: 1,
    sort: {
    name: "популярности",
    sortProperty: "rating",
  }
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,

    reducers: {
        SetCategoryId: (state, action) => {
            state.CategoryId = action.payload 
        }, 
        SetSort: (state, action) => {
            state.sort = action.payload
        },
        SetCurrentPage: (state, action) => {
            state.currentPage = action.payload
        } 
    }
})


export const {SetCategoryId, SetSort, SetCurrentPage} = filterSlice.actions
export default filterSlice.reducer