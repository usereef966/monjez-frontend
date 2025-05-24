import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import androidIcon from "../assets/svg/android-icon.svg";
import iosIcon from "../assets/svg/ios-icon.svg";
import { ReactComponent as MonjezLogo } from "../assets/svg/MonjezLogo.svg";

// ─── ثوابت الستايل ─────────────────────────────────────────────────────────────
const navBtnStyle = {
  padding: "5px 10px",
  borderRadius: 10,
  background: "#fff",
  color: "#444",
  fontWeight: 700,
  fontSize: 18,
  margin: "0 0.0vw",
  textDecoration: "none",
  boxShadow: "0 2px 12px 0 rgba(124, 77, 255, 0.07)",
  border: "none",
  fontFamily: "Tajawal, Arial",
  transition: "all 0.18s",
  cursor: "pointer",
  minWidth: 80,
  maxWidth: 150,
  whiteSpace: "nowrap",
  flexShrink: 0,
};

const navBtnStyleActive = {
  ...navBtnStyle,
  background: "linear-gradient(90deg,#7c4dff 60%,#a18fff 100%)",
  color: "#fff",
  boxShadow: "0 4px 16px 0 rgba(124, 77, 255, 0.18)",
};

const userBtnStyle = {
  padding: "10px 24px",
  borderRadius: 16,
  background: "#fff",
  color: "#7c4dff",
  fontWeight: 800,
  fontSize: 17,
  margin: "0 9px",
  textDecoration: "none",
  boxShadow: "0 4px 24px 0 rgba(124, 77, 255, 0.14)",
  border: "2px solid #e6dbff",
  fontFamily: "Tajawal, Arial",
  transition: "all 0.22s",
  cursor: "pointer",
};

// ─── بيانات القائمة المنسدلة مع المسارات ───────────────────────────────────────
const appOptions = [
  { label: "تطبيقات الأندرويد", icon: androidIcon, path: "/apps/android" },
  { label: "تطبيقات الآيفون", icon: iosIcon, path: "/apps/ios" },
];

// ─── Dropdown الموبايل ─────────────────────────────────────────────────────────
function MobileAppsDropdown() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      style={{ position: "relative", display: "inline-block", zIndex: 99 }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={e => e.preventDefault()}
        style={navBtnStyle}
      >
        تطبيقات الموبايل
        <span style={{ fontSize: 10, marginRight: 6, color: "#7c4dff" }}>▼</span>
      </button>
      {open && (
        <>
          <div
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              width: 210,
              height: 15,
              zIndex: 1000,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              right: 0,
              minWidth: 210,
              background: "#fff",
              borderRadius: 14,
              boxShadow: "0 14px 34px rgba(124,77,255,0.11)",
              padding: "10px 0",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              textAlign: "right",
              zIndex: 99999, // مهم جداً
            }}
          >
            {appOptions.map(({ label, icon, path }) => (
              <button
                key={path}
                onClick={() => {
                  navigate(path);
                  setOpen(false);
                }}
                style={{
                  background: "none",
                  border: "none",
                  width: "100%",
                  padding: "8px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontFamily: "Tajawal, Arial",
                  cursor: "pointer",
                  transition: ".14s",
                  borderRadius: 10,
                }}
                onMouseOver={e => (e.currentTarget.style.background = "#ede7fb")}
                onMouseOut={e => (e.currentTarget.style.background = "#fff")}
              >
                <img src={icon} alt={label} style={{ width: 20, height: 20 }} />
                <span style={{ color: "#444", fontSize: 15 }}>{label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── قوائم العضوية ─────────────────────────────────────────────────────────────
function LoggedInMenu({ name }) {
  const navigate = useNavigate();
const handleLogout = () => {
  localStorage.removeItem('token'); // ✅ حذف "token" من localStorage
  localStorage.removeItem('user');  // ✅ (اختياري لو بتخزن بيانات المستخدم أيضاً)
  navigate('/login');               // ✅ توجيه لصفحة تسجيل الدخول
};

  return (
    <div style={{
      background: "#fff", borderRadius: 18, boxShadow: "0 8px 32px rgba(124,77,255,0.08)",
      padding: "6px 16px", display: "inline-flex", gap: 12, alignItems: "center"
    }}>
      <span style={{ color: "#333", fontWeight: 700, fontSize: 16 }}>
        {name}
      </span>
      <Link to="/orders" style={userBtnStyle}>طلباتي</Link>
      <Link to="/settings" style={userBtnStyle}>الإعدادات</Link>
      <button
        onClick={handleLogout}
        style={{ ...userBtnStyle, background: "#fff0f0", color: "#f44", border: "2px solid #ffd6d6" }}
      >
        تسجيل الخروج
      </button>
    </div>
  );
}
function LoggedOutMenu() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 8px 32px rgba(124,77,255,0.08)",
        padding: "6px 16px",
        display: "inline-flex",
        gap: 12,
        alignItems: "center",
      }}
    >
      <Link to="/login" style={userBtnStyle}>
        تسجيل الدخول
      </Link>
      <Link
        to="/register"
        style={{
          ...userBtnStyle,
          background: "#7c4dff",
          color: "#fff",
          border: "2px solid #a18fff",
        }}
      >
        تسجيل حساب
      </Link>
    </div>
  );
}

// ─── Hook لمعرفة حجم الشاشة ────────────────────────────────────────────────────
function useIsSmallScreen(breakpoint = 900) {
  const [small, setSmall] = React.useState(window.innerWidth < breakpoint);
  React.useEffect(() => {
    function handleResize() {
      setSmall(window.innerWidth < breakpoint);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return small;
}

// ─── الكومبوننت الرئيسي ────────────────────────────────────────────────────────
export default function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = !!user;
  const navigate = useNavigate();
  const isSmall = useIsSmallScreen();

  // Responsive nav button style
  const navBtnResponsive = {
    ...navBtnStyle,
    fontSize: isSmall ? 13 : navBtnStyle.fontSize,
    padding: isSmall ? "3px 5px" : navBtnStyle.padding,
    minWidth: isSmall ? 110 : navBtnStyle.minWidth, // أكبر قليلاً
    maxWidth: isSmall ? 140 : navBtnStyle.maxWidth,
    margin: isSmall ? "0 1px" : navBtnStyle.margin,
  };
  const navBtnActiveResponsive = {
    ...navBtnResponsive,
    background: navBtnStyleActive.background,
    color: navBtnStyleActive.color,
    boxShadow: navBtnStyleActive.boxShadow,
  };

  // مصفوفات القوائم
  const navItemsRow1 = [
    { label: "الصفحة الرئيسية", onClick: () => navigate("/"), active: true },
    { label: "تطبيقات الموبايل", custom: <MobileAppsDropdown /> },
    { label: "تهيئة المواقع (SEO)", onClick: () => navigate("/seo") },
    { label: "برمجة المواقع", onClick: () => navigate("/web") },
    { label: "تطوير الأنظمة", onClick: () => navigate("/dev") },
  ];

  const navItemsRow2 = [
    { label: "خدماتنا", onClick: () => navigate("/services") },
    { label: "من نحن", onClick: () => navigate("/support") },
    { label: "الخطط والأسعار", onClick: () => navigate("/plans") },
  ];

  return (
    <div style={{
      width: "100%", // كان "100vw"
      position: "relative",
      background: "#f8f8ff",
      boxSizing: "border-box",
      zIndex: 1000,
      direction: "rtl",
      overflowX: "hidden", // أضف هذا
    }}>
      {/* شعار المنصة */}
      <div style={{
        position: "absolute", top: 152, left: 38, zIndex: 15, width: "100%",
        textAlign: "center", marginTop: 17
      }}>
        <MonjezLogo style={{ height: 100, width: "auto"  }} aria-label="شعار منجز" />
      </div>

      {/* قوائم العضوية */}
      <div
        style={{
          position: "absolute",
          top: 18,
          right: 32,
          display: "flex",
          gap: 8,
          alignItems: "center",
          zIndex: 15,
        }}
      >
        {isLoggedIn
          ? <UserDropdown name={user.name.split(' ')[0]} onLogout={() => {
              localStorage.removeItem('user');
              navigate('/login');
            }} />
          : <LoggedOutMenu />
        }
      </div>

      {/* شريط التنقل */}
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          padding: "18px 8px 6px 8px",
          width: "100%",
          background: "transparent",
          direction: "rtl",
        }}
      >
        {/* الصف الأول */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 14,
          flexWrap: "wrap",
          marginBottom: 22, // مسافة واضحة
        }}>
          {navItemsRow1.map((item, idx) =>
            item.custom ? (
              <React.Fragment key={idx}>{item.custom}</React.Fragment>
            ) : (
              <button
                key={item.label}
                style={item.active ? navBtnActiveResponsive : navBtnResponsive}
                onClick={item.onClick}
              >
                {item.label}
              </button>
            )
          )}
        </div>
        {/* الصف الثاني */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 14,
          flexWrap: "wrap",
        }}>
          {navItemsRow2.map((item) => (
            <button
              key={item.label}
              style={navBtnResponsive}
              onClick={item.onClick}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* الرسم البياني السفلي */}
      <svg
        style={{ width: "100%", height: 220, marginTop: 50, display: "block" }}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          d="M0,192 C350,320 1200,0 1440,160 L1440,0 L0,0 Z"
          fill="#a18fff"
        />
      </svg>

      {/* رسالة ترحيبية */}
      <div
        style={{
          textAlign: "center",
          marginTop: -80,
          position: "relative",
          zIndex: 5,
        }}
      >
        <h1
          style={{
            fontFamily: "Tajawal, Arial",
            fontWeight: "bold",
            fontSize: "2.5rem",
            color: "#23273c",
            marginBottom: 8,
          }}
        >
          أهلًا بك في منصة منجز
        </h1>
        <p style={{ color: "#666", fontSize: 18, fontFamily: "Tajawal, Arial" }}>
          الحل الأسرع لإنجاز المهام التقنية
        </p>
      </div>
    </div>
  );
}

function UserDropdown({ name, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // إغلاق القائمة عند الضغط خارجها
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative", zIndex: 100 }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          background: open ? "linear-gradient(90deg,#7c4dff 60%,#a18fff 100%)" : "#fff",
          border: open ? "2px solid #a18fff" : "2px solid #e6dbff",
          borderRadius: 16,
          padding: "10px 22px",
          fontWeight: 800,
          fontSize: 16,
          color: open ? "#fff" : "#7c4dff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 8,
          boxShadow: open
            ? "0 6px 24px 0 rgba(124, 77, 255, 0.18)"
            : "0 4px 24px 0 rgba(124, 77, 255, 0.10)",
          minWidth: 130,
          transition: "all .18s",
          outline: open ? "2px solid #a18fff" : "none",
        }}
      >
        <span style={{ fontSize: 20, marginLeft: 4 }}>👋</span>
        <span>مرحبًا، {name}</span>
        <span style={{
          fontSize: 15,
          color: open ? "#fff" : "#7c4dff",
          marginRight: 6,
          transition: "transform .18s",
          transform: open ? "rotate(180deg)" : "none"
        }}>▼</span>
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "110%",
            right: 0,
            minWidth: 180,
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 14px 34px rgba(124,77,255,0.15)",
            padding: "10px 0",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            textAlign: "right",
            animation: "fadeIn .18s",
            border: "1.5px solid #ede7fb"
          }}
        >
          <Link to="/orders" style={dropdownItemStyle} className="dropdown-item-user" tabIndex={0}>طلباتي</Link>
          <Link to="/settings" style={dropdownItemStyle} className="dropdown-item-user" tabIndex={0}>الإعدادات</Link>
          <button
            onClick={onLogout}
            style={{ ...dropdownItemStyle, color: "#f44", fontWeight: 700 }}
            className="dropdown-item-user"
            tabIndex={0}
          >تسجيل الخروج</button>
        </div>
      )}
      {/* أنيميشن fadeIn */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .dropdown-item-user:hover, .dropdown-item-user:focus {
          background: #ede7fb !important;
          color: #7c4dff !important;
        }
        .dropdown-item-user:active {
          background: #d1c4e9 !important;
          color: #5e35b1 !important;
        }
      `}</style>
    </div>
  );
}

const dropdownItemStyle = {
  background: "none",
  border: "none",
  width: "100%",
  minHeight: 44,
  padding: "0 22px",
  fontFamily: "Tajawal, Arial",
  fontSize: 16,
  color: "#444",
  textAlign: "right",
  cursor: "pointer",
  transition: ".14s",
  borderRadius: 10,
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  outline: "none",
  fontWeight: 600,
  margin: 0,
  boxSizing: "border-box",
  position: "relative",
  overflow: "hidden",
};
