import { create } from "zustand";
import { TimeFilter } from '@/src/types/TimeFilter';
import { CellLayout } from '@/src/types/CellLayout';

type EventsStore = {
    eventsFilter: TimeFilter
    setEventsFilter: (filter: TimeFilter) => void

    eventsLayout: CellLayout
    setEventsLayout: (layout: CellLayout) => void
}

const useEventsStore = create<EventsStore>((set, get) => {
    return {
        allEvents: [],
        filteredEvents: [],
        eventsFilter: 'all',
        eventsLayout: 'default',

        setEventsFilter: (filter: TimeFilter) => {
            set({ eventsFilter: filter });
        },

        setEventsLayout: (layout: CellLayout) => {
            set({ eventsLayout: layout })
        }
    }
})

export default useEventsStore;