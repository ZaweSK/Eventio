import formatDate from "@/src/utils/formatDate";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import EventCellCoreInfo from "./EventCellCoreInfo";
import EventCellContainer from "./EventCellContainer";
import EventCellButton from "./EventCellButton";
import getEventButtonAction from "@/src/utils/getEventAction";

const EventCellDefault = (props: EventCellProps) => {   
   const buttonAction = getEventButtonAction(props.event);
   return (
    <EventCellContainer onPress={props.onPress}>
        <EventCellCoreInfo event={props.event}/>
        <Text id = "description" style={styles.description}>{props.event.description}</Text>
        <View id = "attendance" style = {styles.attendance}>
            <Image id = "attendeesImage" source = {require('@/assets/images/tabIcon_profile.png')} style = {styles.attendeesImage} />
            <Text id = "attendeesText" style = {styles.attendeesText}> {props.event.attendees.length} of {props.event.capacity}</Text>
        </View>

        {buttonAction !== null && (
            <EventCellButton style={styles.cellButton} action={buttonAction} onPress={() => {
                props.onEventAction();
            }} />
        )}
    </EventCellContainer>
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
    },
    owner: {
        color: '#72727B',
        fontFamily: 'Hind-Regular',
        fontSize: 14,
        textAlign: 'left',
        marginTop: -5,
    },
    description: {
        color: 'black',
        fontFamily: 'Hind-Regular',
        fontSize: 16,
        textAlign: 'left',
        marginTop: 8,
    },
    attendance: {
        flexDirection: 'row',
        marginTop: 25,
    },

    attendeesImage: {
        width: 20,
        height: 20,
        tintColor: '#72727B',
    },

    attendeesText: {
        fontSize: 14,
        color: '#72727B',
        textAlign: 'left',
        fontFamily: 'Hind-Regular',
        marginLeft: 5, 
    },
    cellButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
    }

});

export default EventCellDefault;