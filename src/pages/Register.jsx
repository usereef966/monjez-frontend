// ✅ تم ترتيب صفحة التسجيل بالكامل وتنظيم العناصر بشكل متماسك وديناميكي
// ✅ تم التأكد من تحقق الشروط والمظهر الكامل
// ✅ جاهزة للربط مع API عند تنفيذ خطوة الحفظ لاحقًا

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import googleIcon from "../assets/svg/google.svg";
import appleIcon from "../assets/svg/apple.svg";
import linkedinIcon from "../assets/svg/linkedin.svg";
import verifiedIcon from "../assets/svg/verified.svg";
import aramcoIcon from "../assets/svg/aramco.svg";
import stcIcon from "../assets/svg/stc.svg";
import ConfettiGift from "./ConfettiGift";




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

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+966");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();


  const passChecks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    digit: /[0-9]/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
    match: password && password === confirm
  };

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validName = name.trim().split(" ").filter(Boolean).length >= 2;
  const validPhone = /^\+9665[0-9]{8}$/.test(phone);
  const validCity = city.trim().length >= 2;
  const validCountry = country.trim().length >= 2;
  const ready = validName && validEmail && validPhone && validCity && validCountry && Object.values(passChecks).every(Boolean);
  const countryOptions = ["السعودية", "الإمارات", "مصر", "قطر", "الأردن", "البحرين", "عُمان"];
  const cityOptions = ["الرياض", "جدة", "مكة", "الدمام", "المدينة المنورة", "الخبر"];



  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitted(true);
    if (!ready) return;

    const [first, ...rest] = name.trim().split(' ');
    const last = rest.join(' ');

    try {
      const res = await fetch('https://monjez-online.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
          city,
          country,
          first_name: first,
          last_name: last
        })
      });

      const data = await res.json();

      if (res.ok) {
        const user = data.user;
        localStorage.setItem('user', JSON.stringify(user));

        setShowConfetti(true);
        setShowModal(true);

        // تحويل بعد ثانيتين
        setTimeout(() => {
          setShowModal(false);
          navigate("/"); // أو "/"
        }, 2000);

      } else {
        // ممكن تظهر الرسالة بأسلوب حلو بدل alert لو حاب
        setShowModal(true);
        setTimeout(() => setShowModal(false), 1700);
      }

    } catch (err) {
      setShowModal(true);
      setTimeout(() => setShowModal(false), 1700);
    }
  };


  const primary = "#7c4dff";
  const accent = "#24e9ca";

  return (
    <div dir="rtl" style={{ minHeight: "100vh", background: "linear-gradient(120deg, #e6f3ff 0%, #f4eaff 100%)" }}>



          <div dir="rtl" style={{ minHeight: "100vh", background: "linear-gradient(120deg, #e6f3ff 0%, #f4eaff 100%)" }}>
      {/* الكونفيتي */}
      {showConfetti && <ConfettiGift />}

      {/* المودال */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,.36)",
            backdropFilter: "blur(4.5px)",
            zIndex: 99,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div style={{
            background: "linear-gradient(108deg,#fff 75%,#e9e3fa 120%)",
            boxShadow: "0 12px 32px #8e5dff40",
            borderRadius: 30,
            padding: "46px 44px",
            minWidth: 330,
            textAlign: "center",
            fontWeight: 900,
            fontSize: 22,
            color: "#4c1a9f"
          }}>
            🎉 تم التسجيل بنجاح!
            <div style={{ fontSize: 15, fontWeight: 700, color: "#7c4dff", marginTop: 10 }}>
              أهلاً بك في <span style={{ color: "#ffd166" }}>منجز</span> <span style={{ fontSize: 23, marginRight: 6 }}>🚀</span>
            </div>
            <div style={{ fontWeight: 600, color: "#555", marginTop: 7, fontSize: 15 }}>
              تم إنشاء حسابك بنجاح.<br />سيتم تحويلك تلقائيًا للصفحة الرئيسية...
            </div>
          </div>
        </div>
      )}


      <HeaderSVG />

      <div style={{ display: "flex", justifyContent: "center", maxWidth: 1240, margin: "0 auto", gap: 38, padding: "0 12px" }}>
        <aside style={{ width: 310, minWidth: 240, background: "#f8f6ff", borderRadius: "24px 0 24px 24px", boxShadow: "0 8px 24px #7c4dff09", padding: 30, marginTop: 90, height: "fit-content" }}>
          <h3 style={{ color: primary, fontWeight: 900, fontSize: 21, marginBottom: 10 }}>لمحة عن منجز</h3>
          <p style={{ color: "#5e5a99", fontWeight: 600, fontSize: 15, lineHeight: 1.9 }}>
            منصة سعودية بخبرة محلية وعالمية، متخصصة في تطوير الأنظمة والمواقع والتطبيقات وكل ما تحتاجه أعمالك.
          </p>
          <p style={{ fontWeight: 800, color: "#259f45", fontSize: 15 }}>أقسام الموقع:</p>
          <ul style={{ listStyle: "none", padding: 0, fontWeight: 700, color: "#8247e5", fontSize: 16, lineHeight: 2 }}>
            <li>🛠️ تطوير الأنظمة</li>
            <li>🌍 برمجة المواقع</li>
            <li>📱 تطبيقات الجوال</li>
            <li>🚀 تسويق إلكتروني</li>
            <li>🔒 حماية متقدمة</li>
            <li>📊 حلول ذكاء صناعي</li>
          </ul>
          <p style={{ color: primary, fontWeight: 800, fontSize: 15 }}>موثوقين من:</p>
          <div style={{ display: "flex", gap: 9 }}>
            <img src={verifiedIcon} alt="" style={{ width: 28 }} />
            <img src={aramcoIcon} alt="" style={{ width: 36 }} />
            <img src={stcIcon} alt="" style={{ width: 30 }} />
          </div>
          <Link to="/" style={{ color: "#fff", background: primary, borderRadius: 9, padding: "10px 23px", fontWeight: 800, textDecoration: "none", marginTop: 28, display: "inline-block", fontSize: 16 }}>العودة للصفحة الرئيسية</Link>
        </aside>

        <div style={{ flex: 1, maxWidth: 560, background: "#fff", borderRadius: 34, boxShadow: "0 10px 36px #7c4dff18", padding: 40, marginTop: 60 }}>
          <form onSubmit={handleSubmit} autoComplete="off">
            {/* الاسم */}
            <Field label="اسمك الكامل (ثنائي أو أكثر)" value={name} onChange={setName} isValid={validName} touched={touched.name} name="name" placeholder="مثال: محمد الأحمد" setTouched={setTouched} />
            {touched.name && !validName && <FieldError msg="أدخل اسم ثنائي أو أكثر" />}

            {/* الإيميل */}
            <Field label="البريد الإلكتروني" type="email" value={email} onChange={setEmail} isValid={validEmail} touched={touched.email} name="email" placeholder="example@email.com" setTouched={setTouched} />
            {touched.email && !validEmail && <FieldError msg="أدخل بريد إلكتروني صحيح" />}

            {/* الجوال */}
            <Field label="رقم الجوال السعودي" type="tel" value={phone} onChange={setPhone} isValid={validPhone} touched={touched.phone} name="phone" placeholder="+9665xxxxxxxx" setTouched={setTouched} maxLength={13} />
            {touched.phone && !validPhone && <FieldError msg="أدخل رقم جوال سعودي صحيح" />}

            {/* كلمة المرور */}
            <Field label="كلمة المرور" type={showPass ? "text" : "password"} value={password} onChange={setPassword} name="password" placeholder="••••••••" setTouched={setTouched} showToggle={true} showPass={showPass} setShowPass={setShowPass} />

            {password.length > 0 && <PassChecks passChecks={passChecks} primary={primary} />}

            {/* تأكيد كلمة المرور */}
            <Field label="تأكيد كلمة المرور" type={showPass ? "text" : "password"} value={confirm} onChange={setConfirm} isValid={passChecks.match} touched={touched.confirm} name="confirm" placeholder="أعد كتابة كلمة المرور" setTouched={setTouched} />
            {touched.confirm && !passChecks.match && <FieldError msg="كلمة المرور غير متطابقة" />}

            <div style={{ marginBottom: 17 }}>
  <label style={labelStyle("#7c4dff")}>الدولة</label>
  <select
    value={country}
    onChange={e => setCountry(e.target.value)}
    onBlur={() => setTouched(t => ({ ...t, country: true }))}
    style={inputStyle(validCountry, touched.country, !!country)}
    name="country"
  >
    <option value="">اختر الدولة</option>
    {countryOptions.map(opt => (
      <option key={opt} value={opt}>{opt}</option>
    ))}
  </select>
  {touched.country && !validCountry && <FieldError msg="أدخل اسم الدولة" />}
</div>


<div style={{ marginBottom: 17 }}>
  <label style={labelStyle("#7c4dff")}>المدينة</label>
  <select
    value={city}
    onChange={e => setCity(e.target.value)}
    onBlur={() => setTouched(t => ({ ...t, city: true }))}
    style={inputStyle(validCity, touched.city, !!city)}
    name="city"
  >
    <option value="">اختر المدينة</option>
    {cityOptions.map(opt => (
      <option key={opt} value={opt}>{opt}</option>
    ))}
  </select>
  {touched.city && !validCity && <FieldError msg="أدخل اسم المدينة" />}
</div>






            <button type="submit" disabled={!ready} style={{ width: "100%", padding: "15px", borderRadius: 18, background: ready ? `linear-gradient(90deg,${primary} 40%,${accent} 120%)` : "#e5e5f8", color: ready ? "#fff" : "#bbb", fontWeight: 900, fontSize: 21, border: "none", marginTop: 14, letterSpacing: ".04em" }}>
              إنشاء حساب جديد
            </button>
          </form>

          <div style={{ marginTop: 24, textAlign: "center", fontWeight: 700 }}>
            لديك حساب؟ <Link to="/login" style={{ color: accent, textDecoration: "underline" }}>سجّل دخول</Link>
            <div style={{ marginTop: 10 }}>
              <Link to="/forgot" style={{ color: primary, textDecoration: "underline" }}>نسيت كلمة المرور؟</Link>
            </div>
          </div>

          <div style={{ marginTop: 35 }}>
            <SocialBtn icon={googleIcon} label="التسجيل بواسطة Google" />
            <SocialBtn icon={appleIcon} label="التسجيل بواسطة Apple" />
            <SocialBtn icon={linkedinIcon} label="التسجيل بواسطة LinkedIn" />
          </div>
        </div>
      </div>
    </div>


    </div>
  );
}

function HeaderSVG() {
  return (
    <div style={{ width: "100%", minHeight: 240, position: "relative" }}>
      <svg viewBox="0 0 1440 260" width="100%" height="240" style={{ display: "block" }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="mainWave" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7c4dff" />
            <stop offset="80%" stopColor="#24e9ca" />
          </linearGradient>
          <radialGradient id="circleGrad" cx="0.7" cy="0.2" r="0.6">
            <stop offset="0%" stopColor="#36e59b" stopOpacity="0.13" />
            <stop offset="100%" stopColor="#7c4dff" stopOpacity="0.02" />
          </radialGradient>
        </defs>
        <path d="M0,130 Q400,245 720,140 T1440,195 V260 H0Z" fill="url(#mainWave)" opacity="0.95" />
        <circle cx="280" cy="55" r="42" fill="url(#circleGrad)" />
        <circle cx="1200" cy="38" r="36" fill="#ffd16633" opacity="0.5" />
        <circle cx="900" cy="80" r="28" fill="#36e59b18" />
        <circle cx="1400" cy="100" r="14" fill="#7c4dff20" />
      </svg>
      <div style={{ position: "absolute", top: 44, width: "100%", textAlign: "center", zIndex: 3 }}>
        <h2 style={{ fontSize: 39, fontWeight: 900, color: "#fff", textShadow: "0 4px 28px #7c4dffbb,0 1px 2px #24e9ca99", margin: 0, letterSpacing: ".02em", lineHeight: "62px" }}>
          أهلاً بك في التسجيل —<br />انضم لنجوم التقنية السعودية
        </h2>
        <div style={{ color: "#e0e6ff", fontSize: 20, fontWeight: 800, marginTop: 11, textShadow: "0 1px 4px #7c4dff44" }}>
          ابدأ رحلتك مع <span style={{ color: "#ffd166" }}>منجز</span>  <span style={{ marginRight: 8 }}>🇸🇦</span>
        </div>
      </div>
    </div>
  );
}

function Field({ label, type = "text", value, onChange, isValid = true, touched, name, placeholder, setTouched, showToggle = false, showPass, setShowPass, maxLength }) {
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
          maxLength={maxLength}
        />
        {showToggle && (
          <span
            style={{ position: "absolute", left: 14, top: 13, cursor: "pointer", color: "#aaa", fontSize: 17, fontWeight: 700 }}
            onClick={() => setShowPass(s => !s)}
            title={showPass ? "إخفاء" : "إظهار"}
          >
            {showPass ? "🙈" : "👁️"}
          </span>
        )}
      </div>
    </div>
  );
}

function FieldError({ msg }) {
  return <div style={{ color: "#ff2d55", fontWeight: 700, fontSize: 13, marginTop: 2 }}>{msg}</div>;
}

function PassChecks({ passChecks, primary }) {
  const checks = [
    { key: "length", label: "٨ أحرف أو أكثر" },
    { key: "upper", label: "حرف كبير (A-Z)" },
    { key: "lower", label: "حرف صغير (a-z)" },
    { key: "digit", label: "رقم (0-9)" },
    { key: "symbol", label: "رمز خاص (!@#...)" }
  ];
  return (
    <div style={{ display: "flex", gap: 13, flexWrap: "wrap", marginBottom: 12 }}>
      {checks.map(item => (
        <div key={item.key} style={{ display: "flex", alignItems: "center", gap: 4, background: passChecks[item.key] ? "#e8fff1" : "#f7f7fa", border: `1.7px solid ${passChecks[item.key] ? "#26de81" : "#ece8fb"}`, color: passChecks[item.key] ? "#26de81" : "#888", borderRadius: 9, padding: "3px 12px", fontWeight: 800, fontSize: 14, minWidth: 92 }}>
          <span style={{ fontSize: 16 }}>{passChecks[item.key] ? "✔️" : "•"}</span>
          {item.label}
        </div>
      ))}
    </div>
  );
}

function SocialBtn({ icon, label }) {
  return (
    <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: "#fafaff", borderRadius: 12, border: "2px solid #ece8fb", color: "#222", fontWeight: 700, fontSize: 16, width: "100%", padding: "12px 0", boxShadow: "0 2px 10px #a488fa0e", cursor: "pointer", transition: "all .13s" }}>
      <img src={icon} alt={label} style={{ width: 22, height: 22 }} />
      {label}
    </button>
  );
}
