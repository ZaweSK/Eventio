import EventsFilter from "@/src/components/EventsFilter";
import useEventsStore from "@/src/store/useEventsStore";
import EventsList from "@/src/components/EventsList";
import Loading from "@/src/components/Loading";
import Page from "@/src/components/Page";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { EventioEvent } from "@/src/types/EventioEvent";
import api from "@/src/api/apiClient";
import useErrorAlert from "@/src/utils/useErrorAlert";
import filterEvents from "@/src/utils/filterEvents";
import { router } from "expo-router";
import getEventAction from "@/src/utils/getEventAction";

const fetchEvents = async (): Promise<EventioEvent[]> => {
    const { data } = await api.get<EventioEvent[]>('/events');
    return data;
  };

  export const useGetEventsQuery = () => {  
    const { data: events, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['events'],
        queryFn: fetchEvents, 
    });

    return { events, isLoading, isError, error, refetch };
}
    

  const useEventsPage = () => {
    const [filteredEvents, setFilteredEvents] = useState<EventioEvent[]>([]);
    const eventsFilter = useEventsStore(state => state.eventsFilter);

    const { data: events, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['events'],
        queryFn: fetchEvents, 
    });

    useEffect(() => {
       if (events) {
        setFilteredEvents(filterEvents(eventsFilter, events ));
       }
    }, [events, eventsFilter]);

    useErrorAlert({ 
        isError,
        description: error?.message ?? 'Something went wrong'
     });

     //  ========== METHODS =========
     const onRefresh = () => {
        refetch();
    }

    const onCellPressed = (event: EventioEvent) => {    
        router.push(`/(tabs)/events/${event.id}`);
    } 

    const onAction = async (event: EventioEvent) => {
        const eventAction = getEventAction(event);
        if (eventAction === null) return;
        console.log('Event action:', eventAction);
  
        switch (eventAction) {
          case 'edit':
            router.push(`/(tabs)/events/${event.id}`);
            break;
          case 'join':
            console.log("🟣 JOIN ")

            
            // const joinResult = await joinEvent(event.id);
            // if (joinResult.type == "error") {
            //   Alert.alert("Error", joinResult.userFriendlyMessage);
            // }
            break;
          case 'leave':
            console.log("🟣 LEAVE ")

            // const leaveResult =  await leaveEvent(event.id);
            // if (leaveResult.type == "error") {
            //   Alert.alert("Error", leaveResult.userFriendlyMessage);
            // }
            break;
        }
      }

   

    return { filteredEvents, isLoading, onRefresh, onCellPressed, onAction };
  }

const EventsPage = () => {
    const { filteredEvents, isLoading } = useEventsPage();
    return (
        <Page >
            <EventsFilter/>
            <EventsList events={filteredEvents}/>
            {isLoading && <Loading />}  
        </Page>
    )
}

export default EventsPage;