import useEventsStore from "@/store/EventsStore";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
const EventCellDefault = ({ event } : {event: EventioEvent}) => (
    <View style={{ padding: 15, marginBottom: 10, backgroundColor: '#fff', borderRadius: 10 }}>
      <Text>{event.startsAt}</Text>
      <Text style={{ fontWeight: 'bold', marginTop: 5 }}>{event.title}</Text>
      <Text style={{ marginTop: 5 }}>{event.owner.firstName}</Text>
      <Text style={{ marginTop: 5 }}>{event.description}</Text>
      {/* <Text style={{ marginTop: 5 }}>{event.participants}</Text> */}
      <TouchableOpacity style={{
          marginTop: 10,
          padding: 10,
        //   backgroundColor: event.action === 'LEAVE' ? 'red' : (event.action === 'JOIN' ? 'green' : 'gray'),
          borderRadius: 5,
          alignItems: 'center'
        }}>
        {/* <Text style={{ color: '#fff' }}>{event.action}</Text> */}
      </TouchableOpacity>
    </View>
  );

  const EventCellCompact = ({ event } : {event: EventioEvent}) => {
    return (
        <View style={{ padding: 15, marginBottom: 10, backgroundColor: '#fff', borderRadius: 10 }}>
        <Text style={{ fontWeight: 'bold', marginTop: 5 }}>{event.title}</Text>
        </View>
    );
  };


const EventsList = () => {
    const events = useEventsStore(state => state.filteredEvents);
    const eventsLayout = useEventsStore(state => state.eventsLayout);

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
            />
    )
}

export default EventsList;