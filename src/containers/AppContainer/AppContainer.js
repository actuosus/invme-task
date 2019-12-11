/**
 * @flow
 */

import * as React from "react";
import View from "../../components/View";
import styled, { ThemeProvider } from "styled-components";
import CalendarMonth from "../../components/CalendarMonth";
import { connect } from "react-redux";
import {
  addEvent,
  updateEvent,
  removeEvent,
  removeAllEvents
} from "../../store/events/actions";
import EventDetailsForm from "../../components/EventDetailsForm/EventDetailsForm";
import { type Event } from "../../types/Event";
import { type ReduxState } from "../../types/ReduxState";

const AppContainerView = styled(View)`
  padding: 48px;

  ${({ theme }) => `
    color: ${theme.palette.text.main};
    background-color: ${theme.palette.background.default};
  `}
`;

const lightTheme = {
  palette: {
    primary: {
      main: "#2591ED"
    },
    secondary: {
      main: "#FF727A"
    },
    text: {
      main: "#000000"
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF"
    },
    divider: "rgba(0, 0, 0, 0.12)"
  }
};

const darkTheme = {
  palette: {
    primary: {
      main: "#2591ED"
    },
    secondary: {
      main: "#FF727A"
    },
    text: {
      main: "#FFFFFF"
    },
    background: {
      default: "#1B1B1B",
      paper: "rgba(127,127,127,0.1)"
    },
    divider: "rgba(255, 255, 255, 0.12)"
  }
};

type AppContainerProps = {
  events: Event[],
  addEvent: typeof addEvent,
  updateEvent: typeof updateEvent,
  removeEvent: typeof removeEvent,
  removeAllEvents: typeof removeAllEvents
};

const AppContainer = ({
  addEvent,
  updateEvent,
  removeEvent,
  removeAllEvents,
  ...props
}: AppContainerProps) => {
  let theme = lightTheme;
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    theme = darkTheme;

    if (document.body.style) {
      document.body.style.backgroundColor = theme.palette.background.default;
    }
  }

  const [showEventDetailsForm, setShowEventDetailsForm] = React.useState(false);

  // @todo Handle out of window border positioning.
  const [
    eventDetailsFormPosition,
    setEventDetailsFormPosition
  ] = React.useState({ x: 0, y: 0 });
  const [selectedEvent, setSelectedEvent] = React.useState<Event>();

  const handleCellPress = (event: SyntheticEvent<any>, date) => {
    addEvent("New Event", date, "Some thing");

    const boundingRect = event.target.getBoundingClientRect();

    setEventDetailsFormPosition({
      x: boundingRect.x + boundingRect.width - 14,
      y: boundingRect.y
    });
    setShowEventDetailsForm(true);
  };

  const handleEventPress = (
    event: SyntheticEvent<any>,
    calendarEvent: Event
  ) => {
    const boundingRect = event.target.getBoundingClientRect();

    setSelectedEvent(calendarEvent);
    setEventDetailsFormPosition({
      x: boundingRect.x + boundingRect.width - 14,
      y: boundingRect.y
    });
    setShowEventDetailsForm(true);
  };

  const handleEventUpdate = (event, calendarEvent: Event) => {
    updateEvent(
      calendarEvent.id,
      calendarEvent.title,
      calendarEvent.date,
      calendarEvent.note
    );
  };

  const handleEventRemovePress = (event, calendarEvent: Event) => {
    removeEvent(calendarEvent.id);
    setShowEventDetailsForm(false);
  };

  const handleRemoveAllPress = () => {
    removeAllEvents();
    setShowEventDetailsForm(false);
  };

  const handleContainerPress = () => {
    setShowEventDetailsForm(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <AppContainerView theme={theme} {...props} onPress={handleContainerPress}>
        <CalendarMonth
          onCellPress={handleCellPress}
          onEventPress={handleEventPress}
          onRemoveAllPress={handleRemoveAllPress}
          events={props.events}
        />

        {showEventDetailsForm ? (
          <EventDetailsForm
            position={eventDetailsFormPosition}
            event={selectedEvent}
            onChange={handleEventUpdate}
            onRemovePress={handleEventRemovePress}
          />
        ) : null}
      </AppContainerView>
    </ThemeProvider>
  );
};

const AppContainerConnected = connect(
  ({ events: { items } }: ReduxState) => ({
    events: items
  }),
  {
    addEvent,
    updateEvent,
    removeEvent,
    removeAllEvents
  }
)(AppContainer);

export default AppContainerConnected;
