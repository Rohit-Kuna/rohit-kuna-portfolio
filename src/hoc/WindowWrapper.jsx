import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef(null);

    // ---- DRAGGABLE ----
useGSAP(() => {
  const el = ref.current;
  if (!el) return;

  const [instance] = Draggable.create(el, {
    onPress: () => focusWindow(windowKey),
    bounds: window,
  });

  return () => instance.kill();
}, []);

    // ---- OPEN ANIMATION ----
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      el.style.display = "block";

      gsap.fromTo(
        el,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
    }, [isOpen]);

    // ---- SHOW / HIDE ----
    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

      el.style.display = isOpen ? "block" : "none";
    }, [isOpen]);


    // ---- CLICK OUTSIDE TO CLOSE ALL WINDOWS ----
    // useLayoutEffect(() => {
    //   if (!isOpen) return;

    //   const el = ref.current;
    //   if (!el) return;

    //   const handleClickOutside = (e) => {
    //     // Ignore clicks inside the window
    //     if (el.contains(e.target)) return;

    //     // Ignore clicks on dock/app icons
    //     if (e.target.closest("[data-app]")) return;

    //     // Close ALL windows
    //     const store = useWindowStore.getState();
    //     Object.keys(store.windows).forEach((key) => {
    //       store.closeWindow(key);
    //     });
    //   };

    //   document.addEventListener("mousedown", handleClickOutside);

    //   return () =>
    //     document.removeEventListener("mousedown", handleClickOutside);
    // }, [isOpen]);


    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        className="absolute max-h-[70vh] overflow-y-auto mac-scrollbar"
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
