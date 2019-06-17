import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";

const timestampToFractionOfDay = (timestamp: Date) => {
  return (
    (timestamp.getHours() +
      timestamp.getMinutes() / 60 +
      timestamp.getSeconds() / (60 * 60)) /
    24
  );
};

const DayGrid: React.FC<{
  date: Date;
  events: TimerEvent[];
  startOfDay: Date;
  endOfDay: Date;
}> = ({ date, startOfDay, endOfDay, events }) => {
  const now = new Date();
  const dayFraction = timestampToFractionOfDay(now);
  const leftPercent = 100 * dayFraction;

  const isToday = now >= startOfDay && now < endOfDay;
  const noUniqueCategories = events
    .map(event => event.category_id)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    }).length;
  const eventBarHeightPercent = 100 / noUniqueCategories;

  const categoryOffsets: { [id: string]: number } = {};

  events.forEach(event => {
    if (categoryOffsets[event.category_id] === undefined) {
      const categoryOffset =
        eventBarHeightPercent * Object.keys(categoryOffsets).length;

      categoryOffsets[event.category_id] = categoryOffset;
    }
  });

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

      <div className={"DayGridHours"} style={{ position: "relative" }}>
        {events.map(event => {
          const startTimestamp = new Date(event.start);
          const endTimestamp = event.end ? new Date(event.end) : now;
          const runtime = endTimestamp.getTime() - startTimestamp.getTime();
          const runtimeHours = runtime / (1000 * 60 * 60);
          const width = (runtimeHours / 24.0) * 100;

          const leftPercent = 100 * timestampToFractionOfDay(startTimestamp);

          return (
            <div
              key={startTimestamp.getTime()}
              className={"DayGridEvent"}
              style={{
                backgroundColor: "green",
                width: `${width}%`,
                height: `${eventBarHeightPercent}%`,
                position: "absolute",
                top: `${categoryOffsets[event.category_id]}%`,
                left: `${leftPercent}%`,
                zIndex: 1,
                opacity: 0.8,
                border: "1px solid black"
              }}
            />
          );
        })}

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
