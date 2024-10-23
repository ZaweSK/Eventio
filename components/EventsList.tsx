import useEventsStore from "@/store/EventsStore";
import formatDate from "@/utils/formatDate";
import { View, Text, TouchableOpacity, FlatList, RefreshControl } from "react-native";
import EventCellDefault from "./EventCellDefault";
import { useCallback, useState } from "react";


  const EventCellCompact = ({ event } : {event: EventioEvent}) => {
    return (
        <View style={{ padding: 15, marginBottom: 10, backgroundColor: '#fff', borderRadius: 10 }}>
        <Text style={{ fontWeight: 'bold', marginTop: 5 }}>{event.title}</Text>
        <Text style={{ fontWeight: 'bold', marginTop: 5 }}>{event.title}</Text>
        <Text style={{ fontWeight: 'bold', marginTop: 5 }}>{event.title}</Text>
        </View>
    );
  };


const EventsList = () => {
    const events = useEventsStore(state => state.filteredEvents);
    const eventsLayout = useEventsStore(state => state.eventsLayout);
    const fetchEvents = useEventsStore(state => state.fetchEvents);
    const [isRefreshing, setIsRefreshing] = useState(false);

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
            renderItem={({ item }) => {
                switch (eventsLayout) {
                    case 'default':
                      return <EventCellDefault event={item} />;
                    case 'compact':
                      return <EventCellCompact event={item} />;
                    default:
    
                      return <EventCellDefault event={item} />;
                  }
            }}
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