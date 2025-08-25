import { configureStore } from "@reduxjs/toolkit";

import filterSlice from "../redux/slices/filter/slice";
import cartSlice from '../redux/slices/cart/slice';
import pizzasSlice from '../redux/slices/pizza/slice'
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    filter: filterSlice,
    cart: cartSlice,
    pizzas: pizzasSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;