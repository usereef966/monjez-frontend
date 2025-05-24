import React, { useEffect, useState } from "react";

export default function UserSidebarProfile() {
  const userLS = JSON.parse(localStorage.getItem("user"));
  const userId = userLS?.id;

  // الحالات
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    accepted: 0,
    pending: 0
  });
  const [loading, setLoading] = useState(true);

  // لجلب البيانات
  useEffect(() => {
    if (!userId) return;

    setLoading(true);

    // جلب بيانات المستخدم
    fetch(`https://monjez-online.onrender.com/api/user/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));

    // جلب إحصائيات الطلبات
    fetch(`https://monjez-online.onrender.com/api/user/${userId}/order-stats`)
      .then(res => res.json())
      .then(stat => setStats(stat))
      .finally(() => setLoading(false));
  }, [userId]);

  // دالة نسخ الرابط
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.origin + `/user/${userId}`);
  };

  // ستايلاتك كما هي (بدون تغيير)
  // ... (نفس تعريفات الستايل عندك)

  // صورة رمزية افتراضية لو ما في صورة
  const avatarUrl = user?.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.first_name || user?.name || "U");

  if (loading) return <div style={{ textAlign: "center", margin: 30 }}>جاري التحميل...</div>;

  return (
    <div style={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "0 0 12px 0",
    }}>
      {/* صورة البروفايل */}
      <div style={{ marginBottom: -10, marginTop: 8, position: "relative" }}>
        <img
          src={avatarUrl}
          alt="avatar"
          style={{
            width: 90, height: 90, borderRadius: "50%",
            objectFit: "cover", border: "2.5px solid #e4e6ee", background: "#f3f4f6"
          }}
        />
        {/* زر الكاميرا للتغيير لاحقًا (تعطيله الآن) */}
        {/*<div style={camBtn}><span role="img" aria-label="تغيير">📷</span></div>*/}
      </div>

      {/* اسم المستخدم */}
      <div style={{
        fontWeight: 800,
        fontSize: 21,
        color: "#252a32",
        marginBottom: 2,
        marginTop: 0,
        textAlign: "center",
      }}>
        {user?.first_name || user?.name || "اسم المستخدم"}
      </div>
      <div style={{
        color: "#828699",
        fontSize: 15.5,
        fontWeight: 400,
        marginBottom: 18,
        textAlign: "center",
      }}>
        {/* المنصب أو البريد */}
        {user?.role || user?.email || "مستخدم منجز"}
      </div>

      {/* الإحصائيات */}
      <div style={{
        width: "100%",
        borderRadius: 12,
        background: "#fafbfc",
        border: "1px solid #f2f2f4",
        marginBottom: 18,
        marginTop: 4,
        padding: "10px 0 7px 0",
        boxShadow: "0 1.5px 7px #a59aff09",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "2.5px 22px 2.5px 8px", fontSize: 15.5, fontWeight: 400, color: "#4d5672", margin: "2px 0"
        }}>
          <span>عدد الطلبات المقدمة</span>
          <span style={{ fontWeight: 700, color: "#fb9404", fontSize: 16.7 }}>{stats.total}</span>
        </div>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "2.5px 22px 2.5px 8px", fontSize: 15.5, fontWeight: 400, color: "#4d5672", margin: "2px 0"
        }}>
          <span>عدد الطلبات المقبولة</span>
          <span style={{ fontWeight: 700, color: "#26c263", fontSize: 16.7 }}>{stats.accepted}</span>
        </div>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "2.5px 22px 2.5px 8px", fontSize: 15.5, fontWeight: 400, color: "#4d5672", margin: "2px 0"
        }}>
          <span>الطلبات الحالية</span>
          <span style={{ fontWeight: 700, color: "#8395a7", fontSize: 16.7 }}>{stats.pending}</span>
        </div>
      </div>

      {/* زر عرض الملف العام */}
      <button style={{
        margin: "13px 0 7px 0",
        width: "90%",
        border: "1.1px solid #e3e8f0",
        background: "#fafbfc",
        color: "#6a6e7e",
        borderRadius: 7,
        fontSize: 15.2,
        fontWeight: 700,
        padding: "9px 0",
        cursor: "pointer",
        boxShadow: "0 1px 4px #f1eaff12",
        transition: "box-shadow 0.15s",
      }}
        onClick={() => window.open(`/user/${userId}`, "_blank")}
      >
        عرض الملف العام
      </button>

      {/* رابط البروفايل مع زر نسخ */}
      <div style={{
        width: "90%",
        marginTop: 2,
        display: "flex",
        alignItems: "center",
        background: "#fafbfc",
        border: "1px solid #f2f2f4",
        borderRadius: 6,
        padding: "2px 4px",
        boxShadow: "0 1px 6px #e6eaff0e",
        marginBottom: 2,
      }}>
        <input
          type="text"
          value={window.location.origin + `/user/${userId}`}
          readOnly
          style={{
            flex: 1,
            background: "none",
            border: "none",
            outline: "none",
            fontSize: 15,
            color: "#7358be",
            padding: "7px 5px 7px 1px",
          }}
        />
        <button style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "6px 8px",
          display: "flex",
          alignItems: "center",
          opacity: 0.8,
        }} onClick={handleCopy} title="نسخ الرابط">
          {/* أيقونة نسخ */}
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <rect x="8" y="8" width="11" height="11" rx="2.2" stroke="#7c4dff" strokeWidth="1.2"/>
            <rect x="3" y="3" width="11" height="11" rx="2.2" stroke="#ddd" strokeWidth="1"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
