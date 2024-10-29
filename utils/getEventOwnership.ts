import { storage } from "@/storage/storage";
const getEventOwnership = (event: EventioEvent) : 'owned' | 'notOwned' => {
    const currentUserId = storage.getString('id');
    return event.owner.id === currentUserId ? 'owned' : 'notOwned';

}
export default getEventOwnership;