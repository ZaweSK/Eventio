import EventioUser from "@/src/types/EventioUser";

export type EventioEvent = {
    id: string;
    title: string;
    description: string;
    startsAt: string;
    capacity: number;
    ownerId: string;
    createdAt: string;
    updatedAt: string;
    attendees: EventioUser[];
    owner: EventioUser;
  };