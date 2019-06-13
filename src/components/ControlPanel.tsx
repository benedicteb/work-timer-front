import React, { useEffect, useState } from "react";
import { getCategories } from "../workTimerService";
import AddCategoryButton from "./AddCategoryButton";
import CategoryButton from "./CategoryButton";

const ControlPanel: React.FC = () => {
  const initialCategories: Category[] = [];
  const [categories, setCategories] = useState(initialCategories);

  useEffect(() => {
    getCategories()
      .then(categories => {
        setCategories(categories.categories);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className={"ControlPanel"}>
      <AddCategoryButton
        setCategories={setCategories}
        categories={categories}
      />

      <div className={"CategoryButtons"}>
        {categories.map(category => {
          return (
            <CategoryButton key={category.id} categoryName={category.name} />
          );
        })}
      </div>
    </div>
  );
};

export default ControlPanel;
