import React, { useState } from "react";
import androidIcon from "../assets/svg/android-icon.svg";
import iosIcon from "../assets/svg/ios-icon.svg";
import { useNavigate } from "react-router-dom";


// عناصر Android و iOS مع شرح لكل واحدة
const androidServices = [
  { title: "تسوق إلكتروني عصري", desc: "أفضل تجربة تسوق وشراء سلسة وسريعة." },
  { title: "إدارة متاجر ذكية", desc: "إدارة المخزون والطلبات تلقائياً." },
  { title: "مواعيد للمراكز الطبية", desc: "نظام حجز وتنظيم المواعيد للعيادات." },
  { title: "أنظمة محاسبة", desc: "حسابات وتقارير لحظية." },
];
const iosServices = [
  { title: "تطبيقات أعمال فاخرة", desc: "تصميم يليق بعملاء Apple." },
  { title: "حلول للمستشفيات", desc: "أنظمة طبية ذكية متكاملة." },
  { title: "تنبيهات ومواعيد", desc: "إشعارات في الوقت الحقيقي." },
  { title: "Apple Pay وتكامل سريع", desc: "دعم كل وسائل الدفع الحديثة." },
];

function ServiceItem({ title, desc, color }) {
  const [hover, setHover] = useState(false);
  
  

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 220,
        textAlign: "center",
        position: "relative",
        margin: "0 auto 16px",
        cursor: "pointer",
        padding: "8px 0", 
        borderRadius: 16,
        background: hover ? color : "#fff",
        color: hover ? "#fff" : "#333",
        fontWeight: 600,
        fontFamily: "Tajawal, Arial",
        boxShadow: hover ? "0 4px 22px 0 rgba(124,77,255,0.10)" : "0 2px 10px 0 rgba(124,77,255,0.06)",
        transition: "all .19s",
        zIndex: 1
      }}
    >
      {title}
      {hover && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "110%",
          transform: "translateY(-50%)",
          background: "#fff",
          color: "#7c4dff",
          borderRadius: 14,
          padding: "7px 15px",
          minWidth: 160,
          fontSize: 14,
          fontWeight: 500,
          boxShadow: "0 4px 20px 0 rgba(124,77,255,0.13)",
          border: `1px solid ${color}`,
          animation: "popout 0.35s cubic-bezier(.4,1.25,.57,1.09)"
        }}>
          <span style={{ fontWeight: 700, fontSize: 15 }}>⭐️</span> {desc}
        </div>
      )}
      <style>
        {`
        @keyframes popout {
          0% { opacity: 0; transform: scale(0.82) translateY(-30%);}
          100% { opacity: 1; transform: scale(1) translateY(-50%);}
        }
        `}
      </style>
    </div>
  );
}

export default function AppsCompetition() {
    const [hoverAndroid, setHoverAndroid] = useState(false);
    const [hoverIos, setHoverIos] = useState(false);
    const navigate = useNavigate();


  return (
    <section style={{
      background: "linear-gradient(100deg,#ede7fb 60%,#f8f8ff 100%)",
      padding: "22px 0 22px",
      direction: "rtl"
    }}>
      <h2 style={{
        textAlign: "center",
        color: "#7c4dff",
        fontSize: "2.1rem",
        fontWeight: "bold",
        marginBottom: 15,
        fontFamily: "Tajawal, Arial"
      }}>
        منافسة التطبيقات: Android VS iOS
      </h2>
      <div style={{
        display: "flex",
        gap: 20,
        justifyContent: "center",
        alignItems: "stretch",
        flexWrap: "wrap",
        maxWidth: 1100,
        margin: "0 auto"
      }}>
        {/* ANDROID */}
        <div style={{
          background: "#f3fff8",
          borderRadius: 24,
          minWidth: 310,
          maxWidth: 380,
          alignItems: "center",
          flex: 1,
          padding: "34px 18px",
          border: "1.5px solid #a1ffce",
          boxShadow: "0 8px 18px 0 rgba(61,220,132,0.07)"
        }}>
          <div style={{ textAlign: "center", marginBottom: 18 }}>
           <img
  src={androidIcon}
  alt="أندرويد"
  style={{
    width: 52,
    height: 52,
    cursor: "pointer",
    transition: "transform 0.33s cubic-bezier(.57,2.7,.51,.93)",
    transform: hoverAndroid ? "translateY(-18px) scale(1.13)" : "none",
    filter: hoverAndroid ? "drop-shadow(0 6px 16px #27cf7a44)" : "none"
  }}
  onMouseEnter={() => setHoverAndroid(true)}
  onMouseLeave={() => setHoverAndroid(false)}
/>
            <h3 style={{ color: "#22bb77", fontSize: "1.15rem", fontWeight: "bold", marginTop: 7, marginBottom: 5 }}>
              تطبيقات Android
            </h3>
          </div>
          <div style={{
  display: "flex",
  flexDirection: "column",
  alignItems: "center",    // يوسّط أفقياً
}}>
          {androidServices.map(s =>
            <ServiceItem key={s.title} title={s.title} desc={s.desc} color="#27cf7a" />
          )}
          </div>
         <button
  style={{
    marginTop: 26,
    padding: "11px 38px",
    borderRadius: 18,
    background: "linear-gradient(90deg,#27cf7a 60%,#7c4dff 100%)",
    color: "#fff",
    border: "none",
    display: "block",
    margin: "26px auto 0",
    fontWeight: 700,
    fontFamily: "Tajawal, Arial",
    fontSize: 16.5,
    boxShadow: "0 4px 14px 0 rgba(39,207,122,0.12)",
    cursor: "pointer",
    transition: "background 0.18s"
  }}
  onMouseOver={e => (e.currentTarget.style.background = "linear-gradient(90deg,#7c4dff 70%,#27cf7a 100%)")}
  onMouseOut={e => (e.currentTarget.style.background = "linear-gradient(90deg,#27cf7a 60%,#7c4dff 100%)")}
  onClick={() => navigate("/order/android")}
>
  اطلب تطبيق أندرويد
</button>

        </div>
        {/* VS وسط */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", minWidth: 78
        }}>
          <div style={{
            width: 52, height: 52,
            background: "linear-gradient(135deg,#7c4dff 0%,#3ddc84 100%)",
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: "bold", color: "#fff", fontSize: "1.5rem",
            boxShadow: "0 4px 14px 0 rgba(124,77,255,0.13), 0 2px 8px 0 rgba(61,220,132,0.09)",
                animation:
      "vsflash 1.2s infinite alternate cubic-bezier(.46,.14,.41,.86), " +
      "jump 0.8s infinite ease-in-out",
                        
            
          }}>
            VS
          </div>
          <style>
            {`
               @keyframes vsflash {
      0%   { box-shadow: 0 0 22px #a18fff55, 0 0 12px #3ddc8455; }
      100% { box-shadow: 0 0 36px #a18fffbb, 0 0 20px #3ddc84bb; }
    }
    @keyframes jump {
      0%, 100% { transform: translateY(0); }
      50%      { transform: translateY(-12px); }
    }
            `}
          </style>
        </div>
        {/* IOS */}
        <div style={{
          background: "#f9f7fd",
          borderRadius: 24,
          minWidth: 310,
          maxWidth: 380,
          flex: 1,
          padding: "34px 18px",
          border: "1.5px solid #d4c8ff",
          boxShadow: "0 8px 18px 0 rgba(100,85,255,0.09)"
        }}>
          <div style={{ textAlign: "center", marginBottom: 18 }}>
            <img
  src={iosIcon}
  alt="آيفون"
  style={{
    width: 52,
    height: 52,
    cursor: "pointer",
    transition: "transform 0.33s cubic-bezier(.57,2.7,.51,.93)",
    transform: hoverIos ? "translateY(-18px) scale(1.13)" : "none",
    filter: hoverIos ? "drop-shadow(0 6px 16px #7c4dff44)" : "none"
  }}
  onMouseEnter={() => setHoverIos(true)}
  onMouseLeave={() => setHoverIos(false)}
/>
            <h3 style={{ color: "#23273c", fontSize: "1.15rem", fontWeight: "bold", marginTop: 7, marginBottom: 5 }}>
              تطبيقات iOS
            </h3>
          </div>
          <div style={{
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}}>
          {iosServices.map(s =>
            <ServiceItem key={s.title} title={s.title} desc={s.desc} color="#7c4dff" />
          )}
          </div>
<button
  style={{
    marginTop: 26,
    padding: "11px 38px",
    borderRadius: 18,
    background: "linear-gradient(90deg,#7c4dff 60%,#23273c 100%)",
    color: "#fff",
    display: "block",
    margin: "26px auto 0",
    border: "none",
    fontWeight: 700,
    fontFamily: "Tajawal, Arial",
    fontSize: 16.5,
    boxShadow: "0 4px 14px 0 rgba(124,77,255,0.13)",
    cursor: "pointer",
    transition: "background 0.18s"
  }}
  onMouseOver={e => (e.currentTarget.style.background = "linear-gradient(90deg,#23273c 70%,#7c4dff 100%)")}
  onMouseOut={e => (e.currentTarget.style.background = "linear-gradient(90deg,#7c4dff 60%,#23273c 100%)")}
  onClick={() => navigate("/order/ios")}
>
  اطلب تطبيق iOS
</button>

        </div>
      </div>
      
    </section>
  );
}
