import React from "react";
import "./App.css";
import Week from "./components/Week";
import ControlPanel from "./components/ControlPanel";

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
