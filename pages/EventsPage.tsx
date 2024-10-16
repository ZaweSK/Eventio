import EventsFilter from "@/components/EventsFilter";
import EventsList from "@/components/EventsList";
import Colors from "@/constants/Colors";
import useAuthStore from "@/store/AuthStore";
import useEventsStore from "@/store/EventsStore";
import React, { useEffect } from "react";
import { View, StyleSheet, useColorScheme, Text, ActivityIndicator, TouchableOpacity, FlatList } from "react-native"
// import EventCellDefault from "@/components/EventCellDefault";


const EventsPage = () => {
    const colorScheme = useColorScheme();
    const fetchEvents = useEventsStore(state => state.fetchEvents);

    useEffect(() => {
        fetchEvents()
    }, [])

    return (
        <View style = {[styles.page, {backgroundColor: Colors[colorScheme ?? 'light'].background}]} >
            <EventsFilter/>
            <EventsList />
        </View>
    )

}


const styles = StyleSheet.create({
    page : {
        flex: 1,
        backgroundColor: 'white',
    }
})

export default EventsPage;