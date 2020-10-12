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
import {
  type AddEventAction,
  type UpdateEventAction,
  type RemoveEventAction,
  type RemoveAllEventsByMonthAction,
  type RemoveAllEventsAction
} from "./types";

export const addEvent = (
  title: string,
  date: string,
  note: string
): AddEventAction => {
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
): UpdateEventAction => {
  return {
    type: UPDATE_EVENT,
    payload: { id, title, date, note }
  };
};

export const removeEvent = (id: EventId): RemoveEventAction => {
  return {
    type: REMOVE_EVENT,
    payload: { id }
  };
};

export const removeAllEventsByMonth = (
  isoDateString: string
): RemoveAllEventsByMonthAction => {
  return {
    type: REMOVE_ALL_EVENTS_BY_MONTH,
    payload: { date: isoDateString }
  };
};

export const removeAllEvents = (): RemoveAllEventsAction => {
  return {
    type: REMOVE_ALL_EVENTS
  };
};
