import { Text, StyleSheet, View } from 'react-native';
import { EventioEvent } from "@/src/types/EventioEvent";
import EventCellContainer from '@/src/features/events/components/cells/EventCellContainer';
import AttendeeTag from '@/src/features/events/components/cells/AttendeeTag';
import { getAttendeeTagProps } from '@/src/utils/functions/getAttendeeTagProps';
import Fonts from '@/src/constants/Fonts';

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
        color: Fonts.color.primary,
        fontFamily: Fonts.family.medium,
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

