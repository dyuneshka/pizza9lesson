import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterSliceState, sort } from "./type";



const initialState: FilterSliceState = {
  searchValue: "",
  CategoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярности",
    sortProperty: "price",
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,

  reducers: {
    SetCategoryId: (state, action: PayloadAction<number>) => {
      state.CategoryId = action.payload;
    },
    SetSerchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    SetSort: (state, action: PayloadAction<sort>) => {
      state.sort = action.payload;
    },
    SetCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    SetFilters: (state, action: PayloadAction<Partial<FilterSliceState>>) => {
      if (action.payload.sort) {
        state.sort = action.payload.sort;
      }
      if (action.payload.currentPage) {
        state.currentPage = Number(action.payload.currentPage);
      }
      if (action.payload.CategoryId) {
        state.CategoryId = Number(action.payload.CategoryId);
      }
      if (action.payload.searchValue !== undefined) {
        state.searchValue = action.payload.searchValue;
      }
    },
  },
});



export const {
  SetCategoryId,
  SetSort,
  SetCurrentPage,
  SetSerchValue,
  SetFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
