"use client";

import { useEffect, useRef, useState } from "react";

export function useInViewport<T extends HTMLElement>(
  opts: IntersectionObserverInit = {},
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px", threshold: 0.01, ...opts },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, inView };
}
