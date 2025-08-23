import React from "react";
import qs from "qs";

import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  SetCategoryId,
  SetSort,
  SetCurrentPage,
  SetFilters,
  selecFilter,
} from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizzas } from "../redux/slices/pizzasSlice";

import Categories from "../Categories";
import Sort, { Sortlist } from "../Sort";
import PizzaBlock from "../Pizzablock";
import Pagination from "../Pagination";
import Skeleton from "../Pizzablock/Skeleton";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { CategoryId, sort, currentPage, searchValue } =
    useSelector(selecFilter);

  const { items, status } = useSelector(selectPizzas);

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const onClickAddCategories = (id: number) => {
    dispatch(SetCategoryId(id));
  };

  const onChangeSort = (obj: any) => {
    dispatch(SetSort(obj));
  };

  const onChangePage = (number: number) => {
    dispatch(SetCurrentPage(number));
  };

  const getPizzas = async () => {
    const category = CategoryId > 0 ? `category=${CategoryId}` : "";
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const search = searchValue ? `search=${searchValue}` : "";

    dispatch(
      //@ts-ignore
      fetchPizzas({
        category,
        sortBy,
        order,
        search,
        currentPage,
      })
    );
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
      getPizzas();
    }

    isSearch.current = false;
  }, [CategoryId, sort, searchValue, currentPage]);

  const skeleton = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzas = items.map((obj: any) => (
    <Link key={obj.id} to={`/pizza/${obj.id}`}>
      <PizzaBlock {...obj} />
    </Link>
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          CategoryId={CategoryId}
          onClickAddCategories={onClickAddCategories}
        />
        <Sort onChangeSort={onChangeSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" && <h2>Ошибка загрузки пицц 😕</h2>}
      <div className="content__items">
        {status === "loading" ? skeleton : pizzas}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
