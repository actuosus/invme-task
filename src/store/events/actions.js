/**
 * @flow
 */

import {
  ADD_EVENT,
  UPDATE_EVENT,
  REMOVE_EVENT,
  REMOVE_ALL_EVENTS,
  REMOVE_ALL_EVENTS_BY_MONTH
} from "./types";
import uuid from "uuid/v4";
import { type EventId } from "../../types/Event";

export const addEvent = (title: string, date: string, note: string) => {
  const id = uuid();

  return {
    type: ADD_EVENT,
    payload: { id, title, date, note }
  };
};

export const updateEvent = (
  id: EventId,
  title: string,
  date: string,
  note: string
) => {
  return {
    type: UPDATE_EVENT,
    payload: { id, title, date, note }
  };
};

export const removeEvent = (id: EventId) => {
  return {
    type: REMOVE_EVENT,
    payload: { id }
  };
};

export const removeAllEventsByMonth = (isoDateString: string) => {
  return {
    type: REMOVE_ALL_EVENTS_BY_MONTH,
    payload: { date: isoDateString }
  };
};

export const removeAllEvents = () => {
  return {
    type: REMOVE_ALL_EVENTS
  };
};
