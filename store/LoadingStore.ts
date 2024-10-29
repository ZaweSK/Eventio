import { create } from "zustand";

type LoadingStore = {
    loading: boolean;
    setLoading: (loading: boolean) => void;
};

const useLoadingStore = create<LoadingStore>((set) => ({
    loading: false,
    setLoading: (loading: boolean) => set({ loading }),
}));

export default useLoadingStore;