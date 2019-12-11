/**
 * @flow
 */

import * as React from "react";
import styled from "styled-components";
import View from "../View";
import Text from "../Text";
import EventList from "../EventList/EventList";

const CalendarCellView = styled(View)`
  min-width: 85px;
  min-height: 85px;
  height: 10vh;
  opacity: ${props => (props.pad ? 0.4 : 1)};
  // border: 1px solid #f2f2f2;
  box-shadow: 0 0 1px #f2f2f2;
  overflow: hidden;

  ${({ theme }) => `
      box-shadow: 0 0 1px ${theme.palette.divider};
    `}
`;

const CalendarDayView = styled(View)`
  text-align: right;
  padding: 2px;
  font-size: 11px;
  color: #6f6e6e;
  user-select: none;
`;

const CalendarDayViewLabel = styled(Text)`
  padding: 4px;
  border-radius: 100%;

  ${({ theme, today }) => `
    ${today ? `background-color: ${theme.palette.primary.main}` : ""};
  `}
`;

type CellProps = {
  day: number,
  events?: Event[],
  pad?: boolean,
  today?: boolean,
  onPress?: (event: SyntheticEvent<typeof CalendarCellView>) => void,
  onEventPress?: (event: SyntheticEvent<any>, item: Event) => void
};

const CalendarCell = (props: CellProps) => {
  const handleEventItemPress = (event: SyntheticEvent<any>, item: Event) => {
    props.onEventPress && props.onEventPress(event, item)
  }

  return (
    <CalendarCellView
      className={"cell"}
      onPress={props.onPress}
      pad={props.pad}
    >
      <CalendarDayView today={props.today}>
        <CalendarDayViewLabel>{props.day}</CalendarDayViewLabel>
      </CalendarDayView>
      <EventList items={props.events} onItemPress={handleEventItemPress} />
    </CalendarCellView>
  );
};

export default CalendarCell;
