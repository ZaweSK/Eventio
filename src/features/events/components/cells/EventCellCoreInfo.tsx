import { View, Text, Image, StyleSheet } from "react-native";
import { EventioEvent } from "@/src/types/EventioEvent";
import { formatDate } from "@/src/utils/functions/formatDate";
import Fonts from "@/src/constants/Fonts";

const EventCellCoreInfo = ({ event } : {event: EventioEvent}) => {
    return (
        <View>
            <Text id="startDate" style={styles.startDate}>{formatDate(event.startsAt)}</Text>
            <Text id="title" style={styles.title}>{event.title}</Text>
            <Text id="owner" style={styles.owner}>{event.owner.firstName} {event.owner.lastName}</Text>
        </View>
    );
}

const styles = StyleSheet.create({  
    startDate: {
        color: Fonts.color.tertiary,
        fontFamily: Fonts.family.regular,
        fontSize: 12,
        textAlign: 'left',
    },
    title: {
        color: Fonts.color.primary,
        fontFamily: Fonts.family.medium,
        fontSize: 20,
        textAlign: 'left',
        paddingRight: 100
    },
    owner: {
        color: Fonts.color.secondary,
        fontFamily: Fonts.family.regular,
        fontSize: 14,
        textAlign: 'left',
        marginTop: 0,
    },
});


export default EventCellCoreInfo;