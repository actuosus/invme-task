/**
 * @flow
 */

import React from "react";
import View from "../View";
import Text from "../Text";
import Button from "../Button";
import styled from "styled-components";
import { monthNames } from "../../lib/calendar";

const CalendarFooterView = styled(View)`
  display: flex;
  flex-direction: row;
  padding: 17px 0;
`;

const CalendarFooterWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const EventCountText = styled(Text)`
  font-size: 12px;

  ${({ theme }) => `
        color: #B0AFAF;
    `}
`;

const TextDelimiter = styled(Text)`
  font-size: 12px;
  padding: 0 0.35em;

  ${({ theme }) => `
        color: #B0AFAF;
    `}
`;

const RemoveAllLabel = styled(Text)`
  font-size: 12px;
`;

const MonthLabel = styled(Text)`
  font-size: 12px;
  padding-left: 0.35em;
  ${({ theme }) => `
        color: #B0AFAF;
    `}
`;

type CalendarFooterProps = {
  events: Event[],
  date: Date,
  onRemoveAllPress: () => void
};

const monthName = (date: Date) => `${monthNames[date.getMonth()]}`;

const CalendarFooter = (props: CalendarFooterProps) => {
  return (
    <CalendarFooterView>
      {props.events && props.events.length ? (
        <CalendarFooterWrapper>
          <EventCountText>{props.events.length} events</EventCountText>
          <MonthLabel>in {monthName(props.date)}</MonthLabel>
          <TextDelimiter>–</TextDelimiter>
          <Button onPress={props.onRemoveAllPress}>
            <RemoveAllLabel>Remove All</RemoveAllLabel>
          </Button>
        </CalendarFooterWrapper>
      ) : null}
    </CalendarFooterView>
  );
};

export default CalendarFooter;
