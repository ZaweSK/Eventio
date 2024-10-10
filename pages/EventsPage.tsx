import EventsFilter from "@/components/EventsFilter";
import React from "react";
import { View, StyleSheet } from "react-native"


const EventsPage = () => {
    return (
        <View style = {styles.page} >
            <EventsFilter/>

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