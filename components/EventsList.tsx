import useEventsStore from "@/store/EventsStore";
import { View, Text, TouchableOpacity, FlatList, RefreshControl } from "react-native";
import EventCellDefault from "./EventCellDefault";
import { useCallback, useState } from "react";
import EventCellCompact from "./EventCellCompact";

  const CellForLayout = (item: EventioEvent, eventsLayout: string) => {
    switch (eventsLayout) {
      case 'default':
        return <EventCellDefault event={item} />;
      case 'compact':
        return <EventCellCompact event={item} />;
      default:
        return <EventCellDefault event={item} />; // Fallback to default layout
    }
  };

const EventsList = () => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const events = useEventsStore(state => state.filteredEvents);
    const fetchEvents = useEventsStore(state => state.fetchEvents);
    const eventsLayout = useEventsStore(state => state.eventsLayout);
  
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
            renderItem={({ item }) => CellForLayout(item, eventsLayout)}
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