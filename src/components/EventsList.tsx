import useEventsStore from "@/src/store/useEventsStore";
import { View, Text, TouchableOpacity, FlatList, RefreshControl, Alert } from "react-native";
import EventCellDefault from "./EventCellDefault";
import { useCallback, useState } from "react";
import EventCellCompact from "./EventCellCompact";
import { router, useNavigation } from "expo-router";
import { EventAction } from "./EventCellButton";
import getEventAction from "@/src/utils/getEventAction";
import Animated, { LinearTransition } from "react-native-reanimated";
import { EventioEvent } from "@/src/types/EventioEvent";
import { useGetEventsQuery } from "@/src/pages/EventsPage";

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

interface EventsListProps {
  events: EventioEvent[];
}

const EventsList = (props: EventsListProps) => {  
    const [isRefreshing, setIsRefreshing] = useState(false);
    // const events = useEventsStore(state => state.filteredEvents);
    const fetchEvents = useEventsStore(state => state.fetchEvents);
    const eventsLayout = useEventsStore(state => state.eventsLayout);
    const joinEvent = useEventsStore(state => state.joinEvent);
    const leaveEvent = useEventsStore(state => state.leaveEvent);

    const OnCellPressed = (event: EventioEvent) => {    
      NavigateToEventDetail(event);
    }

    const OnActionButtonPressed = async (event: EventioEvent) => {
      const eventAction = getEventAction(event);
      if (eventAction === null) return;
      console.log('Event action:', eventAction);

      switch (eventAction) {
        case 'edit':
          NavigateToEventDetail(event);
          break;
        case 'join':
          const joinResult = await joinEvent(event.id);
          if (joinResult.type == "error") {
            Alert.alert("Error", joinResult.userFriendlyMessage);
          }
          break;
        case 'leave':
          const leaveResult =  await leaveEvent(event.id);
          if (leaveResult.type == "error") {
            Alert.alert("Error", leaveResult.userFriendlyMessage);
          }
          break;
      }
    }
  
    // const onRefresh = useCallback(async () => {
  
    //   setIsRefreshing(true);
    //   try {
    //     await fetchEvents(); // Fetch new data from the store
    //   } finally {
    //     setIsRefreshing(false); // Stop the refresh animation after fetching
    //   }
    // }, [fetchEvents]);

    return (
        <Animated.FlatList
            data={props.events}
            renderItem={({ item }) => Cell(item, eventsLayout, () => OnCellPressed(item), () => OnActionButtonPressed(item))}
            keyExtractor={event => event.id}
            contentContainerStyle={{ padding: 20 }}
            itemLayoutAnimation={LinearTransition}
            refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={props.onRefreshRequested}
                  tintColor="#000" // Change the spinner color if desired
                />}
            />
    )
}

export default EventsList;