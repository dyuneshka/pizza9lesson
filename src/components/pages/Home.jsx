import React from "react";
import axios from "axios";
import qs from "qs";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  SetCategoryId,
  SetSort,
  SetCurrentPage,
  SetFilters,
} from "../redux/slices/filterSlice";

import Categories from "../Categories";
import Sort, { Sortlist } from "../Sort";
import PizzaBlock from "../Pizzablock";
import Pagination from "../Pagination";
import Skeleton from "../Pizzablock/Skeleton";

const Home = ({ searchValue }) => {
  const { CategoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickAddCategories = (id) => {
    dispatch(SetCategoryId(id));
  };

  const onChangeSort = (obj) => {
    dispatch(SetSort(obj));
  };

  const onChangePage = (number) => {
    dispatch(SetCurrentPage(number));
  };

  const [items, SetItems] = React.useState([]);
  const [isLoading, SetIsLoading] = React.useState(true);

  const fetchPizzas = () => {
    SetIsLoading(true);

    const category = CategoryId > 0 ? `category=${CategoryId}` : "";
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const search = searchValue ? `search=${searchValue}` : "";

    axios
      .get(
        `https://66f883262a683ce9730fa040.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        SetItems(res.data);
        SetIsLoading(false);
      });
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        currentPage,
        CategoryId,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [CategoryId, sort, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search, {
        ignoreQueryPrefix: true,
      });

      const sort = Sortlist.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(SetFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [CategoryId, sort, searchValue, currentPage]);

  const skeleton = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div class="container">
      <div class="content__top">
        <Categories
          CategoryId={CategoryId}
          onClickAddCategories={onClickAddCategories}
        />
        <Sort onChangeSort={onChangeSort} />
      </div>
      <h2 class="content__title">Все пиццы</h2>
      <div class="content__items">{isLoading ? skeleton : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
