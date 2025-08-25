import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type CartItems = {
    id: string;
    title: string;
    price: number;
    sizes: number;
    imageUrl: string;
    types: string;
    count: number;
}


interface CartSliceState {
  totalPrice: number;
  items: CartItems[];
}

const initialState: CartSliceState = {
  items: [],
  totalPrice: 0,
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

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
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

export const selectCart = (state: RootState) => state.cart;
export const selectCartItem = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItems, removeItems, clearItems, minusitem } =
  cartSlice.actions;
export default cartSlice.reducer;
