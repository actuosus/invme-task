/**
 * @flow
 */

import { type EventId } from "./Event";

export type ReduxState = {
  events: Record<EventId, Event>
};
