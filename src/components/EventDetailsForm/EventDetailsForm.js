/**
 * @flow
 */

import * as React from "react";
import View from "../View";
import styled, { withTheme } from "styled-components";
import TextInput from "../TextInput";
import FormRow from "../FormRow";
import Button from "../Button";
import PointingRhombusIcon from "../icons/PointingRhombus";
import { type Event } from "../../types/Event";
import posed from "react-pose";
import Form from "../Form";
import { type Theme } from "../../types/Theme";

const EventDetailsFormContainerView = styled(
  posed(Form)({
    initial: {
      scale: 0
    },
    moved: {
      scale: 1,
      opacity: 1
    },
    hidden: {
      opacity: 0
    }
  })
)`
  max-width: 300px;
  transform-origin: left 16px;

  position: absolute;
  ${({ position }) => `
    left: ${position.x}px;
    top: ${position.y}px;

    ${
      position.position === "left"
        ? `transform-origin: right 16px;`
        : `transform-origin: left 16px;`
    }
  `}
`;

const Wrapper = styled(View)`
  border-radius: 10px;
  padding: 10px;
  // backdrop-filter: blur(24px);
  box-shadow: 0px 6px 11px rgba(22, 97, 161, 0.11);
  position: relative;
  z-index: 2;
  ${({ theme }) => `
        background-color: ${theme.palette.background.paper};
    `}
`

const FormSubmitRow = styled(FormRow)`
  display: flex;
  justify-content: flex-end;
`;

const PointingRhombus = styled(PointingRhombusIcon)`
  position: absolute;
  left: -6px;
  top: 16px;
  width: 12px;
  height: 9px;
  z-index: 1;

  ${({ position }) =>
    position.position === "left"
      ? `
      left: auto;
      right: -6px;
      `
      : `
      left: -6px;
      right: auto;  
      `}
`;

const formatDateValue = (date: Date) =>
  `${date.getFullYear().toString()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date
    .getDate()
    .toString()
    .padStart(2, "0")}`;

type EventDetailsFormProps = {
  theme: Theme,
  event?: Event,
  position: {
    position: "left" | "right",
    x: number,
    y: number
  },
  onChange: (event: SyntheticEvent<any>, calendarEvent: Event) => void,
  onRemovePress: (event: SyntheticEvent<any>, event: Event) => void,
  opened: boolean,
  onPoseComplete: () => void,
};

const EventDetailsForm = React.forwardRef<
  EventDetailsFormProps,
  EventDetailsFormContainerView
>((props, ref) => {
  const { event, opened, theme } = props;

  const [title, setTitle] = React.useState(event && event.title);
  const [date, setDate] = React.useState(event && event.date);
  const [note, setNote] = React.useState(event && event.note);
  const [pose, setPose] = React.useState("moved");

  React.useEffect(() => {
    setTitle(event && event.title)
    setDate(event && event.date)
    setNote(event && event.note)
    if (!opened) {
      setPose("hidden");
    } else {
      setPose("moved");
    }
  }, [opened, event]);

  const handleTitleChange = (event: SyntheticEvent<any>) => {
    const { value } = event.target;
    setTitle(value);
    if (props.event) {
      handleChange(event, { ...props.event, title: value });
    }
  };
  const handleDateChange = (event: SyntheticEvent<any>) => {
    const { value } = event.target;
    setDate(value);
    if (props.event && value) {
      const date = new Date(value).toISOString();
      handleChange(event, { ...props.event, date });
    }
  };
  const handleNotesChange = (event: SyntheticEvent<any>) => {
    const { value } = event.target;
    setNote(value);
    if (props.event) {
      handleChange(event, { ...props.event, note: value });
    }
  };
  const handleChange = (event: SyntheticEvent<any>, calendarEvent: Event) => {
    props.onChange && props.onChange(event, calendarEvent);
  };

  const handleRemovePress = (event: SyntheticEvent<any>) => {
    props.event &&
      props.onRemovePress &&
      props.onRemovePress(event, props.event);
  };

  const handleContainerPress = (event: SyntheticEvent<any>) => {
    event.stopPropagation();
  };

  return (
    <EventDetailsFormContainerView
      position={props.position}
      onPress={handleContainerPress}
      onPoseComplete={() => pose === "hidden" && props.onPoseComplete() }
      initialPose={"initial"}
      pose={pose}
      event={event}
      ref={ref}
    >
      <Wrapper>
        <FormRow>
          <TextInput
            placeholder={"New Event"}
            autoFocus
            onChange={handleTitleChange}
            value={title}
          />
        </FormRow>
        <FormRow>
          <TextInput
            type={"date"}
            onChange={handleDateChange}
            value={formatDateValue(new Date(date))}
          />
        </FormRow>
        <FormRow>
          <TextInput
            placeholder={"Add Notes"}
            multiline
            onChange={handleNotesChange}
            value={note}
          />
        </FormRow>
        {event ? (
          <FormSubmitRow>
            <Button
              color={"secondary"}
              size={"small"}
              theme={theme}
              onPress={handleRemovePress}
            >
              remove
            </Button>
          </FormSubmitRow>
        ) : null}
      </Wrapper>
      <PointingRhombus
        position={props.position}
        color={theme.palette.background.paper}
      />
    </EventDetailsFormContainerView>
  );
});

export default withTheme(EventDetailsForm);
