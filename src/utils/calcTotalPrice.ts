import { CartItems } from "../redux/slices/cart/type";

export const calcTotalPrice = (items: CartItems[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
