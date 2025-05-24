import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEye } from "react-icons/fi";
import { FaFileInvoiceDollar } from "react-icons/fa";

const STATUS_MAP = {
  pending:    { label: "Pending",      color: "#f59e42", bg: "#fff7e6", icon: "⏳" },
  accepted:   { label: "Accepted",     color: "#10b981", bg: "#e6fff7", icon: "✅" },
  rejected:   { label: "Rejected",     color: "#ef4444", bg: "#ffe6e6", icon: "❌" },
  processing: { label: "Processing",   color: "#6366f1", bg: "#eef2ff", icon: "🔄" },
  paid:       { label: "Paid",         color: "#0284c7", bg: "#e0f2fe", icon: "💸" },
  blocked:    { label: "Blocked",      color: "#a21caf", bg: "#f3e8ff", icon: "🚫" },
  refunded:   { label: "Refunded",     color: "#f43f5e", bg: "#ffe4e6", icon: "↩️" },
};

export default function WebdevOrderStats() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [detailsModal, setDetailsModal] = useState({ open: false, order: null });
  const [statusModal, setStatusModal] = useState({ open: false, order: null, current: "" });
  const [deleteModal, setDeleteModal] = useState({ open: false, order: null });
  const [confirmStatus, setConfirmStatus] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = () => {
    setLoading(true);
    axios.get("/api/admin/orders?section=system")
      .then(({ data }) => setOrders(data))
      .catch(() => setError("Failed to fetch orders"))
      .finally(() => setLoading(false));
  };

  const filtered = orders.filter(order =>
    !search ||
    order.id.toString().includes(search) ||
    (order.customer && order.customer.toLowerCase().includes(search.toLowerCase())) ||
    (order.service?.name && order.service.type.toLowerCase().includes(search.toLowerCase())) ||
    (order.description && order.description.toLowerCase().includes(search.toLowerCase()))
  );

  const toggleSelect = id => {
    setSelected(selected =>
      selected.includes(id)
        ? selected.filter(i => i !== id)
        : [...selected, id]
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === filtered.length) setSelected([]);
    else setSelected(filtered.map(o => o.id));
  };

  // تغيير حالة الطلب مع تحذير
  const handleStatusChange = async () => {
    if (!statusModal.order || !statusModal.current) return;
    setConfirmStatus(false);
    setLoading(true);
    await axios.put(`/api/admin/orders/${statusModal.order.id}/status`, { status: statusModal.current });
    setOrders(orders =>
      orders.map(o =>
        o.id === statusModal.order.id
          ? { ...o, status: statusModal.current }
          : o
      )
    );
    setStatusModal({ open: false, order: null, current: "" });
    setLoading(false);
  };

  // حذف الطلب مع تحذير
  const handleDelete = async () => {
    if (!deleteModal.order) return;
    setConfirmDelete(false);
    setLoading(true);
    await axios.delete(`/api/admin/order/${deleteModal.order.id}`);
    setDeleteModal({ open: false, order: null });
    fetchOrders();
    setLoading(false);
  };

  return (
    <div style={{ position: "relative", zIndex: 800 }}>
      <div style={{
        maxWidth: 1500,
        margin: "40px auto",
        background: "#fff",
        borderRadius: 22,
        boxShadow: "0 4px 32px #6D28D911",
        padding: 32,
        minHeight: 600
      }}>
        <h2 style={{ color: "#0284c7", fontWeight: 800, fontSize: 28, marginBottom: 18 }}>
          Web Developer Orders Management
        </h2>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <input
            type="text"
            placeholder="Search by order number, customer, service, or idea..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: 260, height: 36, borderRadius: 12, border: "1px solid #e0e7ff",
              padding: "0 14px", fontSize: 15, background: "#f6f7fb", color: "#2D2D2D"
            }}
          />
        </div>
        {loading && <p>Loading orders...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && (
          <div style={{ maxHeight: 540, overflowY: "auto", borderRadius: 13, border: "1px solid #f3f3fa" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", fontSize: 15 }}>
              <thead>
                <tr style={{ background: "#f3f3fa", position: "sticky", top: 0, zIndex: 2 }}>
                  <th style={th}><input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={toggleSelectAll} /></th>
                  <th style={th}>Order #</th>
                  <th style={th}>Customer</th>
                  <th style={th}>Service</th>
                  <th style={th}>Features</th>
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
                    <td style={td}>{order.type || "—"}</td>
                    <td style={td}>
                      {Array.isArray(order.features) && order.features.length
                        ? order.features.map(f => f.name).join(", ")
                        : "—"}
                    </td>
                    <td style={td}>{order.budget?.label || order.budget_label || order.budget || "—"}</td>
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
                    <td style={td}>{order.created_at ? new Date(order.created_at).toLocaleDateString("en-GB") : "—"}</td>
                    <td style={{ ...td, minWidth: 210, display: "flex", gap: 8 }}>
                      <button
                        onClick={() => setStatusModal({ open: true, order, current: order.status })}
                        style={statusBtn}
                      >Change Status</button>
<button
  onClick={() => {
    console.log("تفاصيل الطلب:", order); // سيظهر كل بيانات الطلب في الكونسول
    setDetailsModal({ open: true, order });
  }}
  style={eyeBtn}
  title="Order Details"
>
  <FiEye size={19} />
</button>
                      <button
                        onClick={() => setDeleteModal({ open: true, order })}
                        style={deleteBtn}
                      >Delete</button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={9} style={{ color: "#b3b3cb", textAlign: "center", padding: 38 }}>
                      No webdev orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Status Modal */}
        {statusModal.open && statusModal.order && (
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
                  color: STATUS_MAP[statusModal.current]?.color || "#0284c7",
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
              <div style={{ color: "#ef4444", fontWeight: 700, marginBottom: 18 }}>
                Are you sure you want to change the status for this order?
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                <button
                  onClick={() => setConfirmStatus(true)}
                  style={statusBtn}
                >Save</button>
                <button
                  onClick={() => setStatusModal({ open: false, order: null, current: "" })}
                  style={cancelBtn}
                >Cancel</button>
              </div>
              {/* تحذير التأكيد */}
              {confirmStatus && (
                <div style={{
                  marginTop: 18,
                  background: "#fff6f6",
                  color: "#ef4444",
                  border: "1.5px solid #ffd6dd",
                  borderRadius: 10,
                  padding: "12px 18px",
                  fontWeight: 700,
                  fontSize: 15,
                  textAlign: "center"
                }}>
                  Confirm changing status?
                  <div style={{ marginTop: 10 }}>
                    <button onClick={handleStatusChange} style={statusBtn}>Yes, Change</button>
                    <button onClick={() => setConfirmStatus(false)} style={cancelBtn}>Cancel</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {deleteModal.open && deleteModal.order && (
          <div style={modalOverlay}>
            <div style={modalBox}>
              <h3 style={modalTitle}>Delete Order</h3>
              <p style={{ color: "#232347", fontWeight: 500, marginBottom: 24 }}>
                Are you sure you want to delete this order? This action cannot be undone.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                <button
                  onClick={() => setConfirmDelete(true)}
                  style={deleteBtn}
                >Delete</button>
                <button
                  onClick={() => setDeleteModal({ open: false, order: null })}
                  style={cancelBtn}
                >Cancel</button>
              </div>
              {/* تحذير التأكيد */}
              {confirmDelete && (
                <div style={{
                  marginTop: 18,
                  background: "#fff6f6",
                  color: "#ef4444",
                  border: "1.5px solid #ffd6dd",
                  borderRadius: 10,
                  padding: "12px 18px",
                  fontWeight: 700,
                  fontSize: 15,
                  textAlign: "center"
                }}>
                  Confirm delete order?
                  <div style={{ marginTop: 10 }}>
                    <button onClick={handleDelete} style={deleteBtn}>Yes, Delete</button>
                    <button onClick={() => setConfirmDelete(false)} style={cancelBtn}>Cancel</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Details Modal */}
        {detailsModal.open && detailsModal.order && (
          <div style={{
            ...modalOverlay,
            background: "rgba(2,132,199,0.10)",
            backdropFilter: "blur(4px)"
          }}>
            <div style={{
              ...modalBox,
              maxWidth: 650,
              textAlign: "left",
              direction: "ltr",
              padding: 36,
              position: "relative",
              border: "2.5px solid #0284c7",
              boxShadow: "0 8px 48px #0284c744, 0 2px 16px #0284c722"
            }}>
              <button
                onClick={() => setDetailsModal({ open: false, order: null })}
                style={{
                  position: "absolute", top: 18, right: 18, background: "none", border: "none",
                  color: "#0284c7", fontSize: 32, cursor: "pointer", fontWeight: 900, transition: "color 0.2s"
                }}
                aria-label="Close"
                onMouseOver={e => e.currentTarget.style.color = "#ff4d6d"}
                onMouseOut={e => e.currentTarget.style.color = "#0284c7"}
              >
                ×
              </button>
              <h2 style={{
                color: "#0284c7",
                fontWeight: 900,
                fontSize: 25,
                marginBottom: 18,
                textAlign: "center",
                letterSpacing: 1.2,
                textShadow: "0 2px 12px #b3e6fa88"
              }}>
                Webdev Order Details #{detailsModal.order.id}
              </h2>
              <table style={{
                width: "100%",
                borderCollapse: "separate",
                borderSpacing: "0 10px",
                fontSize: 16,
                background: "rgba(245,245,255,0.97)",
                borderRadius: 18,
                overflow: "hidden",
                boxShadow: "0 2px 18px #0284c711"
              }}>
                <tbody>
                  <tr>
                    <td style={detailsLabel}>Customer:</td>
                    <td style={detailsValue}>{detailsModal.order.customer || "—"}</td>
                  </tr>
                  <tr>
                    <td style={detailsLabel}>Service:</td>
                    <td style={detailsValue}>{detailsModal.order.type || "—"}</td>
                  </tr>
                  <tr>
                    <td style={detailsLabel}>Features:</td>
                    <td style={detailsValue}>
                      {Array.isArray(detailsModal.order.features) && detailsModal.order.features.length
                        ? (
                          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexWrap: "wrap", gap: 8 }}>
                            {detailsModal.order.features.map((f, i) => (
                              <li key={i} style={{
                                background: "#e0e7ff",
                                color: "#0284c7",
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
                        )
                        : "—"}
                    </td>
                  </tr>
                  <tr>
                    <td style={detailsLabel}>Budget:</td>
                    <td style={detailsValue}>{detailsModal.order.budget?.label || detailsModal.order.budget_label || detailsModal.order.budget || "—"}</td>
                  </tr>
                  <tr>
                    <td style={detailsLabel}>Idea:</td>
                    <td style={detailsValue}>{detailsModal.order.description || "—"}</td>
                  </tr>
                  <tr>
                    <td style={detailsLabel}>Details:</td>
                    <td style={detailsValue}>{detailsModal.order.details || "—"}</td>
                  </tr>
                  <tr>
                    <td style={detailsLabel}>Status:</td>
                    <td style={detailsValue}>
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
                    </td>
                  </tr>
                  <tr>
                    <td style={detailsLabel}>Order Date:</td>
                    <td style={detailsValue}>{detailsModal.order.created_at ? new Date(detailsModal.order.created_at).toLocaleString('en-GB') : "—"}</td>
                  </tr>
                </tbody>
              </table>
              <div style={{ marginTop: 28, textAlign: "center" }}>
                <button
                  style={{
                    background: "linear-gradient(90deg,#0284c7,#6366f1)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 9,
                    padding: "10px 32px",
                    fontWeight: 800,
                    fontSize: 17,
                    cursor: "pointer",
                    boxShadow: "0 2px 16px #0284c733",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10
                  }}
                  // TODO: اربط زر الفاتورة هنا لاحقاً
                  onClick={() => alert("Invoice issuing coming soon!")}
                >
                  <FaFileInvoiceDollar size={20} />
                  Issue Invoice
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Styles
const th = { padding: "14px 8px", fontWeight: 700, color: "#0284c7", textAlign: "left", background: "#f3f3fa", fontSize: 15.5, position: "sticky", top: 0, zIndex: 2 };
const td = { padding: "13px 8px", background: "#fff", fontWeight: 500, color: "#232347", verticalAlign: "middle", fontSize: 15, borderBottom: "1px solid #f0f0f4" };
const inp = { width: "100%", padding: "7px 10px", borderRadius: 7, border: "1px solid #ece8fa", fontWeight: 600, fontSize: 15, outline: "none", background: "#f7f8fe" };
const statusBtn = { background: "linear-gradient(90deg,#6366f1,#0284c7)", color: "#fff", border: "none", borderRadius: 7, padding: "6px 18px", fontWeight: 700, cursor: "pointer", fontSize: 15, boxShadow: "0 2px 16px #0284c722" };
const deleteBtn = { background: "#fff", color: "#ff4d6d", border: "1px solid #ffd6dd", borderRadius: 7, padding: "6px 16px", fontWeight: 700, cursor: "pointer" };
const cancelBtn = { background: "#f3f3fa", color: "#0284c7", border: "none", borderRadius: 7, padding: "6px 22px", fontWeight: 700, cursor: "pointer" };
const eyeBtn = { background: "#f3f3fa", color: "#0284c7", border: "none", borderRadius: 7, padding: "6px 10px", fontWeight: 700, cursor: "pointer", transition: "0.2s" };
const modalOverlay = { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,20,0.16)", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center" };
const modalBox = { background: "#fff", borderRadius: 17, padding: "38px 32px", minWidth: 320, boxShadow: "0 4px 50px #0284c722", maxWidth: 400, textAlign: "center" };
const modalTitle = { color: "#0284c7", fontWeight: 700, fontSize: 20, marginBottom: 17 };
const detailsLabel = { color: "#0284c7", fontWeight: 900, fontSize: 16, border: "none", padding: "10px 20px", width: 160, background: "none" };
const detailsValue = { color: "#232347", fontWeight: 700, fontSize: 16, border: "none", padding: "10px 20px", background: "none" };