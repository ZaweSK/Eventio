// Adjust the path based on your project structure

import { AttendeeTagProps } from "@/components/AttendeeTag";
import { storage } from "@/storage/storage";
import { User } from "@/store/user";

const getAtendeeTagProps = (attendees: User[]):  AttendeeTagProps[] => { 
    const id = storage.getString('id');
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
