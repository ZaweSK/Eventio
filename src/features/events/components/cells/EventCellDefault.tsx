import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import EventCellCoreInfo from "./EventCellCoreInfo";
import EventCellContainer from "./EventCellContainer";
import EventCellButton from "./EventCellButton";
import getEventButtonAction from "@/src/utils/functions/getEventAction";
import { EventCellProps } from "@/src/features/events/components/cells/EventCellProps";
import Fonts from "@/src/constants/Fonts";
import { SVGImage } from "@/assets/svg/SVGImage";
import Animated from "react-native-reanimated";

const EventCellDefault = (props: EventCellProps) => {   
   const buttonAction = getEventButtonAction(props.event);
   return (
        <EventCellContainer onPress={props.onPress}>
        <EventCellCoreInfo event={props.event}/>
        <Text id = "description" style={styles.description}>{props.event.description}</Text>
        <View id = "attendance" style = {styles.attendance}>
            <SVGImage name ='Profile' width={20} height={20} fill= {Fonts.color.secondary}  />
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
    description: {
        color: Fonts.color.primary,
        fontFamily: Fonts.family.regular,
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
        tintColor: Fonts.color.secondary,
    },
    attendeesText: {
        fontSize: 14,
        color: Fonts.color.secondary,
        textAlign: 'left',
        fontFamily: Fonts.family.regular,
        marginLeft: 5, 
    },
    cellButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
    }

});

export default EventCellDefault;