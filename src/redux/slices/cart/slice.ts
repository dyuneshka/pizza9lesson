import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { getCartLS } from "../../../utils/getCartLS";
import { calcTotalPrice } from "../../../utils/calcTotalPrice";
import { CartItems, CartSliceState } from "./type";

const { items, totalPrice } = getCartLS();

const initialState: CartSliceState = {
  items,
  totalPrice,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addItems: (state, action: PayloadAction<CartItems>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },

    minusitem: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },

    removeItems: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((obj) => obj.id != action.payload);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItems, removeItems, clearItems, minusitem } =
  cartSlice.actions;
export default cartSlice.reducer;
