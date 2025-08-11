import React from "react";

import Categories from "../Categories"
import Sort from "../Sort"
import PizzaBlock from "../Pizzablock"

import Skeleton from "../Pizzablock/Skeleton"

const Home = () => {
  
    const [items, SetItems] = React.useState([])
    const [isLoading, SetIsLoading] = React.useState(true)
  
  
    React.useEffect(() => {
      fetch('https://66f883262a683ce9730fa040.mockapi.io/items')
      .then((res) => res.json())
      .then((arr) => 
        {
          SetItems(arr)
          SetIsLoading(false)
        } 
        
    )
    window.scrollTo(0, 0)
    }, [])
  
    return (
    <div class="container">
      <div class="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 class="content__title">Все пиццы</h2>
      <div class="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};

export default Home