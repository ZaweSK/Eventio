import { EventCellButtonAction } from "@/components/EventCellButton";
import { storage } from "@/storage/storage";

const getEventButtonAction = (event: EventioEvent) : EventCellButtonAction | null => {
    const currentUserId = storage.getString('id');
    if (event.owner.id === currentUserId) {
        return 'edit';
    }
    const currentUserAttendsEvent = event.attendees.some((attendee) => attendee.id === currentUserId);
    if (currentUserAttendsEvent) {
        return 'leave';
    }

    if (!currentUserAttendsEvent && event.attendees.length < event.capacity) {
        return 'join';
    }
    return null;
}

export default getEventButtonAction;