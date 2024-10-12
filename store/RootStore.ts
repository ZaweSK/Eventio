import { CellLayout } from "@/constants/CellLayout";
import { TimeFilter } from "@/constants/TimeFilter";
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware'

type AuthState = {
    accessToken: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthorised: () => boolean;
  };

type RootStore = {
    cellLayout: CellLayout;
    setCellLayout: (layout: CellLayout) => void;

    eventsFilter: TimeFilter;
    setEventsFilter: (filter: TimeFilter) => void;

    accessToken: string | null;
    setAccessToken: (token: string | null) => void;
};
  
const useRootStore = create<RootStore>((set) => ({
    cellLayout: 'default', 
    setCellLayout: (layout: CellLayout) => set(() => ({ cellLayout: layout })),

    eventsFilter: 'all',  // Initial value
    setEventsFilter: (filter: TimeFilter ) => set(() => ({ eventsFilter: filter })),

    accessToken: null,
    setAccessToken: (token: string | null) => set(() => ({ accessToken: token })),
}));

// export const useRootStore = create<RootStore>()(
//     persist(
//       // you can create more slices for other app features
//       (...args) => ({ ...authSlice(...args) }),
//       {
//         name: 'app-storage',
//         storage: createJSONStorage(() => mmkvStorage),
//         // allow only accessToken to be persisted on the device
//         partialize: (state: IStore) => ({ accessToken: state.accessToken }),
//       },
//     ),
//   );

export default useRootStore;

