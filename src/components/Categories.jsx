import React from "react";

const Categories = () => {
  const [ActiveIndex, SetActiveIndex] = React.useState(0);

  const onClickAddCategories = (i) => {
    SetActiveIndex(i);
  };

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
            className={ActiveIndex === i ? "active" : ""}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
