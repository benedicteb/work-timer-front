import React from "react";
import { startCategoryEvent, stopCategoryEvent } from "../workTimerService";

const CategoryButton: React.FC<{
  category: Category;
  oldestRunningEvent?: TimerEvent;
  refreshRunningEvents: () => void;
}> = ({ category, oldestRunningEvent, refreshRunningEvents }) => {
  const now = new Date();

  const startEvent = (evt: React.MouseEvent<HTMLElement>) => {
    startCategoryEvent(category)
      .then(event => {
        refreshRunningEvents();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const stopEvent = (evt: React.MouseEvent<HTMLElement>) => {
    stopCategoryEvent(category)
      .then(event => {
        refreshRunningEvents();
      })
      .catch(error => console.error(error));
  };

  const backgroundColorStyle =
    oldestRunningEvent !== undefined ? { backgroundColor: "yellow" } : {};

  const statusText =
    oldestRunningEvent !== undefined
      ? ` (${now.getTime() - new Date(oldestRunningEvent.start).getTime()})`
      : null;

  return (
    <button
      onClick={oldestRunningEvent !== undefined ? stopEvent : startEvent}
      style={{ ...backgroundColorStyle }}
      className={"CategoryButton"}
    >
      {category.name}
      {statusText}
    </button>
  );
};

export default CategoryButton;
