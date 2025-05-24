import React, { useState } from "react";
import systemIcon from "../assets/svg/system-center.svg";
import checkIcon from "../assets/svg/check.svg";
import shieldIcon from "../assets/svg/shield.svg";
import lightningIcon from "../assets/svg/lightning.svg";

const cookieTypes = [
  {
    name: "الكوكيز الضرورية",
    desc: "ضرورية لتشغيل الموقع ولا يمكن تعطيلها في أنظمتنا (جلسة المستخدم، تذكر تسجيل الدخول، حماية الأمان).",
    required: true,
    icon: shieldIcon
  },
  {
    name: "كوكيز التحليل",
    desc: "نستخدمها لتحليل الأداء وزيارات الموقع (Google Analytics) بهدف تحسين الخدمة وتجربة المستخدم.",
    required: false,
    icon: lightningIcon
  },
  {
    name: "كوكيز التخصيص",
    desc: "تحفظ تفضيلاتك وتخصيص الواجهة وتذكر إعداداتك لتجربة شخصية أفضل.",
    required: false,
    icon: checkIcon
  }
];

export default function CookieSettings() {
  const [cookies, setCookies] = useState({
    analytics: true,
    custom: true
  });
  const [saved, setSaved] = useState(false);

  const handleToggle = type => {
    setCookies(c => ({
      ...c,
      [type]: !c[type]
    }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    // هنا تقدر تخزن في localStorage أو ترسل للخادم إذا تريد
  };

  return (
    <div dir="rtl" style={{
      minHeight: "100vh",
      background: "linear-gradient(120deg, #f8faff 0%, #eaf4fa 100%)",
      fontFamily: "Tajawal, Arial, sans-serif"
    }}>
      {/* هيدر أنيق */}
      <div style={{
        width: "100%", textAlign: "center", marginTop: 48, marginBottom: 6
      }}>
        <img src={systemIcon} alt="كوكيز" style={{
          width: 50, marginBottom: 10, borderRadius: 13, boxShadow: "0 3px 10px #7c4dff10"
        }} />
        <h1 style={{
          color: "#7c4dff", fontWeight: 900, fontSize: 30, marginBottom: 2
        }}>إعدادات الكوكيز</h1>
        <div style={{
          color: "#555", fontWeight: 700, fontSize: 15
        }}>
          تحكم بخصوصيتك عبر اختيار الكوكيز التي توافق عليها (وفق المعايير القانونية)
        </div>
      </div>

      {/* خيارات الكوكيز */}
      <div style={{
        maxWidth: 630, margin: "40px auto 0 auto", background: "#fff",
        borderRadius: 22, boxShadow: "0 3px 20px #7c4dff09", padding: "35px 22px"
      }}>
        {cookieTypes.map((type, i) => (
          <div key={type.name} style={{
            display: "flex", alignItems: "flex-start", gap: 19,
            marginBottom: 29, borderBottom: i < cookieTypes.length - 1 ? "1.6px solid #ece8fb" : "none", paddingBottom: 19
          }}>
            <img src={type.icon} alt={type.name} style={{
              width: 30, height: 30, borderRadius: 9, boxShadow: `0 2px 10px #7c4dff22`
            }} />
            <div style={{ flex: 1 }}>
              <div style={{
                color: "#7c4dff", fontWeight: 900, fontSize: 17, marginBottom: 3
              }}>{type.name} {type.required && <span style={{
                color: "#18c27d", fontWeight: 800, fontSize: 15, marginRight: 7
              }}>(إجباري)</span>}</div>
              <div style={{
                color: "#222", fontWeight: 700, fontSize: 14.5
              }}>{type.desc}</div>
            </div>
            {/* زر تفعيل/تعطيل */}
            {!type.required && (
              <label style={{
                display: "flex", alignItems: "center", cursor: "pointer"
              }}>
                <input
                  type="checkbox"
                  checked={type.name === "كوكيز التحليل" ? cookies.analytics : cookies.custom}
                  onChange={() => handleToggle(type.name === "كوكيز التحليل" ? "analytics" : "custom")}
                  style={{
                    accentColor: "#7c4dff",
                    width: 20, height: 20, borderRadius: 8
                  }}
                />
                <span style={{
                  marginRight: 6, fontWeight: 800, fontSize: 14, color: cookies[type.name === "كوكيز التحليل" ? "analytics" : "custom"] ? "#24e9ca" : "#ccc"
                }}>
                  {cookies[type.name === "كوكيز التحليل" ? "analytics" : "custom"] ? "مفعّل" : "معطل"}
                </span>
              </label>
            )}
          </div>
        ))}

        <div style={{
          color: "#888", fontSize: 14, margin: "10px 0 18px"
        }}>
          الكوكيز الضرورية فعالة دائماً لتشغيل الموقع ولا يمكن تعطيلها.<br />
          يمكنك تغيير تفضيلاتك في أي وقت من خلال هذه الصفحة.
        </div>

        <button
          onClick={handleSave}
          style={{
            width: "100%",
            padding: "13px",
            borderRadius: 14,
            background: "linear-gradient(93deg,#7c4dff 40%,#24e9ca 120%)",
            color: "#fff",
            fontWeight: 900,
            fontSize: 17,
            border: "none",
            outline: "none",
            boxShadow: "0 3px 18px #7c4dff12",
            cursor: "pointer",
            letterSpacing: ".04em",
            marginTop: 7,
            transition: "all .17s"
          }}
        >حفظ الإعدادات</button>

        {saved && (
          <div style={{
            marginTop: 14,
            background: "#e8fff1",
            color: "#259f45",
            borderRadius: 10,
            padding: "10px 0",
            fontWeight: 900,
            fontSize: 16,
            textAlign: "center",
            boxShadow: "0 2px 10px #26de8133"
          }}>
            ✅ تم حفظ إعدادات الكوكيز بنجاح!
          </div>
        )}
      </div>

      {/* نص قانوني صغير */}
      <div style={{
        maxWidth: 520, margin: "22px auto 0 auto", color: "#888", fontSize: 13, textAlign: "center"
      }}>
        <b>سياسة الكوكيز:</b> نحن نلتزم بالقوانين السعودية والدولية (GDPR)، وكل الكوكيز قابلة للتعطيل عدا الضرورية.<br />
        لمعرفة المزيد راجع <a href="/privacy" style={{ color: "#7c4dff", textDecoration: "underline", fontWeight: 800 }}>سياسة الخصوصية</a>
      </div>

      
    </div>
  );
}
