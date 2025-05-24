import React, { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";

// يمكنك إعادة استخدام نفس الثيم والأزرار من SeoOrderStats
const th = { padding: "13px 8px", fontWeight: 800, color: "#6D28D9", background: "#f3f3fa", fontSize: 15, textAlign: "center" };
const td = { padding: "11px 8px", fontWeight: 600, color: "#232347", background: "#fff", fontSize: 15, textAlign: "center" };
const statusBtn = { background: "#f3f3fa", color: "#6D28D9", border: "none", borderRadius: 8, padding: "7px 18px", fontWeight: 700, fontSize: 15, cursor: "pointer" };
const eyeBtn = { background: "#f3f3fa", color: "#6D28D9", border: "none", borderRadius: 8, padding: "7px 12px", fontWeight: 700, fontSize: 15, cursor: "pointer" };
const deleteBtn = { background: "#fff", color: "#ff4d6d", border: "1px solid #ffd6dd", borderRadius: 8, padding: "7px 18px", fontWeight: 700, fontSize: 15, cursor: "pointer" };
const modalOverlay = { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,20,0.16)", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center" };
const modalBox = { background: "#fff", borderRadius: 17, padding: "38px 32px", minWidth: 340, boxShadow: "0 4px 50px #6D28D922", maxWidth: 500, textAlign: "center" };
const modalTitle = { color: "#6D28D9", fontWeight: 800, fontSize: 22, marginBottom: 18 };
const cancelBtn = { ...deleteBtn, color: "#232347", border: "1px solid #ece8fa" };
const inp = { width: "100%", borderRadius: 8, border: "1px solid #ece8fa", padding: "8px 14px", fontSize: 15, marginBottom: 12, background: "#f7f8fe" };

const STATUS_MAP = {
  pending:    { label: "قيد المعالجة", color: "#6D28D9", bg: "#ede9fe", icon: "⏳" },
  accepted:   { label: "تم القبول", color: "#21c692", bg: "#e7f9f3", icon: "✅" },
  paid:       { label: "تم الدفع", color: "#2563eb", bg: "#e0e7ff", icon: "💳" },
  rejected:   { label: "مرفوض", color: "#ff4d6d", bg: "#fff0f3", icon: "❌" },
  blocked:    { label: "محظور", color: "#b91c1c", bg: "#fee2e2", icon: "🚫" },
  refunded:   { label: "مسترد", color: "#f59e42", bg: "#fff7e6", icon: "↩️" },
};

export default function IosOrdertManagment() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modal, setModal] = useState({ open: false, type: "", orderId: null });
  const [statusModal, setStatusModal] = useState({ open: false, orderId: null, current: "" });
  const [detailsModal, setDetailsModal] = useState({ open: false, order: null });
  const [allFeatures, setAllFeatures] = useState([]);
  const [allPlans, setAllPlans] = useState([]);

  // جلب الطلبات من الباك اند
useEffect(() => {
  setLoading(true);
  setError("");

  fetch("/api/admin/orders?section=mobile&platform=ios")
    .then(res => res.json())
    .then(data => setOrders(Array.isArray(data) ? data : []))
    .catch(() => setError("فشل في جلب طلبات iOS"))
    .finally(() => setLoading(false));
}, []);

  // جلب كل ميزات iOS عند تحميل الصفحة
  useEffect(() => {
    fetch("/api/mobile-features/ios")
      .then(res => res.json())
      .then(data => setAllFeatures(Array.isArray(data) ? data : []));
  }, []);


useEffect(() => {
  fetch("/api/mobile-plans?type=ios")
    .then(res => res.json())
    .then(data => {
      console.log(orders[0]);
      setAllPlans(Array.isArray(data) ? data : []);
    });
}, []);

  // فلترة حسب البحث
  const filtered = Array.isArray(orders) ? orders.filter(order =>
    String(order.id).includes(search) ||
    (order.customer && order.customer.includes(search)) ||
    (order.title && order.title.includes(search))
  ) : [];

  // تحديد متعدد
  const toggleSelect = id => setSelected(sel => sel.includes(id) ? sel.filter(i => i !== id) : [...sel, id]);
  const toggleSelectAll = () => setSelected(selected.length === filtered.length ? [] : filtered.map(o => o.id));

  // فتح مودال تغيير الحالة
  const openStatusModal = order => setStatusModal({ open: true, orderId: order.id, current: order.status });

  // فتح مودال التفاصيل
 const openDetailsModal = order => {
  console.log("تفاصيل الطلب:", order); // سيظهر كل بيانات الطلب في كونسول المتصفح
  setDetailsModal({ open: true, order });
};

const getAppTypeName = (app_type_id) => {
  
  const plan = allPlans.find(p => Number(p.id) === Number(app_type_id));
  return plan ? plan.name : "—";
};

  // فتح مودال الحذف
  const openModal = (type, orderId) => setModal({ open: true, type, orderId });

  // إغلاق كل المودالات
  const closeModal = () => { setModal({ open: false, type: "", orderId: null }); setStatusModal({ open: false, orderId: null, current: "" }); setDetailsModal({ open: false, order: null }); };

  // تغيير حالة الطلب
  const handleStatusChange = async () => {
    setLoading(true);
await fetch(`/api/admin/orders/${statusModal.orderId}/status`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ status: statusModal.current })
});
    setOrders(orders => orders.map(o => o.id === statusModal.orderId ? { ...o, status: statusModal.current } : o));
    closeModal();
    setLoading(false);
  };

  // حذف طلب
  const handleDelete = async (id) => {
    setLoading(true);
    await fetch(`/api/admin/order/${id}`, { method: "DELETE" });
    setOrders(orders => orders.filter(o => o.id !== id));
    closeModal();
    setLoading(false);
  };

  // حذف جماعي
  const handleBulkDelete = async () => {
    setLoading(true);
await fetch(`/api/admin/orders/bulk-delete`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ ids: selected })
});

    setOrders(orders => orders.filter(o => !selected.includes(o.id)));
    setSelected([]);
    closeModal();
    setLoading(false);
  };

  return (
    <div style={{ position: "relative", zIndex: 800 }}>
      <div style={{ maxWidth: 1500, margin: "40px auto", background: "#fff", borderRadius: 22, boxShadow: "0 4px 32px #6D28D911", padding: 32, minHeight: 600 }}>
        <h2 style={{ color: "#6D28D9", fontWeight: 800, fontSize: 28, marginBottom: 18 }}>
          إدارة طلبات iOS
        </h2>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <input
            type="text"
            placeholder="بحث برقم الطلب أو العميل أو العنوان..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: 260, height: 36, borderRadius: 12, border: "1px solid #e0e7ff", padding: "0 14px", fontSize: 15, background: "#f6f7fb", color: "#2D2D2D" }}
          />
          <div style={{ display: "flex", gap: 10 }}>
            <button
              disabled={!selected.length}
              onClick={() => setStatusModal({ open: true, orderId: null, current: "" })}
              style={{
                background: selected.length ? "linear-gradient(90deg,#6366f1,#6d28d9)" : "#e0e7ff",
                color: selected.length ? "#fff" : "#b3b3cb",
                border: "none",
                borderRadius: 8,
                padding: "9px 28px",
                fontWeight: 800,
                fontSize: 16,
                cursor: selected.length ? "pointer" : "not-allowed",
                boxShadow: selected.length ? "0 2px 16px #6d28d922" : "none",
                marginLeft: 12
              }}
            >
              تغيير حالة المحدد
            </button>
            <button
              disabled={!selected.length}
              onClick={() => setModal({ open: true, type: "bulk-delete", orderId: null })}
              style={{
                background: selected.length ? "#fff" : "#f3f3fa",
                color: selected.length ? "#ff4d6d" : "#b3b3cb",
                border: "1px solid #ffd6dd",
                borderRadius: 8,
                padding: "9px 28px",
                fontWeight: 800,
                fontSize: 16,
                cursor: selected.length ? "pointer" : "not-allowed",
                boxShadow: selected.length ? "0 2px 16px #ff4d6d22" : "none"
              }}
            >
              حذف المحدد
            </button>
          </div>
        </div>
        {loading && <p>جاري التحميل...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && (
          <div style={{ maxHeight: 540, overflowY: "auto", borderRadius: 13, border: "1px solid #f3f3fa" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", fontSize: 15 }}>
              <thead>
                <tr style={{ background: "#f3f3fa", position: "sticky", top: 0, zIndex: 2 }}>
                  <th style={th}><input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={toggleSelectAll} /></th>
                  <th style={th}>Order Number</th>
                  <th style={th}>Customer</th>
                  <th style={th}>APP NAME</th>
                  <th style={th}>Budget</th>
                  <th style={th}>Status</th>
                  <th style={th}>Order Date</th>
                  <th style={th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length ? filtered.map(order => (
                  <tr key={order.id} style={{ borderBottom: "1px solid #f0f0f4" }}>
                    <td style={td}>
                      <input
                        type="checkbox"
                        checked={selected.includes(order.id)}
                        onChange={() => toggleSelect(order.id)}
                      />
                    </td>
                    <td style={td}>{order.id}</td>
                    <td style={td}>{order.customer || "—"}</td>
                    <td style={td}>{getAppTypeName(order.app_type_id)}</td>
                    <td style={td}>{order.budget_label || "—"}</td>
                    
                    <td style={td}>
                      <div style={{
                        display: "flex", alignItems: "center", gap: 7,
                        background: STATUS_MAP[order.status]?.bg,
                        color: STATUS_MAP[order.status]?.color,
                        fontWeight: 700,
                        borderRadius: 8,
                        padding: "5px 13px",
                        fontSize: 15,
                        minWidth: 120,
                        justifyContent: "center",
                        boxShadow: "0 2px 8px #e0e7ff33"
                      }}>
                        <span style={{ fontSize: 18 }}>{STATUS_MAP[order.status]?.icon}</span>
                        {STATUS_MAP[order.status]?.label || order.status}
                      </div>
                    </td>
                    <td style={td}>{order.created_at ? new Date(order.created_at).toLocaleDateString() : "—"}</td>
                    <td style={{ ...td, minWidth: 180, display: "flex", gap: 8 }}>
                      <button onClick={() => openStatusModal(order)} style={statusBtn}>Change Status</button>
                      <button onClick={() => openDetailsModal(order)} style={eyeBtn} title="تفاصيل الطلب">
                        <FiEye size={19} />
                      </button>
                      <button onClick={() => openModal("delete", order.id)} style={deleteBtn}>delete</button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={8} style={{ color: "#b3b3cb", textAlign: "center", padding: 38 }}>
                      لا يوجد طلبات iOS.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* مودال CHANGE STATUS */}
        {statusModal.open && (
          <div style={modalOverlay}>
            <div style={modalBox}>
              <h3 style={modalTitle}>تغيير حالة الطلب</h3>
              <select
                value={statusModal.current}
                onChange={e => setStatusModal(s => ({ ...s, current: e.target.value }))}
                style={{
                  ...inp,
                  minWidth: 180,
                  fontWeight: 700,
                  color: STATUS_MAP[statusModal.current]?.color || "#6D28D9",
                  background: STATUS_MAP[statusModal.current]?.bg || "#f7f8fe",
                  border: "1px solid #ece8fa",
                  marginBottom: 24,
                  fontSize: 17
                }}
              >
                {Object.keys(STATUS_MAP).map(key => (
                  <option key={key} value={key}>{STATUS_MAP[key].label}</option>
                ))}
              </select>
              <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                <button onClick={handleStatusChange} style={statusBtn}>حفظ</button>
                <button onClick={closeModal} style={cancelBtn}>إلغاء</button>
              </div>
            </div>
          </div>
        )}

        {/* مودال حذف */}
        {modal.open && (
          <div style={modalOverlay}>
            <div style={modalBox}>
              <h3 style={modalTitle}>
                {modal.type === "bulk-delete" ? "حذف الطلبات المحددة" : "حذف الطلب"}
              </h3>
              <p style={{ color: "#232347", fontWeight: 500, marginBottom: 24 }}>
                {modal.type === "bulk-delete"
                  ? `هل أنت متأكد أنك تريد حذف ${selected.length} طلب؟ لا يمكن التراجع عن هذا الإجراء.`
                  : "هل أنت متأكد أنك تريد حذف هذا الطلب؟ لا يمكن التراجع عن هذا الإجراء."
                }
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                <button
                  onClick={modal.type === "bulk-delete" ? handleBulkDelete : () => handleDelete(modal.orderId)}
                  style={deleteBtn}
                >
                  حذف
                </button>
                <button onClick={closeModal} style={cancelBtn}>إلغاء</button>
              </div>
            </div>
          </div>
        )}

        {/* مودال تفاصيل الطلب */}
        {detailsModal.open && detailsModal.order && (
          <div style={{
    ...modalOverlay,
    background: "rgba(109,40,217,0.10)", // لون بنفسجي خفيف للخلفية
    backdropFilter: "blur(4px)"
  }}>
    <div style={{
      ...modalBox,
      maxWidth: 600,
      textAlign: "right",
      direction: "rtl",
      padding: 36,
      position: "relative",
      border: "2.5px solid #6D28D9",
      boxShadow: "0 8px 48px #6D28D944, 0 2px 16px #6D28D922"
    }}>
      <button
        onClick={closeModal}
        style={{
          position: "absolute", top: 18, left: 18, background: "none", border: "none",
          color: "#6D28D9", fontSize: 32, cursor: "pointer", fontWeight: 900, transition: "color 0.2s"
        }}
        aria-label="إغلاق"
        onMouseOver={e => e.currentTarget.style.color = "#ff4d6d"}
        onMouseOut={e => e.currentTarget.style.color = "#6D28D9"}
      >
        ×
      </button>
      <h2 style={{
        color: "#6D28D9",
        fontWeight: 900,
        fontSize: 27,
        marginBottom: 18,
        textAlign: "center",
        letterSpacing: 1.2,
        textShadow: "0 2px 12px #b3a1f7aa"
      }}>
        تفاصيل طلب iOS #{detailsModal.order.id}
      </h2>
      <table style={{
        width: "100%",
        borderCollapse: "separate",
        borderSpacing: "0 10px",
        fontSize: 16,
        background: "rgba(245,245,255,0.97)",
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: "0 2px 18px #6D28D911"
      }}>
        <tbody>
          {/* صفوف التفاصيل */}
          {[
            { label: "العميل", value: detailsModal.order.customer, color: "#6D28D9" },
            { label: "نوع التطبيق", value: detailsModal.order.type || "—", color: "#6366f1" },
            { label: "اسم التطبيق", value: getAppTypeName(detailsModal.order.app_type_id), color: "#10b981" },
            { label: "فكرة المشروع", value: detailsModal.order.title, color: "#f59e42" },
            { label: "تفاصيل إضافية", value: detailsModal.order.details || "—", color: "#a21caf" },
            { label: "الميزانيه", value: detailsModal.order.budget_obj.label ? `${detailsModal.order.budget_obj.label} ريال` : "—", color: "#f43f5e" },
            { label: "الحالة", value: (
              <span style={{
                background: STATUS_MAP[detailsModal.order.status]?.bg,
                color: STATUS_MAP[detailsModal.order.status]?.color,
                borderRadius: 7,
                padding: "3px 13px",
                fontWeight: 700,
                fontSize: 15,
                display: "inline-flex",
                alignItems: "center",
                gap: 7
              }}>
                <span style={{ fontSize: 18 }}>{STATUS_MAP[detailsModal.order.status]?.icon}</span>
                {STATUS_MAP[detailsModal.order.status]?.label}
              </span>
            ), color: "#6366f1" },
            { label: "تاريخ الإنشاء", value: detailsModal.order.created_at ? new Date(detailsModal.order.created_at).toLocaleString() : "—", color: "#64748b" },
            { label: "المميزات المختارة", value: (() => {
              let notesArr = [];
              if (Array.isArray(detailsModal.order.notes)) {
                notesArr = detailsModal.order.notes;
              } else if (typeof detailsModal.order.notes === "string" && detailsModal.order.notes.trim()) {
                notesArr = detailsModal.order.notes.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
              }
              return notesArr.length ? (
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {notesArr.map((note, idx) => (
                    <li key={idx} style={{
                      background: "#ede9fe",
                      color: "#6D28D9",
                      borderRadius: 8,
                      padding: "6px 16px",
                      fontWeight: 700,
                      fontSize: 15,
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      boxShadow: "0 2px 8px #e0e7ff33"
                    }}>
                      <span style={{ fontSize: 17 }}>★</span>
                      {note}
                    </li>
                  ))}
                </ul>
              ) : (
                <span style={{ color: "#b3b3cb" }}>لا توجد مميزات مختارة</span>
              );
            })(), color: "#6D28D9" },
            { label: "وصف مختصر", value: detailsModal.order.description || "—", color: "#0ea5e9" },
            { label: "الجمهور المستهدف", value: detailsModal.order.audience, color: "#f59e42" }
          ].map((row, i) => (
            <tr key={i} style={{
              background: i % 2 === 0 ? "#f3f3fa" : "#fff",
              transition: "background 0.2s"
            }}>
              <td style={{
                ...th,
                color: row.color,
                background: "none",
                fontWeight: 900,
                fontSize: 16,
                border: "none",
                textShadow: "0 1px 8px #e0e7ff44"
              }}>{row.label}:</td>
              <td style={{
                ...td,
                background: "none",
                fontWeight: 700,
                fontSize: 16,
                border: "none",
                color: "#232347"
              }}>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: "center", marginTop: 30 }}>
        <button
          style={{
            background: "linear-gradient(90deg,#6366f1,#6d28d9)",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            padding: "13px 38px",
            fontWeight: 900,
            fontSize: 18,
            cursor: "pointer",
            boxShadow: "0 2px 16px #6d28d922",
            letterSpacing: 1.2,
            transition: "background 0.2s"
          }}
          onClick={() => alert("سيتم إضافة ميزة طباعة الفاتورة قريباً")}
          disabled
        >
          طباعة فاتورة
        </button>
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
}