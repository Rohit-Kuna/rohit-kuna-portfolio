import { create } from "zustand";

/* --- Window Types --- */

export type WindowKey =
  | "finder"
  | "contact"
  | "resume"
  | "safari"
  | "photos"
  | "terminal"
  | "txtfile"
  | "imgfile";

export type WindowState<T = unknown> = {
  isOpen: boolean;
  zIndex: number;
  data: T | null;
  isMaximized: boolean;
};

export type WindowStore = {
  windows: Record<WindowKey, WindowState>;
  nextZIndex: number;

  openWindow: <T = unknown>(key: WindowKey, data?: T) => void;
  closeWindow: (key: WindowKey) => void;
  focusWindow: (key: WindowKey) => void;
  toggleMaximizeWindow: (key: WindowKey) => void;
};

/* ---------- Constants ---------- */

const INITIAL_Z_INDEX = 1000;

const INITIAL_WINDOWS_STATE: Record<WindowKey, WindowState> = {
  finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, isMaximized: false },
  contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, isMaximized: false },
  resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, isMaximized: false },
  safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, isMaximized: false },
  photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, isMaximized: false },
  terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, isMaximized: false },
  txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, isMaximized: false },
  imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, isMaximized: false }
};

/* ---------- Store ---------- */

export const useWindowStore = create<WindowStore>((set) => ({
  windows: INITIAL_WINDOWS_STATE,
  nextZIndex: INITIAL_Z_INDEX + 1,

  /* ---------- Open ---------- */
  openWindow: (key, data) =>
    set((state) => {
      const win = state.windows[key];
      if (!win) return state;

      return {
        windows: {
          ...state.windows,
          [key]: {
            ...win,
            isOpen: true,
            isMaximized: false,
            zIndex: state.nextZIndex,
            data: data ?? win.data
          }
        },
        nextZIndex: state.nextZIndex + 1
      };
    }),

  /* ---------- Close ---------- */
  closeWindow: (key) =>
    set((state) => {
      const win = state.windows[key];
      if (!win) return state;

      return {
        windows: {
          ...state.windows,
          [key]: {
            ...win,
            isOpen: false,
            isMaximized: false,
            zIndex: INITIAL_Z_INDEX,
            data: null
          }
        }
      };
    }),

  /* ---------- Focus ---------- */
  focusWindow: (key) =>
    set((state) => {
      const win = state.windows[key];
      if (!win) return state;

      return {
        windows: {
          ...state.windows,
          [key]: {
            ...win,
            zIndex: state.nextZIndex
          }
        },
        nextZIndex: state.nextZIndex + 1
      };
    }),

  /* ---------- Maximize / Restore ---------- */
  toggleMaximizeWindow: (key) =>
    set((state) => {
      const win = state.windows[key];
      if (!win) return state;

      return {
        windows: {
          ...state.windows,
          [key]: {
            ...win,
            isMaximized: !win.isMaximized,
            zIndex: state.nextZIndex
          }
        },
        nextZIndex: state.nextZIndex + 1
      };
    }),
}));
