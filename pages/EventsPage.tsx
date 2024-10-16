import EventsFilter from "@/components/EventsFilter";
import Colors from "@/constants/Colors";
import useAuthStore from "@/store/AuthStore";
import useEventsStore from "@/store/EventsStore";
import React, { useEffect } from "react";
import { View, StyleSheet, useColorScheme, Text, ActivityIndicator, TouchableOpacity, FlatList } from "react-native"


const EventsPage = () => {
    const colorScheme = useColorScheme();
    const fetchEvents = useEventsStore(state => state.fetchEvents);
    const fetchingEvents = useEventsStore(state => state.asyncOpeationInProgress);
    const events = useEventsStore(state => state.filteredEvents);

    useEffect(() => {
        fetchEvents()
    }, [])

    return (
        <View style = {[styles.page, {backgroundColor: Colors[colorScheme ?? 'light'].background}]} >
            <EventsFilter/>
            <FlatList
                data={events}
                renderItem={({ item }) => <EventCellDefault event={item} />}
                keyExtractor={item => item.id}
                contentContainerStyle={{ padding: 20 }}
             />
        </View>
    )

}

const styles = StyleSheet.create({
    page : {
        flex: 1,
        backgroundColor: 'white',
    }
})

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

export default EventsPage;