/**
 * @flow
 */

import * as React from "react";
import View from "../View";
import Heading from "../Heading";
import CalendarWeekHead from "../CalendarWeekHead";
import CalendarCell from "../CalendarCell";
import styled from "styled-components";
import CalendarFooter from "../CalendarFooter";
import { type Event } from "../../types/Event";
import { isSameDay } from "../../lib/calendar";

const CalendarCellsView = styled(View)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 85px;
`;

const toDateString = date =>
  `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date
    .getDate()
    .toString()
    .padStart(2, "0")}`;

const eventsByDate = (events?: Event[]) => {
  const byDate = {};

  if (events) {
    events.forEach(_ => {
      const date = new Date(_.date);
      const dateString = toDateString(date);
      if (byDate[dateString]) {
        byDate[dateString].push(_);
      } else {
        byDate[dateString] = [_];
      }
    });
  }

  return byDate;
};

const eventsByMonth = (events?: Event[]) => {
  const byMonth = {};

  if (events) {
    events.forEach(_ => {
      const date = new Date(_.date);
      const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;
      if (byMonth[dateString]) {
        byMonth[dateString].push(_);
      } else {
        byMonth[dateString] = [_];
      }
    });
  }

  return byMonth;
};

const utcDate = (year, month, date) =>
  new Date(Date.UTC(year, month - 1, date));
const isoDateString = (year, month, date) =>
  utcDate(year, month, date).toISOString();

type CalendarMonthProps = {
  events?: Event[],
  year?: number,
  month?: number,
  onCellPress: (event: SyntheticEvent<any>, date: string) => void,
  onEventPress: (event: SyntheticEvent<any>, calendarEvent: Event) => void,
  onRemoveAllPress: (isoDateString: string) => void
};

const CalendarMonth = (props: CalendarMonthProps) => {
  const [year, setYear] = React.useState(props.year || 2020);
  const [month, setMonth] = React.useState(props.month || 1);

  const today = new Date();

  const handlePrevMonthPress = () => {
    let newMonth = month - 1;
    if (newMonth <= 0) {
      newMonth = 12;

      setYear(year - 1);
    }
    setMonth(newMonth);
  };

  const handleNextMonthPress = () => {
    let newMonth = month + 1;
    if (newMonth > 12) {
      newMonth = 1;

      setYear(year + 1);
    }
    setMonth(newMonth);
  };

  const handleTodayPress = () => {
    setMonth(today.getMonth() + 1);
    setYear(today.getFullYear());
  };

  const handleCellPress = (date: string) => (event: SyntheticEvent<any>) => {
    props.onCellPress(event, date);
  };

  const handleEventPress = (
    event: SyntheticEvent<any>,
    calendarEvent: Event
  ) => {
    props.onEventPress(event, calendarEvent);
  };

  const handleRemoveAllPress = () => {
    props.onRemoveAllPress(isoDateString(year, month, 1));
  };

  const startOfTheMonth = new Date(year, month - 1, 1);
  const endOfTheMonth = new Date(year, month, 0);

  const startWeekDay = startOfTheMonth.getDay();
  const endWeekDay = endOfTheMonth.getDay();
  const daysInMonth = endOfTheMonth.getDate();
  const startPadCells = Array(startWeekDay === 0 ? 6 : startWeekDay - 1).fill(
    null
  );
  const endPadCells = Array(7 - endWeekDay).fill(null);
  const cells = Array(daysInMonth).fill(null);

  const byDate = eventsByDate(props.events);
  const byMonth = eventsByMonth(props.events);

  return (
    <View>
      <Heading
        date={endOfTheMonth}
        onPrevPress={handlePrevMonthPress}
        onNextPress={handleNextMonthPress}
        onTodayPress={handleTodayPress}
      />
      <CalendarWeekHead />
      <CalendarCellsView>
        {startPadCells.map((_, i) => (
          <CalendarCell key={`start-pad-${i}`} day={i + 1} pad />
        ))}
        {cells.map((_, i) => {
          const date = utcDate(year, month, i + 1);
          const dateString = toDateString(date);
          const _today = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
          );

          return (
            <CalendarCell
              key={i}
              day={i + 1}
              onPress={handleCellPress(dateString)}
              onEventPress={handleEventPress}
              events={byDate[dateString]}
              today={isSameDay(_today, date)}
            />
          );
        })}
        {endPadCells.map((_, i) => (
          <CalendarCell key={`end-pad-${i}`} day={i + 1} pad />
        ))}
      </CalendarCellsView>

      <CalendarFooter
        events={byMonth[`${year}-${month.toString().padStart(2, "0")}`]}
        onRemoveAllPress={handleRemoveAllPress}
        date={startOfTheMonth}
      />
    </View>
  );
};

CalendarMonth.defaultProps = {
  year: 2020,
  month: 1
};

export default CalendarMonth;
