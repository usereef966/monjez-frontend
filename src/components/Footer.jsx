import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


// كل الفوتر وكأنه موقع عالمي كامل
export default function UltimateMagicFooter() {
  // حركة سرية
  const [showSecret, setShowSecret] = useState(false);
  useEffect(() => {
    function onKey(e) {
      if ((e.ctrlKey && e.key.toLowerCase() === 'm') ||
          (e.key === 'م' || e.key === 'n' || e.key === 'ج' || e.key === 'z')) {
        setShowSecret(true);
        setTimeout(() => setShowSecret(false), 2000);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // زر العودة للأعلى نيون
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 220);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // بارتكلز نجوم متراقصة
  const canvasRef = useRef();
  useEffect(() => {
    let raf, W, H, ctx, particles = [];
    function resize() {
      W = canvasRef.current.width = window.innerWidth;
      H = canvasRef.current.height = 180;
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
    for (let i = 0; i < 36; i++) particles.push(new Particle());
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div style={{ position: "relative", zIndex: 1, marginTop: 60 }}>
      {/* موجة SVG Animated */}
      <svg
    viewBox="0 0 1920 120"
    style={{
      position: "absolute",
      top: "-74px",
      right: 0,
      left: 0,
      width: "100%",
      zIndex: 0, // لاحظ هنا zIndex أقل شيء
      pointerEvents: "none",
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

      {/* بارتكلز فوق الفوتر */}
      
      
      <canvas
        ref={canvasRef}
        className="footer-particles"
        style={{
          position: "absolute", bottom: 0, right: 0, left: 0, pointerEvents: "none", zIndex: 2,
          height: 170, maxWidth: "100vw"
        }}
      />

      {/* الفوتر العملاق (هنا اكتب كل أقسام وروابط الفوتر) */}
      <footer className="ultimate-footer">
        <div className="footer-top">
          <div className="footer-grid">
            {/* غير الترتيب والروابط حسب حاجتك */}
            <div className="footer-col">
              <h4>المحتوى</h4>
              <ul>
                      <li><Link to="/authors">المؤلفون</Link></li>
      <li><Link to="/icons">الأيقونات</Link></li>
      <li><Link to="/stickers">ملصقات</Link></li>
      <li><Link to="/interface-icons">أيقونات الواجهة</Link></li>
      <li><Link to="/animated-icons">أيقونات متحركة</Link></li>
      <li><Link to="/icon-tags">وسوم الأيقونات</Link></li>
      <li><Link to="/sticker-tags">وسوم الملصقات</Link></li>
    </ul>
  </div>
  <div className="footer-col">
    <h4>الأدوات</h4>
    <ul>
      <li><Link to="/api">API</Link></li>
      <li><Link to="/google-workspace">Google Workspace</Link></li>
    </ul>
  </div>
  <div className="footer-col">
    <h4>المساعدة</h4>
    <ul>
      <li><Link to="/support">الدعم</Link></li>
      <li><Link to="/faq">الأسئلة الشائعة</Link></li>
      <li><Link to="/icon-styles">أنماط الأيقونات</Link></li>
      <li><Link to="/icon-editor">محرر الأيقونات</Link></li>
      <li><Link to="/flaticon-collections">مجموعات Flaticon</Link></li>
      <li><Link to="/follow-us">تابعنا</Link></li>
      <li><Link to="/product-license">ترخيص المنتجات</Link></li>
    </ul>
  </div>
  <div className="footer-col">
    <h4>الشركة</h4>
    <ul>
      <li><Link to="/about">عن الشركة</Link></li>
      <li><Link to="/contact">تواصل معنا</Link></li>
      <li><Link to="/license">رخصتنا</Link></li>
      <li><Link to="/blog">مدونة</Link></li>
      <li><Link to="/plans">الخطط والأسعار</Link></li>
      <li><Link to="/whatsnew">ما الجديد؟</Link></li>
              </ul>
            </div>
          </div>
          {/* السوشيال وزر حساب المساهمين */}
          <div className="footer-side">
            <button className="footer-cta">حساب المساهمين</button>
            <div className="footer-social">
              <span>تابعنا</span>
              <div className="footer-social-icons">
                {/* أضف هنا أيقونات SVG كما تحب */}
                <a href="#"><svg width="26" height="26" fill="#1877f3" viewBox="0 0 24 24"><path d="M22.68 0h-21.36c-.733 0-1.32.587-1.32 1.32v21.36c0 .733.587 1.32 1.32 1.32h11.5v-9.295h-3.128v-3.622h3.128v-2.672c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.241h-1.918c-1.504 0-1.797.715-1.797 1.763v2.313h3.592l-.468 3.622h-3.124v9.295h6.128c.733 0 1.32-.587 1.32-1.32v-21.36c0-.733-.587-1.32-1.32-1.32z"/></svg></a>
                <a href="#"><svg width="26" height="26" fill="#1da1f2" viewBox="0 0 24 24"><path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 00-8.388 4.482c-4.086-.205-7.713-2.164-10.141-5.144-.423.729-.666 1.577-.666 2.476 0 1.708.87 3.213 2.188 4.096a4.904 4.904 0 01-2.229-.616v.062a4.923 4.923 0 003.946 4.827c-.421.115-.864.177-1.321.177-.323 0-.637-.031-.943-.089a4.928 4.928 0 004.6 3.42A9.868 9.868 0 010 21.543a13.94 13.94 0 007.548 2.212c9.057 0 14.009-7.507 14.009-14.008 0-.213-.005-.425-.014-.636A10.012 10.012 0 0024 4.557z"/></svg></a>
                <a href="#"><svg width="26" height="26" fill="#e1306c" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.061 2.633.332 3.608 1.308.976.976 1.247 2.243 1.308 3.608.058 1.266.069 1.646.069 4.851s-.012 3.584-.07 4.851c-.061 1.366-.332 2.633-1.308 3.608-.976.976-2.243 1.247-3.608 1.308-1.266.058-1.646.069-4.851.069s-3.584-.012-4.851-.07c-1.366-.061-2.633-.332-3.608-1.308-.976-.976-1.247-2.243-1.308-3.608-.058-1.266-.069-1.646-.069-4.851s.012-3.584.07-4.851c.061-1.366.332-2.633 1.308-3.608.976-.976 2.243-1.247 3.608-1.308 1.266-.058 1.646-.069 4.851-.069zm0-2.163c-3.259 0-3.67.013-4.946.072-1.276.059-2.634.343-3.608 1.316s-1.258 2.332-1.317 3.608c-.059 1.276-.072 1.687-.072 4.946s.013 3.67.072 4.946c.059 1.276.343 2.634 1.316 3.608.973.973 2.332 1.258 3.608 1.317 1.276.059 1.687.072 4.946.072s3.67-.013 4.946-.072c1.276-.059 2.634-.343 3.608-1.316.973-.973 1.258-2.332 1.317-3.608.059-1.276.072-1.687.072-4.946s-.013-3.67-.072-4.946c-.059-1.276-.343-2.634-1.316-3.608-.973-.973-2.332-1.258-3.608-1.317-1.276-.059-1.687-.072-4.946-.072zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg></a>
                <a href="#"><svg width="26" height="26" fill="#ff0000" viewBox="0 0 24 24"><path d="M23.498 6.186c-.272-1.02-1.072-1.819-2.092-2.091c-1.435-.387-7.19-.387-7.19-.387s-5.755 0-7.19.387c-1.02.272-1.819 1.071-2.092 2.091c-.388 1.435-.388 4.434-.388 4.434s0 2.999.388 4.434c.273 1.02 1.072 1.819 2.092 2.091c1.435.388 7.19.388 7.19.388s5.755 0 7.19-.388c1.02-.272 1.819-1.071 2.092-2.091c.388-1.435.388-4.434.388-4.434s0-2.999-.388-4.434zm-13.498 7.814v-6l6 3l-6 3z"/></svg></a>
              </div>
            </div>
          </div>
        </div>
        {/* روابط تحتية وفوتر سفلي */}
        <div className="footer-bottom">
          <ul>
                <li><Link to="/terms">الشروط والأحكام</Link></li>
    <li><Link to="/privacy">سياسة الخصوصية</Link></li>
    <li><Link to="/cookies">سياسة الكوكيز</Link></li>
    <li><Link to="/copyright">حقوق النشر</Link></li>
    <li><Link to="/cookie-settings">إعدادات الكوكيز</Link></li>
          </ul>
          <div className="footer-bottom-right">
            <select className="footer-lang">
              <option>العربية</option>
              <option>English</option>
              <option>Türkçe</option>
            </select>
          </div>
        </div>
        <div className="footer-copyright">
          <div>© 2025 منجز. جميع الحقوق محفوظة.</div>
          <ul>
            <li><a href="#">Flaticon</a></li>
            <li><a href="#">Slidesgo</a></li>
            <li><a href="#">Wepik</a></li>
            <li><a href="#">Videvo</a></li>
          </ul>
        </div>
      </footer>

      {/* زر العودة للأعلى نيون + جلاس */}
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

      {/* حركة سرية منجز */}
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

      {/* ستايلات احترافية */}
      <style>{`
        .ultimate-footer {
          background: linear-gradient(135deg, #131e3a 70%, #181e2a 100%);
          color: #e6e6f3;
          padding: 50px 0 0 0;
          font-family: Tajawal, Cairo, Arial;
          position: relative;
          box-shadow: 0 -2px 24px 0 #131e3a11;
          border-radius: 38px 38px 0 0;
          margin-top: 96px;
          overflow: hidden;
        }
        .footer-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          max-width: 1250px;
          margin: 0 auto;
          gap: 40px;
          padding: 0 24px;
        }
        .footer-grid {
          display: flex;
          gap: 52px;
        }
        .footer-col h4 {
          color: #b9b8fd;
          margin-bottom: 16px;
          font-size: 19px;
          font-weight: 800;
          letter-spacing: -.5px;
        }
        .footer-col ul {
          padding: 0;
          margin: 0;
          list-style: none;
        }
        .footer-col li {
          margin-bottom: 10px;
        }
        .footer-col li a {
          color: #f4f3fd;
          font-size: 15px;
          text-decoration: none;
          opacity: 0.87;
          transition: color 0.15s, text-shadow 0.24s;
          position: relative;
        }
        .footer-col li a:hover {
          color: #8f7fff;
          text-shadow: 0 2px 12px #7a4aff33;
        }
        .footer-side {
          min-width: 180px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          align-items: flex-end;
        }
        .footer-cta {
          background: linear-gradient(95deg, #18e388 10%, #1cb0f6 90%);
          color: #fff;
          font-weight: 700;
          padding: 14px 38px;
          border-radius: 18px;
          border: none;
          cursor: pointer;
          box-shadow: 0 3px 20px 0 #00c19c30;
          font-size: 16px;
          letter-spacing: 0.1px;
          transition: background 0.2s, box-shadow 0.22s;
        }
        .footer-cta:hover {
          background: linear-gradient(90deg, #1cb0f6 10%, #18e388 90%);
          box-shadow: 0 4px 28px 0 #1cb0f633;
        }
        .footer-social {
          text-align: right;
          color: #bbbaf8;
          font-size: 15px;
          font-weight: 700;
          margin-top: 12px;
        }
        .footer-social-icons {
          display: flex;
          gap: 10px;
          margin-top: 6px;
        }
        .footer-social-icons a {
          background: #fff;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          box-shadow: 0 2px 12px #181e2a24;
          transition: transform 0.21s, box-shadow 0.21s;
        }
        .footer-social-icons a:hover {
          transform: scale(1.18) rotate(-5deg);
          box-shadow: 0 6px 28px #7a4aff55;
        }
        .footer-bottom {
          margin-top: 42px;
          padding: 22px 32px 0 32px;
          border-top: 1px solid #222b3c;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          font-size: 14.6px;
        }
        .footer-bottom ul {
          display: flex;
          gap: 32px;
          padding: 0;
          margin: 0;
          list-style: none;
        }
        .footer-bottom ul li a {
          color: #dedcfb;
          opacity: .85;
          text-decoration: none;
          transition: color 0.16s;
        }
        .footer-bottom ul li a:hover {
          color: #8f7fff;
        }
        .footer-bottom-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .footer-lang {
          background: #171e33;
          color: #d6d2fd;
          border: 1.5px solid #7a4aff44;
          border-radius: 10px;
          font-size: 15px;
          padding: 6px 20px 6px 18px;
          margin-right: 10px;
        }
        .footer-copyright {
          margin: 20px 24px 0 24px;
          padding: 13px 0 40px 0;
          border-top: 1px solid #181e2a;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #c2bee9;
          font-size: 15px;
        }
        .footer-copyright ul {
          display: flex;
          gap: 28px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .footer-copyright ul li a {
          color: #fff;
          opacity: .79;
          text-decoration: none;
          transition: color 0.19s;
        }
        .footer-copyright ul li a:hover {
          color: #18e388;
        }
        /* زر العودة للأعلى */
        .cosmic-scrollup {
          position: fixed;
          bottom: 36px;
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
        @media (max-width: 1100px) {
          .footer-top {
            flex-direction: column;
            align-items: stretch;
          }
          .footer-side {
            flex-direction: row-reverse;
            align-items: flex-start;
            justify-content: space-between;
            gap: 16px;
            margin-top: 40px;
          }
        }
        @media (max-width: 900px) {
          .footer-grid {
            flex-wrap: wrap;
            gap: 32px;
          }
          .footer-col {
            min-width: 140px;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }
        }
        @media (max-width: 650px) {
          .footer-grid {
            flex-direction: column;
            gap: 0;
          }
          .footer-col {
            margin-bottom: 34px;
          }
          .footer-side {
            flex-direction: column;
            gap: 16px;
            align-items: flex-end;
          }
          .footer-copyright {
            flex-direction: column;
            gap: 12px;
            font-size: 13.7px;
          }
        }
      `}</style>
    </div>
  );
}
