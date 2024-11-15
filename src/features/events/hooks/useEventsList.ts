import { eventsApi } from "@/src/features/events/eventsApi";
import { useEventAction } from "@/src/features/events/hooks/useEventAction";
import useEventsStore from "@/src/store/useEventsStore";
import useLoadingStore from "@/src/store/useLoadingStore";
import { EventioEvent } from "@/src/types/EventioEvent";
import { filterEvents } from "@/src/utils/functions/filterEvents";
import { getAlertMessage } from "@/src/utils/functions/getAlertMessage";
import { orderEventsByDate } from "@/src/utils/functions/orderEventsByDate";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export const useEventsList = () => { 
    const { events, isLoading: isFetchingEvents, error: eventsFetchError, refetch } = eventsApi.useGetAllEventsQuery();    
    const { eventAction, actionInProgress, actionError: eventActionError } = useEventAction();
    const setEventsScreenLoading = useLoadingStore.getState().setEventsScreenLoading;
    const [filteredEvents, setFilteredEvents] = useState<EventioEvent[]>([]);
    const eventsFilter = useEventsStore(state => state.eventsFilter);
    const eventsLayout = useEventsStore(state => state.eventsLayout);
    const compoundError = eventsFetchError || eventActionError || null;

    const onCellPressed = (event: EventioEvent) => {
      router.push(`/events/${event.id}`);
    }; 

    useEffect(() => {
       if (events) {
        const sortedEvents = orderEventsByDate(events);
        setFilteredEvents(filterEvents(eventsFilter, sortedEvents));
       }
    }, [events, eventsFilter]);

    useEffect(() => {
      if (compoundError) {
        Alert.alert('Error', getAlertMessage(compoundError));
      }
    }, [compoundError]);

    useEffect(() => {
      setEventsScreenLoading(actionInProgress || isFetchingEvents);
    }, [isFetchingEvents, actionInProgress]);
    
    return { eventsLayout, filteredEvents, refetch, eventAction, isFetchingEvents, onCellPressed };
};