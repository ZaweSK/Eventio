import { eventsApi } from "@/src/features/events/eventsApi";
import { useEventAction } from "@/src/features/events/hooks/useEventAction";
import { getAlertMessage } from "@/src/utils/getAlertMessage";
import { is404 } from "@/src/utils/is404";
import { useIdFromPathIfAny } from "@/src/utils/useIdFromPath";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActionSheetIOS, Alert } from "react-native";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

// Servers as a custom hook for the EventDetailScreen
export const useEventDetailScreen = () => {
    const [notFound, setNotFound] = useState(false);
    const eventId = useIdFromPathIfAny();
    if (!eventId) {
        setNotFound(true);   
    }
  
    const cellData = ["eventInfo", "attendees"];
    const { event, error: fetchEventError } = eventsApi.useGetEventQuery(eventId!);
    const {eventAction, actionInProgress, actionError: eventActionError } = useEventAction();
    const { mutate: deleteEvent, isPending: deleteInProgress, error: deleteEventError } = eventsApi.useDeleteEventMutation();
    const compoundError = fetchEventError || eventActionError || deleteEventError || null;
    const loading = actionInProgress || deleteInProgress;

    const onSettingsButtonPressed = () => {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Edit Event", "Delete", "Cancel"],
          destructiveButtonIndex: 1,
          cancelButtonIndex: 2,
          title: "Event Settings",
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            // Handle Edit Event
          } else if (buttonIndex === 1) {
            if (!event) {
              return;
            }
            deleteEvent(event.id, {
              onSuccess: () => {
                router.back();
                Alert.alert("Success", `Deleted event ${event.title}.`);
              }
            });
          }
        }
      );
    };

    useEffect(() => {
        if (compoundError) {      
            Alert.alert("Error", getAlertMessage(compoundError));
        }
    }, [compoundError]);

    return { cellData, event, eventAction, loading, notFound, onSettingsButtonPressed };
  }