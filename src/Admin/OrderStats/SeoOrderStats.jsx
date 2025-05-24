import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { FiEye } from "react-icons/fi"; // أعلى الملف

// تعريب الحالات مع ألوان وأيقونات محسنة وجذابة
const STATUS_MAP = {
  pending:   { label: "قيد المعالجة", color: "#ff9800", bg: "#fff3e0", icon: "⏳" },
  accepted:  { label: "مقبولة",        color: "#43a047", bg: "#e8f5e9", icon: "✅" },
  paid:      { label: "مدفوعة",        color: "#3949ab", bg: "#e8eaf6", icon: "💸" },
  rejected:  { label: "مرفوضة",        color: "#e53935", bg: "#ffebee", icon: "❌" },
  blocked:   { label: "محظورة",        color: "#757575", bg: "#f5f5f5", icon: "🚫" },
  refunded:  { label: "مستردة",        color: "#039be5", bg: "#e1f5fe", icon: "↩️" },
};

export default function SeoOrderStats() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);

  // مودال عام (حذف فقط)
  const [modal, setModal] = useState({ open: false, type: "", orderId: null });

  // مودال تغيير الحالة
  const [statusModal, setStatusModal] = useState({ open: false, orderId: null, current: "" });

  // مودال تغيير جماعي
  const [bulkModal, setBulkModal] = useState({ open: false, current: "" });

  // الأوردرات المحددة
  const [selected, setSelected] = useState([]);

  // مودال تفاصيل الأوردر
  const [detailsModal, setDetailsModal] = useState({ open: false, order: null, goal: null });

  useEffect(() => { fetchOrders(); }, [refresh]);

  // إغلاق المودالات عند الضغط على ESC
  useEffect(() => {
    const escHandler = (e) => {
      if (e.key === "Escape") {
        setModal({ open: false, type: "", orderId: null });
        setStatusModal({ open: false, orderId: null, current: "" });
        setBulkModal({ open: false, current: "" });
        setDetailsModal({ open: false, order: null, goal: null });
      }
    };
    window.addEventListener("keydown", escHandler);
    return () => window.removeEventListener("keydown", escHandler);
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get("/api/admin/orders?section=seo");
      setOrders(data);
    } catch {
      setError("Failed to fetch SEO orders.");
    } finally {
      setLoading(false);
    }
  };

  // تغيير حالة أوردر واحد
  const handleStatusChange = async () => {
    if (!statusModal.orderId) return;
    try {
      await axios.put(`/api/admin/orders/${statusModal.orderId}/status`, { status: statusModal.current });
      setRefresh(r => r + 1);
    } catch (err) {
      setError("Failed to update order status: " + (err.response?.data?.error || err.message));
    } finally {
      setStatusModal({ open: false, orderId: null, current: "" });
    }
  };

  // تغيير حالة جماعية
  const handleBulkStatusChange = async () => {
    if (!selected.length) return;
    try {
      await Promise.all(selected.map(id =>
        axios.put(`/api/admin/orders/${id}/status`, { status: bulkModal.current })
      ));
      setRefresh(r => r + 1);
    } catch (err) {
      setError("Failed to update selected orders: " + (err.response?.data?.error || err.message));
    } finally {
      setBulkModal({ open: false, current: "" });
      setSelected([]);
    }
  };


  const confirmAction = async () => {
  if (!modal.orderId) return;
  try {
    await axios.delete(`/api/admin/order/${modal.orderId}`); // 👈 حذف حرف s فقط
    setRefresh(r => r + 1);
  } catch (err) {
    setError("Failed to delete order: " + (err.response?.data?.error || err.message));
  } finally {
    closeModal();
  }
};


  const openStatusModal = (order) =>
    setStatusModal({ open: true, orderId: order.id, current: order.status });

  const openModal = (type, orderId) => setModal({ open: true, type, orderId });
  const closeModal = () => setModal({ open: false, type: "", orderId: null });

  // جلب تفاصيل الهدف عند فتح المودال
// جلب تفاصيل الهدف والميزات بشكل واضح ونهائي
const openDetailsModal = async (order) => {
  let goal = null;

  if (order.seo_goal_id) {
    try {
      const { data } = await axios.get(`/api/seo-goals/${order.seo_goal_id}`);
      goal = data;
    } catch {}
  }

  setDetailsModal({
    open: true,
    order: {
      ...order,
      site: order.site || order.description || "—",
      keywords: order.notes || "—",
      budget: order.budget_label || order.budget || "—",
      goal_name: goal?.name || order.goal_name || "—",
      goal_features: goal?.features || [],
      extra_details: order.details || "—"
    },
    goal,
  });
};


  const filtered = orders.filter(
    o =>
      o.id.toString().includes(search) ||
      (o.customer && o.customer.toLowerCase().includes(search.toLowerCase())) ||
      (o.site && o.site.toLowerCase().includes(search.toLowerCase())) ||
      (o.goal_name && o.goal_name.toLowerCase().includes(search.toLowerCase()))
  );

  // تحديد أوردر واحد
  const toggleSelect = (id) => {
    setSelected(sel => sel.includes(id) ? sel.filter(x => x !== id) : [...sel, id]);
  };

  // تحديد الكل
  const toggleSelectAll = () => {
    if (selected.length === filtered.length) setSelected([]);
    else setSelected(filtered.map(o => o.id));
  };

  return (
    <div style={{ position: "relative", zIndex: 800 }}>
      <div style={{ maxWidth: 1500, margin: "40px auto", background: "#fff", borderRadius: 22, boxShadow: "0 4px 32px #6D28D911", padding: 32, minHeight: 600 }}>
        <h2 style={{ color: "#6D28D9", fontWeight: 800, fontSize: 28, marginBottom: 18 }}>
          SEO Orders Management
        </h2>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <input
            type="text"
            placeholder="Search by ID, customer, site, or goal..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: 260, height: 36, borderRadius: 12, border: "1px solid #e0e7ff", padding: "0 14px", fontSize: 15, background: "#f6f7fb", color: "#2D2D2D" }}
          />
          <div style={{ display: "flex", gap: 10 }}>
            <button
              disabled={!selected.length}
              onClick={() => setBulkModal({ open: true, current: "" })}
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
              Change Status for Selected
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
              Delete Selected
            </button>
          </div>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && (
          <div style={{ maxHeight: 540, overflowY: "auto", borderRadius: 13, border: "1px solid #f3f3fa" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", fontSize: 15 }}>
              <thead>
                <tr style={{ background: "#f3f3fa", position: "sticky", top: 0, zIndex: 2 }}>
                  <th style={th}><input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={toggleSelectAll} /></th>
                  <th style={th}>ID</th>
                  <th style={th}>Customer</th>
                  <th style={th}>Site</th>
                  <th style={th}>Goal</th>
                  <th style={th}>Budget</th>
                  <th style={th}>Status</th>
                  <th style={th}>Date</th>
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
                    <td style={td}>
                      {order.site || order.description ? (
                        <a
                          href={order.site || order.description}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#6D28D9", fontWeight: 700 }}
                        >
                          {order.site || order.description}
                        </a>
                      ) : "—"}
                    </td>
                    <td style={td}>{order.goal_name || "—"}</td>
                    <td style={td}>{order.budget_label || order.budget || "—"}</td>
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
                      <button onClick={() => openModal("delete", order.id)} style={deleteBtn}>Delete</button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={9} style={{ color: "#b3b3cb", textAlign: "center", padding: 38 }}>
                      No SEO orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal: Change Status (Single) */}
        {statusModal.open && (
          <div style={modalOverlay}>
            <div style={modalBox}>
              <h3 style={modalTitle}>Change Order Status</h3>
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
                <button onClick={handleStatusChange} style={statusBtn}>Save</button>
                <button onClick={() => setStatusModal({ open: false, orderId: null, current: "" })} style={cancelBtn}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Change Status (Bulk) */}
        {bulkModal.open && (
          <div style={modalOverlay}>
            <div style={modalBox}>
              <h3 style={modalTitle}>Change Status for Selected Orders</h3>
              <select
                value={bulkModal.current}
                onChange={e => setBulkModal(s => ({ ...s, current: e.target.value }))}
                style={{
                  ...inp,
                  minWidth: 180,
                  fontWeight: 700,
                  color: STATUS_MAP[bulkModal.current]?.color || "#6D28D9",
                  background: STATUS_MAP[bulkModal.current]?.bg || "#f7f8fe",
                  border: "1px solid #ece8fa",
                  marginBottom: 24,
                  fontSize: 17
                }}
              >
                <option value="" disabled>Select status</option>
                {Object.keys(STATUS_MAP).map(key => (
                  <option key={key} value={key}>{STATUS_MAP[key].label}</option>
                ))}
              </select>
              <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                <button
                  onClick={handleBulkStatusChange}
                  style={statusBtn}
                  disabled={!bulkModal.current}
                >
                  Save
                </button>
                <button onClick={() => setBulkModal({ open: false, current: "" })} style={cancelBtn}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Delete */}
        {modal.open && (
          <div style={modalOverlay}>
            <div style={modalBox}>
              <h3 style={modalTitle}>
                {modal.type === "bulk-delete" ? "Delete Selected Orders" : "Delete Order"}
              </h3>
              <p style={{ color: "#232347", fontWeight: 500, marginBottom: 24 }}>
                {modal.type === "bulk-delete"
                  ? `Are you sure you want to delete ${selected.length} selected orders? This action cannot be undone.`
                  : "Are you sure you want to delete this order? This action cannot be undone."
                }
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                <button
                  onClick={async () => {
                    if (modal.type === "bulk-delete") {
                      try {
                        await Promise.all(selected.map(id =>
                          axios.delete(`/api/admin/order/${id}`)
                        ));
                        setRefresh(r => r + 1);
                        setSelected([]);
                      } catch (err) {
                        setError("Failed to delete selected orders: " + (err.response?.data?.error || err.message));
                      }
                    } else {
                      await confirmAction();
                      setSelected([]);
                    }
                    closeModal();
                  }}
                  style={deleteBtn}
                >
                  Delete
                </button>
                <button onClick={closeModal} style={cancelBtn}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: تفاصيل أوردر السيو */}
{detailsModal.open && detailsModal.order && (
  <div style={{
    ...modalOverlay,
    background: "rgba(109,40,217,0.10)",
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
        onClick={() => setDetailsModal({ open: false, order: null, goal: null })}
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
        fontSize: 25,
        marginBottom: 18,
        textAlign: "center",
        letterSpacing: 1.2,
        textShadow: "0 2px 12px #b3a1f7aa"
      }}>
        تفاصيل طلب السيو #{detailsModal.order.id}
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
          {[
            {
              label: "العميل",
              value: detailsModal.order.customer,
              color: "#6D28D9"
            },
            {
              label: "الموقع",
              value: (
                <a href={detailsModal.order.site} target="_blank" rel="noopener noreferrer" style={{ color: "#6D28D9", fontWeight: 700 }}>
                  {detailsModal.order.site}
                </a>
              ),
              color: "#6366f1"
            },
            {
              label: "الهدف",
              value: detailsModal.order.goal_name,
              color: "#10b981"
            },
            {
              label: "الكلمات المفتاحية",
              value: detailsModal.order.keywords,
              color: "#f59e42"
            },
            {
              label: "الميزانية",
              value: detailsModal.order.budget,
              color: "#f43f5e"
            },
            {
              label: "الحالة",
              value: (
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
              ),
              color: "#6366f1"
            },
            {
              label: "تاريخ الإنشاء",
              value: new Date(detailsModal.order.created_at).toLocaleString(),
              color: "#64748b"
            },
            detailsModal.order.goal_features.length > 0 ? {
              label: "مميزات الهدف",
              value: (
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {detailsModal.order.goal_features.map((f, i) => (
                    <li key={i} style={{
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
                      {f.name}
                    </li>
                  ))}
                </ul>
              ),
              color: "#a21caf"
            } : null,
            { label: "تفاصيل إضافية", value: detailsModal.order.extra_details, color: "#0ea5e9" }
          ].filter(Boolean).map((row, i) => (
            <tr key={i} style={{
              background: i % 2 === 0 ? "#f3f3fa" : "#fff",
              transition: "background 0.2s"
            }}>
              <td style={{
                ...detailsTh,
                color: row.color,
                background: "none",
                fontWeight: 900,
                fontSize: 16,
                border: "none",
                textShadow: "0 1px 8px #e0e7ff44"
              }}>{row.label}:</td>
              <td style={{
                ...detailsTd,
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

        {/* ...rest of modals... */}
      </div>
    </div>
  );
}

// Styles
const th = { padding: "14px 8px", fontWeight: 700, color: "#6D28D9", textAlign: "left", background: "#f3f3fa", fontSize: 15.5, position: "sticky", top: 0, zIndex: 2 };
const td = { padding: "13px 8px", background: "#fff", fontWeight: 500, color: "#232347", verticalAlign: "middle", fontSize: 15, borderBottom: "1px solid #f0f0f4" };
const inp = { width: "100%", padding: "7px 10px", borderRadius: 7, border: "1px solid #ece8fa", fontWeight: 600, fontSize: 15, outline: "none", background: "#f7f8fe" };
const statusBtn = { background: "linear-gradient(90deg,#6366f1,#6d28d9)", color: "#fff", border: "none", borderRadius: 7, padding: "6px 18px", fontWeight: 700, cursor: "pointer", marginRight: 6, fontSize: 15, boxShadow: "0 2px 16px #6d28d922" };
const deleteBtn = { background: "#fff", color: "#ff4d6d", border: "1px solid #ffd6dd", borderRadius: 7, padding: "6px 16px", fontWeight: 700, cursor: "pointer" };
const cancelBtn = { background: "#f3f3fa", color: "#6D28D9", border: "none", borderRadius: 7, padding: "6px 22px", fontWeight: 700, cursor: "pointer" };
const modalOverlay = { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,20,0.16)", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center" };
const modalBox = { background: "#fff", borderRadius: 17, padding: "38px 32px", minWidth: 320, boxShadow: "0 4px 50px #6D28D922", maxWidth: 400, textAlign: "center" };
const modalTitle = { color: "#6D28D9", fontWeight: 700, fontSize: 20, marginBottom: 17 };
const eyeBtn = { background: "#f3f3fa", color: "#6D28D9", border: "none", borderRadius: 7, padding: "6px 10px", fontWeight: 700, cursor: "pointer", transition: "0.2s" };
const detailsTh = { color: "#6D28D9", fontWeight: 700, padding: "7px 0 7px 18px", fontSize: 16, width: 120, verticalAlign: "top" };
const detailsTd = { color: "#232347", fontWeight: 600, padding: "7px 0", fontSize: 16, verticalAlign: "top" };

