import { SortProperty } from "../../../components/Sort";

export type sort = {
  name: string;
  sortProperty: SortProperty;
};

export interface FilterSliceState {
  searchValue: string;
  CategoryId: number;
  currentPage: number;
  sort: sort;
}