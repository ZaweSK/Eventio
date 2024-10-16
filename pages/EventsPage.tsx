import EventsFilter from "@/components/EventsFilter";
import Colors from "@/constants/Colors";
import useAuthStore from "@/store/AuthStore";
import useEventsStore from "@/store/EventsStore";
import React, { useEffect } from "react";
import { View, StyleSheet, useColorScheme, Text, ActivityIndicator } from "react-native"


const EventsPage = () => {
    const colorScheme = useColorScheme();
    const fetchEvents = useEventsStore(state => state.fetchEvents);
    const fetchingEvents = useEventsStore(state => state.asyncOpeationInProgress);

    useEffect(() => {
        fetchEvents()
    }, [])

    return (
        <View style = {[styles.page, {backgroundColor: Colors[colorScheme ?? 'light'].background}]} >
            <EventsFilter/>
            {fetchingEvents && (
      <View style = {{position: 'absolute', top:0, bottom:0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size= 'large'/>
    </View>
    )}
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