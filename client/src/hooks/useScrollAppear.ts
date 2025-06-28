
import { useEffect, useRef } from "react";

/**
 * Automatically adds fade/slide-in effect when an element appears in viewport.
 * Usage: const ref = useScrollAppear();
 * <div ref={ref} ... data-scroll-appear />
 */
export default function useScrollAppear() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const appear = () => {
      node.classList.remove("opacity-0", "translate-y-10");
      node.classList.add("opacity-100", "translate-y-0");
    };

    if ("IntersectionObserver" in window) {
      const obs = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            appear();
            obs.disconnect();
          }
        },
        { threshold: 0.18 }
      );
      obs.observe(node);

      return () => obs.disconnect();
    } else {
      appear();
    }
  }, []);

  return ref;
}
