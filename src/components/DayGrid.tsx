import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { start } from "repl";

const DayGrid: React.FC<{ date: Date; events: Event[] }> = ({
  date,
  events
}) => {
  const now = new Date();
  const dayFraction =
    (now.getHours() + now.getMinutes() / 60 + now.getSeconds() / (60 * 60)) /
    24;
  const leftPercent = 100 * dayFraction;

  const startOfDay = new Date(date);
  startOfDay.setHours(0);
  startOfDay.setMinutes(0);
  startOfDay.setSeconds(0);
  startOfDay.setMilliseconds(0);

  const endOfDay = new Date(date);
  endOfDay.setDate(startOfDay.getDate() + 1);

  const isToday = now >= startOfDay && now < endOfDay;

  return (
    <div className={"DayGrid"}>
      {isToday ? (
        <div>
          <div
            style={{
              position: "relative",
              left: `${leftPercent}%`,
              width: "20px"
            }}
          >
            <FontAwesomeIcon
              style={{ position: "relative", left: "-5px", width: "10px" }}
              icon={faSortDown}
              size={"1x"}
            />
          </div>
        </div>
      ) : null}
      <div className={"DayGridHours"}>
        {Array.from(Array(24).keys()).map(hour => {
          if (hour >= 8 && hour < 16) {
            return (
              <div
                key={hour}
                data-hour={hour}
                className={"DayGridHour DayGridHourWorkday"}
              />
            );
          }

          return <div key={hour} data-hour={hour} className={"DayGridHour"} />;
        })}
      </div>
    </div>
  );
};

export default DayGrid;
