import EventAttendeesCell from "@/components/EventAttendeesCell";
import EventCellDefault from "@/components/EventCellDefault";
import ImageButton from "@/components/ImageButton";
import Colors from "@/constants/Colors";
import useEventsStore from "@/store/EventsStore";
import getEventAction from "@/utils/getEventAction";
import getEventOwnership from "@/utils/getEventOwnership";
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
          Alert.alert("Error", joinResult.message);
        }
        break;
      case 'leave':
        const leaveResult =  await leaveEvent(event.id);
        if (leaveResult.type == "error") {
          Alert.alert("Error", leaveResult.message);
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
        <View>          
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

          {loading && (
            <View
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" />
            </View>
          )}
        </View>
      ) : (
        <Redirect href="/not-found" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  settingsButton: {
    width: 24,
    height: 24,
    tintColor: "black",
  },
});

export default EventDetailPage;
