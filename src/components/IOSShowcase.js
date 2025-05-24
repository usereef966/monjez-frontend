// IOSShowcase.jsx
import React, { useState,useEffect } from "react";

import appleIcon from "../assets/svg/apple-logo.svg";
import shopIcon from "../assets/svg/ios-store.svg";
import educationIcon from "../assets/svg/ios-education.svg";
import healthIcon from "../assets/svg/ios-health.svg";
import designIcon from "../assets/svg/ios-design.svg";
import financeIcon from "../assets/svg/ios-finance.svg";
import chatIcon from "../assets/svg/ios-chat.svg";
import serviceIcon from "../assets/svg/ios-service.svg";
import AnimatedNumber from "./AnimatedNumber";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


     
  

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

// بيانات الشارت
const data = [
  { name: "طلبات", value: 67 },
  { name: "تطبيقات تم تسليمها", value: 28 },
  { name: "منتظر الموافقة", value: 6 }
];
const COLORS = ["#1fc765", "#5b89ff", "#ffc300"];

// بيانات الكروت (8 كروت)
const cards = [
  { icon: shopIcon, title: "متجر آيفون", desc: "تطبيق متجر عصري بمؤثرات Glass وواجهة Apple الأصلية." },
  { icon: educationIcon, title: "تعليم ذكي", desc: "دروس تفاعلية وفيديوهات عالية الجودة مع إدارة ذكية." },
  { icon: healthIcon, title: "صحة ولياقة", desc: "متابعة صحتك وأداءك الرياضي على ستايل Apple Health." },
  { icon: appleIcon, title: "تطبيقات مصممة خصيصًا", desc: "ننفذ لك تطبيق iOS كما تتخيله… رفاهية بلا حدود!" },
  // الصف الثاني:
  { icon: designIcon, title: "تصاميم UI/UX", desc: "واجهات مستخدم بتجربة Apple، ألوان وزجاج فاخر." },
  { icon: financeIcon, title: "مال وأعمال", desc: "إدارة مالية، تقارير، وفواتير متكاملة في تطبيق واحد." },
  { icon: chatIcon, title: "دردشة وتواصل", desc: "شات تفاعلي بستايل iMessage، مع تنبيهات وإيموجي." },
  { icon: serviceIcon, title: "خدمات أعمال", desc: "ربط خدماتك بتطبيقات خارجية بسهولة ودعم فني فوري." }
];

export default function IOSShowcase() {


    useEffect(() => {
      document.title = "منجز - تطبيقات إلأيفون";
    }, []);
  const navigate = useNavigate();
    const [selected, setSelected] = useState("shop");

  const location = useLocation();
  const params   = new URLSearchParams(location.search);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const typeFromURL = params.get("type");
  

  const siteTypeMap = {
  "متجر آيفون": 2,
  "تعليم ذكي": 3,
  "صحة ولياقة": 1,
  "دردشة فاخرة": 4,
  "تصاميم Apple": 1,
  "مال وأعمال": 1,
  "خدمات أعمال": 1,
  "فكرة حرة": 1
};
 const selectedCard = cards.find(c => c.key === selected) || {};
 

  const serviceLabel = selectedCard.label;
  const serviceIcon  = selectedCard.icon;
const selectedSiteTypeId = siteTypeMap[serviceLabel] || 1;


  return (

    <div>
      <div>
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(130deg, #e7ebfa 60%, #d2e9fa 100%)",
      position: "relative",
      overflow: "hidden",
      fontFamily: "San Francisco, Tajawal, Arial"
    }}>
      {/* زخارف دوائر زجاجية عائمة */}
      <div style={{
        position: "absolute", top: -120, right: -160, width: 340, height: 340,
        background: "radial-gradient(circle at 60% 60%, #7b94f740 40%, #fff0 100%)",
        borderRadius: "50%", filter: "blur(10px)", zIndex: 0,
      }} />
      <div style={{
        position: "absolute", bottom: -80, left: -80, width: 240, height: 240,
        background: "radial-gradient(circle at 50% 40%, #c4e0ff45 60%, #fff0 100%)",
        borderRadius: "50%", filter: "blur(8px)", zIndex: 0,
      }} />
      <div style={{
        position: "absolute", top: 120, left: "24%", width: 200, height: 30,
        background: "linear-gradient(90deg, #e6f1ff 0%, #bdd6f6 100%)",
        opacity: 0.10, borderRadius: 18, transform: "rotate(7deg)", zIndex: 0,
        filter: "blur(2.5px)",
      }} />
      <div style={{
        position: "absolute", bottom: 160, right: "18%", width: 190, height: 21,
        background: "linear-gradient(90deg, #e8f0ff 10%, #94bbfd 100%)",
        opacity: 0.15, borderRadius: 13, transform: "rotate(-7deg)", zIndex: 0,
        filter: "blur(1.5px)",
      }} />

      {/* رأس الصفحة + شعار أبل */}
      <div style={{
        textAlign: "center", paddingTop: 72, marginBottom: 44, position: "relative", zIndex: 2
      }}>
        <img src={appleIcon} alt="Apple Logo" style={{
          width: 84, filter: "drop-shadow(0 10px 80px #7b94f760)"
        }} />
        <h1 style={{
          fontSize: 36, fontWeight: 900, color: "#4e6cf4",
          textShadow: "0 3px 34px #7b94f744"
        }}>
          عالم تطبيقات iOS الفاخر
        </h1>
        <p style={{
          color: "#5170b9", fontSize: 21, fontWeight: 700,
          margin: "8px auto 0 auto", maxWidth: 530
        }}>
          حيث البساطة، الجمال، والتقنية.<br />
          تسوّق، تعلّم، صحّة، خدمات… <span style={{ color: '#6498fa', fontWeight: 900 }}>مستوى Apple</span> لخدمة أعمالك في السوق السعودي باحتراف!
        </p>
      </div>

      {/* الكروت: 4 فوق + موجة + 4 تحت */}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 25, zIndex: 2, position: "relative"
      }}>
        {/* الصف الأول */}
        <div style={{
          maxWidth: 1220, width: "100%",
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 34
        }}>
          {cards.slice(0, 4).map((c, i) => (
            <div key={i} className="ios-card" style={{
              background: "rgba(255,255,255,0.76)",
              borderRadius: 24,
              boxShadow: "0 8px 38px #7b94f72d, 0 2px 12px #9fcafd15",
              border: "1.5px solid #d5e7fdcc",
              padding: "34px 18px 26px",
              display: "flex", flexDirection: "column", alignItems: "center",
              position: "relative",
              backdropFilter: "blur(7.7px)",
              WebkitBackdropFilter: "blur(7.7px)",
              fontFamily: "San Francisco, Tajawal, Arial",
              fontWeight: 600,
              transition: "transform .20s, box-shadow .22s"
            }}>
              <img src={c.icon} alt="" style={{
                width: 45, marginBottom: 15,
                filter: "drop-shadow(0 6px 14px #6498fa33)"
              }} />
              <h2 style={{
                color: "#6498fa", fontWeight: 800, fontSize: 20, marginBottom: 10
              }}>{c.title}</h2>
              <p style={{ color: "#5170b9", fontSize: 15.7, marginBottom: 15, lineHeight: 1.7 }}>
                {c.desc}
              </p>
              <button
  onClick={() => navigate("/order/ios")}
  style={{
    background: hoveredIndex === (i + 4)
      ? "linear-gradient(97deg,#7b88f4 60%,#50c0fa 100%)"
      : "rgba(255,255,255,0.81)",
    color: hoveredIndex === (i + 4) ? "#fff" : "#6498fa",
    fontWeight: 800,
    fontSize: 17,
    borderRadius: 13,
    border: "1.6px solid #bdd6fa",
    boxShadow: hoveredIndex === (i + 4)
      ? "0 10px 30px #7b88f455, 0 1px 5px #fff"
      : "0 3px 18px #6498fa24, 0 1px 5px #fff",
    padding: "10px 34px",
    marginTop: "auto",
    letterSpacing: 0.2,
    cursor: "pointer",
    backdropFilter: "blur(4.2px)",
    WebkitBackdropFilter: "blur(4.2px)",
    transition: "all .18s cubic-bezier(.4,2.1,.4,1)",
    transform: hoveredIndex === (i + 4) ? "translateY(-4px) scale(1.025)" : "none",
    outline: "none",
    borderColor: hoveredIndex === (i + 4) ? "#7b88f4" : "#bdd6fa",
  }}
  onMouseEnter={() => setHoveredIndex((i + 4))}
  onMouseLeave={() => setHoveredIndex(null)}
>
  اطلب الخدمة
</button>
            </div>
          ))}
        </div>

        {/* موجة أنيميشن SVG بين الصفين */}
        <div style={{ margin: "-13px 0 -18px 0", width: 420 }}>
          <svg width="100%" height="34" viewBox="0 0 420 34">
            <path d="M0,19 Q105,34 210,10 Q315,-10 420,20" fill="none" stroke="#dbe7fa" strokeWidth="4" />
          </svg>
        </div>

        {/* الصف الثاني */}
        <div style={{
          maxWidth: 1220, width: "100%",
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 34
        }}>
          {cards.slice(4, 8).map((c, i) => (
            <div key={i + 4} className="ios-card" style={{
              background: "rgba(255,255,255,0.76)",
              borderRadius: 24,
              boxShadow: "0 8px 38px #7b94f72d, 0 2px 12px #9fcafd15",
              border: "1.5px solid #d5e7fdcc",
              padding: "34px 18px 26px",
              display: "flex", flexDirection: "column", alignItems: "center",
              position: "relative",
              backdropFilter: "blur(7.7px)",
              WebkitBackdropFilter: "blur(7.7px)",
              fontFamily: "San Francisco, Tajawal, Arial",
              fontWeight: 600,
              transition: "transform .20s, box-shadow .22s"
            }}>
              <img src={c.icon} alt="" style={{
                width: 45, marginBottom: 15,
                filter: "drop-shadow(0 6px 14px #6498fa33)"
              }} />
              <h2 style={{
                color: "#6498fa", fontWeight: 800, fontSize: 20, marginBottom: 10
              }}>{c.title}</h2>
              <p style={{ color: "#5170b9", fontSize: 15.7, marginBottom: 15, lineHeight: 1.7 }}>
                {c.desc}
              </p>
             <button
  onClick={() => navigate("/order/ios")}
  style={{
    background: hoveredIndex === i
      ? "linear-gradient(97deg,#7b88f4 60%,#50c0fa 100%)"
      : "rgba(255,255,255,0.81)",
    color: hoveredIndex === i ? "#fff" : "#6498fa",
    fontWeight: 800,
    fontSize: 17,
    borderRadius: 13,
    border: "1.6px solid #bdd6fa",
    boxShadow: hoveredIndex === i
      ? "0 10px 30px #7b88f455, 0 1px 5px #fff"
      : "0 3px 18px #6498fa24, 0 1px 5px #fff",
    padding: "10px 34px",
    marginTop: "auto",
    letterSpacing: 0.2,
    cursor: "pointer",
    backdropFilter: "blur(4.2px)",
    WebkitBackdropFilter: "blur(4.2px)",
    transition: "all .18s cubic-bezier(.4,2.1,.4,1)",
    transform: hoveredIndex === i ? "translateY(-4px) scale(1.025)" : "none",
    outline: "none",
    borderColor: hoveredIndex === i ? "#7b88f4" : "#bdd6fa",
  }}
  onMouseEnter={() => setHoveredIndex(i)}
  onMouseLeave={() => setHoveredIndex(null)}
>
  اطلب الخدمة
</button>
            </div>
          ))}
        </div>
      </div>

      {/* الرسم البياني */}
      <div style={{
        width: "100%", maxWidth: 520, margin: "70px auto 30px auto",
        background: "rgba(255,255,255,0.80)",
        borderRadius: 20, boxShadow: "0 8px 36px #7cffc735",
        padding: "14px 8px 0"
      }}>
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={data}
              cx="50%" cy="50%"
              innerRadius={53}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
              labelLine={false}
              label={({ value, x, y, index }) => (
                <text
                  x={x}
                  y={y}
                  fill={COLORS[index % COLORS.length]}
                  fontSize="18"
                  fontWeight="bold"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="Tajawal"
                >
                  <AnimatedNumber value={value} />
                </text>
              )}
            >
              {data.map((entry, idx) => (
                <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value, name, props) => [
                `${value}`,
                data[props.payload?.[0]?.payload?.name]?.name || "عدد"
              ]}
              contentStyle={{ fontFamily: "Tajawal", fontWeight: 700, borderRadius: 13, background: "#f2f8ff" }}
            />

            <Legend
              verticalAlign="bottom"
              iconType="circle"
              formatter={(value, entry, index) => (
                <span style={{
                  color: COLORS[index % COLORS.length],
                  fontWeight: 700,
                  fontFamily: "Tajawal",
                  fontSize: 17,
                  marginLeft: 10
                }}>
                  {data[index].name}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ستايل الكروت عند hover */}
      <style>
        {`
        .ios-card:hover {
          transform: translateY(-8px) scale(1.037);
          box-shadow: 0 24px 52px #6498fa22, 0 2px 7px #bdd6fa15;
          border-color: #6498fa;
        }
        `}
      </style>
    </div>
  
  </div>
 
  </div>
  );
}
