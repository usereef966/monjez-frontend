import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MNZ } from "../theme";
import {
  FiHome, FiShoppingBag, FiUsers, FiSettings, FiBarChart2, FiMail, FiFileText, FiTool, FiUser, FiLogOut
} from "react-icons/fi";

const links = [
  { to: "/admin/dashboard", icon: <FiHome />, label: "Dashboard" },
  { to: "/admin/orders", icon: <FiShoppingBag />, label: "Orders" },
  { to: "/admin/Stats_Order", icon: <FiTool />, label: "Orders Stats" },
   { to: "/admin/Mange_orders", icon: <FiFileText />, label: "Management Orders" },
  { to: "/admin/users", icon: <FiUsers />, label: "Users" },
  { to: "/admin/stats", icon: <FiBarChart2 />, label: "Stats" },
  { to: "/admin/inbox", icon: <FiMail />, label: "Inbox" },
  { to: "/admin/Admin-profile", icon: <FiSettings />, label: "Settings" },
];

const accountMenu = [
  { label: "Profile", icon: <FiUser />, action: "profile" },
  { label: "Settings", icon: <FiSettings />, action: "settings" },
  { label: "Logout", icon: <FiLogOut />, action: "logout", danger: true },
];

export default function Sidebar({ width, top = 0, collapsed,  }) {
  const [open, setOpen] = useState(false);
  
  const ref = useRef(null);
  const navigate = useNavigate();

  // إغلاق القائمة لو ضغطت خارجها
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // دالة تنفيذ الأوامر
function handleAccountAction(action) {
  setOpen(false);
  if (action === "profile") {
    navigate("/admin/Admin-profile");
  } else if (action === "settings") {
    navigate("/admin/settings");
  } else if (action === "logout") {
    setLogoutModal(true); // أظهر المودال أولاً
    setTimeout(() => {
      localStorage.removeItem("user"); // احذف اليوزر بعد انتهاء المودال
      setLogoutModal(false);
      window.location.href = "/adminlogin";
    }, 2500); // أو أي وقت يناسبك
    }
  }

  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width,
        height: `calc(100vh - ${top}px)`,
        background: "#fff",
        boxShadow: MNZ.shadow,
        transition: `width ${MNZ.timing}`,
        overflow: "hidden",
        zIndex: 250,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* طبقة الظل/تدرج الهيدر */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 90,
        pointerEvents: "none",
        zIndex: 2,
        background: "linear-gradient(to bottom, #10163a 1%, transparent 100%)",
        opacity: 0.9,
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
      }} />

      {/* قائمة الروابط */}
      <div style={{ marginTop: 70 }}>
        <nav style={{ padding: 10 }}>
          {links.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 8px",
                marginBottom: 12,
                borderRadius: MNZ.radius,
                textDecoration: "none",
                color: isActive ? "#fff" : MNZ.colors.gray900,
                background: isActive ? MNZ.colors.primary : "transparent",
                fontWeight: 500,
                fontSize: 14,
                justifyContent: collapsed ? "center" : "flex-start",
              })}
            >
              <span style={{ fontSize: 18 }}>{icon}</span>
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* الزر في المنتصف */}
    {/* <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <div
          ref={ref}
          style={{
            width: collapsed ? 48 : 200,
            padding: collapsed ? "15px 0" : "10px 10px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            borderRadius: MNZ.radius,
            fontWeight: 700,
            color: "#5e72e4",
            position: "relative",
            background: open ? "#ece8fa" : "transparent",
            fontSize: 15,
            userSelect: "none",
            boxShadow: "0 8px 4px #7c4dff08, 0 1.5px 3px #5e72e422",
            marginTop: 20,
          }}
          tabIndex={0}
          onClick={() => setOpen((v) => !v)}
        >
          <span style={{ fontSize: 19, marginRight: collapsed ? 0 : 8 }}>
            <FiUser />
          </span>
          {!collapsed && <span>Account</span>}

          {open && (
            <div
              style={{
                position: "absolute",
                left: collapsed ? 52 : 22,
                top: collapsed ? -12 : 45,
                minWidth: collapsed ? 150 : 170,
                background: "#fff",
                borderRadius: 13,
                boxShadow: "0 6px 24px rgba(64, 19, 187, 0.08)",
                padding: "10px 0",
                zIndex: 999,
                marginLeft: collapsed ? 16 : 0,
                animation: "fadeInMenu .19s",
                border: "1px solid #ece8fa"
              }}
            >
              <div style={{ padding: "8px 22px", borderBottom: "1px solid #f0f0f0", fontSize: 14, fontWeight: 600, color: "#7c4dff" }}>
  Admin User
</div> 
              {accountMenu.map(item => (
                <div
                  key={item.label}
                  onClick={() => handleAccountAction(item.action)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 22px",
                    cursor: "pointer",
                    fontWeight: 500,
                    color: item.danger ? "#ff4d6d" : "#23242a",
                    fontSize: 15,
                    transition: "background .15s, color .12s"
                  }}
                  onMouseOver={e => e.currentTarget.style.background = "#f4f3fa"}
                  onMouseOut={e => e.currentTarget.style.background = "transparent"}
                >
                  <span style={{ fontSize: 18 }}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          )}
          <style>{`
            @keyframes fadeInMenu {
              from { opacity: 0; transform: translateY(10px);}
              to { opacity: 1; transform: translateY(0);}
            }
          `}</style>
        </div>
      </div>
*/}
    
  
    </aside>
  );
}
