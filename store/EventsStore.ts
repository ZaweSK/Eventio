import { create } from "zustand";
import ApiService from "./ApiService";
import { TimeFilter } from "@/constants/TimeFilter";
import { CellLayout } from "@/constants/CellLayout";
import { UserFriendlyError, Result, Success } from "@/utils/result/Result";
import { AsyncError } from "@/utils/result/AsyncError";
import useLoadingStore from "./LoadingStore";
import getUserFriendlyError from "@/utils/getUserFriendlyError";

const api = new ApiService();

type EventsStore = {
    eventsFilter: TimeFilter
    setEventsFilter: (filter: TimeFilter) => void

    eventsLayout: CellLayout
    setEventsLayout: (layout: CellLayout) => void

    allEvents: EventioEvent[]
    filteredEvents: EventioEvent[]

    updateEvent: (event: EventioEvent) => void

    fetchEvents: () => Promise<void>
    joinEvent: (id: string) => Promise<Result>
    leaveEvent: (id: string) => Promise<Result>
    deleteEvent: (id: string) => Promise<Result>
    createEvent: (title: string, desc: string, startsAt: string, capacity: number) => Promise<Result>

    asyncOpeationInProgress: boolean
}

function FilterEvents(filter: TimeFilter, events: EventioEvent[]): EventioEvent[] {
    return events.filter((event) => {
        const eventDate = new Date(event.startsAt);
        const now = new Date();
        switch (filter) {
            case 'all':
                return true;
            case 'past':
                return eventDate < now;
            case 'future':
                return eventDate > now;
            default:
                return true;
        }
    });
}



function AddNewEventAndPublish(newEvent : EventioEvent) {
    const events = useEventsStore.getState().allEvents;
    events.push(newEvent);
    useEventsStore.getState().allEvents = events;
    const filteredEvents = FilterEvents(useEventsStore.getState().eventsFilter, events);
    useEventsStore.getState().filteredEvents = filteredEvents;
}


function RemoveEventAndPublish(eventId : string) {
    const events = useEventsStore.getState().allEvents;
    const index = events.findIndex((e) => e.id === eventId);
    if (index > -1) {
        events.splice(index, 1);
        useEventsStore.getState().allEvents = events;
        const filteredEvents = FilterEvents(useEventsStore.getState().eventsFilter, events);
        useEventsStore.getState().filteredEvents = filteredEvents;
    }
}


const useEventsStore = create<EventsStore>((set, get) => {
    return {
        allEvents: [],
        filteredEvents: [],
        eventsFilter: 'all',
        eventsLayout: 'default', // Initialize eventsLayout
        asyncOpeationInProgress: false,

        fetchEvents: async () => {
            console.log('Fetching events...');
            try {
                set({ asyncOpeationInProgress: true });
                const response = await api.get('/events');
                const events: EventioEvent[] = await response.json();
                if (!response.ok) {
                    //   console.log(JSON.stringify(response));
                    set({ asyncOpeationInProgress: false });
                    throw new Error(`Error EE: ${response.status} ${response.statusText}`);
                }
                set({ allEvents: events });
                const filteredEvents = FilterEvents(get().eventsFilter, events);
                set({ filteredEvents: filteredEvents });
                set({ asyncOpeationInProgress: false });


                // console.log(`Fetch events success  ${JSON.stringify(events)}}`);

            } catch (error) {
                console.error(error);
                set({ asyncOpeationInProgress: false });
            }
        },

        setEventsFilter: (filter: TimeFilter) => {
            set({ eventsFilter: filter });
            const events = get().allEvents;
            const filteredEvents = FilterEvents(filter, events);
            set({ filteredEvents: filteredEvents });
        },

        setEventsLayout: (layout: CellLayout) => {
            set({ eventsLayout: layout })
        },

        joinEvent: async (id: string): Promise<Result> => {
            console.log(`Joining event ${id} ...`);
            try {
                set({ asyncOpeationInProgress: true });
                const response = await api.post(`/events/${id}/attendees/me`);
                const updatedEvent: EventioEvent = await response.json();

                console.log('Joined event successfully');
                get().updateEvent(updatedEvent);
                set({ asyncOpeationInProgress: false });
                return Success();

            } catch (error) {
                console.error(error);
                set({ asyncOpeationInProgress: false });
                return getUserFriendlyError(error);
            }
        },

        leaveEvent: async (id: string) : Promise<Result> => {
            console.log(`LEaving event ${id} ...`);
            try {
                set({ asyncOpeationInProgress: true });
                const response = await api.delete(`/events/${id}/attendees/me`);
                const updatedEvent: EventioEvent = await response.json();

                get().updateEvent(updatedEvent);
                set({ asyncOpeationInProgress: false });
                console.log('Left event successfully');
                return Success();

            } catch (error) {
                console.error(error);
                set({ asyncOpeationInProgress: false });
                return getUserFriendlyError(error);
            }
        },

        updateEvent: (event: EventioEvent) => {
            const events = get().allEvents;
            const index = events.findIndex((e) => e.id === event.id);
            if (index === -1) {
                console.error(`Event ${event.id} not found`);
                return;
            }
            events[index] = event;
            set({ allEvents: events });
            const filteredEvents = FilterEvents(get().eventsFilter, events);
            set({ filteredEvents: filteredEvents });
        },

        createEvent: async (title: string, desc: string, startsAt: string, capacity: number): Promise<Result> => {
            console.log(`Creating event ${title} ...`);
            try {
                const data = {
                    title: title,
                    description: desc,
                    startsAt: startsAt,
                    capacity: capacity
                }

                const response = await api.post('/events', data);
                const createdEvent: EventioEvent = await response.json();
                
                console.log('Created event successfully');
                AddNewEventAndPublish(createdEvent);
                return Success();

            } catch (error) {
                console.log("Error creating event:", error);
                return getUserFriendlyError(error);
            }
        },

        deleteEvent: async (id: string): Promise<Result> => {
            console.log(`Deleting event ${id} ...`);
            try {
                set({ asyncOpeationInProgress: true });
                await api.delete(`/events/${id}`);

                console.log('Deleted event successfully');
                RemoveEventAndPublish(id);
                set({ asyncOpeationInProgress: false });
                return Success();

            } catch (error) {
                console.error(error);
                set({ asyncOpeationInProgress: false });
                return getUserFriendlyError(error);
            }
        },
    }
})

export default useEventsStore;