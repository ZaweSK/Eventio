import { EventAction } from "@/components/EventCellButton";
import { storage } from "@/storage/storage";

const getEventButtonAction = (event: EventioEvent) : EventAction | null => {
    const currentUserId = storage.getString('id');
    const eventIsInFuture = new Date(event.startsAt) > new Date();
    if (!eventIsInFuture) return null;

    if (event.owner.id === currentUserId) return 'edit';
    
    const currentUserAttendsEvent = event.attendees.some((attendee) => attendee.id === currentUserId);
    if (currentUserAttendsEvent) return 'leave';
    
    const eventHasCapacity = event.attendees.length < event.capacity;
    if (!currentUserAttendsEvent && eventHasCapacity && eventIsInFuture) return 'join';
    
    return null;
}

export default getEventButtonAction;