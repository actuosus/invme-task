/**
 * @flow
 */

import { type Event, type EventId } from "../../types/Event";

export interface EventsState {
  items: Event[];
}

const prefix = "events";

export const ADD_EVENT = `${prefix}/ADD_EVENT`;
export const REMOVE_EVENT = `${prefix}/REMOVE_EVENT`;
export const REMOVE_ALL_EVENTS_BY_MONTH = `${prefix}/REMOVE_ALL_EVENTS_BY_MONTH`;
export const REMOVE_ALL_EVENTS = `${prefix}/REMOVE_ALL_EVENTS`;
export const UPDATE_EVENT = `${prefix}/UPDATE_EVENT`;

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
