import React from "react";
import { getMonday, getWeekNumber } from "../utils";
import Weekday from "./Weekday";

const Week: React.FC<{ weekDiff: number }> = ({ weekDiff }) => {
  const millisPerDay = 24 * 60 * 60 * 1000;
  const date = new Date(new Date().getTime() + 7 * weekDiff * millisPerDay);
  const weekNumber = getWeekNumber(date);
  const monday = getMonday(date);

  return (
    <div className={"Week"}>
      <div className={"WeekHeader"}>
        <h1>Week {weekNumber}</h1>
      </div>
      <div className={"WeekDays"}>
        {Array.from(Array(7).keys())
          .reverse()
          .map(dayNumber => {
            const date = new Date(monday.getTime() + dayNumber * millisPerDay);
            const now = new Date();

            if (date > now) {
              return;
            }

            return <Weekday key={date.getTime()} date={date} />;
          })}
      </div>
    </div>
  );
};

export default Week;
