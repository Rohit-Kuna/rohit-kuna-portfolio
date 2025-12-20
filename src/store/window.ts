import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants/content";
import type { WindowKey, WindowState, WindowStore } from "#types/contentTypes";


/* ---------- Store State ---------- */



/* ---------- Helper ---------- */

const cloneInitialWindows = (): Record<WindowKey, WindowState> =>
  structuredClone(WINDOW_CONFIG);

/* ---------- Store ---------- */

const useWindowStore = create<WindowStore>()(
  immer((set) => ({
    windows: cloneInitialWindows(),
    nextZIndex: INITIAL_Z_INDEX + 1,

    /* ---------- Open ---------- */
    openWindow: (key, data) =>
      set((state) => {
        const win = state.windows[key];
        if (!win) return;

        win.isOpen = true;
        win.zIndex = state.nextZIndex;
        if (data !== undefined) {
          win.data = data;
        }

        state.nextZIndex++;
      }),

    /* ---------- Close ---------- */
    closeWindow: (key) =>
      set((state) => {
        const win = state.windows[key];
        if (!win) return;

        win.isOpen = false;
        win.isMaximized = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
      }),

    /* ---------- Focus ---------- */
    focusWindow: (key) =>
      set((state) => {
        const win = state.windows[key];
        if (!win) return;

        win.zIndex = state.nextZIndex;
        state.nextZIndex++;
      }),

    /* ---------- Maximize / Restore ---------- */
    toggleMaximizeWindow: (key) =>
      set((state) => {
        const win = state.windows[key];
        if (!win) return;

        win.isMaximized = !win.isMaximized;
        win.zIndex = state.nextZIndex;
        state.nextZIndex++;
      }),

  }))
);

export default useWindowStore;
