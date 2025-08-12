import React from "react";
import ReactPaginate from "react-paginate";

import Categories from "../Categories";
import Sort from "../Sort";
import PizzaBlock from "../Pizzablock";
import Pagination from "../Pagination";


import Skeleton from "../Pizzablock/Skeleton";

const Home = ({ searchValue }) => {
  const [items, SetItems] = React.useState([]);
  const [isLoading, SetIsLoading] = React.useState(true);

  const [CategoryId, SetCategoryId] = React.useState(0);
  const [sortType, SetSortType] = React.useState({
    name: "популярности",
    sortProperty: "rating",
  });
  const [currentPage, SetCurrentPage] = React.useState(1)

  const category = CategoryId > 0 ? `category=${CategoryId}` : "";
  const sortBy = sortType.sortProperty.replace("-", "");
  const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
  const search = searchValue ? `search=${searchValue}` : "";

  React.useEffect(() => {
    SetIsLoading(true);
    fetch(
      `https://66f883262a683ce9730fa040.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((arr) => {
        SetItems(arr);
        SetIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [CategoryId, sortType, searchValue, currentPage]);

  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />)
  const pizzas = items
   .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div class="container">
      <div class="content__top">
        <Categories
          CategoryId={CategoryId}
          onClickAddCategories={(i) => SetCategoryId(i)}
        />
        <Sort value={sortType} onChangeSort={(i) => SetSortType(i)} />
      </div>
      <h2 class="content__title">Все пиццы</h2>
      <div class="content__items">
        {isLoading ? skeleton : pizzas}
      </div>
      <Pagination currentPage = {currentPage} onChangePage = {(number) => SetCurrentPage(number)} />
    </div>
  );
};

export default Home;
