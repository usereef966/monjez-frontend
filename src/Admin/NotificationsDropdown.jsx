import { useEffect, useState, useRef } from "react";
import api from "../api";
import { createPortal } from "react-dom";

export default function NotificationsDropdown({ show, onClose, top = 0, left = 0 }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (show) {
      setLoading(true);
      api.get("/api/notifications")
        .then(res => setNotifications(res.data))
        .finally(() => setLoading(false));
    }
  }, [show]);

  // إغلاق القائمة عند الضغط خارجها
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose?.();
      }
    }
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [show, onClose]);

  if (!show) return null;

  return createPortal(
    <div
      ref={dropdownRef}
      style={{
        position: "fixed",    // مهم جداً حتى يستخدم top/left بالنسبة للصفحة كلها
        top: top,
         left: left - 135,
        minWidth: 290,
        maxWidth: 360,
        background: "#fff",
        color: "#222",
        borderRadius: 16,
        boxShadow: "0 8px 32px #2223",
        zIndex: 9999,
        padding: "8px 0",
        minHeight: 64,
        maxHeight: 430,
        overflowY: "auto",
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 15, padding: "6px 24px 10px 24px", color: "#06B6D4" }}>
        Notifications
      </div>
      {loading ? (
        <div style={{ padding: 18, textAlign: "center", color: "#999" }}>Loading...</div>
      ) : notifications.length === 0 ? (
        <div style={{ padding: 18, textAlign: "center", color: "#888" }}>No notifications</div>
      ) : (
        notifications.map(n => (
          <div key={n.id} style={{
            padding: "12px 24px 10px 24px",
            borderBottom: "1px solid #F3F4F6",
            fontSize: 14,
            color: "#333",
            background: n.is_read ? "#fff" : "#F0F6FF",
            transition: "background 0.15s"
          }}>
            <div style={{ fontWeight: 600 }}>{n.title || n.content || "Notification"}</div>
            <div style={{ color: "#777", fontSize: 12, marginTop: 2 }}>
              {new Date(n.created_at).toLocaleString()}
            </div>
          </div>
        ))
      )}
    </div>,
    document.body
  );
}
