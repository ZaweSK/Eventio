import formatDate from "@/utils/formatDate";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const EventCellDefault = ({ event } : {event: EventioEvent}) => (
    <View style={styles.cell}>
      <Text id = "startDate" style = {styles.startDate} >{formatDate(event.startsAt)}</Text>
      <Text id = "title" style={styles.title}>{event.title}</Text>
      <Text id = "owner" style={styles.owner}>{event.owner.firstName} {event.owner.lastName}</Text>
      <Text id = "description" style={styles.description}>{event.description}</Text>
      <View id = "attendance" style = {styles.attendance}>
        <Image id = "attendeesImage" source = {require('@/assets/images/tabIcon_profile.png')} style = {styles.attendeesImage} />
        <Text id = "attendeesText" style = {styles.attendeesText}> {event.attendees.length} of {event.capacity}</Text>
      </View>

      {/* <Text style={{ marginTop: 5 }}>{event.participants}</Text> */}
      {/* <TouchableOpacity style={{
          marginTop: 10,
          padding: 10,
        //   backgroundColor: event.action === 'LEAVE' ? 'red' : (event.action === 'JOIN' ? 'green' : 'gray'),
          borderRadius: 5,
          alignItems: 'center'
        }}>
      </TouchableOpacity> */}
    </View>
  );

const styles = StyleSheet.create({
    cell: {
        padding: 20, marginBottom: 16, backgroundColor: 'white', borderRadius: 8,

        // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    // Shadow for Android
    // elevation: 3, // Adjust this value to increase/decrease shadow intensity
    },

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
    }

});

export default EventCellDefault;