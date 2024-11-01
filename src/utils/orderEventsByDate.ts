import { EventioEvent } from "@/src/types/EventioEvent";

export const orderEventsByDate = (events: EventioEvent[]) => {
    return events.sort((a, b) => {
        const dateA = new Date(a.startsAt);
        const dateB = new Date(b.startsAt);
        return dateA.getTime() - dateB.getTime();
    });
}