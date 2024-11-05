import EventAttendeesCell from "@/src/components/EventAttendeesCell";
import EventCellDefault from "@/src/components/EventCellDefault";
import Loading from "@/src/components/Loading";
import Colors from "@/src/constants/Colors";
import useEventsStore from "@/src/store/useEventsStore";
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
import { useEffect, useState } from "react";
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
import { eventsApi } from "@/src/features/events/eventsApi";
import Page from "@/src/components/Page";
import { set } from "react-hook-form";
import { useIdFromPathIfAny } from "@/src/utils/useIdFromPath";
import { useEventAction } from "@/src/features/events/hooks/useEventAction";
import { EventioApiError } from "@/src/utils/result/EventioApiError";
import { is404 } from "@/src/utils/is404";
import { getAlertMessage } from "@/src/utils/getAlertMessage";
import { useEventDetailScreen } from "@/src/features/events/hooks/useEventDetailScreen";
import SettingsButton from "@/src/features/events/components/SettingsButton";

export const useSettingsButtonIfAny = (event: EventioEvent | undefined) => {
  const { mutate: deleteEvent, isPending: isDeleting, isError } = eventsApi.useDeleteEventMutation();
  const navigation = useNavigation();

  useEffect(() => {
    if (event) {
      const ownership = getEventOwnership(event);
      navigation.setOptions({
        headerRight: () =>  
          ownership === "owned" ? (  
              <SettingsButton event= {event!} />
          ) : null,
      });
    }
  }, [event]);

  return { isDeleting, isError };
};


const EventDetailScreen = () => {
  const { cellData, event, eventAction, loadingAction, error } = useEventDetailScreen();
  console.log("🟣 ~ file: EventDetailScreen.tsx:61 ~ loadingAction:", loadingAction)
  const { isDeleting, isError: deleteError } = useSettingsButtonIfAny(event);
  const compoundError = error || deleteError || null;


  if (compoundError) {
    if (is404(compoundError)) {
        return <Redirect href="/not-found" />; 
    } else {
      Alert.alert("Error", getAlertMessage(compoundError));
    }
  }

  return (
    <Page>
      {event ? (
          <Page>
            <FlatList data={cellData} keyExtractor={(item, index) => index.toString()} contentContainerStyle={{ padding: 20 }}
              renderItem={({ item }) => {
                console.log("HERE");
                
                switch (item) {
                  case "eventInfo": return <EventCellDefault event={event} onEventAction={() => eventAction(event)} />
                  case "attendees": return <EventAttendeesCell event={event} />;
                }
                return null;
              }}
            />
           {loadingAction &&  <Loading />}
        </Page>
      ) : (
        <Loading/>
      )}
    </Page>
  );
};

export default EventDetailScreen;
