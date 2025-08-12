import React from "react";

const Categories = ({CategoryId, onClickAddCategories}) => {
  
  const category = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div class="categories">
      <ul>
        {category.map((value, i) => (
          <li
            onClick={() => onClickAddCategories(i)}
            className={CategoryId === i ? "active" : ""}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
