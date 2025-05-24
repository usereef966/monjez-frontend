import React, {  useEffect } from "react";
import { useNavigate } from "react-router-dom";




// استيراد SVGاتك كالعاده
import systemCenterIcon from "../assets/svg/system-center.svg";
import aiIntegrationIcon from "../assets/svg/ai-integration.svg";
import securityShieldIcon from "../assets/svg/security-shield.svg";
import apiLinkIcon from "../assets/svg/api-link.svg";
import dashboardMagicIcon from "../assets/svg/dashboard-magic.svg";
import automationFlowIcon from "../assets/svg/automation-flow.svg";
import dataCloudIcon from "../assets/svg/data-cloud.svg";
import supportRocketIcon from "../assets/svg/support-rocket.svg";
// أيقونات التوثيق والعملاء (ضع شعاراتك الخاصة)
import verifiedIcon from "../assets/svg/verified.svg";
import aramcoIcon from "../assets/svg/aramco.svg";
import stcIcon from "../assets/svg/stc.svg";
import sabicIcon from "../assets/svg/sabic.svg";
import madaIcon from "../assets/svg/mada.svg";

// بيانات الكروت (8 خدمات)
const services = [
  { icon: aiIntegrationIcon, title: "ذكاء صناعي متكامل", desc: "نطور أنظمة تتعلم ذاتيًا وتفهم احتياجك." },
  { icon: securityShieldIcon, title: "حماية سيبرانية خارقة", desc: "أمان متطور ضد كل الهجمات والتخريبات." },
  { icon: apiLinkIcon, title: "تكامل API بلا حدود", desc: "اربط منصاتك وأنظمتك مع بعض بسلاسة." },
  { icon: dashboardMagicIcon, title: "لوحات تحكم عبقرية", desc: "تحكم في كل شيء بنقرة واحدة – داشبوردات خرافية." },
  { icon: automationFlowIcon, title: "أتمتة ذكية", desc: "حوّل عملك لآلة تعمل بدون تدخل بشري." },
  { icon: dataCloudIcon, title: "سحابة بيانات عملاقة", desc: "إدارة وتخزين وتحليل بلا حدود… لحظي ودقيق." },
  { icon: supportRocketIcon, title: "دعم تقني صاروخي", desc: "فريق مستعد يحل مشكلتك قبل ما تصير!" },
  { icon: systemCenterIcon, title: "إدارة مشاريع متكاملة", desc: "قيادة مشاريعك التقنية بخبرة سعودية عالمية." },
];

// بيانات الإحصائيات
const stats = [
  { label: "مشاريعنا المنجزة", value: 154 },
  { label: "شركاء نجاح", value: 27 },
  { label: "تكاملات API", value: 59 },
  { label: "ساعات دعم", value: 3000 }
];

// بيانات الشعارات
const partners = [
  { icon: aramcoIcon, name: "أرامكو" },
  { icon: stcIcon, name: "STC" },
  { icon: sabicIcon, name: "سابك" },
  { icon: madaIcon, name: "مدى" }
];

// ألوان الشارت
const barColors = ["#7c4dff", "#22e0fd", "#ffd166", "#36e59b"];

// شارت Bar Chart بسيط (SVG)
function StatsBarChart({ stats }) {
  const max = Math.max(...stats.map(s => s.value));
  return (
    <div style={{
      background: "#fff9",
      borderRadius: 26,
      padding: "30px 30px 15px 30px",
      boxShadow: "0 3px 24px #7c4dff18",
      margin: "0 auto 32px auto",
      maxWidth: 700
    }}>
      <div style={{ display: "flex", justifyContent: "center", gap: 20, alignItems: "flex-end", height: 122 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                width: 42,
                height: `${Math.max(30, (s.value / max) * 100)}px`,
                borderRadius: 15,
                background: `linear-gradient(120deg, ${barColors[i % barColors.length]}cc 70%, #fff0 100%)`,
                marginBottom: 8,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                transition: "height 0.8s cubic-bezier(.6,1.5,.7,1)",
                boxShadow: "0 6px 12px #7c4dff22"
              }}>
              <span style={{
                color: "#7c4dff",
                fontWeight: 900,
                fontSize: 19,
                marginBottom: 6,
                textShadow: "0 1px 8px #e3e1fc"
              }}>{s.value}</span>
            </div>
            <span style={{
              color: "#515174",
              fontWeight: 700,
              fontSize: 15,
              marginTop: 2
            }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Development() {


  
    useEffect(() => { document.title = "تطوير انظمة الويب "; }, []);



  const navigate = useNavigate();
  
  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(120deg, #e9eaff 0%, #cddcfa 100%)",
        fontFamily: "Tajawal, Arial, sans-serif",
        padding: "0 0 60px 0"
      }}
    >
      {/* Header */}
      <div style={{
        padding: "52px 0 34px 0",
        textAlign: "center"
      }}>
        <img
          src={systemCenterIcon}
          alt="تطوير الأنظمة"
          style={{
            width: 82,
            height: 82,
            borderRadius: "50%",
            marginBottom: 10,
            boxShadow: "0 6px 28px #a488fa55, 0 1.5px 9px #7c4dff22",
            animation: "spinCenter 11s linear infinite"
          }}
        />
        <h1 style={{
          fontSize: 34,
          color: "#7c4dff",
          fontWeight: 900,
          margin: 0,
          letterSpacing: ".5px",
          textShadow: "0 2px 16px #e0e0ff"
        }}>
          تطوير الأنظمة
        </h1>
        <div style={{
          fontSize: 19,
          color: "#5e5a99",
          margin: "10px 0 0 0",
          fontWeight: 600,
          maxWidth: 600,
          marginRight: "auto",
          marginLeft: "auto",
          lineHeight: 1.8
        }}>
          حلول تقنية ذكية تجمع بين الأمان، الذكاء، الأتمتة والسهولة… كل ما تحتاجه لتنقل عملك لعالم المستقبل!
        </div>
      </div>

      {/* GRID */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "34px",
        maxWidth: 1220,
        margin: "0 auto 35px",
        padding: "0 18px"
      }}>
        {services.map((s, i) => (
          <div
            key={i}
            tabIndex={0}
            style={{
              background: "linear-gradient(120deg,#fff,#f6f0ff 96%)",
              borderRadius: "30px 30px 42px 30px",
              boxShadow: "0 8px 34px #a488fa1b,0 2px 11px #7c4dff0b",
              border: "2px solid #e5e2fc",
              padding: "38px 15px 29px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minHeight: 265,
              position: "relative",
              transition: "transform 0.22s cubic-bezier(.7,.22,.35,1.39), box-shadow 0.3s",
              cursor: "pointer"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "scale(1.06) translateY(-7px)";
              e.currentTarget.style.boxShadow = "0 12px 34px 6px #a488fa44, 0 2px 13px #22e0fd12";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "scale(1) translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 34px #a488fa1b,0 2px 11px #7c4dff0b";
            }}
          >
            <div
              style={{
                width: 59,
                height: 59,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#e9d3ff 62%,#c6fff7 130%)",
                boxShadow: "0 2px 18px #7c4dff10",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 19
              }}
            >
              <img
                src={s.icon}
                alt={s.title}
                style={{
                  width: 34,
                  height: 34,
                  filter: "drop-shadow(0 2px 9px #7c4dff77)",
                  transition: "transform .18s"
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.13) rotate(7deg)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) rotate(0deg)"; }}
              />
            </div>
            <div style={{
              fontSize: 19,
              fontWeight: 700,
              color: "#8247e5",
              textShadow: "0 1.5px 7px #fff7",
              marginBottom: 8,
              letterSpacing: ".03em"
            }}>
              {s.title}
            </div>
            <div style={{
              fontSize: 15,
              color: "#515174",
              fontWeight: 500,
              textAlign: "center",
              lineHeight: 1.72,
              marginBottom: 13,
              minHeight: 44
            }}>
              {s.desc}
            </div>
            <button
            onClick={() => navigate("/dev/order")}
              style={{
                marginTop: "auto",
                padding: "7px 22px",
                borderRadius: 15,
                background: "linear-gradient(93deg,#7c4dff 40%,#22e0fd 120%)",
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                boxShadow: "0 2px 14px #7c4dff23",
                border: "none",
                outline: "none",
                cursor: "pointer",
                letterSpacing: ".03em",
                transition: "all .14s"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "linear-gradient(93deg,#22e0fd 0%,#7c4dff 100%)";
                e.currentTarget.style.transform = "scale(1.08)";
                e.currentTarget.style.boxShadow = "0 3px 16px #22e0fd55";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "linear-gradient(93deg,#7c4dff 40%,#22e0fd 120%)";
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 2px 14px #7c4dff23";
              }}
            >
              اطلب الخدمة
            </button>
          </div>
        ))}
      </div>

      {/* قسم الإحصائيات */}
      <div style={{ margin: "48px auto 0 auto", maxWidth: 760 }}>
        <h2 style={{
          color: "#7c4dff",
          fontSize: 27,
          fontWeight: 800,
          textAlign: "center",
          marginBottom: 15,
          letterSpacing: ".04em"
        }}>
          إحصائيات أعمالنا
        </h2>
        <StatsBarChart stats={stats} />
      </div>

      {/* قسم التوثيقات والعملاء */}
      <div style={{
        margin: "30px auto 0 auto",
        maxWidth: 800,
        textAlign: "center",
        background: "#fff5",
        borderRadius: 28,
        boxShadow: "0 3px 14px #7c4dff0c",
        padding: "26px 8px 22px 8px"
      }}>
        <div style={{
          display: "flex", justifyContent: "center", alignItems: "center", gap: 15,
          marginBottom: 14
        }}>
          <img src={verifiedIcon} alt="موثق" style={{ width: 38, height: 38, marginLeft: 8 }} />
          <span style={{ color: "#8247e5", fontWeight: 800, fontSize: 22 }}>أعمالنا موثقة ومعتمدة لدى:</span>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 34, flexWrap: "wrap", margin: "18px 0 10px 0" }}>
          {partners.map((p, idx) => (
            <div key={idx} style={{
              background: "#f5f2ff",
              borderRadius: 14,
              boxShadow: "0 2px 12px #7c4dff15",
              padding: "11px 18px",
              display: "flex",
              alignItems: "center",
              gap: 7,
              minWidth: 98
            }}>
              <img src={p.icon} alt={p.name} style={{ width: 36, height: 36, marginLeft: 7 }} />
              <span style={{ color: "#5e5a99", fontWeight: 700, fontSize: 18 }}>{p.name}</span>
            </div>
          ))}
        </div>
        <div style={{
          margin: "24px auto 0 auto",
          color: "#259f45",
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: ".02em"
        }}>
          السعودية أولاً… رؤيتنا تليق بالمستقبل وتخدم أكبر الشركات ورواد الأعمال.
        </div>
        <div style={{
          margin: "8px auto 0 auto",
          color: "#5e5a99",
          fontWeight: 600,
          fontSize: 17
        }}>
          استثمر الآن مع منجز — حيث التقنية ترفع أعمالك وتواكب طموحك!
        </div>
      </div>

      {/* ستايل Keyframes للأنيميشن */}
      <style>
        {`
          @keyframes spinCenter {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </div>
  );
}
