import { create } from "zustand";
import ApiService from "./ApiService";
import { TimeFilter } from "@/constants/TimeFilter";
import { CellLayout } from "@/constants/CellLayout";

const api = new ApiService();

type EventsStore = {
   eventsFilter : TimeFilter
   setEventsFilter: (filter: TimeFilter) => void

   eventsLayout: CellLayout
   setEventsLayout: (layout: CellLayout) => void

   allEvents : EventioEvent[]
   filteredEvents : EventioEvent[]
   fetchEvents: () => Promise<void>

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
                  console.log(JSON.stringify(response));
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
        }
    }
})

export default useEventsStore;