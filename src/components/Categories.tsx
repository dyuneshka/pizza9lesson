
import React from "react";

type ICategoriesProps = {
  CategoryId: number;
  onClickAddCategories: (i: number) => void;
};

const Categories: React.FC<ICategoriesProps> = React.memo(
  ({ CategoryId, onClickAddCategories }) => {
  

    const category = [
      "Все",
      "Мясные",
      "Вегетарианская",
      "Гриль",
      "Острые",
      "Закрытые",
    ];

    return (
      <div className="categories">
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
  }
);

export default Categories;
