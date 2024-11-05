import { EventAction } from "@/src/components/EventCellButton";
import { storage } from "@/src/storage/Storage";
import { EventioEvent } from "@/src/types/EventioEvent";


const getEventButtonAction = (event: EventioEvent) : EventAction | null => {
    const currentUserId = storage.getUserId();

    if (event.owner.id === currentUserId) return 'edit';
    
    const eventIsInFuture = new Date(event.startsAt) > new Date();
    if (!eventIsInFuture) return null;
    
    const currentUserAttendsEvent = event.attendees.some((attendee) => attendee.id === currentUserId);
    if (currentUserAttendsEvent) return 'leave';
    
    const eventHasCapacity = event.attendees.length < event.capacity;
    if (!currentUserAttendsEvent && eventHasCapacity && eventIsInFuture) return 'join';
    
    return null;
}

export default getEventButtonAction;