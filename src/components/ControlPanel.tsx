import React, { useEffect, useState } from "react";
import { getCategories, getRunningEvents } from "../workTimerService";
import AddCategoryButton from "./AddCategoryButton";
import CategoryButton from "./CategoryButton";
import { useInterval } from "../utils";

const ControlPanel: React.FC = () => {
  const initialCategories: Category[] = [];
  const initialRunningEvents: TimerEvent[] = [];

  const [categories, setCategories] = useState(initialCategories);
  const [runningEvents, updateRunningEvents] = useState(initialRunningEvents);

  const refreshRunningEvents = () => {
    getRunningEvents()
      .then(events => {
        updateRunningEvents(events.events);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    getCategories()
      .then(categories => {
        setCategories(categories.categories);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    refreshRunningEvents();
  }, []);

  useInterval(() => {
    refreshRunningEvents();
  }, 1000);

  return (
    <div className={"ControlPanel"}>
      <AddCategoryButton
        setCategories={setCategories}
        categories={categories}
      />

      <div className={"CategoryButtons"}>
        {categories.map(category => {
          const eventsSorted = runningEvents
            .filter(event => {
              if (event.category_id === category.id) {
                return true;
              }

              return false;
            })
            .sort((a, b) => {
              if (a.start > b.start) {
                return 1;
              } else if (b.start > a.start) {
                return -1;
              } else {
                return 0;
              }
            });

          const oldestRunningEvent =
            eventsSorted.length > 0 ? eventsSorted[0] : undefined;

          return (
            <CategoryButton
              key={category.id}
              category={category}
              oldestRunningEvent={oldestRunningEvent}
              refreshRunningEvents={refreshRunningEvents}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ControlPanel;
