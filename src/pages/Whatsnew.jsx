import React from "react";
import systemIcon from "../assets/svg/system-center.svg";
import checkIcon from "../assets/svg/check.svg";
import lightningIcon from "../assets/svg/lightning.svg";

const updates = [
  {
    title: "دعم الذكاء الصناعي الفوري",
    desc: "أصبح بإمكانك الآن دمج الذكاء الصناعي في أنظمتك بضغطة زر — جرب الـ API الجديد!",
    date: "مايو 2024",
    tag: "جديد",
    icon: lightningIcon
  },
  {
    title: "لوحة تحكم مطورة بالكامل",
    desc: "تحكم أسرع، تصميم جديد، تجربة مستخدم سلسة مع ميزة التخصيص الذكي.",
    date: "أبريل 2024",
    tag: "مطوّر",
    icon: systemIcon
  },
  {
    title: "تفعيل التقارير اللحظية",
    desc: "احصل على تقارير فورية وتحليلات متقدمة لعملائك في أي وقت.",
    date: "مارس 2024",
    tag: "جديد",
    icon: checkIcon
  },
  {
    title: "الاشتراكات الذكية",
    desc: "إدارة وتجديد تلقائي مع إشعارات فورية وطرق دفع سعودية.",
    date: "يناير 2024",
    tag: "قادم",
    icon: lightningIcon
  }
];

const tagColors = {
  "جديد": "#24e9ca",
  "مطوّر": "#7c4dff",
  "قادم": "#ffd166"
};

export default function WhatsNew() {
  return (
    <div dir="rtl" style={{
      minHeight: "100vh",
      background: "linear-gradient(120deg, #f6f8ff 0%, #eaf4fa 100%)",
      fontFamily: "Tajawal, Arial, sans-serif"
    }}>
      {/* هيدر جذاب */}
      <div style={{
        width: "100%", textAlign: "center", marginTop: 48, marginBottom: 10
      }}>
        <img src={systemIcon} alt="منجز" style={{
          width: 60, marginBottom: 10, borderRadius: 13, boxShadow: "0 3px 10px #7c4dff10"
        }} />
        <h1 style={{
          color: "#7c4dff", fontWeight: 900, fontSize: 32, marginBottom: 3
        }}>ما الجديد في منجز؟</h1>
        <div style={{
          color: "#555", fontWeight: 700, fontSize: 17
        }}>تابع آخر الميزات والتحديثات والتطويرات الحقيقية على منصتك التقنية</div>
      </div>

      {/* تايملاين التحديثات مع Cards متداخلة */}
      <div style={{
        maxWidth: 800, margin: "45px auto 40px auto", position: "relative"
      }}>
        <div style={{
          position: "absolute", left: "50%", top: 0, bottom: 0, width: 7,
          background: "linear-gradient(180deg,#7c4dff 50%,#24e9ca 100%)", borderRadius: 8, transform: "translateX(-50%)", opacity: .16
        }}></div>
        {updates.map((u, i) => (
          <div key={u.title} style={{
            display: "flex",
            flexDirection: i % 2 === 0 ? "row" : "row-reverse",
            alignItems: "flex-start",
            marginBottom: 39,
            position: "relative"
          }}>
            <div style={{
              flex: 1,
              minWidth: 270,
              marginLeft: i % 2 === 0 ? 40 : 0,
              marginRight: i % 2 === 1 ? 40 : 0,
              background: "#fff",
              borderRadius: 19,
              boxShadow: "0 4px 26px #7c4dff0b",
              padding: "28px 25px 18px",
              position: "relative",
              zIndex: 2,
              transition: "transform .17s cubic-bezier(.4,2.3,.4,1)",
              border: `2.4px solid ${tagColors[u.tag] || "#e4e6fc"}`
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 4 }}>
                <img src={u.icon} alt={u.title} style={{ width: 32, height: 32, borderRadius: 8, boxShadow: `0 2px 10px ${tagColors[u.tag]}33` }} />
                <span style={{
                  background: tagColors[u.tag],
                  color: "#fff", borderRadius: 7, padding: "4px 17px", fontWeight: 900, fontSize: 15, letterSpacing: ".02em"
                }}>
                  {u.tag}
                </span>
                <span style={{
                  color: "#888", fontWeight: 800, fontSize: 14, marginRight: 13
                }}>
                  {u.date}
                </span>
              </div>
              <h2 style={{
                color: "#7c4dff", fontWeight: 900, fontSize: 19, margin: "8px 0 5px"
              }}>{u.title}</h2>
              <div style={{
                color: "#222", fontWeight: 700, fontSize: 15.5
              }}>{u.desc}</div>
            </div>
            <div style={{
              width: 37, height: 37, background: tagColors[u.tag] || "#e4e6fc",
              borderRadius: "50%", position: "absolute", left: "50%", top: 23,
              zIndex: 4, transform: "translateX(-50%)", border: "3px solid #fff", boxShadow: "0 3px 9px #7c4dff22"
            }}>
              <img src={u.icon} alt={u.tag} style={{
                width: 21, height: 21, margin: 8
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* فوتر أنيق */}
     
    </div>
  );
}
