import React, { useState } from "react";
import { createCategory } from "../workTimerService";

const AddCategoryButton: React.FC<{
  setCategories: any;
  categories: Category[];
}> = ({ setCategories, categories }) => {
  const [addingCategory, setAddingCategory] = useState(false);
  const [categoryNameInput, setCategoryNameInput] = useState("");

  const onAddClick = (evt: React.MouseEvent<HTMLElement>) => {
    setAddingCategory(!addingCategory);
  };

  const onSaveCategoryClick = (evt: React.MouseEvent<HTMLElement>) => {
    if (!categoryNameInput) {
      setAddingCategory(false);
      return;
    }

    createCategory(categoryNameInput)
      .then(newCategory => {
        setCategories(categories.concat([newCategory]));
        setAddingCategory(false);
        setCategoryNameInput("");
      })
      .catch(error => {
        console.error(error);
      });
  };

  const onCategoryNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryNameInput(evt.target.value);
  };

  return (
    <div className={"AddCategory"}>
      {addingCategory ? (
        <div>
          <input
            onChange={onCategoryNameChange}
            type="text"
            className={"CategoryNameInput"}
          />
          <button
            onClick={onSaveCategoryClick}
            className={"SaveCategoryButton"}
          >
            {categoryNameInput ? "Save" : "Abort"}
          </button>
        </div>
      ) : (
        <button onClick={onAddClick} className={"AddCategoryButton"}>
          +
        </button>
      )}
    </div>
  );
};

export default AddCategoryButton;
