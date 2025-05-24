// ✅ تم ترتيب صفحة تسجيل الدخول بالكامل
// ✅ بنفس تنسيق صفحة التسجيل، مع الحفاظ على الهوية والتناسق

import React, { useState } from "react";
import { Link } from "react-router-dom";
import googleIcon from "../assets/svg/google.svg";
import appleIcon from "../assets/svg/apple.svg";
import linkedinIcon from "../assets/svg/linkedin.svg";
import systemIcon from "../assets/svg/system-center.svg";
import { useNavigate } from "react-router-dom";


const labelStyle = color => ({ fontWeight: 800, fontSize: 16.5, color, marginBottom: 8 });
const inputStyle = (valid, touched, hasValue) => ({
  width: "100%",
  borderRadius: 13,
  border: !hasValue ? "2px solid #ece8fb" : valid ? "2px solid #26de81" : "2px solid #ff2d55",
  background: "#f7f6ff",
  padding: "15px",
  fontWeight: 700,
  color: "#5e5a99",
  fontSize: 16,
  outline: "none",
  transition: "all .13s"
});

function FieldError({ msg }) {
  return (
    <div style={{
      color: "#ff2d55",
      fontWeight: 700,
      fontSize: 13,
      marginTop: 2
    }}>
      {msg}
    </div>
  );
}

function SocialBtn({ icon, label }) {
  return (
    <button style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      background: "#fafaff",
      borderRadius: 12,
      border: "2px solid #ece8fb",
      color: "#222",
      fontWeight: 700,
      fontSize: 16,
      width: "100%",
      padding: "12px 0",
      boxShadow: "0 2px 10px #a488fa0e",
      cursor: "pointer",
      transition: "all .13s"
    }}>
      <img src={icon} alt={label} style={{ width: 22, height: 22 }} />
      {label}
    </button>
  );
}


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();


  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validPass = password.length >= 8;
  const ready = validEmail && validPass;

  const handleSubmit = async e => {
  e.preventDefault();
  setErrorMsg("");
  if (!ready) return;

  try {
    const res = await fetch('https://monjez-online.onrender.com/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);  // ✅ تم حفظ التوكن بشكل صحيح
      localStorage.setItem('user', JSON.stringify(data.user)); // ✅ حفظ بيانات المستخدم (اختياري)
      navigate('/'); 
    } else {
      setErrorMsg(data.error || "خطأ في تسجيل الدخول!");
    }
  } catch (err) {
    setErrorMsg("خطأ في الاتصال بالخادم!");
  }
};


  const primary = "#7c4dff";
  const accent = "#24e9ca";

  return (
    <div dir="rtl" style={{ minHeight: "100vh", background: "linear-gradient(120deg, #e6f3ff 0%, #f4eaff 100%)" }}>
      <HeaderSVG />

      <div style={{ width: "100%", maxWidth: 460, margin: "0 auto", background: "#fff", borderRadius: 32, boxShadow: "0 10px 36px #7c4dff18", padding: 40, marginTop: 60 }}>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Field label="البريد الإلكتروني" type="email" value={email} onChange={setEmail} isValid={validEmail} touched={touched.email} name="email" placeholder="example@email.com" setTouched={setTouched} />
          {touched.email && !validEmail && <FieldError msg="أدخل بريد إلكتروني صحيح" />}

          <Field label="كلمة المرور" type={showPass ? "text" : "password"} value={password} onChange={setPassword} isValid={validPass} touched={touched.password} name="password" placeholder="••••••••" setTouched={setTouched} showToggle={true} showPass={showPass} setShowPass={setShowPass} />
          {touched.password && !validPass && <FieldError msg="كلمة المرور يجب أن تكون 8 أحرف أو أكثر" />}

          <button type="submit" disabled={!ready} style={{ width: "100%", padding: "15px", borderRadius: 18, background: ready ? `linear-gradient(90deg,${primary} 40%,${accent} 120%)` : "#e5e5f8", color: ready ? "#fff" : "#bbb", fontWeight: 900, fontSize: 20, border: "none", marginTop: 14, letterSpacing: ".04em" }}>
            تسجيل الدخول
          </button>
          {errorMsg && <FieldError msg={errorMsg} />}
        </form>

        <div style={{ marginTop: 17, textAlign: "center" }}>
          <Link to="/forgot" style={{ color: primary, fontWeight: 800, fontSize: 15.5, textDecoration: "underline" }}>نسيت كلمة المرور؟</Link>
        </div>

        <div style={{ marginTop: 35 }}>
          <SocialBtn icon={googleIcon} label="دخول بواسطة Google" />
          <SocialBtn icon={appleIcon} label="دخول بواسطة Apple" />
          <SocialBtn icon={linkedinIcon} label="دخول بواسطة LinkedIn" />
        </div>

        <div style={{ marginTop: 29, textAlign: "center", color: primary, fontWeight: 800, fontSize: 15 }}>
          ليس لديك حساب؟ <Link to="/register" style={{ color: accent, textDecoration: "underline", fontWeight: 900 }}>أنشئ حسابك الآن</Link>
        </div>
      </div>

      <footer style={{ background: "#262743", color: "#fff", padding: "34px 0 18px 0", marginTop: 265, textAlign: "center", fontWeight: 600, fontSize: 16 }}>
        جميع الحقوق محفوظة &copy; منجز {new Date().getFullYear()}
        <div style={{ marginTop: 6 }}>
          <Link to="/privacy" style={{ color: "#ffd166", textDecoration: "underline", margin: "0 12px" }}>سياسة الخصوصية</Link>
          <Link to="/contact" style={{ color: "#24e9ca", textDecoration: "underline", margin: "0 12px" }}>تواصل معنا</Link>
        </div>
      </footer>
    </div>
  );
}

function HeaderSVG() {
  return (
    <div style={{ width: "100%", minHeight: 215, position: "relative" }}>
      <svg viewBox="0 0 1440 230" width="100%" height="215" style={{ display: "block" }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="mainWave" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7c4dff" />
            <stop offset="80%" stopColor="#24e9ca" />
          </linearGradient>
        </defs>
        <path d="M0,120 Q400,215 720,115 T1440,175 V230 H0Z" fill="url(#mainWave)" opacity="0.95" />
        <circle cx="300" cy="40" r="35" fill="#36e59b13" />
        <circle cx="1200" cy="40" r="30" fill="#ffd16622" />
      </svg>
      <div style={{ position: "absolute", top: 37, width: "100%", textAlign: "center", zIndex: 3 }}>
        <img src={systemIcon} alt="logo" style={{ width: 54, marginBottom: 6, borderRadius: 12, boxShadow: "0 6px 12px #7c4dff18" }} />
        <h2 style={{ fontSize: 32, fontWeight: 900, color: "#fff", textShadow: "0 4px 22px #7c4dffbb,0 1px 2px #24e9ca99", margin: 0, letterSpacing: ".02em", lineHeight: "44px" }}>
          تسجيل الدخول — لوحة خبراء منجز
        </h2>
        <nav style={{ marginTop: 12, display: "flex", justifyContent: "center", gap: 27, flexWrap: "wrap" }}>
          <HeaderNav to="/" label="الرئيسية" />
          <HeaderNav to="/about" label="من نحن" />
          <HeaderNav to="/services" label="خدماتنا" />
          <HeaderNav to="/apps/android" label="تطبيقات أندرويد" />
          <HeaderNav to="/apps/ios" label="تطبيقات iOS" />
          <HeaderNav to="/seo" label="SEO & سيو" />
          <HeaderNav to="/contact" label="تواصل معنا" />
          <HeaderNav to="/support" label="الدعم الفني" />
        </nav>
      </div>
    </div>
  );
}

function HeaderNav({ to, label }) {
  return (
    <Link to={to} style={{ color: "#e0e6ff", fontWeight: 700, fontSize: 17, letterSpacing: ".03em", padding: "2px 12px", borderRadius: 9, textDecoration: "none", transition: "all .14s" }} onMouseEnter={e => e.currentTarget.style.color = "#ffd166"} onMouseLeave={e => e.currentTarget.style.color = "#e0e6ff"}>
      {label}
    </Link>
  );
}

function Field({ label, type = "text", value, onChange, isValid = true, touched, name, placeholder, setTouched, showToggle = false, showPass, setShowPass }) {
  return (
    <div style={{ marginBottom: 17 }}>
      <label style={labelStyle("#7c4dff")}>{label}</label>
      <div style={{ position: "relative" }}>
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, [name]: true }))}
          placeholder={placeholder}
          style={inputStyle(isValid, touched, !!value)}
          name={name}
          required
          autoComplete="off"
        />
        {showToggle && (
          <span style={{ position: "absolute", left: 14, top: 13, cursor: "pointer", color: "#aaa", fontSize: 17, fontWeight: 700 }} onClick={() => setShowPass(s => !s)} title={showPass ? "إخفاء" : "إظهار"}>
            {showPass ? "🙈" : "👁️"}
          </span>
        )}
      </div>
    </div>
  );
}
