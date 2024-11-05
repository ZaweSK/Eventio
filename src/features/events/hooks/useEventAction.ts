import { eventsApi } from "@/src/features/events/eventsApi";
import { EventioEvent } from "@/src/types/EventioEvent";
import getEventAction from "@/src/utils/getEventAction";
import { router } from "expo-router";
import { useEffect, useState } from "react";

export const useEventAction = () => {
    const { mutate: joinEvent, isPending: iJoining }  = eventsApi.useJoinEventMutation();
    const { mutate: leaveEvent, isPending: isLeaving } = eventsApi.useLeaveEventMutation();
    const [actionError, setActionError] = useState<Error | null>(null);
    const [actionInProgress, setActionInProgress] = useState(false);
  
    useEffect(() => {
      setActionInProgress(iJoining || isLeaving);
    }, [iJoining, isLeaving]);
  
    const eventAction = (event: EventioEvent) => {
      const action = getEventAction(event);
       if (!action)
         return;
  
      switch (action) {
        case 'edit':
          router.push(`/(tabs)/events/${event.id}`);
          break;
        case 'join':
          joinEvent(event.id, {
            onSuccess: () => console.log('Joined event:', event.id),
            onError: (error) =>{
                console.error('Error joining event:', error);
                setActionError(error);
            } 
          });
          break;
        case 'leave':
          leaveEvent(event.id, {
            onSuccess: () => console.log('Left event:', event.id),
            onError: (error) => {
                console.error('Error leaving event:', error);
                setActionError(error);
            }
          });
          break;
      }
    };
  
    return { eventAction, actionInProgress, actionError };
  }