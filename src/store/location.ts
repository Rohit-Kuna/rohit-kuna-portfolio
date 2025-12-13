import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { locations } from "#constants/content";
import type { Location, NavigableFolder } from "#types/contentTypes";

/* ---------- Defaults ---------- */

const DEFAULT_LOCATION: Location = locations.work;

/* ---------- Store Type ---------- */

// type LocationStore = {
//   activeLocation: Location | null;
//   setActiveLocation: (location: Location | null) => void;
//   resetActiveLocation: () => void;
// };

type LocationStore = {
  activeLocation: NavigableFolder | null;
  setActiveLocation: (location: NavigableFolder | null) => void;
  resetActiveLocation: () => void;
};


/* ---------- Store ---------- */

const useLocationStore = create<LocationStore>()(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,

    setActiveLocation: (location) =>
      set((state) => {
        state.activeLocation = location;
      }),

    resetActiveLocation: () =>
      set((state) => {
        state.activeLocation = DEFAULT_LOCATION;
      })
  }))
);

export default useLocationStore;
