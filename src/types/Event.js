/**
 * @flow
 */

export type EventId = string

export type Event = {
    id: EventId,
    
    /**
     * Event title
     */
    title: string,

    /**
     * ISO string
     */
    date: string,

    /**
     * Event note
     */
    note: string,
}
