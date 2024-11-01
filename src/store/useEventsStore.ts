import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { create } from "zustand";
import ApiService from "./ApiService";
import { TimeFilter } from "@/src/constants/TimeFilter";
import { CellLayout } from "@/src/constants/CellLayout";
import { UserFriendlyError, Result, Success } from "@/src/utils/result/Result";
import getUserFriendlyError from "@/src/utils/getUserFriendlyError";
import { EventioEvent } from "@/src/types/EventioEvent";
import api from "@/src/api/apiClient";
import { useQuery } from '@tanstack/react-query';


// ================================================= PRIVATE METHODS  ================================================
function filterEvents(filter: TimeFilter, events: EventioEvent[]): EventioEvent[] {
    const now = new Date();
    return events.filter((event) => {
        const eventDate = new Date(event.startsAt);
        if (filter === 'past') return eventDate < now;
        if (filter === 'future') return eventDate > now;
        return true; // 'all'
    });
}

function locallyAddNewEventAndPublish(newEvent : EventioEvent) {
    const events = useEventsStore.getState().allEvents;
    events.push(newEvent);
    useEventsStore.setState({ allEvents: events });
    refreshFilteredEvents();
}

function locallyRemoveEventAndPublish(eventId : string) {
    const events = useEventsStore.getState().allEvents;
    const index = events.findIndex((e) => e.id === eventId);
    if (index > -1) {
        events.splice(index, 1);
        useEventsStore.setState({ allEvents: events });
        refreshFilteredEvents();
    }
}

function refreshFilteredEvents() {
    const events = useEventsStore.getState().allEvents;
    const filteredEvents = filterEvents(useEventsStore.getState().eventsFilter, events);
    useEventsStore.setState({ filteredEvents: filteredEvents });
}

function updateEvent(event: EventioEvent) {
    useEventsStore.getState().updateEvent(event);
}

//============================================== STORE SETUP ==========================================================

type EventsStore = {
    eventsFilter: TimeFilter
    setEventsFilter: (filter: TimeFilter) => void

    eventsLayout: CellLayout
    setEventsLayout: (layout: CellLayout) => void

    allEvents: EventioEvent[]
    filteredEvents: EventioEvent[]

    fetchEvents: () => Promise<Result>
    joinEvent: (id: string) => Promise<Result>
    leaveEvent: (id: string) => Promise<Result>
    deleteEvent: (id: string) => Promise<Result>
    updateEvent: (event: EventioEvent) => void
    createEvent: (title: string, desc: string, startsAt: string, capacity: number) => Promise<Result>

    asyncOpeationInProgress: boolean
}

const fetchEvents = async (): Promise<EventioEvent[]> => {
    const { data } = await api.get<EventioEvent[]>('/events');
    return data;
  };

const useEventsStore = create<EventsStore>((set, get) => {
    return {
        allEvents: [],
        filteredEvents: [],
        eventsFilter: 'all',
        eventsLayout: 'default',
        asyncOpeationInProgress: false,

        setEventsFilter: (filter: TimeFilter) => {
            set({ eventsFilter: filter });
            refreshFilteredEvents();
        },

        setEventsLayout: (layout: CellLayout) => {
            set({ eventsLayout: layout })
        },

      

        fetchEvents: async () => {
            console.log('Fetching events...');

            const { data: events, error, isLoading, isError } = useQuery({
                queryKey: ['events'],
                queryFn: fetchEvents,
            });
            set({ allEvents: events });
            refreshFilteredEvents();



            // try {
            //     set({ asyncOpeationInProgress: true });
            //     const { data: events } = await api.get<EventioEvent[]>('/events');
            //     set({ allEvents: events });
            //     refreshFilteredEvents();
            //     return Success();
            // } catch (error) {
            //     console.error(`Fetching events failed. Error ${error}`);
            //     return getUserFriendlyError(error);
            // } finally {
            //     set({ asyncOpeationInProgress: false });
            // }
        },

        joinEvent: async (id: string): Promise<Result> => {
            console.log(`Joining event ${id} ...`);
            try {
                set({ asyncOpeationInProgress: true });
                const { data: updatedEvent } = await api.post<EventioEvent>(`/events/${id}/attendees/me`);
                console.log(`Joined event ${id} successfully`);
                get().updateEvent(updatedEvent);
                return Success();
            } catch (error) {
                console.error(`Joining event ${id} failed. Error ${error}`);
                return getUserFriendlyError(error);
            } finally {
                set({ asyncOpeationInProgress: false });
            }
        },

        leaveEvent: async (id: string) : Promise<Result> => {
            console.log(`Leaving event ${id} ...`);
            try {
                set({ asyncOpeationInProgress: true });
                const { data: updatedEvent } = await api.delete<EventioEvent>(`/events/${id}/attendees/me`);
                console.log('Left event successfully');
                updateEvent(updatedEvent);
                return Success();
            } catch (error) {
                console.error(`Leaving event ${id} failed. Error ${error}`);
                return getUserFriendlyError(error);
            } finally {
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
            const filteredEvents = filterEvents(get().eventsFilter, events);
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
                const { data: createdEvent } = await api.post('/events', data);                
                console.log('Created event successfully');
                locallyAddNewEventAndPublish(createdEvent);
                return Success();
            } catch (error) {
                console.error(`Creating event ${title} failed. Error ${error}`);
                return getUserFriendlyError(error);
            } finally {
                set({ asyncOpeationInProgress: false });
            }
        },

        deleteEvent: async (id: string): Promise<Result> => {
            console.log(`Deleting event ${id} ...`);
            try {
                set({ asyncOpeationInProgress: true });
                await api.delete(`/events/${id}`);
                console.log('Deleted event successfully');
                locallyRemoveEventAndPublish(id);
                return Success();
            } catch (error) {
                console.error(`Deleting event ${id} failed. Error ${error}`);
                return getUserFriendlyError(error);
            } finally {
                set({ asyncOpeationInProgress: false });
            }
        },
    }
})

export default useEventsStore;