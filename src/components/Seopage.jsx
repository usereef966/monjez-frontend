import React, { useEffect  } from "react";
import rocketIcon from "../assets/svg/seo-rocket.svg";
import shieldIcon from "../assets/svg/seo-shield.svg";
import speedIcon from "../assets/svg/seo-speed.svg";
import starIcon from "../assets/svg/star.svg";
import checkIcon from "../assets/svg/check.svg";
import { useNavigate } from "react-router-dom";






const stats = [
  { icon: speedIcon, label: "تسليم خلال شهر", value: "98%", color: "#7c4dff" },
  { icon: rocketIcon, label: "مواقع تصدرت", value: "44+", color: "#27cf7a" },
  { icon: starIcon, label: "عملاء سعداء", value: "200+", color: "#ffa400" },
];

const features = [
  { icon: shieldIcon, title: "حماية وتقارير شهرية", desc: "كل التحركات والإحصائيات تصل بريدك أولًا بأول." },
  { icon: rocketIcon, title: "نتائج موثقة وسريعة", desc: "تبدأ تلاحظ النتائج خلال أسابيع قليلة." },
  { icon: checkIcon, title: "استراتيجية مخصصة", desc: "خطة فريدة تناسب سوقك ومجالك." },
];

export default function Seopage() {
  
        useEffect(() => {
      document.title = " (SEO) تهيئة المواقع";
    }, []);

    
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(120deg,#f8f8ff 65%,#ede7fb 100%)",
      fontFamily: "Tajawal, Arial",
      paddingBottom: 70,
      direction: "rtl"
    }}>
      {/* هيدر مع موجة وصاروخ */}
      <div style={{
        background: "linear-gradient(90deg,#a18fff 70%,#7c4dff 100%)",
        borderBottomLeftRadius: 90,
        borderBottomRightRadius: 40,
        boxShadow: "0 12px 54px #7c4dff19",
        minHeight: 185,
        position: "relative",
        textAlign: "center"
      }}>
        <img
          src={rocketIcon}
          alt="SEO Rocket"
          style={{
            width: 90, marginTop: 30, marginBottom: 2, filter: "drop-shadow(0 8px 40px #fff1)"
          }}
        />
        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          color: "#fff",
          marginBottom: 9,
          letterSpacing: ".5px",
          textShadow: "0 4px 18px #7c4dff44"
        }}>
          🚀 SEO Rocket – تصدر بنتائج البحث
        </h1>
        <p style={{
          color: "#ede7fb",
          fontSize: 20,
          fontWeight: 600,
          marginBottom: 12
        }}>
          رفع ترتيب موقعك مع خبرة سعودية، نتائج موثقة، ودعم تقني على مدار الساعة!
        </p>
      </div>

      {/* كروت إحصائيات */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 32,
        marginTop: 55,
        marginBottom: 42,
        flexWrap: "wrap"
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            background: "#fff",
            borderRadius: 28,
            boxShadow: "0 4px 28px 0 rgba(124,77,255,0.13)",
            padding: "30px 24px 18px",
            textAlign: "center",
            minWidth: 170,
            maxWidth: 230,
            margin: "0 7px"
          }}>
            <img src={s.icon} alt="" style={{ width: 40, marginBottom: 7 }} />
            <div style={{
              color: s.color,
              fontWeight: 900,
              fontSize: 30,
              marginBottom: 5
            }}>{s.value}</div>
            <div style={{
              color: "#7c4dff",
              fontWeight: 700,
              fontSize: 16.3,
              letterSpacing: ".5px"
            }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* مزايا الخدمة */}
      <div style={{
        textAlign: "center",
        margin: "30px 0 8px",
        color: "#23273c",
        fontWeight: 900,
        fontSize: 22
      }}>
        لماذا نحن الأفضل في SEO؟
      </div>
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 33,
        flexWrap: "wrap",
        maxWidth: 980,
        margin: "0 auto 40px"
      }}>
        {features.map((f, i) => (
          <div key={i} style={{
            background: "#fff",
            borderRadius: 22,
            minWidth: 210,
            maxWidth: 320,
            padding: "20px 17px 13px 17px",
            boxShadow: "0 8px 30px #7c4dff15",
            border: "2.1px solid #ede7fb",
            textAlign: "center",
            marginBottom: 13
          }}>
            <img src={f.icon} alt={f.title} style={{ width: 32, height: 32, marginBottom: 5 }} />
            <div style={{
              fontWeight: 900, fontSize: 17.7, margin: "7px 0 4px", color: "#7c4dff"
            }}>{f.title}</div>
            <div style={{
              color: "#777", fontSize: 15, fontWeight: 500
            }}>{f.desc}</div>
          </div>
        ))}
      </div>

      {/* زر CTA */}
      <div style={{
        textAlign: "center", margin: "40px auto 18px auto"
      }}>
        <button
        onClick={() => navigate("/seo/seorder")}
          style={{
            padding: "13px 48px",
            borderRadius: 19,
            background: "linear-gradient(90deg,#7c4dff 60%,#27cf7a 100%)",
            color: "#fff",
            border: "none",
            fontWeight: 900,
            fontSize: 21,
            letterSpacing: ".9px",
            boxShadow: "0 8px 34px 0 #a18fff2a",
            cursor: "pointer",
            transition: "background .19s"
          }}
          onMouseOver={e => (e.currentTarget.style.background = "linear-gradient(90deg,#27cf7a 60%,#7c4dff 100%)")}
          onMouseOut={e => (e.currentTarget.style.background = "linear-gradient(90deg,#7c4dff 60%,#27cf7a 100%)")}
        >
          مستعد تتصدر؟ ابدأ الخدمة الآن!
        </button>
      </div>

      {/* ختم أو توثيق */}
      <div style={{
        textAlign: "center",
        marginTop: 33,
        color: "#27cf7a",
        fontWeight: 900,
        fontSize: 15.5,
        letterSpacing: ".7px"
      }}>
        <img src={shieldIcon} alt="توثيق" style={{ width: 24, height: 24, marginLeft: 5, verticalAlign: "middle" }} />
        جميع حملاتنا آمنة ومدعومة بأدق التقارير والفواتير السعودية ✔️
      </div>
    </div>
  );
}
