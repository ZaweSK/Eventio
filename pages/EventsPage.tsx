import EventsFilter from "@/components/EventsFilter";
import Colors from "@/constants/Colors";
import useAuthStore from "@/store/AuthStore";
import React from "react";
import { View, StyleSheet, useColorScheme, Text } from "react-native"


const EventsPage = () => {
    const colorScheme = useColorScheme();

    // const refreshToken = useAuthStore(state => state.refreshToken);
    // refreshToken();

    return (
        <View style = {[styles.page, {backgroundColor: Colors[colorScheme ?? 'light'].background}]} >
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