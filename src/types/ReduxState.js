/**
 * @flow
 */

import { type Event } from "./Event";

export type ReduxState = {
  events: {
    items: Event[]
  }
};
