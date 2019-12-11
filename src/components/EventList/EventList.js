/**
 * @flow
 */

import * as React from "react";
import View from "../View";
import { type Event } from "../../types/Event";
import styled from "styled-components";

const EventItemTime = styled(View)`
  color: white;
  font-weight: bold;
  font-size: 8px;
`;

const EventItemTitle = styled(View)`
  color: white;
  font-size: 8px;
  padding: 0 0.45em;
`;

const EventItemView = styled(View)`
  display: flex;
  flex-direction: row;
  background-color: #2591ed;
  margin: 1px 0;
  padding: 2px 3px;
`;

type EventListProps = {
  items?: Event[],
  onItemPress?: (event: SyntheticEvent<any>, item: Event) => void,
};

const formatTime = (date: Date) =>
  `${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

const EventList = (props: EventListProps) => {
  const { items } = props;

  const handleItemPress = (item) => (event) => {
    event.stopPropagation()

    props.onItemPress && props.onItemPress(event, item)
  }

  return (
    <View>
      {items &&
        items.map((_, i) => (
          <EventItemView key={i} onPress={handleItemPress(_)}>
            <EventItemTime>
              {formatTime(new Date(_.date))}
            </EventItemTime>
            <EventItemTitle>{_.title}</EventItemTitle>
          </EventItemView>
        ))}
    </View>
  );
};

export default EventList;
