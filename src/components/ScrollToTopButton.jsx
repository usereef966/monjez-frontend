import React, { useEffect, useRef, useState } from "react";
import Footer from './Footer'; // استبدل باسم الفوتر الأساسي لو مختلف

// ----------- زر العودة للأعلى (نيون + جلاس) -----------
function NeonScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 220);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      className={`cosmic-scrollup${visible ? " show" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="العودة للأعلى"
    >
      <svg width="40" height="40" viewBox="0 0 40 40">
        <defs>
          <radialGradient id="neonglow" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="#fff7" />
            <stop offset="100%" stopColor="#8a4cff" stopOpacity="0.26" />
          </radialGradient>
        </defs>
        <circle cx="20" cy="20" r="17" fill="url(#neonglow)" />
        <path d="M12 24 L20 16 L28 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="20" cy="16" r="2" fill="#fff" />
      </svg>
    </button>
  );
}

// ----------- بارتكلز (نجوم تتراقص) Canvas -----------
function FooterParticles() {
  const canvasRef = useRef();
  useEffect(() => {
    let raf, W, H, ctx, particles = [];
    function resize() {
      W = canvasRef.current.width = window.innerWidth;
      H = canvasRef.current.height = 200;
    }
    function Particle() {
      this.x = Math.random() * W;
      this.y = Math.random() * H * 0.7 + 50;
      this.r = Math.random() * 2 + 1.3;
      this.dx = (Math.random() - 0.5) * 0.8;
      this.dy = (Math.random() - 0.7) * 0.5;
      this.alpha = Math.random() * 0.6 + 0.2;
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (let p of particles) {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = "#c5b3ff";
        ctx.shadowColor = "#a18fff";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) {
          Object.assign(p, new Particle());
          p.x = Math.random() * W;
          p.y = H + 10;
        }
      }
      raf = requestAnimationFrame(draw);
    }
    ctx = canvasRef.current.getContext("2d");
    resize();
    for (let i = 0; i < 35; i++) particles.push(new Particle());
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="footer-particles"
      style={{
        position: "absolute", bottom: 0, right: 0, left: 0, pointerEvents: "none", zIndex: 2,
      }}
    />
  );
}

// ----------- موجة SVG Animated -----------
function FooterWave() {
  return (
    <svg
      viewBox="0 0 1920 120"
      style={{
        position: "absolute", top: "-74px", right: 0, left: 0, width: "100%", zIndex: 2,
        pointerEvents: "none"
      }}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="waveg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a18fff" />
          <stop offset="70%" stopColor="#7a4aff" />
          <stop offset="100%" stopColor="#232645" />
        </linearGradient>
      </defs>
      <path>
        <animate attributeName="d" dur="6s" repeatCount="indefinite"
          values="
            M0,90 Q520,140 960,65 T1920,80 V120 H0 Z;
            M0,80 Q520,50 960,100 T1920,70 V120 H0 Z;
            M0,100 Q520,90 960,80 T1920,90 V120 H0 Z;
            M0,90 Q520,140 960,65 T1920,80 V120 H0 Z
          "
        />
      </path>
      <path
        d="M0,90 Q520,140 960,65 T1920,80 V120 H0 Z"
        fill="url(#waveg)"
        opacity="0.95"
      />
    </svg>
  );
}

// ----------- حركة سرية (Shortcut) -----------
function useSecretAction() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    function onKey(e) {
      // "منجز" أو Ctrl+M
      if ((e.ctrlKey && e.key.toLowerCase() === 'm') ||
        (e.key === 'م' || e.key === 'n' || e.key === 'ج' || e.key === 'z')) {
        setShow(true);
        setTimeout(() => setShow(false), 2000);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return show;
}

// ----------- التجميع النهائي -----------
export default function CosmicFooter() {
  const showSecret = useSecretAction();
  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      {/* موجة متحركة */}
      <FooterWave />
      {/* بارتكلز فوق الفوتر */}
      <FooterParticles />
      {/* الفوتر العادي */}
      <Footer />
      {/* زر العودة للأعلى نيون + جلاس */}
      <NeonScrollToTop />
      {/* حركة سرية */}
      {showSecret && (
        <div style={{
          position: "fixed",
          left: 0, right: 0, bottom: 110, zIndex: 9999,
          display: "flex", justifyContent: "center", pointerEvents: "none"
        }}>
          <div style={{
            background: "linear-gradient(90deg, #7a4aff 10%, #a18fff 80%)",
            color: "#fff", fontWeight: "bold", fontSize: 22,
            padding: "20px 38px", borderRadius: 30, boxShadow: "0 2px 28px #7a4aff88",
            border: "2.5px solid #fff4",
            transform: "scale(1.18)",
            opacity: 0.98,
            filter: "drop-shadow(0 8px 40px #a18fff)"
          }}>
            👑 حركة منجز السحرية! أنت ملك الإبداع 👑
          </div>
        </div>
      )}
      {/* ستايل إضافي */}
      <style>{`
        .cosmic-scrollup {
          position: fixed;
          bottom: 300px;
          right: 40px;
          z-index: 1002;
          width: 66px;
          height: 66px;
          border: none;
          border-radius: 50%;
          outline: none;
          background: rgba(174,146,255,0.34);
          backdrop-filter: blur(4px);
          box-shadow: 0 3px 32px #a18fff55, 0 1px 6px #fff0;
          opacity: 0;
          pointer-events: none;
          transform: translateY(70px) scale(0.7) rotate(-7deg);
          transition: opacity 0.33s, transform 0.36s cubic-bezier(.51,1.5,.51,.9), box-shadow 0.21s;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #bda6ff44;
          backdrop-filter: blur(6px) saturate(1.3);
          overflow: visible;
        }
        .cosmic-scrollup.show {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0) scale(1.07) rotate(0deg);
          animation: cosmicPop .95s cubic-bezier(.39,1.5,.51,1) both;
          box-shadow: 0 10px 38px #8a4cff55, 0 1px 6px #fff0;
        }
        .cosmic-scrollup:hover {
          background: rgba(190,148,255,0.72);
          box-shadow: 0 14px 44px #a18fff77, 0 4px 10px #fff0;
          border: 2.8px solid #fff6;
          filter: brightness(1.1);
        }
        @keyframes cosmicPop {
          0% { opacity: 0; transform: translateY(100px) scale(.3) rotate(-15deg);}
          60% { opacity: 1; transform: translateY(-18px) scale(1.12) rotate(8deg);}
          88% { transform: translateY(5px) scale(1.09) rotate(-4deg);}
          100% { opacity: 1; transform: translateY(0) scale(1.07) rotate(0);}
        }
        .footer-particles {
          pointer-events: none;
          height: 170px;
          max-width: 100vw;
        }
      `}</style>
    </div>
  );
}
