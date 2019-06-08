import React, { useEffect, useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { getCategories } from "./workTimerService";

const DayGrid: React.FC = () => {
  const now = new Date();
  const dayFraction =
    (now.getHours() + now.getMinutes() / 60 + now.getSeconds() / (60 * 60)) /
    24;
  const leftPercent = 100 * dayFraction;

  return (
    <div className={"DayGrid"}>
      <div>
        <div style={{ position: "relative", left: `${leftPercent}%` }}>
          <FontAwesomeIcon
            style={{ position: "relative", left: "-5px", width: "10px" }}
            icon={faSortDown}
            size={"1x"}
          />
        </div>
      </div>
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

const Week: React.FC<{ weekNumber: number }> = ({ weekNumber }) => (
  <div className={"Week"}>
    <div className={"WeekHeader"}>
      <h1>Week {weekNumber}</h1>
    </div>
    <div className={"WeekDays"}>
      <div className={"WeekDay"}>
        <h2>Monday</h2>
        <DayGrid />
      </div>
      <div className={"WeekDay"}>
        <h2>Tuesday</h2>
        <DayGrid />
      </div>
      <div className={"WeekDay"}>
        <h2>Wednesday</h2>
        <DayGrid />
      </div>
      <div className={"WeekDay"}>
        <h2>Thursday</h2>
        <DayGrid />
      </div>
      <div className={"WeekDay"}>
        <h2>Friday</h2>
        <DayGrid />
      </div>
    </div>
  </div>
);

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
      <Week weekNumber={23} />
    </div>
  );
};

export default App;
