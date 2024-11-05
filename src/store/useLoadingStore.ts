import { create } from "zustand";

type LoadingStore = {
    eventsScreenLoading: boolean;
    setEventsScreenLoading: (loading: boolean) => void;
};

const useLoadingStore = create<LoadingStore>((set) => ({
    eventsScreenLoading: false,
    setEventsScreenLoading: (loading: boolean) => set({ eventsScreenLoading: loading }),
}));

export default useLoadingStore;