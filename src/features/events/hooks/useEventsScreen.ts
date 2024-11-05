import { orderEventsByDate } from "@/src/utils/functions/orderEventsByDate";
import { eventsApi } from "@/src/features/events/eventsApi";
import useEventsStore from "@/src/store/useEventsStore";
import { EventioEvent } from "@/src/types/EventioEvent";
import filterEvents from "@/src/utils/filterEvents";
import useErrorAlert from "@/src/utils/useErrorAlert";
import { useEffect, useState } from "react";

// Servers as a custom hook for the EventsScreen component
export const useEventsScreen = () => {
    const [filteredEvents, setFilteredEvents] = useState<EventioEvent[]>([]);
    const { events, isLoading, isError, error } = eventsApi.useGetAllEventsQuery();
    const eventsFilter = useEventsStore(state => state.eventsFilter);

    useEffect(() => {
       if (events) {
        const sortedEvents = orderEventsByDate(events);
        setFilteredEvents(filterEvents(eventsFilter, sortedEvents ));
       }
    }, [events, eventsFilter]);

    useErrorAlert({ 
        isError,
        description: error?.message ?? 'Something went wrong'
     });

    return { filteredEvents, isLoading };
}