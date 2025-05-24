import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";

const accountMenu = [
  { label: "Profile", icon: <FiUser />, action: "profile" },
  
  { label: "Logout", icon: <FiLogOut />, action: "logout", danger: true },
];

export default function AccountDropdown({
  show,
  onClose,
  anchorPos,
  logoutModal,         // هذا state من الهيدر (نفس السايدبار)
  setLogoutModal,      // هذا setter من الهيدر (نفس السايدبار)
}) {
  const ref = useRef(null);
  const navigate = useNavigate();

  // إغلاق القائمة عند الضغط خارجها
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose?.();
    }
    if (show) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [show, onClose]);

  function handleAccountAction(action) {
    onClose?.();
    if (action === "profile") {
      navigate("/admin/Admin-profile");
    } else if (action === "settings") {
      navigate("/admin/Admin-profile");
    } else if (action === "logout") {
      setLogoutModal(true); // أظهر المودال أولاً
      setTimeout(() => {
        localStorage.removeItem("adminUser");
        localStorage.removeItem("adminToken");
 // احذف اليوزر بعد انتهاء المودال
        setLogoutModal(false);
        window.location.href = "/adminlogin";
      }, 2500); // أو أي وقت يناسبك (نفس السايدبار)
    }
  }

  if (!show) return null;

  // نفس كود القائمة المنسدلة في السايدبار (مع تحكم كامل بالمكان):
  return createPortal(
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: anchorPos.top + 70,         // عدلها حسب مكان الآفاتار
        left: anchorPos.left - 115,      // عدلها للوسط أو يمين الآفاتار
        minWidth: 170,
        background: "#fff",
        borderRadius: 13,
        boxShadow: "0 6px 24px rgba(64, 19, 187, 0.08)",
        padding: "10px 0",
        zIndex: 9999,
        border: "1px solid #ece8fa",
        transition: "all 0.18s"
      }}
    >
      <div style={{
        padding: "8px 22px",
        borderBottom: "1px solid #f0f0f0",
        fontSize: 14,
        fontWeight: 600,
        color: "#7c4dff"
      }}>
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
    </div>,
    document.body
  );
}
