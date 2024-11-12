import { EventAction } from "@/src/features/events/components/cells/EventCellButton";
import { storage } from "@/src/storage/localStorage";
import { EventioEvent } from "@/src/types/EventioEvent";

export function getEventButtonAction(event: EventioEvent) : EventAction | null {
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