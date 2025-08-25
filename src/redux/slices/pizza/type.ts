export type Pizza = {
  id: string;
  title: string;
  price: number;
  sizes: number[];
  imageUrl: string;
  types: number[];
  rating: number;
};

export interface PizzaSliceState {
  status: "loading" | "success" | "error";
  items: Pizza[]
}