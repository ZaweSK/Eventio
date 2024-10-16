type EventioEvent = {
    id: string;
    title: string;
    description: string;
    startsAt: string;
    capacity: number;
    ownerId: string;
    createdAt: string;
    updatedAt: string;
    attendees: User[];
    owner: User;
  };