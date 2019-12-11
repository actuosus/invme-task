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
  removeAllEvents,
  removeAllEventsByMonth
} from "../../store/events/actions";
import EventDetailsForm from "../../components/EventDetailsForm/EventDetailsForm";
import { type Event } from "../../types/Event";
import { type ReduxState } from "../../types/ReduxState";
import ReactDOM from "react-dom";
import { useRouter } from "next/router";

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
      paper: "#282A2B"
    },
    divider: "rgba(255, 255, 255, 0.12)"
  }
};

type AppContainerProps = {
  events: Event[],
  addEvent: typeof addEvent,
  updateEvent: typeof updateEvent,
  removeEvent: typeof removeEvent,
  removeAllEventsByMonth: typeof removeAllEventsByMonth,
  removeAllEvents: typeof removeAllEvents
};

const AppContainer = ({
  addEvent,
  updateEvent,
  removeEvent,
  removeAllEvents,
  removeAllEventsByMonth,
  ...props
}: AppContainerProps) => {
  let theme = lightTheme;
  if (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    theme = darkTheme;

    if (document.body.style) {
      document.body.style.color = theme.palette.text.main;
      document.body.style.backgroundColor = theme.palette.background.default;
    }
  }

  const [showEventDetailsForm, setShowEventDetailsForm] = React.useState(false);
  const [
    shouldMountEventDetailsForm,
    setShouldMountEventDetailsForm
  ] = React.useState(false);
  const container = React.useRef();
  const eventDetailsForm = React.useRef();
  const [lastFormTarget, setLastFormTarget] = React.useState();
  const router = useRouter();

  React.useEffect(() => {
    if (container.current && eventDetailsForm.current) {
      const containerDOMNode = ReactDOM.findDOMNode(container.current);
      const formDomNode = ReactDOM.findDOMNode(eventDetailsForm.current);

      if (containerDOMNode && formDomNode && lastFormTarget) {
        const containerBoundingRect = containerDOMNode.getBoundingClientRect();
        const targetBoundingRect = lastFormTarget.getBoundingClientRect();
        const formBoundingRect = formDomNode.getBoundingClientRect();
        if (
          containerBoundingRect.width <=
          targetBoundingRect.left +
            targetBoundingRect.width +
            Math.max(formBoundingRect.width, 150)
        ) {
          setEventDetailsFormPosition({
            position: "left",
            x:
              targetBoundingRect.left -
              Math.max(formBoundingRect.width, 150) +
              14,
            y: targetBoundingRect.top
          });
        }
      }
    }
  }, [showEventDetailsForm, lastFormTarget]);

  const [
    eventDetailsFormPosition,
    setEventDetailsFormPosition
  ] = React.useState({ position: "left", x: -10000, y: -10000 });

  const [selectedEvent, setSelectedEvent] = React.useState<
    Event | typeof undefined
  >();

  const handleCellPress = (event: SyntheticEvent<any>, date) => {
    const { payload } = addEvent("New Event", date, "");

    event.stopPropagation();

    const boundingRect = event.currentTarget.getBoundingClientRect();

    setLastFormTarget(event.currentTarget);
    setSelectedEvent({ id: payload.id, date: payload.date });
    setEventDetailsFormPosition({
      position: "right",
      x: boundingRect.x + boundingRect.width - 14,
      y: boundingRect.y
    });
    setShouldMountEventDetailsForm(true);
    setShowEventDetailsForm(true);
  };

  const handleEventPress = (
    event: SyntheticEvent<any>,
    calendarEvent: Event
  ) => {
    const boundingRect = event.currentTarget.getBoundingClientRect();

    event.stopPropagation();

    setLastFormTarget(event.currentTarget);
    setSelectedEvent(calendarEvent);
    setEventDetailsFormPosition({
      position: "right",
      x: boundingRect.x + boundingRect.width - 14,
      y: boundingRect.y - 16 + 2
    });
    setShouldMountEventDetailsForm(true);
    setShowEventDetailsForm(true);
  };

  const handleEventUpdate = (
    event: SyntheticEvent<any>,
    calendarEvent: Event
  ) => {
    updateEvent(
      calendarEvent.id,
      calendarEvent.title,
      calendarEvent.date,
      calendarEvent.note
    );
  };

  const handleEventRemovePress = (
    event: SyntheticEvent<any>,
    calendarEvent: Event
  ) => {
    removeEvent(calendarEvent.id);
    setShowEventDetailsForm(false);
  };

  const handleRemoveAllByMonthPress = (isoDateString: string) => {
    removeAllEventsByMonth(isoDateString);
    setShowEventDetailsForm(false);
  };

  const handleContainerPress = (event: SyntheticEvent<any>) => {
    setShowEventDetailsForm(false);
  };

  const handleFormPoseComplete = () => {
    setShouldMountEventDetailsForm(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppContainerView
        theme={theme}
        onPress={handleContainerPress}
        ref={container}
        {...props}
      >
        <CalendarMonth
          onCellPress={handleCellPress}
          onEventPress={handleEventPress}
          onRemoveAllPress={handleRemoveAllByMonthPress}
          events={props.events}
          year={router && router.query && parseInt(router.query.year)}
          month={router && router.query && parseInt(router.query.month)}
        />

        {shouldMountEventDetailsForm ? (
          <EventDetailsForm
            position={eventDetailsFormPosition}
            event={selectedEvent}
            onChange={handleEventUpdate}
            onRemovePress={handleEventRemovePress}
            ref={eventDetailsForm}
            opened={showEventDetailsForm}
            onPoseComplete={handleFormPoseComplete}
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
    removeAllEvents,
    removeAllEventsByMonth
  }
)(AppContainer);

export default AppContainerConnected;
