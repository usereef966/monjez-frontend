import React, { useEffect, useState } from "react";

function AnimatedNumber({ value, duration = 900, format = v => v }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    let startTime;
    let anim;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = Math.floor(progress * (value - start) + start);
      setDisplay(current);
      if (progress < 1) {
        anim = requestAnimationFrame(step);
      } else {
        setDisplay(value);
      }
    }
    anim = requestAnimationFrame(step);
    return () => cancelAnimationFrame(anim);
  }, [value, duration]);

  return <span>{format(display)}</span>;
}

export default AnimatedNumber;
