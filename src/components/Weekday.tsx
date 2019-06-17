import DayGrid from "./DayGrid";
import React, { useEffect, useState } from "react";
import { DAY_NAMES, MONTH_SHORT_NAMES, useInterval } from "../utils";
import { getEvents } from "../workTimerService";

const Weekday: React.FC<{ date: Date }> = ({ date }) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0);
  startOfDay.setMinutes(0);
  startOfDay.setSeconds(0);
  startOfDay.setMilliseconds(0);

  const endOfDay = new Date(date);
  endOfDay.setDate(startOfDay.getDate() + 1);

  const dayName = DAY_NAMES[date.getDay()];
  const monthName = MONTH_SHORT_NAMES[date.getMonth()];

  const initialEvents: TimerEvent[] = [];
  const [events, setEvents] = useState(initialEvents);

  const now = new Date();
  const isToday = now >= startOfDay && now < endOfDay;

  const refreshEvents = () => {
    getEvents(startOfDay, endOfDay)
      .then(events => {
        setEvents(events.events);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    refreshEvents();
  }, []);

  useInterval(() => {
    // Pretty, yes
    if (isToday) {
      setEvents([...events]);
    }
  }, 1000);

  useInterval(() => {
    // Pretty, yes
    if (isToday) {
      refreshEvents();
    }
  }, 5000);

  return (
    <div key={date.getTime()} className={"WeekDay"}>
      <h2>
        {dayName} ({date.getDate()} {monthName})
      </h2>
      <DayGrid
        date={date}
        startOfDay={startOfDay}
        endOfDay={endOfDay}
        events={events}
      />
    </div>
  );
};

export default Weekday;
