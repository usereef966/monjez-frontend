import { useEffect, useRef, useState } from "react";

export default function AnimatedNumber({ value, duration = 1200 }) {
  const [display, setDisplay] = useState(0);
  const rafId = useRef();

  useEffect(() => {
    let start;
    function animate(ts) {
      if (start === undefined) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setDisplay(Math.floor(progress * value));
      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate);
      } else {
        setDisplay(value);
      }
    }
    rafId.current = requestAnimationFrame(animate);
    return () => rafId.current && cancelAnimationFrame(rafId.current);
  }, [value, duration]);

  return <tspan>{display}</tspan>;
}
