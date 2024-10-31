// Adjust the path based on your project structure

import { AttendeeTagProps } from "@/src/components/AttendeeTag";
import storage from "@/src/storage/Storage";
import EventioUser from "@/src/types/EventioUser";

const getAtendeeTagProps = (attendees: EventioUser[]):  AttendeeTagProps[] => { 
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



export default getAtendeeTagProps;
