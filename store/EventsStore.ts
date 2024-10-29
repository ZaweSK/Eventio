import { create } from "zustand";
import ApiService from "./ApiService";
import { TimeFilter } from "@/constants/TimeFilter";
import { CellLayout } from "@/constants/CellLayout";
import { UserFriendlyError, Result, Success } from "@/utils/result/Result";
import { AsyncError } from "@/utils/result/AsyncError";

const api = new ApiService();

type EventsStore = {
   eventsFilter : TimeFilter
   setEventsFilter: (filter: TimeFilter) => void

   eventsLayout: CellLayout
   setEventsLayout: (layout: CellLayout) => void

   allEvents : EventioEvent[]
   filteredEvents : EventioEvent[]

   updateEvent: (event: EventioEvent) => void

   fetchEvents: () => Promise<void>
   joinEvent: (id: string) => Promise<void>
   leaveEvent: (id: string) => Promise<void>
   deleteEvent: (id: string) => Promise<void>
   createEvent: (title: string, desc: string, startsAt: string, capacity: number) => Promise<Result>

   asyncOpeationInProgress : boolean
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
            set({eventsLayout: layout})
        },

        joinEvent: async (id: string) => {
            console.log(`Joining event ${id} ...`);
            try {
                set({ asyncOpeationInProgress: true });
                const response = await api.post(`/events/${id}/attendees/me`);
                const updatedEvent: EventioEvent = await response.json();
                if (!response.ok) {
                  console.log(JSON.stringify(response));
                  set({ asyncOpeationInProgress: false });
                  throw new Error(`Error EE: ${response.status} ${response.statusText}`);
                }
         
                set({ asyncOpeationInProgress: false });
                console.log('Joined event successfully');
                get().updateEvent(updatedEvent);

            } catch (error) {
                console.error(error);
                set({ asyncOpeationInProgress: false });
            }
        },

        leaveEvent: async (id: string) => {
            console.log(`LEaving event ${id} ...`);
            try {
                set({ asyncOpeationInProgress: true });
                const response = await api.delete(`/events/${id}/attendees/me`);
                const updatedEvent: EventioEvent = await response.json();
                if (!response.ok) {
                  console.log(JSON.stringify(response));
                  set({ asyncOpeationInProgress: false });
                  throw new Error(`Error EE: ${response.status} ${response.statusText}`);
                }
         
                set({ asyncOpeationInProgress: false });
                console.log('Left event successfully');
                get().updateEvent(updatedEvent);

            } catch (error) {
                console.error(error);
                set({ asyncOpeationInProgress: false });
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

        createEvent: async (title: string, desc: string, startsAt: string, capacity: number) : Promise<Result> => {
            console.log(`Creating event ${title} ...`);
            try {
                set({ asyncOpeationInProgress: true });

                const data =   {title: title,
                description: desc,
                startsAt: startsAt,
                capacity: capacity
                }     

                const response = await api.post('/events',  data );
                const createdEvent: EventioEvent = await response.json();
                
                set({ asyncOpeationInProgress: false });
                console.log('Created event successfully');

                const events = get().allEvents;
                events.push(createdEvent);
                set({ allEvents: events });
                const filteredEvents = FilterEvents(get().eventsFilter, events);
                set({ filteredEvents: filteredEvents });
                return Success();

            } catch (error) {
                console.log("Error creating event:", error);
                
                set({ asyncOpeationInProgress: false });
                if (error instanceof AsyncError) {
                    console.log(1, JSON.stringify(error));
                    return Promise.resolve(UserFriendlyError(error.issues));
                }
                console.log(2);
                
                return Promise.resolve(UserFriendlyError("Something went wrong. Please try again."));
            }
        },

        deleteEvent: async (id: string) => {
            console.log(`Deleting event ${id} ...`);
            try {
                set({ asyncOpeationInProgress: true });

                const response = await api.delete(`/events/${id}`);
                if (!response.ok) {
                  console.log(JSON.stringify(response));
                  set({ asyncOpeationInProgress: false });
                  throw new Error(`Error EE: ${response.status} ${response.statusText}`);
                }
         
                set({ asyncOpeationInProgress: false });
                console.log('Deleted event successfully');

                const events = get().allEvents;
                const index = events.findIndex((e) => e.id === id);
                if (index > -1) {
                    events.splice(index, 1);
                    set({ allEvents: events });
                    const filteredEvents = FilterEvents(get().eventsFilter, events);
                    set({ filteredEvents: filteredEvents });
                }
              
            } catch (error) {
                console.error(error);
                set({ asyncOpeationInProgress: false });
            }
        },
    }
})

export default useEventsStore;