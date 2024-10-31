import EventAttendeesCell from "@/src/components/EventAttendeesCell";
import EventCellDefault from "@/src/components/EventCellDefault";
import ImageButton from "@/src/components/ImageButton";
import Loading from "@/src/components/Loading";
import Colors from "@/src/constants/Colors";
import useEventsStore from "@/src/store/EventsStore";
import getEventAction from "@/src/utils/getEventAction";
import getEventOwnership from "@/src/utils/getEventOwnership";
import { useRoute } from "@react-navigation/native";
import {
  Redirect,
  router,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import { useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  useColorScheme,
  StyleSheet,
  ActionSheetIOS,
  ActivityIndicator,
  Alert,
} from "react-native";
import { EventioEvent } from "@/src/types/EventioEvent";

const EventDetailPage = () => {
  
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const { id } = useLocalSearchParams();
  const events = useEventsStore((state) => state.allEvents);
  const event = events.find((event) => event.id === id);

  const joinEvent = useEventsStore(state => state.joinEvent);
  const leaveEvent = useEventsStore(state => state.leaveEvent);
  const deleteEvent = useEventsStore((state) => state.deleteEvent);
  const loading = useEventsStore((state) => state.asyncOpeationInProgress);


  console.log("REDNER EVENT DETAIL", JSON.stringify(event), event ? getEventAction(event) : "No event");


  useEffect(() => {
    console.log("USE EFFECT");
    
    if (event) {
      const ownership = getEventOwnership(event);
      // Update header with the ownership information
      navigation.setOptions({
        headerRight: () =>
          ownership === "owned" ? (
            <ImageButton
              imageStyle={styles.settingsButton}
              onPress={showActionSheet}
              imageSource={require("@/assets/images/settings.png")}
            />
          ) : null,
      });
    }
  }, [event]);

  const OnActionButtonPressed = async (event: EventioEvent) => {
    const eventAction = getEventAction(event);
    if (eventAction === null) return;
    console.log('Event action:', eventAction);

    switch (eventAction) {
      case 'edit':
        break;
      case 'join':
        const joinResult = await joinEvent(event.id);
        if (joinResult.type == "error") {
          Alert.alert("Error", joinResult.userFriendlyMessage);
        }
        break;
      case 'leave':
        const leaveResult =  await leaveEvent(event.id);
        if (leaveResult.type == "error") {
          Alert.alert("Error", leaveResult.userFriendlyMessage);
        }
        break;
    }
  }


  const showActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Edit Event", "Delete", "Cancel"],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 2,
        title: "Event Settings",
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          // Edit event
        } else if (buttonIndex === 1) {
          // todo: error handling
          if (event) {
            await deleteEvent(event.id);
            router.back();
          }
        }
      }
    );
  };

  const data = ["eventInfo", "attendees"];

  return (
    <View
      style={[
        { backgroundColor: Colors[colorScheme ?? "light"].background },
        { flexGrow: 1 },
      ]}
    >
      {event ? (
        <View style={styles.page}>          
          <FlatList data={data} keyExtractor={(item, index) => index.toString()} contentContainerStyle={{ padding: 20 }}
            renderItem={({ item }) => {
              console.log("HERE");
              
              switch (item) {
                case "eventInfo": return  <EventCellDefault event={event} onEventAction={() => OnActionButtonPressed(event)} />
                case "attendees": return <EventAttendeesCell event={event} />;
              }
              return null;
            }}
          />
          {loading && <Loading />}
        </View>
      ) : (
        <Redirect href="/not-found" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  settingsButton: {
    width: 24,
    height: 24,
    tintColor: "black",
  },
});

export default EventDetailPage;
