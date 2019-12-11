/**
 * @flow
 */

import {
  type EventActionTypes,
  type EventsState,
  ADD_EVENT,
  REMOVE_EVENT,
  UPDATE_EVENT,
  REMOVE_ALL_EVENTS,
  REMOVE_ALL_EVENTS_BY_MONTH
} from "./types";

const initialState = {
  items: []
};

export default function eventsReducer(
  state: EventsState = initialState,
  action: EventActionTypes
) {
  switch (action.type) {
    case ADD_EVENT:
      return { ...state, items: state.items.concat(action.payload) };
    case REMOVE_EVENT:
      return {
        ...state,
        items: state.items.filter(_ => {
          if (
            _.id === action.payload.id
          ) {
            return false;
          }

          return true;
        })
      };
    case REMOVE_ALL_EVENTS_BY_MONTH:
      return {
        ...state,
        items: state.items.filter(_ => {
          const date = new Date(_);
          const actionDate = new Date(action.payload.date);

          if (
            date.getFullYear() === actionDate.getFullYear() &&
            date.getMonth() === actionDate.getMonth()
          ) {
            return false;
          }

          return true;
        })
      };
    case REMOVE_ALL_EVENTS:
      return { ...state, items: [] };
    case UPDATE_EVENT:
      const items = state.items.map(_ => {
        if (_.id === action.payload.id) {
          return action.payload;
        }
        return _;
      });
      return { ...state, items };
    default:
      return state;
  }
}
