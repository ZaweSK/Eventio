import { AttendeeTagProps } from "@/src/features/events/components/cells/AttendeeTag";
import { storage } from "@/src/storage/Storage";
import EventioUser from "@/src/types/EventioUser";

export function getAttendeeTagProps(attendees: EventioUser[]) : AttendeeTagProps[]  { 
    const id = storage.getUserId();
    
    if (id === null) {
        return [];
    }

    return attendees.map((attendee) => {
        const isCurrentUser = attendee.id === id;
        return {
           style: isCurrentUser ? 'white' : 'dark',
           text: isCurrentUser ? 'You' : `${attendee.firstName} ${attendee.lastName}`,
        };
    });
}