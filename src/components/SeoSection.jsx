// SeoShortPage.js
import React, { useEffect } from "react";

// بدّل المسارات حسب SVGاتك
import seoRocket from "../assets/svg/seo-rocket.svg";
import analyticsIcon from "../assets/svg/analytics.svg";
import lightningIcon from "../assets/svg/lightning.svg";
import shieldIcon from "../assets/svg/shield.svg";
import trophyIcon from "../assets/svg/trophy.svg";

// CSS Animation في نفس الصفحة
const css = `
@keyframes rotate {
  0% { transform: rotate(0);}
  100% { transform: rotate(360deg);}
}
@keyframes float {
  0%,100% {transform: translateY(0);}
  50% {transform: translateY(-15px);}
}
@keyframes fadeInUp {
  0% {opacity:0; transform: translateY(40px);}
  100% {opacity:1; transform: translateY(0);}
}
.seo-rocket {
  animation: rotate 8s linear infinite;
}
.motion-card {
  opacity: 0;
  transform: translateY(40px);
  animation: fadeInUp 0.8s cubic-bezier(.38,1.14,.23,1.14) forwards;
}
.motion-card.delay1 {animation-delay: .17s;}
.motion-card.delay2 {animation-delay: .33s;}
.motion-card.delay3 {animation-delay: .48s;}
.motion-card.delay4 {animation-delay: .63s;}
.motion-card.delay5 {animation-delay: .78s;}
.motion-float {
  animation: float 2.5s ease-in-out infinite;
}
`;

export default function SeoShortPage() {
  useEffect(() => {
    // Reveal motion-cards
    document.querySelectorAll('.motion-card').forEach((el, i) => {
      setTimeout(() => {
        el.style.opacity = 1;
        el.style.transform = "translateY(0)";
      }, 220 + i * 130);
    });
  }, []);

  return (
    <div style={{
      background: "linear-gradient(97deg,#f5f8ff 65%,#f1ecff 100%)",
      minHeight: "100vh",
      fontFamily: "Tajawal, Arial",
      direction: "rtl",
      paddingBottom: 30
    }}>
      <style>{css}</style>
      {/* HERO */}
      <section style={{
        padding: "28px 0 18px",
        textAlign: "center",
        borderRadius: "0 0 36px 36px",
        boxShadow: "0 7px 42px 0 rgba(124,77,255,.07)"
      }}>
        <img
          src={seoRocket}
          alt="SEO Rocket"
          className="seo-rocket motion-float"
          style={{
            width: 95, marginBottom: 15, filter: "drop-shadow(0 2px 18px #7c4dff33)"
          }}
        />
        <h1 style={{
          fontWeight: 900,
          fontSize: 32,
          background: "linear-gradient(90deg, #7c4dff 65%, #24e9ca 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: 9
        }}>
          سيو منجز: صدارة في جوجل… صدارة في السوق! 🚀
        </h1>
        <p style={{
          color: "#444",
          fontSize: 18.5,
          maxWidth: 550,
          margin: "0 auto"
        }}>
          حقق ظهورك بالصفحة الأولى مع خبرة سعودية، نتائج موثقة، وأقوى دعم تسويقي في المنطقة.  
        </p>
      </section>

      {/* أرقام وإنجازات */}
      <section style={{
  display: "grid",
  gridTemplateColumns: "repeat(4, 210px)",  // أربعة أعمدة بعرض ثابت 210px
  justifyContent: "center",                // يوسّطهم داخل الـ section
  columnGap: "32px",                        // المسافة الأفقية بين الأعمدة
  rowGap: "16px",                           // المسافة العمودية (لو سطرتهم أكتر من صف)
  margin: "0 auto 16px",                   // يقلّص الـ section لعرض محتواه ثم يوسّطه
  maxWidth: "900px"                         // اختياري: تمنع تمدّد المكونات لو الشاشة كبيرة جدًّا
       
        
      }}>
        <InfoCard
          className="motion-card delay1"
          icon={trophyIcon}
          title="#1"
          desc="ترتيبنا في السوق"
        />
        <InfoCard
          className="motion-card delay2"
          icon={analyticsIcon}
          title="+200"
          desc="موقع في الصفحة الأولى"
        />
        <InfoCard
          className="motion-card delay3"
          icon={lightningIcon}
          title="3 أشهر"
          desc="متوسط تحقيق النتائج"
        />
        <InfoCard
          className="motion-card delay4"
          icon={shieldIcon}
          title="99.7%"
          desc="ضمان تصدر كلماتك"
        />
      </section>

      {/* مميزات سيو منجز */}
      <section style={{ maxWidth: 950, margin: "0 auto 28px" }}>
        <h2 style={{
          textAlign: "center",
          fontWeight: 900,
          fontSize: 24,
          color: "#7c4dff",
          marginBottom: 26,
          letterSpacing: ".2px"
        }}>
          لماذا السيو معنا غير؟
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(225px,1fr))",
          gap: 28,
          justifyItems: "center"
        }}>
          <InfoCard
            className="motion-card delay2"
            icon={analyticsIcon}
            title="تقارير مفصلة"
            desc="شفافية كاملة… تتابع تقدمك لحظة بلحظة."
          />
          <InfoCard
            className="motion-card delay3"
            icon={lightningIcon}
            title="نتائج أسرع"
            desc="خوارزمياتنا تحقق القفزة بأقصر وقت."
          />
          <InfoCard
            className="motion-card delay4"
            icon={shieldIcon}
            title="حماية كاملة"
            desc="نلتزم بمعايير جوجل، وبدون مخاطرة أو عقوبات."
          />
        </div>
      </section>

      {/* قصص نجاح (مختصرة) */}
      <section style={{ maxWidth: 850, margin: "0 auto 36px" }}>
        <h2 style={{
          textAlign: "center",
          fontWeight: 900,
          fontSize: 23,
          color: "#7c4dff",
          marginBottom: 20
        }}>
          قصص نجاح من عملائنا:
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(270px,1fr))",
          gap: 30,
          justifyItems: "center"
        }}>
          <InfoCard
            className="motion-card delay4"
            icon={trophyIcon}
            title="متجر العود الملكي"
            desc="خلال 3 أشهر، صعد للصفحة الأولى لكلمة 'دهن العود'."
            result="+120% زيارات / المركز #1"
            resultColor="#24e9ca"
          />
          <InfoCard
            className="motion-card delay5"
            icon={analyticsIcon}
            title="عيادات ابتسامة النخبة"
            desc="في أقل من شهرين، صار بالمراكز الأولى بمجاله."
            result="أكثر من 20 كلمة رئيسية بالصفحة الأولى"
            resultColor="#7c4dff"
          />
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: "linear-gradient(90deg,#7c4dff 60%,#24e9ca 100%)",
        borderRadius: 19,
        maxWidth: 500,
        margin: "0 auto 28px",
        padding: "33px 18px 26px",
        textAlign: "center",
        boxShadow: "0 8px 26px 0 rgba(124,77,255,.13)"
      }}>
        <h2 style={{
          fontSize: 23,
          color: "#fff",
          marginBottom: 14,
          fontWeight: 900
        }}>مستعد تتصدر؟</h2>
        <a href="/seo" style={{
          padding: "13px 30px",
          background: "linear-gradient(90deg,#24e9ca 10%,#7c4dff 90%)",
          borderRadius: 17,
          color: "#fff",
          fontWeight: 800,
          fontSize: 16,
          letterSpacing: ".2px",
          textDecoration: "none",
          boxShadow: "0 2px 14px 0 rgba(36,99,235,0.13)",
          transition: "filter .12s",
          display: "inline-block"
        }}
        onMouseOver={e => e.currentTarget.style.filter = "brightness(1.10)"}
        onMouseOut={e => e.currentTarget.style.filter = "brightness(1)"}
        >
          اعرف أكثر عن خدمات السيو
        </a>
      </section>
    </div>
  );
}

// الكارت الموحد
function InfoCard({ icon, title, desc, result, resultColor, className = "" }) {
  return (
    <div className={`info-card ${className}`} style={{
      background: "#fff",
      borderRadius: 20,
      boxShadow: "0 4px 18px 0 rgba(124,77,255,0.09)",
      padding: "28px 16px 22px",
      minWidth: 190,
      maxWidth: 300,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      textAlign: "center",
      margin: "0 auto",
      position: "relative",
      opacity: 0
    }}>
      {/* الأيقونة */}
      <img src={icon} alt="" style={{
        width: 44,
        height: 44,
        marginBottom: 13
      }} />
      {/* العنوان */}
      <h3 style={{
        fontWeight: 800,
        fontSize: 18.5,
        color: "#7c4dff",
        margin: "0 0 7px"
      }}>{title}</h3>
      {/* الوصف */}
      <div style={{
        color: "#444",
        fontSize: 15.5,
        marginBottom: result ? 12 : 0,
        minHeight: 28,
        lineHeight: 1.7
      }}>{desc}</div>
      {/* النتيجة/الإنجاز */}
      {result && (
        <div style={{
          marginTop: "auto",
          color: resultColor || "#24e9ca",
          fontWeight: 800,
          fontSize: 15
        }}>{result}</div>
      )}
    </div>
  );
}
