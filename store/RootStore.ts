import { CellLayout } from "@/constants/CellLayout";
import { TimeFilter } from "@/constants/TimeFilter";
import { create } from 'zustand';

type RootStore = {
    cellLayout: CellLayout;
    setCellLayout: (layout: CellLayout) => void;

    eventsFilter: TimeFilter;
    setEventsFilter: (filter: TimeFilter) => void;
};
  
const useRootStore = create<RootStore>((set) => ({
    cellLayout: 'default', 
    setCellLayout: (layout: CellLayout) => set(() => ({ cellLayout: layout })),

    eventsFilter: 'all',  // Initial value
    setEventsFilter: (filter: TimeFilter ) => set(() => ({ eventsFilter: filter })),
}));

export default useRootStore;