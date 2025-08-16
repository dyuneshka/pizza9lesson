import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { category, sortBy, order, search, currentPage } = params;
    const res = await axios.get(
      `https://66f883262a683ce9730fa040.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return res.data;
  }
);

const initialState = {
  items: [],
  status: ''
};

const PizzasSlice = createSlice({
  name: "pizzas",
  initialState,

  reducers: {
    SetItems(state, action) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = 'loading';
    });
     builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = 'success';
      state.items = action.payload;
    });
     builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = 'error'
      state.items = []
    });
  },
});

export const selectPizzas = state => state.pizzas

export const { SetItems } = PizzasSlice.actions;
export default PizzasSlice.reducer;
