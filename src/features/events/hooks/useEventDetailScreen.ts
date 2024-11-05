import { eventsApi } from "@/src/features/events/eventsApi";
import { useEventAction } from "@/src/features/events/hooks/useEventAction";
import { useIdFromPathIfAny } from "@/src/utils/useIdFromPath";

// Servers as a custom hook for the EventDetailScreen
export const useEventDetailScreen = () => {
    const eventId = useIdFromPathIfAny();
    if (!eventId) {
      return { error: new Error("not-found")};
    }
  
    const cellData = ["eventInfo", "attendees"];
    const { event, error: eventError } = eventsApi.useGetEventQuery(eventId!);
    const {eventAction, actionInProgress, actionError } = useEventAction();
    const compoundError = eventError || actionError || null;
    return { cellData, event, eventAction, loadingAction: actionInProgress, error: compoundError };
  }