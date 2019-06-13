import React from "react";
import DayGrid from "./DayGrid";
import { getMonday, getWeekNumber } from "../utils";

const DAY_NAMES: { [id: number]: string } = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  0: "Sunday"
};

const MONTH_SHORT_NAMES: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
];

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

            const dayName = DAY_NAMES[date.getDay()];
            const monthName = MONTH_SHORT_NAMES[date.getMonth()];

            return (
              <div key={dayNumber} className={"WeekDay"}>
                <h2>
                  {dayName} ({date.getDate()} {monthName})
                </h2>
                <DayGrid date={date} events={[]} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Week;
