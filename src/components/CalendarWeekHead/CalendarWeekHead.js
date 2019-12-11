/**
 * @flow
 */

import React from "react";
import View from "../View";
import Text from "../Text";
import styled from "styled-components";

const WeekDays = styled(View)`
  display: flex;
  flex-direction: row;

  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const WeekDayTitle = styled(Text)`
  display: block;
  min-width: 87px;
  text-align: right;
  font-size: 11px;
  padding: 6px 0;

  ${({ theme }) => `
        color: ${theme.palette.text.main};
        ${
          theme.type === "dart"
            ? `
            font-weight: 300;
        `
            : ""
        }
    `}
`;

const weekNamesShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const CalendarWeekHead = () => {
  return (
    <WeekDays>
      {Array(7)
        .fill(null)
        .map((_, i) => (
          <WeekDayTitle key={`weekday-${i}`}>{weekNamesShort[i]}</WeekDayTitle>
        ))}
    </WeekDays>
  );
};

export default CalendarWeekHead;
