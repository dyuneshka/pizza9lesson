export type CartItems = {
  id: string;
  title: string;
  price: number;
  sizes: number;
  imageUrl: string;
  types: string;
  count: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItems[];
}
