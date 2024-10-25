import useEventsStore from "@/store/EventsStore";
import { View, Text, TouchableOpacity, FlatList, RefreshControl } from "react-native";
import EventCellDefault from "./EventCellDefault";
import { useCallback, useState } from "react";
import EventCellCompact from "./EventCellCompact";
import { router, useNavigation } from "expo-router";
import { EventAction } from "./EventCellButton";
import getEventAction from "@/utils/getEventAction";

const Cell = (item: EventioEvent, eventsLayout: string, onPress: () => void, onActionButtonPressed: () => void) => {
  switch (eventsLayout) {
    case 'default':
      return <EventCellDefault event={item} onPress={onPress} onEventAction={onActionButtonPressed} />;
    case 'compact':
      return <EventCellCompact event={item} onPress={onPress} onEventAction={onActionButtonPressed} />;
    default:
      return <EventCellDefault event={item} onPress={onPress} onEventAction={onActionButtonPressed}/>; // Fallback to default layout
  }
};

function NavigateToEventDetail(event: EventioEvent) {
  router.push(`/(tabs)/events/${event.id}`);
}

const EventsList = () => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const events = useEventsStore(state => state.filteredEvents);
    const fetchEvents = useEventsStore(state => state.fetchEvents);
    const eventsLayout = useEventsStore(state => state.eventsLayout);
    const joinEvent = useEventsStore(state => state.joinEvent);
    const leaveEvent = useEventsStore(state => state.leaveEvent);

    const OnCellPressed = (event: EventioEvent) => {    
      NavigateToEventDetail(event);
    }

    const OnActionButtonPressed = (event: EventioEvent) => {
      const eventAction = getEventAction(event);
      if (eventAction === null) return;
      console.log('Event action:', eventAction);

      switch (eventAction) {
        case 'edit':
          NavigateToEventDetail(event);
          break;
        case 'join':
          joinEvent(event.id);
          break;
        case 'leave':
          leaveEvent(event.id);
          break;
      }
    }
  
    const onRefresh = useCallback(async () => {
      setIsRefreshing(true);
      try {
        await fetchEvents(); // Fetch new data from the store
      } finally {
        setIsRefreshing(false); // Stop the refresh animation after fetching
      }
    }, [fetchEvents]);

    return (
        <FlatList
            data={events}
            renderItem={({ item }) => Cell(item, eventsLayout, () => OnCellPressed(item), () => OnActionButtonPressed(item))}
            keyExtractor={event => event.id}
            contentContainerStyle={{ padding: 20 }}
            refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={onRefresh}
                  tintColor="#000" // Change the spinner color if desired
                />}
            />
    )
}

export default EventsList;