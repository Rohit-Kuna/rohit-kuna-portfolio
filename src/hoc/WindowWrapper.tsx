import { useWindowStore } from "#store/window";
import { useGSAP } from "@gsap/react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import type { ComponentType, PropsWithChildren } from "react";
import type { WindowState, WindowStore, WindowKey } from "#store/window";

gsap.registerPlugin(Draggable);

/* ---------- HOC ---------- */

const WindowWrapper = <P extends object>(
  Component: ComponentType<P>,
  windowKey: WindowKey
) => {
  const Wrapped = (props: PropsWithChildren<P>) => {
    const { focusWindow, windows } = useWindowStore() as WindowStore;

    const windowState: WindowState = windows[windowKey];

    const isOpen = windowState?.isOpen ?? false;
    const isMaximized = windowState?.isMaximized ?? false;
    const zIndex = windowState?.zIndex ?? 0;

    const ref = useRef<HTMLElement | null>(null);
    const dragInstance = useRef<Draggable | null>(null);

    // ✅ Per-window drag memory
    const lastPosition = useRef({ x: 0, y: 0 });

    /* ---------- DRAGGABLE ---------- */
    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      const draggables = Draggable.create(el, {
        onPress: () => focusWindow(windowKey),
        bounds: window,

        onDragEnd: function () {
          lastPosition.current = {
            x: this.x,
            y: this.y
          };
        }
      });

      const instance = draggables[0];
      if (!instance) return;

      dragInstance.current = instance;

      return () => instance.kill();
    }, []);

    /* ---------- ENABLE / DISABLE DRAG ---------- */
    useGSAP(() => {
      if (!dragInstance.current) return;

      if (isMaximized) {
        dragInstance.current.disable();
      } else {
        dragInstance.current.enable();
      }
    }, [isMaximized]);

    /* ---------- RESET POSITION ON MAXIMIZE ---------- */
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isMaximized) return;

      gsap.set(el, {
        x: 0,
        y: 0,
        clearProps: "transform"
      });
    }, [isMaximized]);

    /* ---------- RESTORE POSITION ON MINIMIZE ---------- */
    useGSAP(() => {
      const el = ref.current;
      if (!el || isMaximized) return;

      const { x, y } = lastPosition.current;

      gsap.set(el, {
        x,
        y
      });
    }, [isMaximized]);

    /* ---------- OPEN ANIMATION (UNCHANGED) ---------- */
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      el.style.display = "block";

      gsap.fromTo(
        el,
        { scale: 0.8, opacity: 0, y: 40 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out"
        }
      );
    }, [isOpen]);

    /* ---------- SHOW / HIDE ---------- */
    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

      el.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        className={`absolute ${isMaximized ? "window-maximized" : ""}`}
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${
    Component.displayName || Component.name || "Component"
  })`;

  return Wrapped;
};

export default WindowWrapper;
