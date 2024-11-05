import EventAttendeesCell from "@/src/components/EventAttendeesCell";
import EventCellDefault from "@/src/components/EventCellDefault";
import Loading from "@/src/components/Loading";
import getEventOwnership from "@/src/utils/getEventOwnership";
import {
  Redirect,
  useNavigation,
} from "expo-router";
import { useEffect } from "react";
import {
  FlatList,
} from "react-native";

import Page from "@/src/components/Page";
import { useEventDetailScreen } from "@/src/features/events/hooks/useEventDetailScreen";
import SettingsButton from "@/src/features/events/components/SettingsButton";


const EventDetailScreen = () => {
  const { cellData, event, eventAction, loading, notFound, onSettingsButtonPressed } = useEventDetailScreen();

  const navigation = useNavigation();
  useEffect(() => {
    if (event) {
      const ownership = getEventOwnership(event);
      navigation.setOptions({
        headerRight: () =>  
          ownership === "owned" ? (  
              <SettingsButton event= {event} onPressed={onSettingsButtonPressed} />
          ) : null,
      });
    }
  }, [event]);

  if (notFound) {
    return <Redirect href="/not-found" />; 
  }

  return (
    <Page>
      {event ? (
          <Page>
            <FlatList data={cellData} keyExtractor={(item, index) => index.toString()} contentContainerStyle={{ padding: 20 }}
              renderItem={({ item }) => {
                switch (item) {
                  case "eventInfo": return <EventCellDefault event={event} onEventAction={() => eventAction(event)} />
                  case "attendees": return <EventAttendeesCell event={event} />;
                }
                return null;
              }}
            />
           {loading &&  <Loading />}
        </Page>
      ) : (
        <Loading/>
      )}
    </Page>
  );
};

export default EventDetailScreen;
