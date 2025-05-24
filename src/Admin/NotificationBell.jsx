import React, { useRef, useState, useEffect } from "react";
import { FiBell } from "react-icons/fi";
import NotificationsDropdown from "./NotificationsDropdown";
import api from "../api";

export default function NotificationBell() {
  const bellRef = useRef();
  const [showNotifications, setShowNotifications] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // جلب الإشعارات كل مرة ينفتح الدروبداون أو عند الماونت (أو polling كل دقيقة)
  useEffect(() => {
    fetchNotifications();
    // polling example (اختياري)
    // const interval = setInterval(fetchNotifications, 60000);
    // return () => clearInterval(interval);
  }, []);

  function fetchNotifications() {
    setLoading(true);
    api.get("/api/notifications")
      .then(res => setNotifications(res.data))
      .finally(() => setLoading(false));
  }

  // عدد الغير مقروءة
  const unreadCount = notifications.filter(n => !n.is_read).length;

  // حساب إحداثيات الجرس (للدروبداون)
  const handleBellClick = () => {
    if (bellRef.current) {
      const rect = bellRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
      });
    }
    setShowNotifications(s => !s);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        ref={bellRef}
        onClick={handleBellClick}
        style={{
          background: "transparent",
          border: "none",
          color: unreadCount > 0 ? "#F43F5E" : "#fff", // لو في unread الجرس يصير أحمر!
          cursor: "pointer",
          width: 38,
          height: 38,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 20,
          position: "relative"
        }}
      >
        <FiBell size={24} />
        {/* ممكن تضيف دائرة حمراء أيضا إذا بدك Badge واضح */}
        {unreadCount > 0 && (
          <span style={{
            position: "absolute",
            top: 5,
            right: 6,
            width: 11,
            height: 11,
            borderRadius: "50%",
            background: "#f43f5e",
            border: "2.5px solid #181e3b",
            display: "block",
            boxShadow: "0 2px 8px #f43f5e55"
          }} />
        )}
      </button>
      {/* الدروبداون */}
      <NotificationsDropdown
        show={showNotifications}
        onClose={() => setShowNotifications(false)}
        top={dropdownPos.top}
        left={dropdownPos.left}
      />
    </div>
  );
}
