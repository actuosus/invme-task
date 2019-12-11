/**
 * @flow
 */

import * as React from "react";
import View from "../View";
import styled from "styled-components";
import TextInput from "../TextInput";
import FormRow from "../FormRow";
import Button from "../Button";
import PointingArrowLeft from "../icons/PointingArrowLeft";
import { type Event } from "../../types/Event";

const EventDetailsFormContainerView = styled(View)`
  max-width: 300px;
  box-shadow: 0px 6px 11px rgba(22, 97, 161, 0.11);
  border-radius: 10px;
  padding: 10px;
  backdrop-filter: blur(24px);

  ${({ theme }) => `
        background-color: ${theme.palette.background.paper};
    `}

  position: absolute;
  ${({ position }) => `
    left: ${position.x}px;
    top: ${position.y}px;
  `}
`;

const FormSubmitRow = styled(FormRow)`
  display: flex;
  justify-content: flex-end;
`;

const PointingArrow = styled(PointingArrowLeft)`
  position: absolute;
  left: -6px;
  top: 16px;
  width: 3.465px;
  height: 6.93px;
`;

type EventDetailsFormProps = {
  event?: Event,
  position: {
    x: number,
    y: number
  },
  onChange: (event: SyntheticEvent<any>, calendarEvent: Event) => void,
  onRemovePress: (event: SyntheticEvent<any>, event: Event) => void,
};

const EventDetailsForm = (props: EventDetailsFormProps) => {
  const handleTitleChange = (event: SyntheticEvent<any>) => {
    if (props.event) {
      handleChange(event, {...props.event, title: event.target.value})
    }
  };
  const handleDateChange = (event: SyntheticEvent<any>) => {
    if (props.event) {
      handleChange(event, {...props.event, date: event.target.value})
    }
  };
  const handleNotesChange = (event: SyntheticEvent<any>) => {
    if (props.event) {
      handleChange(event, {...props.event, note: event.target.value})
    }
  };
  const handleChange = (event: SyntheticEvent<any>, calendarEvent: Event) => {
    props.onChange && props.onChange(event, calendarEvent)
  }

  const handleRemovePress = (event: SyntheticEvent<any>) => {
    props.event && props.onRemovePress && props.onRemovePress(event, props.event);
  };

  const { event } = props;

  return (
    <EventDetailsFormContainerView position={props.position}>
      <FormRow>
        <TextInput
          placeholder={"New Event"}
          autoFocus
          onChange={handleTitleChange}
          value={event ? event.title : ""}
        />
      </FormRow>
      <FormRow>
        <TextInput
          type={"date"}
          onChange={handleDateChange}
          value={event ? event.title : ""}
        />
      </FormRow>
      <FormRow>
        <TextInput
          placeholder={"Add Notes"}
          multiline
          onChange={handleNotesChange}
          value={event ? event.note : ""}
        />
      </FormRow>
      {event ? (
        <FormSubmitRow>
          <Button
            color={"secondary"}
            size={"small"}
            onPress={handleRemovePress}
          >
            remove
          </Button>
        </FormSubmitRow>
      ) : null}
      <PointingArrow />
    </EventDetailsFormContainerView>
  );
};

export default EventDetailsForm;
