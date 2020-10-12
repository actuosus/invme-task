/**
 * @flow
 */

import { type Event, type EventId } from "../../types/Event";

export type EventsState = {
  items: Event[];
}

export const ADD_EVENT = `events/ADD_EVENT`;
export const REMOVE_EVENT = `events/REMOVE_EVENT`;
export const REMOVE_ALL_EVENTS_BY_MONTH = `events/REMOVE_ALL_EVENTS_BY_MONTH`;
export const REMOVE_ALL_EVENTS = `events/REMOVE_ALL_EVENTS`;
export const UPDATE_EVENT = `events/UPDATE_EVENT`;

export type AddEventAction = {
  type: typeof ADD_EVENT,
  payload: Event
};

export type RemoveEventAction = {
  type: typeof REMOVE_EVENT,
  payload: { id: EventId }
};

export type RemoveAllEventsByMonthAction = {
  type: typeof REMOVE_ALL_EVENTS
};

export type RemoveAllEventsAction = {
  type: typeof REMOVE_ALL_EVENTS
};

export type UpdateEventAction = {
  type: typeof UPDATE_EVENT,
  payload: Event
};

export type EventActionTypes =
  | AddEventAction
  | RemoveEventAction
  | RemoveAllEventsByMonthAction
  | RemoveAllEventsAction
  | UpdateEventAction;
