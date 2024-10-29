import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import AttendeeTag from "./AttendeeTag";
import EventCellContainer from "./EventCellContainer";
import { Text, StyleSheet, View } from 'react-native';
import getAttendeeTagProps from "@/utils/getAttendeeTagProps";

interface EventAttendeesCellProps {
    event: EventioEvent;
}

const EventAttendeesCell = (props: EventAttendeesCellProps) => {
    return (
        <EventCellContainer>
          <Text style= {styles.title}>Attendees </Text>
          <View style= {styles.attendeesList}>
            {getAttendeeTagProps(props.event.attendees).map(prop => (
              <AttendeeTag key={prop.text} style= {prop.style} text={prop.text} />
            ))}

          </View>
        </EventCellContainer>
    )

}

const styles = StyleSheet.create({
    title: {
        color: 'black',
        fontFamily: 'Hind-Medium',
        fontSize: 20,
        textAlign: 'left',
    },

    attendeesList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 18,
    }

})

export default EventAttendeesCell;

