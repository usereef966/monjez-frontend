// StarBubblesEffect.jsx
import React, { useRef, useEffect } from "react";

export default function StarBubblesEffect({ count = 23 }) {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    let animationFrameId;

    function random(min, max) {
      return Math.random() * (max - min) + min;
    }

    // نجوم/فقاعات
    const particles = Array.from({ length: count }).map(() => ({
      x: random(0, width),
      y: random(0, height),
      r: random(2.1, 7),
      speed: random(0.13, 0.31),
      color: Math.random() > 0.6
        ? `rgba(100,210,255,${random(.23,.45)})`
        : `rgba(37, 255, 166,${random(.14,.30)})`,
      vy: random(-0.12, 0.22),
      vx: random(-0.11, 0.11),
      type: Math.random() > 0.77 ? "star" : "bubble"
    }));

    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (let p of particles) {
        ctx.save();
        ctx.globalAlpha = 0.73;
        ctx.beginPath();
        if (p.type === "star") {
          // نجم من 5 رؤوس
          const spikes = 5, outerRadius = p.r, innerRadius = p.r * .55;
          let rot = Math.PI / 2 * 3, x = p.x, y = p.y;
          ctx.moveTo(x, y - outerRadius);
          for (let i = 0; i < spikes; i++) {
            ctx.lineTo(
              x + Math.cos(rot) * outerRadius,
              y + Math.sin(rot) * outerRadius
            );
            rot += Math.PI / spikes;
            ctx.lineTo(
              x + Math.cos(rot) * innerRadius,
              y + Math.sin(rot) * innerRadius
            );
            rot += Math.PI / spikes;
          }
          ctx.lineTo(x, y - outerRadius);
          ctx.closePath();
          ctx.fillStyle = "#ffe285";
          ctx.shadowColor = "#ffd94d";
          ctx.shadowBlur = 8;
        } else {
          // فقاعة
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
        }
        ctx.fill();
        ctx.restore();

        // حركة الفقاعات
        p.y += p.speed + p.vy;
        p.x += p.vx;
        // انفجار وهمي إذا وصلت لأسفل أو حواف
        if (p.y > height + 13 || p.x < -11 || p.x > width + 11) {
          p.x = random(0, width);
          p.y = random(-14, 8);
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener("resize", () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [count]);

  // اضبط المقاس حسب مكانك (غالبًا 100% العرض، و220-260px الارتفاع)
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        left: 0, right: 0, bottom: 0, width: "100%",
        height: 220, zIndex: 2, pointerEvents: "none"
      }}
      width={1200}
      height={220}
    />
  );
}
