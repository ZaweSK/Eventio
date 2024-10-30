import { storage } from "@/src/storage/storage";
import { EventioEvent } from "@/src/store/EventioEvent";
const getEventOwnership = (event: EventioEvent) : 'owned' | 'notOwned' => {
    const currentUserId = storage.getString('id');
    return event.owner.id === currentUserId ? 'owned' : 'notOwned';

}
export default getEventOwnership;