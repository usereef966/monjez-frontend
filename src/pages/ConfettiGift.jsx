// src/pages/ConfettiGift.jsx
import React, { useEffect } from "react";
import confetti from "canvas-confetti";

export default function ConfettiGift() {
  useEffect(() => {
    confetti({ particleCount: 150, spread: 60, origin: { y: 0.6 } });
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}
