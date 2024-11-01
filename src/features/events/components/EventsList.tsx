import useEventsStore from "@/src/store/useEventsStore";
import { View, Text, TouchableOpacity, FlatList, RefreshControl, Alert } from "react-native";
import EventCellDefault from "../../../components/EventCellDefault";
import { useCallback, useEffect, useState } from "react";
import EventCellCompact from "../../../components/EventCellCompact";
import { router, useNavigation } from "expo-router";
import { EventAction } from "../../../components/EventCellButton";
import getEventAction from "@/src/utils/getEventAction";
import Animated, { LinearTransition } from "react-native-reanimated";
import { EventioEvent } from "@/src/types/EventioEvent";
import { useMutation } from "@tanstack/react-query";
import { eventsApi } from "@/src/features/events/eventsApi";
import Loading from "@/src/components/Loading";
import { orderEventsByDate } from "@/src/utils/orderEventsByDate";
import filterEvents from "@/src/utils/filterEvents";
import useErrorAlert from "@/src/utils/useErrorAlert";
import useLoadingStore from "@/src/store/LoadingStore";

// ================================== PRIVATE METHODS ==================================
const Cell = (item: EventioEvent, eventsLayout: string, onPress: () => void, onActionButtonPressed: () => void) => {
  switch (eventsLayout) {
    case 'default':
      return <EventCellDefault event={item} onPress={onPress} onEventAction={onActionButtonPressed} />;
    case 'compact':
      return <EventCellCompact event={item} onPress={onPress} onEventAction={onActionButtonPressed} />;
    default:
      return <EventCellDefault event={item} onPress={onPress} onEventAction={onActionButtonPressed} />; // Fallback to default layout
  }
};

// ================================== COMPONENT SETUP ==================================
const useEventsList = () => { 
    // ========================== API CALLS ==========================
    const { events, isLoading: isFetchingEvents, isError, error, refetch } = eventsApi.useGetEventsQuery();
    const joinEvent = eventsApi.useJoinEventMutation();
    const leaveEvent = eventsApi.useLeaveEventMutation();
    
    // ======================== FILTERING EVENTS ========================
    const eventsLayout = useEventsStore(state => state.eventsLayout);
    const [filteredEvents, setFilteredEvents] = useState<EventioEvent[]>([]);
    const eventsFilter = useEventsStore(state => state.eventsFilter);

    useEffect(() => {
       if (events) {
        const sortedEvents = orderEventsByDate(events);
        setFilteredEvents(filterEvents(eventsFilter, sortedEvents));
       }
    }, [events, eventsFilter]);

    useErrorAlert({ 
        isError,
        description: error?.message ?? 'Something went wrong'
    });

    const eventAction = (event: EventioEvent) => {
      const action = getEventAction(event);
       if (!action) return;

      switch (action) {
        case 'edit':
          router.push(`/(tabs)/events/${event.id}`);
          break;
        case 'join':
          joinEvent.mutate(event.id, {
            onSuccess: () => console.log('Joined event:', event.id),
            onError: (error) => console.error('Error joining event:', error),
          });
          break;
        case 'leave':
          leaveEvent.mutate(event.id, {
            onSuccess: () => console.log('Left event:', event.id),
            onError: (error) => console.error('Error leaving event:', error),
          });
          break;
      }
    };

    // ========================= LOADING STATE =========================
    const setEventsScreenLoading = useLoadingStore.getState().setEventsScreenLoading;
    useEffect(() => {
        setEventsScreenLoading(joinEvent.status === 'pending' || leaveEvent.status === 'pending' || isFetchingEvents);
    }, [isFetchingEvents, joinEvent.status, leaveEvent.status]);

    return { eventsLayout, filteredEvents, refetch, eventAction, isFetchingEvents };
};

const EventsList = () => {  
    const { eventsLayout, filteredEvents, refetch: refreshEvents, eventAction, isFetchingEvents } = useEventsList();

    const onCellPressed = (event: EventioEvent) => {
      router.push(`/events/${event.id}`);
    };

    return (
        <Animated.FlatList
            data={filteredEvents ?? []}
            renderItem={({ item }) => Cell(item, eventsLayout, () => onCellPressed(item), () => {eventAction(item)})}
            keyExtractor={(event) => event.id}
            contentContainerStyle={{ padding: 20 }}
            itemLayoutAnimation={LinearTransition}
            refreshControl={
                <RefreshControl
                  refreshing={isFetchingEvents}
                  onRefresh={refreshEvents}
                  tintColor="#000" // Change the spinner color if desired
                />}
        />
    );
};

export default EventsList;