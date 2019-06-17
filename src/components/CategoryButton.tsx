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

  const runtimeMillis =
    oldestRunningEvent !== undefined
      ? now.getTime() - new Date(oldestRunningEvent.start).getTime()
      : 0;

  const runtimeHours = Math.trunc(runtimeMillis / (1000 * 60 * 60));
  const runtimeMinutes = Math.trunc(
    (runtimeMillis % (1000 * 60 * 60)) / (1000 * 60)
  );
  const runtimeSeconds = Math.trunc(
    ((runtimeMillis % (1000 * 60 * 60)) % (1000 * 60)) / 1000
  );

  const runtimeText =
    runtimeMillis > 0
      ? `${runtimeHours}:${runtimeMinutes}:${runtimeSeconds}`
      : "";

  return (
    <button
      onClick={oldestRunningEvent !== undefined ? stopEvent : startEvent}
      style={{ ...backgroundColorStyle }}
      className={"CategoryButton"}
    >
      {category.name}
      {runtimeText}
    </button>
  );
};

export default CategoryButton;
