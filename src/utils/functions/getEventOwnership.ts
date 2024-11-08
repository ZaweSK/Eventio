import { storage } from "@/src/storage/Storage";
import { EventioEvent } from "@/src/types/EventioEvent";

export function getEventOwnership(event: EventioEvent) : 'owned' | 'notOwned' {
    const currentUserId = storage.getUserId();
    return event.owner.id === currentUserId ? 'owned' : 'notOwned';
}