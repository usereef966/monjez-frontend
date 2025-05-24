import React, { useRef } from "react";

// استبدل هذه بالـ SVG الحقيقي تبعك!
import iconCompany from "../assets/svg/company.svg";
import iconStore from "../assets/svg/store.svg";
import iconPortfolio from "../assets/svg/portfolio.svg";
import iconLanding from "../assets/svg/landing.svg";
import iconApp from "../assets/svg/app.svg";
import iconService from "../assets/svg/service.svg";
import iconEdu from "../assets/svg/edu.svg";
import iconBlog from "../assets/svg/blog.svg"
import { useNavigate } from "react-router-dom";


const icons = [
  iconCompany, iconStore, iconPortfolio, iconLanding,
  iconApp, iconService, iconEdu, iconBlog
];


const siteTypes = [
  { title: "موقع شركة", desc: "تعريف احترافي بنشاط الشركة وزيادة الثقة." },
  { title: "متجر إلكتروني", desc: "بيع منتجاتك بسهولة وأمان أونلاين." },
  { title: "بورتفوليو", desc: "اعرض أعمالك وابداعاتك بأسلوب عصري." },
  { title: "صفحة هبوط", desc: "احصل على عملاء جدد بحملات تسويقية ذكية." },
  { title: "تطبيق دردشة", desc: "نظام مراسلة متقدم وخصوصية عالية." },
  { title: "موقع خدمات", desc: "عرض وبيع خدماتك باحترافية وسرعة." },
  { title: "منصة تعليمية", desc: "دورات، دروس، وإدارة متعلمين بكل سهولة." },
  { title: "مدونة", desc: "شارك مقالاتك وأفكارك مع جمهورك المستهدف." }

  
];



export default function WebDevelopmentMagicSection() {

const navigate = useNavigate();

    
  // مراجع لعنصر الكروت لعمل تأثير ماوس
  const cardRefs = useRef([]);

  // عند تحريك الماوس على الكرت
  function handleMouseMove(idx, e) {
    const card = cardRefs.current[idx];
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  }

  function handleMouseLeave(idx) {
    const card = cardRefs.current[idx];
    card.style.setProperty("--x", `50%`);
    card.style.setProperty("--y", `50%`);
  }

  return (
    <section dir="rtl" style={{
      background: "#f8f8ff",
      padding: "28px 0 22px 0",
      borderRadius: "40px",
      margin: "18px 0",
      position: "relative",
      overflow: "visible"
    }}>
      {/* Parallax دوائر خلفية عائمة */}
      <div className="magic-bg-circle" style={{ top: -60, right: 80 }} />
      <div className="magic-bg-circle2" style={{ bottom: -80, left: 50 }} />
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 24px"
      }}>
        {/* العنوان الرئيسي مع أيقونة */}
        <div style={{
          textAlign: "center",
          marginBottom: 16,
          position: "relative"
        }}>
          <div style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #fff 70%, #bda6ff 100%)",
            borderRadius: "50%",
            width: 78,
            height: 78,
            marginBottom: 12,
            boxShadow: "0 4px 16px 0 #ece5ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <img src={iconCompany} alt="Web Icon" style={{ width: 38, height: 38 }} />
          </div>
          <h2 style={{
            color: "#7a4aff",
            fontSize: 38,
            fontWeight: 900,
            letterSpacing: "-1.5px",
            marginBottom: 8,
            fontFamily: "Tajawal, Cairo, Arial"
          }}>برمجة المواقع</h2>
          <p style={{
            color: "#746e93",
            fontSize: 19,
            fontWeight: 400,
            marginBottom: 0,
            fontFamily: "Tajawal, Cairo, Arial"
          }}>
            نبني مواقع سريعة، آمنة، متجاوبة، وقابلة للتوسعة – نحقق أفكارك بأعلى معايير الإبداع.
          </p>
        </div>
        {/* كروت الأصناف */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "14px 11px",
          marginBottom: 48
        }}>
          {siteTypes.map((type, idx) => (
            <div
              key={idx}
              className="magic-web-card"
              ref={el => cardRefs.current[idx] = el}
              onMouseMove={e => handleMouseMove(idx, e)}
              onMouseLeave={() => handleMouseLeave(idx)}
              style={{
                background: "#fff",
                borderRadius: 22,
                boxShadow: "0 2px 16px 0 #b6a0ff1b",
                textAlign: "center",
                padding: "30px 8px 18px",
                position: "relative",
                cursor: "pointer",
                transition: "transform 0.34s cubic-bezier(.65,1.55,.34,.85), box-shadow 0.22s",
                overflow: "hidden"
              }}
            >
              {/* الأيقونة */}
              <div style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#a18fff,#7a4aff)",
                margin: "0 auto 12px auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 1px 8px 0 #bda6ff66"
              }}>
                <img src={icons[idx]} alt={type.title} style={{ width: 27, height: 27 }} />
              </div>
              {/* العنوان */}
              <h3 style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#7a4aff",
                margin: "0 0 7px",
                fontFamily: "Tajawal, Cairo, Arial"
              }}>
                {type.title}
              </h3>
              {/* الوصف */}
              <p style={{
                color: "#87839f",
                fontSize: 15,
                fontWeight: 500,
                lineHeight: "1.7",
                minHeight: 36,
                margin: 0
              }}>
                {type.desc}
              </p>
              {/* تأثير Glow ماوس */}
              <div className="magic-card-glow"></div>
            </div>
          ))}
        </div>
        {/* زر الطلب */}
        <div style={{ textAlign: "center" }}>
          <a href="web/weborder" style={{
            background: "linear-gradient(90deg, #7a4aff 10%, #a18fff 90%)",
            color: "#fff",
            fontSize: 20,
            fontWeight: 700,
            borderRadius: 50,
            padding: "16px 50px",
            boxShadow: "0 2px 12px 0 #a17fff25",
            textDecoration: "none",
            transition: "background 0.22s, box-shadow 0.18s",
            letterSpacing: ".2px",
            display: "inline-block"
          }}
            onMouseOver={e => e.currentTarget.style.background = "linear-gradient(90deg, #a18fff 10%, #7a4aff 90%)"}
            onMouseOut={e => e.currentTarget.style.background = "linear-gradient(90deg, #7a4aff 10%, #a18fff 90%)"}
          >
            🚀 اطلب خدمتك الآن
          </a>
        </div>
      </div>
      {/* CSS Magic */}
      <style>{`
        .magic-bg-circle, .magic-bg-circle2 {
          position: absolute;
          width: 160px;
          height: 160px;
          border-radius: 50%;
          background: radial-gradient(circle, #a18fff33 50%, #fff0 80%);
          filter: blur(8px);
          z-index: 0;
          animation: float-bubble 6s ease-in-out infinite alternate;
        }
        .magic-bg-circle2 {
          width: 130px; height: 130px;
          background: radial-gradient(circle, #7a4aff33 60%, #fff0 85%);
          animation-delay: 2s;
        }
        @keyframes float-bubble {
          0% { transform: translateY(0px);}
          100% { transform: translateY(40px);}
        }
        .magic-web-card {
          will-change: transform, box-shadow;
        }
        .magic-web-card:hover {
          transform: translateY(-10px) scale(1.06) rotate(-1deg);
          box-shadow: 0 10px 32px 0 #7a4aff22;
          z-index: 2;
        }
        .magic-card-glow {
          pointer-events: none;
          border-radius: 22px;
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.16s;
          background: radial-gradient(160px circle at var(--x, 50%) var(--y, 50%), #a18fff33 0%, #fff0 80%);
          z-index: 1;
        }
        .magic-web-card:hover .magic-card-glow {
          opacity: 1;
        }
        /* Responsive */
        @media (max-width: 900px) {
          div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
