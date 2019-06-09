import React, { useEffect, useState } from "react";
import "./App.css";
import { getCategories } from "./workTimerService";
import Week from "./components/Week";

const ControlPanel: React.FC = () => {
  return (
    <div className={"ControlPanel"}>
      <p>Hello world</p>
    </div>
  );
};

const App: React.FC<{ initialCategories?: Category[] }> = ({
  initialCategories
}) => {
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
    <div className="App">
      <div className={"Scrollable"}>
        <Week weekDiff={0} />
        <Week weekDiff={-1} />
        <Week weekDiff={-2} />
        <Week weekDiff={-3} />
        <Week weekDiff={-4} />
      </div>
      <div className={"Footer"}>
        <ControlPanel />
      </div>
    </div>
  );
};

export default App;
