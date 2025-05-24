import androidBot from "../assets/svg/android-bot.svg";
import storeIcon from "../assets/svg/android-store.svg";
import eduIcon from "../assets/svg/android-education.svg";
import healthIcon from "../assets/svg/android-health.svg";
import designIcon from "../assets/svg/android-design.svg";
import financeIcon from "../assets/svg/android-finance.svg";
import chatIcon from "../assets/svg/android-chat.svg";
import serviceIcon from "../assets/svg/android-service.svg";
import StarBubblesEffect from "./StarBubblesEffect";
import AnimatedNumber from "./AnimatedNumber";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useNavigate } from "react-router-dom";
import React, { useEffect  } from "react";


const data = [
  { name: "طلبات", value: 40 },
  { name: "تطبيقات أطلقت", value: 550 },
  { name: "قيد التنفيذ", value: 400 }
];
const COLORS = ["#18e388", "#34b8f5", "#ffd166"];

// الكروت الثمانية
const cards = [
  { icon: storeIcon, title: "متجر إلكتروني سعودي", desc: "دعم دفع إلكتروني + شحن محلي + واجهة خضراء شابة." },
  { icon: eduIcon, title: "تعليم وتدريب", desc: "منصة تعليمية عصرية لأندرويد مع فيديو ودروس تفاعلية." },
  { icon: healthIcon, title: "الصحة واللياقة", desc: "تطبيق صحة متكامل مع تتبع وتمارين للسعوديين." },
  { icon: androidBot, title: "خدمات مبتكرة", desc: "صناعة تطبيقات حسب الطلب، مهما كان خيالك!" },
  // الصف الثاني
  { icon: designIcon, title: "تصاميم UI/UX", desc: "واجهات عصرية، ألوان ميتيريال، تجربة مستخدم قوية." },
  { icon: financeIcon, title: "مال وأعمال", desc: "إدارة مالية وتقارير شاملة ومصممة لبيئة الأعمال." },
  { icon: chatIcon, title: "دردشة وتواصل", desc: "شات فوري مع إشعارات، ملصقات، وإيموجي." },
  { icon: serviceIcon, title: "خدمات مخصصة", desc: "تكامل مع أي خدمات خارجية وتوصيل APIs بسهولة." }
];

export default function AndroidShowcase() {
  const navigate = useNavigate();

          useEffect(() => {
      document.title = "منجز - تطبيقات الاندرويد";
    }, []);
  
  return (
    <div>
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(118deg,#e7fff2 70%,#d6eaff 100%)",
        position: "relative",
        overflow: "hidden",
        fontFamily: "Cairo, Tajawal, Arial",
      }}>
        {/* زخارف دوائر نيون */}
        <div style={{
          position: "absolute", top: -120, left: -160, width: 350, height: 350,
          background: "radial-gradient(circle at 60% 60%, #17fd7b60 50%, #fff0 100%)",
          borderRadius: "50%", filter: "blur(8px)", zIndex: 0,
        }} />
        <div style={{
          position: "absolute", bottom: -90, right: -110, width: 260, height: 260,
          background: "radial-gradient(circle at 50% 40%, #5cffce40 80%, #fff0 100%)",
          borderRadius: "50%", filter: "blur(10px)", zIndex: 0,
        }} />
        {/* زخرفة شرائح كهرباء */}
        <div style={{
          position: "absolute", top: 80, left: "24%", width: 210, height: 16,
          background: "linear-gradient(90deg, #a8ffe0 30%, #7fffd4 100%)",
          opacity: 0.13, borderRadius: 12, transform: "rotate(-11deg)", zIndex: 0,
        }} />
        <div style={{
          position: "absolute", bottom: 160, right: "22%", width: 230, height: 18,
          background: "linear-gradient(90deg, #7fffd4 10%, #57d3a6 100%)",
          opacity: 0.18, borderRadius: 13, transform: "rotate(8deg)", zIndex: 0,
        }} />

        {/* رأس الصفحة */}
        <div style={{
          textAlign: "center", paddingTop: 70, marginBottom: 44, position: "relative", zIndex: 2
        }}>
          <img src={androidBot} alt="Android Bot" style={{
            width: 92, filter: "drop-shadow(0 10px 80px #2ff39e44)"
          }} />
          <h1 style={{
            fontSize: 38, fontWeight: 900, color: "#1fc765",
            textShadow: "0 3px 24px #0dce7a44"
          }}>
            عالم تطبيقات أندرويد السعودي
          </h1>
          <p style={{
            color: "#217e52", fontSize: 22, fontWeight: 700,
            margin: "8px auto 0 auto", maxWidth: 520
          }}>
            منصة تجمع التقنية، الفخامة، والجرأة.<br />
            متاجر، تعليم، صحة، خدمات… كل ما تحتاجه لدخول <span style={{ color: '#23e38a', fontWeight: 900 }}>سوق السعودية الرقمي</span> من أوسع أبوابه!
          </p>
        </div>

        {/* 4 كروت فوق */}
        <div style={{
  maxWidth: 1140,
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(200px, 1fr))",
  gap: "54px 40px", // التباعد الأفقي والعمودي
  rowGap: "80px",        // مسافة رأسية أكبر
  zIndex: 2,
  columnGap: "60px",     // مسافة أفقية كافية
  position: "relative",
 
        }}>
          {cards.slice(0, 4).map((c, i) => (
            <div key={i} style={{
              background: "#fff",
              
              borderRadius: "30px 80px 28px 28px",
              boxShadow: "0 8px 32px #24fca833, 0 2px 12px #7cffc711",
              border: "2.7px solid #23e38a",
              padding: "34px 18px 27px",
              display: "flex", flexDirection: "column", alignItems: "center",
              position: "relative",
              overflow: "hidden",
              fontFamily: "Cairo, Tajawal, Arial",
              fontWeight: 600,
              transition: "transform .19s, box-shadow .21s"
            }}
              className="android-card"
            >
              <img src={c.icon} alt="" style={{
                width: 48, marginBottom: 24,
                filter: "drop-shadow(0 8px 19px #23e38a45)"
              }} />
              <h2 style={{
                color: "#18c988", fontWeight: 800, fontSize: 21, marginBottom: 10
              }}>{c.title}</h2>
              <p style={{ color: "#277c5a", fontSize: 16, marginBottom: 15, lineHeight: 1.8 }}>
                {c.desc}
              </p>
              {/* زر Ripple ميتيريال */}
              <button
              onClick={() => navigate("/order/android")}
                style={{
                  background: "linear-gradient(93deg,#17fd7b 50%,#3ae371 100%)",
                  color: "#fff", fontWeight: 800, fontSize: 17.5,
                  borderRadius: 13, border: "none",
                  boxShadow: "0 5px 18px #18e3883b",
                  padding: "10px 34px", marginTop: "auto",
                  letterSpacing: 0.2, cursor: "pointer",
                  position: "relative", overflow: "hidden"
                }}
                onMouseDown={e => {
                  // Ripple Effect بسيط
                  const btn = e.currentTarget;
                  const ripple = document.createElement("span");
                  ripple.className = "ripple";
                  ripple.style.position = "absolute";
                  ripple.style.left = `${e.nativeEvent.offsetX}px`;
                  ripple.style.top = `${e.nativeEvent.offsetY}px`;
                  ripple.style.width = ripple.style.height = "150px";
                  ripple.style.background = "#34f7b555";
                  ripple.style.borderRadius = "50%";
                  ripple.style.transform = "translate(-50%,-50%) scale(0.2)";
                  ripple.style.opacity = "0.6";
                  ripple.style.pointerEvents = "none";
                  ripple.style.transition = "all .42s cubic-bezier(.22,2.11,.34,.97)";
                  btn.appendChild(ripple);
                  setTimeout(() => {
                    ripple.style.transform = "translate(-50%,-50%) scale(1.7)";
                    ripple.style.opacity = "0";
                  }, 10);
                  setTimeout(() => btn.removeChild(ripple), 450);
                }}
              >
                اطلب الخدمة
              </button>
            </div>
          ))}
        </div>

        {/* موجة SVG بين الصفوف */}
        <div style={{ margin: "12px 0", width: 420 }}>
          <svg width="100%" height="34" viewBox="0 0 420 34">
            <path d="M0,19 Q105,34 210,10 Q315,-10 420,20" fill="none" stroke="#cbffe6" strokeWidth="5" />
          </svg>
        </div>

        {/* 4 كروت تحت */}
        <div style={{
          maxWidth: 1140, margin: "0 auto", display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)", gap: "50px",rowGap: "80px",columnGap: "60px",  zIndex: 2, position: "relative",
        }}>
          {cards.slice(4, 8).map((c, i) => (
            <div key={i + 4} style={{
              background: "#fff",
              borderRadius: "28px 28px 30px 80px",
              boxShadow: "0 8px 32px #24fca833, 0 2px 12px #7cffc711",
              border: "2.7px solid #23e38a",
              padding: "34px 18px 27px",
              display: "flex", flexDirection: "column", alignItems: "center",
              position: "relative",
              overflow: "hidden",
              fontFamily: "Cairo, Tajawal, Arial",
              fontWeight: 600,
              transition: "transform .19s, box-shadow .21s"
            }}
              className="android-card"
            >
              <img src={c.icon} alt="" style={{
                width: 48, marginBottom: 15,
                filter: "drop-shadow(0 8px 19px #23e38a45)"
              }} />
              <h2 style={{
                color: "#18c988", fontWeight: 800, fontSize: 21, marginBottom: 10
              }}>{c.title}</h2>
              <p style={{ color: "#277c5a", fontSize: 16, marginBottom: 15, lineHeight: 1.8 }}>
                {c.desc}
              </p>
              {/* زر Ripple ميتيريال */}
              <button
              onClick={() => navigate(`/order?type=${encodeURIComponent(c.title)}`)}
                style={{
                  background: "linear-gradient(93deg,#17fd7b 50%,#3ae371 100%)",
                  color: "#fff", fontWeight: 800, fontSize: 17.5,
                  borderRadius: 13, border: "none",
                  boxShadow: "0 5px 18px #18e3883b",
                  padding: "10px 34px", marginTop: "auto",
                  letterSpacing: 0.2, cursor: "pointer",
                  position: "relative", overflow: "hidden"
                }}
                onMouseDown={e => {
                  // Ripple Effect بسيط
                  const btn = e.currentTarget;
                  const ripple = document.createElement("span");
                  ripple.className = "ripple";
                  ripple.style.position = "absolute";
                  ripple.style.left = `${e.nativeEvent.offsetX}px`;
                  ripple.style.top = `${e.nativeEvent.offsetY}px`;
                  ripple.style.width = ripple.style.height = "150px";
                  ripple.style.background = "#34f7b555";
                  ripple.style.borderRadius = "50%";
                  ripple.style.transform = "translate(-50%,-50%) scale(0.2)";
                  ripple.style.opacity = "0.6";
                  ripple.style.pointerEvents = "none";
                  ripple.style.transition = "all .42s cubic-bezier(.22,2.11,.34,.97)";
                  btn.appendChild(ripple);
                  setTimeout(() => {
                    ripple.style.transform = "translate(-50%,-50%) scale(1.7)";
                    ripple.style.opacity = "0";
                  }, 10);
                  setTimeout(() => btn.removeChild(ripple), 450);
                }}
              >
                اطلب الخدمة
              </button>
            </div>
          ))}
        </div>

        {/* الشارت */}
        <div style={{
          width: "100%", maxWidth: 530, margin: "70px auto 20px auto",
          background: "rgba(255,255,255,0.68)",
          borderRadius: 26, boxShadow: "0 8px 38px #5ae2f222",
          padding: "28px 12px 16px"
        }}>
          <div style={{ textAlign: "center", fontWeight: 900, fontSize: 22, color: "#13e289", letterSpacing: ".5px", marginBottom: 8 }}>
            إحصائيات مشاريع الأندرويد المنجزة
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 50, right: 30, left: 30, bottom: 50 }}
            >
              <XAxis type="number" hide />
              <YAxis
                dataKey="name"
                type="category"
                axisLine={false}
                tickLine={false}
                style={{ fontFamily: "Tajawal", fontWeight: 800, fontSize: 16, fill: "#1fc765" }}
              />
              <Tooltip
                contentStyle={{ fontFamily: "Tajawal", fontWeight: 800, borderRadius: 12, background: "#eafff7" }}
                itemStyle={{ color: "#1fc765", fontWeight: 700 }}
              />
              <Bar
                dataKey="value"
                radius={[12, 26, 26, 12]}
                label={({ x, y, width, value, index }) => (
                  <g>
                    <text
                      x={x + width + 35}
                      y={y + 13}
                      fill="#13e289"
                      fontSize="19"
                      fontWeight="bold"
                      fontFamily="Tajawal"
                    >
                      <AnimatedNumber value={value} />
                    </text>
                  </g>
                )}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* فقاعات آخر الصفحة */}
        <div style={{ position: "relative", width: "100%", minHeight: 220 }}>
          <StarBubblesEffect count={25} />
        </div>

        {/* ستايل الكروت عند hover */}
        <style>
          {`
            .android-card:hover {
              transform: translateY(-10px) scale(1.048) rotate(-1deg);
              box-shadow: 0 16px 58px #23e38a32, 0 2px 7px #7cffc729;
              border-color: #18e388;
            }
          `}
        </style>
      </div>
     
    </div>
  );
}
