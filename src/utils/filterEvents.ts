import { TimeFilter } from "@/src/constants/TimeFilter";
import { EventioEvent } from "@/src/types/EventioEvent";

function filterEvents(filter: TimeFilter, events: EventioEvent[]): EventioEvent[] {
    const now = new Date();
    return events.filter((event) => {
        const eventDate = new Date(event.startsAt);
        if (filter === 'past') return eventDate < now;
        if (filter === 'future') return eventDate > now;
        return true; // 'all'
    });
}

export default filterEvents;