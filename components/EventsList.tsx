import useEventsStore from "@/store/EventsStore";
import { View, Text, TouchableOpacity, FlatList, RefreshControl } from "react-native";
import EventCellDefault from "./EventCellDefault";
import { useCallback, useState } from "react";
import EventCellCompact from "./EventCellCompact";
import { router, useNavigation } from "expo-router";

const CellForLayout = (item: EventioEvent, eventsLayout: string, onPress: () => void) => {
  

  const tag = item.id === "2ffa9350-400d-407e-9210-1dcb6375c76f" ? "t1" : undefined;

  console.log("tag", tag);

  switch (eventsLayout) {
    case 'default':
      return <EventCellDefault event={item} onPress={onPress} />;
    case 'compact':
      return <EventCellCompact event={item} onPress={onPress}/>;
    default:
      return <EventCellDefault event={item} onPress={onPress} />; // Fallback to default layout
  }
};

const EventsList = () => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const events = useEventsStore(state => state.filteredEvents);
    const fetchEvents = useEventsStore(state => state.fetchEvents);
    const eventsLayout = useEventsStore(state => state.eventsLayout);

    const OnCellPressed = (event: EventioEvent) => {    
      router.push(`/(tabs)/events/${event.id}`); 
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
            renderItem={({ item }) => CellForLayout(item, eventsLayout, () => OnCellPressed(item))}
            keyExtractor={item => item.id}
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