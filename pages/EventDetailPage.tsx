import EventAttendeesCell from "@/components/EventAttendeesCell";
import EventCellDefault from "@/components/EventCellDefault";
import Colors from "@/constants/Colors";
import useEventsStore from "@/store/EventsStore";
import { useRoute } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FlatList, View, Text, useColorScheme } from "react-native"


const EventDetailPage = () => { 
    const colorScheme = useColorScheme();
    const {id} = useLocalSearchParams(); 

    const events = useEventsStore(state => state.allEvents);
    const event = events.find(event => event.id === id);

    console.log(JSON.stringify(events));
    if (!event) {
        // NOT FOUND 
        return <Text>Event not found</Text>
    }
    

   
    const data = ['eventInfo', 'attendees'];

    console.log("------");
    console.log(id);
    console.log(event.title);
    
    return (
        <View style = {[{backgroundColor: Colors[colorScheme ?? 'light'].background, },  {flex:1}]}>
            <FlatList
            data={data}
            renderItem={({ item }) => {
                console.log("RENDERING ITEM", item);
                switch (item) {
                    case 'eventInfo':
                      return   <EventCellDefault event={event} />
                    case 'attendees':
                        return <EventAttendeesCell event = {event}/>
                  }
                return null;
              }}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ padding: 20 }}
            />



        </View>

    )
}

export default EventDetailPage;
