import React, { useEffect, useState } from "react";
import "./App.css";
import { createCategory, getCategories } from "./workTimerService";
import Week from "./components/Week";

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

const CategoryButton: React.FC<{ categoryName: string }> = ({
  categoryName
}) => {
  return <button className={"CategoryButton"}>{categoryName}</button>;
};

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

const App: React.FC = () => {
  return (
    <div className="App">
      <Week weekDiff={0} />
      <Week weekDiff={-1} />
      <Week weekDiff={-2} />
      <Week weekDiff={-3} />
      <Week weekDiff={-4} />

      <ControlPanel />
    </div>
  );
};

export default App;
