import formatDate from "@/src/utils/formatDate";
import { View, Text, Image, StyleSheet } from "react-native";
import { EventioEvent } from "@/src/types/EventioEvent";

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
        color: '#A7A7B9',
        fontFamily: 'Hind-Regular',
        fontSize: 12,
        textAlign: 'left',
    },
    title: {
        color: 'black',
        fontFamily: 'Hind-Medium',
        fontSize: 20,
        textAlign: 'left',
        paddingRight: 100
    },
    owner: {
        color: '#72727B',
        fontFamily: 'Hind-Regular',
        fontSize: 14,
        textAlign: 'left',
        marginTop: -5,
    },
});


export default EventCellCoreInfo;