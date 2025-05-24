import React, { useState } from "react";
import { Link } from "react-router-dom";
import systemIcon from "../assets/svg/system-center.svg";
import whatsappIcon from "../assets/svg/whatsapp.svg";
import linkedinIcon from "../assets/svg/linkedin.svg";
import mailIcon from "../assets/svg/mail.svg";
import mapIcon from "../assets/svg/map.svg";

const HeaderSVG = () => (
  <div style={{ width: "100%", minHeight: 180, position: "relative" }}>
    <svg
      viewBox="0 0 1440 200"
      width="100%"
      height="180"
      style={{ display: "block" }}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="mainWave" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c4dff" />
          <stop offset="90%" stopColor="#24e9ca" />
        </linearGradient>
      </defs>
      <path
        d="M0,100 Q400,170 720,85 T1440,140 V200 H0Z"
        fill="url(#mainWave)"
        opacity="0.97"
      />
      <circle cx="300" cy="50" r="33" fill="#36e59b13" />
      <circle cx="1150" cy="34" r="26" fill="#ffd16622" />
    </svg>
    <div style={{
      position: "absolute", top: 35, width: "100%", textAlign: "center", zIndex: 3
    }}>
      <img src={systemIcon} alt="logo" style={{ width: 48, marginBottom: 6, borderRadius: 12, boxShadow: "0 4px 12px #7c4dff18" }} />
      <h2 style={{
        fontSize: 32, fontWeight: 900, color: "#fff",
        textShadow: "0 4px 22px #7c4dffbb,0 1px 2px #24e9ca99",
        margin: 0, letterSpacing: ".02em", lineHeight: "44px"
      }}>
        تواصل معنا — خدمة سعودية حقيقية
      </h2>
      <div style={{
        color: "#e0e6ff", fontWeight: 700, fontSize: 16, marginTop: 4
      }}>
        لأي استفسار، دعم، أو شراكة عمل — نحن معك دائمًا
      </div>
    </div>
  </div>
);

export default function Contacts() {
  // ديناميك الفورم
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [touched, setTouched] = useState({});
  const [sent, setSent] = useState(false);

  // تحقق الإيميل
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validName = name.trim().length > 2;
  const validMsg = msg.trim().length > 8;
  const ready = validName && validEmail && validMsg;

  const handleSubmit = e => {
    e.preventDefault();
    if (ready) {
      setSent(true);
      setName(""); setEmail(""); setMsg(""); setTouched({});
      setTimeout(() => setSent(false), 3000);
      // هنا يمكنك ربط API أو إيميل أو واتساب
    }
  };

  return (
    <div dir="rtl" style={{
      minHeight: "100vh",
      background: "linear-gradient(120deg, #e6f3ff 0%, #f4eaff 100%)",
      fontFamily: "Tajawal, Arial, sans-serif"
    }}>
      <HeaderSVG />

      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        display: "flex",
        gap: 44,
        padding: "0 10px 48px",
        flexWrap: "wrap"
      }}>
        {/* بيانات التواصل */}
        <section style={{
          flex: 1.1,
          background: "#fff",
          borderRadius: 27,
          boxShadow: "0 6px 28px #7c4dff10",
          padding: "40px 25px 30px 18px",
          marginTop: 50,
          minWidth: 280,
        }}>
          <h3 style={{ color: "#7c4dff", fontWeight: 900, fontSize: 22, marginBottom: 19 }}>
            معلومات التواصل
          </h3>
          <div style={{
            display: "flex", flexDirection: "column", gap: 15, fontSize: 17, fontWeight: 700, color: "#5e5a99"
          }}>
            <div><img src={mailIcon} alt="" style={{ width: 22, verticalAlign: "middle", marginLeft: 8 }} />
              البريد: <a href="mailto:info@monjez.sa" style={{ color: "#259f45", textDecoration: "underline", fontWeight: 800 }}>info@monjez.sa</a>
            </div>
            <div><img src={whatsappIcon} alt="" style={{ width: 22, verticalAlign: "middle", marginLeft: 8 }} />
              واتساب: <a href="https://wa.me/966512345678" target="_blank" rel="noopener noreferrer" style={{ color: "#24e9ca", textDecoration: "underline", fontWeight: 800 }}>+966512345678</a>
            </div>
            <div><img src={linkedinIcon} alt="" style={{ width: 21, verticalAlign: "middle", marginLeft: 8 }} />
              LinkedIn: <a href="https://linkedin.com/company/monjez" target="_blank" rel="noopener noreferrer" style={{ color: "#7c4dff", textDecoration: "underline", fontWeight: 800 }}>صفحة منجز</a>
            </div>
            <div><img src={mapIcon} alt="" style={{ width: 22, verticalAlign: "middle", marginLeft: 8 }} />
              العنوان: الرياض، المملكة العربية السعودية
            </div>
          </div>
          {/* روابط سوشيال كبيرة */}
          <div style={{
            display: "flex", gap: 19, marginTop: 32, marginBottom: 11
          }}>
            <a href="https://wa.me/966512345678" target="_blank" rel="noopener noreferrer">
              <img src={whatsappIcon} alt="واتساب" style={{ width: 37 }} />
            </a>
            <a href="mailto:info@monjez.sa">
              <img src={mailIcon} alt="بريد" style={{ width: 34 }} />
            </a>
            <a href="https://linkedin.com/company/monjez" target="_blank" rel="noopener noreferrer">
              <img src={linkedinIcon} alt="لينكدإن" style={{ width: 34 }} />
            </a>
          </div>
        </section>

        {/* فورم التواصل */}
        <section style={{
          flex: 2,
          minWidth: 320,
          background: "#fff",
          borderRadius: 27,
          boxShadow: "0 6px 28px #24e9ca16",
          padding: "45px 32px 34px 30px",
          marginTop: 50
        }}>
          <h3 style={{ color: "#259f45", fontWeight: 900, fontSize: 22, marginBottom: 22 }}>
            راسلنا مباشرة عبر الموقع
          </h3>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div style={{ marginBottom: 13 }}>
              <label style={labelStyle("#7c4dff")}>الاسم الكامل</label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                onBlur={() => setTouched(t => ({ ...t, name: true }))}
                placeholder="اسمك هنا"
                style={inputStyle(validName, touched.name, !!name)}
                required
              />
              {touched.name && !validName && name.length > 0 && <FieldError msg="أدخل اسمًا صحيحًا (3 أحرف فأكثر)" />}
            </div>
            <div style={{ marginBottom: 13 }}>
              <label style={labelStyle("#7c4dff")}>البريد الإلكتروني</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onBlur={() => setTouched(t => ({ ...t, email: true }))}
                placeholder="your@email.com"
                style={inputStyle(validEmail, touched.email, !!email)}
                required
              />
              {touched.email && !validEmail && email.length > 0 && <FieldError msg="أدخل بريد إلكتروني صحيح" />}
            </div>
            <div style={{ marginBottom: 17 }}>
              <label style={labelStyle("#7c4dff")}>رسالتك</label>
              <textarea
                value={msg}
                onChange={e => setMsg(e.target.value)}
                onBlur={() => setTouched(t => ({ ...t, msg: true }))}
                placeholder="اكتب رسالتك أو استفسارك هنا"
                rows={4}
                style={{
                  ...inputStyle(validMsg, touched.msg, !!msg),
                  minHeight: 78, fontWeight: 700
                }}
                required
              />
              {touched.msg && !validMsg && msg.length > 0 && <FieldError msg="الرسالة يجب أن تكون 9 أحرف أو أكثر" />}
            </div>
            <button
              type="submit"
              disabled={!ready}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: 17,
                background: ready ? `linear-gradient(90deg,#7c4dff 40%,#24e9ca 120%)` : "#e5e5f8",
                color: ready ? "#fff" : "#bbb",
                fontWeight: 900,
                fontSize: 18,
                border: "none",
                outline: "none",
                boxShadow: "0 3px 20px #7c4dff14",
                cursor: ready ? "pointer" : "not-allowed",
                transition: "all .13s",
                marginTop: 5,
                letterSpacing: ".03em"
              }}
            >
              أرسل الرسالة الآن
            </button>
          </form>
          {sent && (
            <div style={{
              marginTop: 17,
              background: "#e8fff1",
              color: "#259f45",
              borderRadius: 11,
              padding: "10px 0",
              fontWeight: 800,
              fontSize: 16,
              textAlign: "center",
              boxShadow: "0 2px 10px #26de8133"
            }}>
              ✅ تم إرسال رسالتك بنجاح! سيتم التواصل معك قريبًا.
            </div>
          )}
        </section>
      </div>

      {/* فوتر ملكي */}
      <footer style={{
        background: "#262743", color: "#fff", padding: "32px 0 15px 0", marginTop: 34, textAlign: "center", fontWeight: 600, fontSize: 16
      }}>
        جميع الحقوق محفوظة &copy; منجز {new Date().getFullYear()}
        <div style={{ marginTop: 6 }}>
          <Link to="/privacy" style={{ color: "#ffd166", textDecoration: "underline", margin: "0 12px" }}>سياسة الخصوصية</Link>
          <Link to="/" style={{ color: "#24e9ca", textDecoration: "underline", margin: "0 12px" }}>الصفحة الرئيسية</Link>
        </div>
      </footer>
    </div>
  );
}

// ----- مكونات فرعية -----
function FieldError({ msg }) {
  return (
    <div style={{
      color: "#ff2d55",
      fontWeight: 700,
      fontSize: 13,
      marginTop: 2
    }}>{msg}</div>
  );
}

const labelStyle = color => ({
  fontWeight: 800,
  fontSize: 15.5,
  color,
  marginBottom: 7
});

const inputStyle = (valid, touched, hasValue) => ({
  width: "100%",
  borderRadius: 11,
  border: !hasValue
    ? "2px solid #ece8fb"
    : valid
      ? "2px solid #26de81"
      : "2px solid #ff2d55",
  background: "#f7f6ff",
  padding: "13px",
  fontWeight: 700,
  color: "#5e5a99",
  fontSize: 15,
  marginBottom: 0,
  outline: "none",
  transition: "all .13s"
});
