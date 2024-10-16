import { create } from "zustand";

type EventsStore = {
   events : string[]
   fetchEvents : () => Promise<void>
}

const useAuthStore = create<EventsStore>((set) => {
    return { 
        events: [], 
        fetchEvents: async () => {}}
})