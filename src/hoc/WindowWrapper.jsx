import useWindowStore from "#store/window";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Flip from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Flip);

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef(null);
    const firstRender = useRef(true);

    useGSAP(()=>{
      const el=ref.current;
      if(!el) return;
      const [instance] = Draggable.create(el, {onPress:()=>focusWindow(windowkey)});
      return ()=> instance.kill();
    },[]);

    useEffect(() => {
      const el = ref.current;
      if (!el) return;

      const iconEl = document.querySelector(`[data-app="${windowKey}"]`);
      if (!iconEl) return;

      // Prevent animation on initial load
      if (firstRender.current) {
        firstRender.current = false;
        el.style.display = isOpen ? "block" : "none";
        return;
      }

      // (your animation logic here…)
    }, [isOpen]);


    // ⭐ NEW: CLOSE WINDOW WHEN CLICKING OUTSIDE
    useEffect(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      const handleClickOutside = (e) => {
        // ignore clicks *inside* this window
        if (el.contains(e.target)) return;

        // ignore clicks on dock icon
        const iconEl = document.querySelector(`[data-app="${windowKey}"]`);
        if (iconEl?.contains(e.target)) return;

        // close window
        useWindowStore.getState().closeWindow(windowKey);
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);


    useEffect(() => {
      const el = ref.current;
      if (!el) return;

      const iconEl = document.querySelector(`[data-app="${windowKey}"]`);
      if (!iconEl) return;

      // 🚫 Prevent animation on initial load
      if (firstRender.current) {
        firstRender.current = false;
        el.style.display = isOpen ? "block" : "none";
        return;
      }

      const iconRect = iconEl.getBoundingClientRect();
      const winRect = el.getBoundingClientRect();

      const offsetX =
        iconRect.left + iconRect.width / 2 -
        (winRect.left + winRect.width / 2);

      const offsetY =
        iconRect.top + iconRect.height / 2 -
        (winRect.top + winRect.height / 2);

      if (isOpen) {
        el.style.display = "block";

        gsap.fromTo(
          el,
          {
            opacity: 0.4,
            scaleY: 0.05,
            scaleX: 0.45,
            y: offsetY + 30,
            x: offsetX,
            skewY: 18,
            perspective: 600,
            borderRadius: "32px",
            filter: "blur(6px)",
            transformOrigin: "bottom center",
          },
          {
            opacity: 1,
            scaleY: 1,
            scaleX: 1,
            y: 0,
            x: 0,
            skewY: 0,
            borderRadius: "12px",
            filter: "blur(0px)",
            duration: 0.55,
            ease: "power4.out",
          }
        );
      } else {
        gsap.to(el, {
          opacity: 0.35,
          scaleY: 0.05,
          scaleX: 0.45,
          y: offsetY + 30,
          x: offsetX,
          skewY: 18,
          filter: "blur(8px)",
          borderRadius: "32px",
          transformOrigin: "bottom center",
          duration: 0.45,
          ease: "power4.in",
          onComplete: () => {
            el.style.display = "none";
            el.style.opacity = 1;
          }
        });
      }
    }, [isOpen]);

    return (
      <section
        id={windowKey}
        ref={ref}
        className="absolute"
        style={{ zIndex, display: "none" }}   // ← CRITICAL FIX
      >
        <Component {...props} />
      </section>
    );

  };

  return Wrapped;
};

export default WindowWrapper;
