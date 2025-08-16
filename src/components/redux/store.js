import { configureStore } from "@reduxjs/toolkit";

import filterSlice from "./slices/filterSlice";
import cartSlice from './slices/cartSlice'
import pizzasSlice from './slices/pizzasSlice'


 const store = () =>  configureStore({
    reducer: {
        filter: filterSlice,
        cart: cartSlice,
        pizzas: pizzasSlice,
    },
})

export default store