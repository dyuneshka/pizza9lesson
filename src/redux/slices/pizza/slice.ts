import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Pizza, PizzaSliceState } from "./type";

export const fetchPizzas = createAsyncThunk <Pizza[], Record<string, string>>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { category, sortBy, order, search, currentPage } = params;
    const res = await axios.get<Pizza[]>(
      `https://66f883262a683ce9730fa040.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return res.data;
  }
);



const initialState: PizzaSliceState = {
  items: [],
  status: "loading",
};

const PizzasSlice = createSlice({
  name: "pizzas",
  initialState,

  reducers: {
    SetItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = "success";
      state.items = action.payload;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = "error";
      state.items = [];
    });
  },
});



export const { SetItems } = PizzasSlice.actions;
export default PizzasSlice.reducer;
