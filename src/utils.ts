import { useEffect, useRef } from "react";

export const getWeekNumber = (d: Date) => {
  // Copy date so don't modify original
  const newD = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  newD.setUTCDate(newD.getUTCDate() + 4 - (newD.getUTCDay() || 7));
  // Get first day of year
  const yearStart = new Date(Date.UTC(newD.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  const weekNo = Math.ceil(
    ((newD.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
  );
  // Return array of year and week number
  return weekNo;
};

export const getMonday = (d: Date) => {
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(d.setDate(diff));

  monday.setHours(0);
  monday.setMinutes(0);
  monday.setSeconds(0);
  monday.setMilliseconds(0);

  return monday;
};

export const DAY_NAMES: { [id: number]: string } = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  0: "Sunday"
};

export const MONTH_SHORT_NAMES: string[] = [
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

/**
 * 2019-06-17 Stolen from:
 * https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */
export const useInterval = (callback: () => any, delay: number) => {
  const savedCallback = useRef<() => any>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
