import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import type { ComponentType, PropsWithChildren } from "react";
import type { WindowState, WindowStore , WindowKey} from "#types/contentTypes";

gsap.registerPlugin(Draggable);

/* ---------- HOC ---------- */

const WindowWrapper = <P extends object>( Component: ComponentType<P>, windowKey: WindowKey ) => {
  const Wrapped = (props: PropsWithChildren<P>) => {
  const { focusWindow, windows } = useWindowStore() as WindowStore;
  const windowState: WindowState = windows[windowKey];
  const isOpen = windowState?.isOpen ?? false;
  const zIndex = windowState?.zIndex ?? 0;
  const ref = useRef<HTMLElement | null>(null);
  /* ---------- DRAGGABLE ---------- */
  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const draggables = Draggable.create(el, {
      onPress: () => focusWindow(windowKey),
      bounds: window
    });
    const instance = draggables[0];
    return () => instance?.kill();
  }, []);

  /* ---------- OPEN ANIMATION ---------- */
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
      <>
        <section
          id={windowKey}
          ref={ref}
          style={{ zIndex }}
          className="absolute"
        >
          <Component {...props} />
        </section>
      </>
    );
  };

  // React Dev Tools Debugging
  Wrapped.displayName = `WindowWrapper(${
    Component.displayName || Component.name || "Component"
  })`;
  return Wrapped;
};

export default WindowWrapper;
