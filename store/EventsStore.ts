import { create } from "zustand";
import ApiService from "./ApiService";
import { TimeFilter } from "@/constants/TimeFilter";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const api = new ApiService();

type EventsStore = {
   eventsFilter : TimeFilter
   allEvents : EventioEvent[]
   filteredEvents : EventioEvent[]
   fetchEvents : () => Promise<void>
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

                // console.log(`FetchEvents success: ${response.json()}`);


                // console.log(JSON.stringify(json))

                // const events: EventioEvent[] = JSON.parse(json);
                set({ allEvents: events });

                const filteredEvents = FilterEvents(get().eventsFilter, events);
                set({ filteredEvents: filteredEvents });
                set({ asyncOpeationInProgress: false });
                console.log('Fetch events success');
                console.log(filteredEvents.length);

            } catch (error) {
                console.error(error);
            }
        }}
})

export default useEventsStore;