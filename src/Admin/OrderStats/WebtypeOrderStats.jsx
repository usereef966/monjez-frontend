import React, { useEffect, useState } from "react";

const STATUS_MAP = {
  pending:    { label: "قيد المعالجة", color: "#6D28D9", bg: "#ede9fe", icon: "⏳" },
  accepted:   { label: "تم القبول", color: "#21c692", bg: "#e7f9f3", icon: "✅" },
  paid:       { label: "تم الدفع", color: "#2563eb", bg: "#e0e7ff", icon: "💳" },
  rejected:   { label: "مرفوض", color: "#ff4d6d", bg: "#fff0f3", icon: "❌" },
  blocked:    { label: "محظور", color: "#b91c1c", bg: "#fee2e2", icon: "🚫" },
  refunded:   { label: "مسترد", color: "#f59e42", bg: "#fff7e6", icon: "↩️" },
};

const th = {
  padding: "13px 10px",
  fontWeight: 900,
  fontSize: 16,
  color: "#0284c7",
  background: "#f3f3fa",
  border: "none",
  textAlign: "center"
};
const td = {
  padding: "12px 10px",
  fontWeight: 700,
  fontSize: 15,
  color: "#232347",
  background: "#fff",
  border: "none",
  textAlign: "center"
};

function getSectionLabel(section) {
  if (section === "web") return "برمجة موقع";
  // أضف باقي الأقسام حسب الحاجة
  return section;
}

export default function WebtypeOrderStats() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusModal, setStatusModal] = useState({ open: false, order: null, current: "" });
  const [detailsModal, setDetailsModal] = useState({ open: false, order: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, orderId: null });
  const [refresh, setRefresh] = useState(0);


  // دالة مركزية لجلب الطلبات
function fetchOrders() {
  setLoading(true);
  fetch("https://monjez-online.onrender.com/api/admin/orders?section=Web", { cache: "no-store" })
    .then(res => res.json())
    .then(data => {
      console.log("orders from API", data);
      const mapped = Array.isArray(data)
        ? data.map(order => ({
            ...order,
            status: order.web_status || order.status // هنا الحل!
          }))
        : [];
      setOrders(mapped);
      setLoading(false);
    })
    .catch(() => {
      setError("فشل في جلب الطلبات");
      setLoading(false);
    });
}


  useEffect(() => {
    fetchOrders();
  }, []);

  const filtered = orders.filter(order =>
    !search ||
    order.id.toString().includes(search) ||
    (order.customer && order.customer.toLowerCase().includes(search.toLowerCase())) ||
    (order.section && order.section.toLowerCase().includes(search.toLowerCase()))
  );

  function openStatusModal(order) {
    setStatusModal({ open: true, order, current: order.status });
  }
  function closeStatusModal() {
    setStatusModal({ open: false, order: null, current: "" });
  }
  function openDetailsModal(order) {
    setDetailsModal({ open: true, order });
  }
  function closeDetailsModal() {
    setDetailsModal({ open: false, order: null });
  }
  function openDeleteModal(orderId) {
  console.log("Order ID before open modal:", orderId); // 👈 تحقق هنا فورًا
  setDeleteModal({ open: true, orderId });
}
  function closeDeleteModal() {
    setDeleteModal({ open: false, orderId: null });
  }

  // تحديث الحالة فعلياً وتحديث الـ state مباشرة
async function handleStatusChange() {
  if (!statusModal.order) return;
  try {
    await fetch(`https://monjez-online.onrender.com/api/admin/orders/${statusModal.order.id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: statusModal.current })
    });
    closeStatusModal();
    fetchOrders();
    // بعد نجاح الحذف أو التعديل مباشرة
    window.dispatchEvent(new Event("orders-updated"));
    setTimeout(fetchOrders, 1000);
  } catch {
    alert("فشل في تحديث الحالة");
  }
}

  // حذف الطلب فعلياً وتحديث الـ state مباشرة
async function handleDelete(orderId) {
  try {
    await fetch(`https://monjez-online.onrender.com/api/admin/order/${orderId}`, { method: "DELETE" });
    closeDeleteModal();
    fetchOrders();
  } catch {
    alert("فشل في حذف الطلب");
  }
}



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
        <h2 style={{
          color: "#0284c7",
          fontWeight: 800,
          fontSize: 28,
          marginBottom: 18
        }}>
          Web Orders Management
        </h2>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20
        }}>
          <input
            type="text"
            placeholder="Search by order number, customer, or type..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: 260,
              height: 36,
              borderRadius: 12,
              border: "1px solid #e0e7ff",
              padding: "0 14px",
              fontSize: 15,
              background: "#f6f7fb",
              color: "#2D2D2D"
            }}
          />
        </div>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && (
          <div style={{
            maxHeight: 540,
            overflowY: "auto",
            borderRadius: 13,
            border: "1px solid #f3f3fa"
          }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "#fff",
              fontSize: 15
            }}>
              <thead>
                <tr style={{
                  background: "#f3f3fa",
                  position: "sticky",
                  top: 0,
                  zIndex: 2
                }}>
                  <th style={th}>Order #</th>
                  <th style={th}>Customer</th>
                  <th style={th}>Type</th>
                  <th style={th}>اسم التطبيق</th>
                  <th style={th}>Budget</th>
                  <th style={th}>Status</th>
                  <th style={th}>Order Date</th>
                  <th style={th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length ? filtered.map(order => (
                  <tr key={order.id} style={{ borderBottom: "1px solid #f0f0f4" }}>
                    <td style={td}>{order.id}</td>
                    <td style={td}>{order.customer || "—"}</td>
                    <td style={td}>{order.type || getSectionLabel(order.section) || "—"}</td>
                    <td style={td}>{order.site_type_name || "—"}</td>
                    <td style={td}>{order.budget_obj?.label || order.budget || "—"}</td>
                    <td style={td}>
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        background: STATUS_MAP[order.status]?.bg,
                        color: STATUS_MAP[order.status]?.color,
                        borderRadius: "50px",
                        padding: "6px 18px",
                        fontWeight: 800,
                        fontSize: 15,
                        boxShadow: "0 2px 8px #0284c733"
                      }}>
                        <span style={{ fontSize: 18 }}>{STATUS_MAP[order.status]?.icon}</span>
                        {STATUS_MAP[order.status]?.label || order.status}
                      </span>
                    </td>
                    <td style={td}>{order.created_at ? new Date(order.created_at).toLocaleDateString() : "—"}</td>
                    <td style={{
                      ...td,
                      minWidth: 180,
                      display: "flex",
                      gap: 8,
                      justifyContent: "center"
                    }}>
                      <button
                        onClick={() => openStatusModal(order)}
                        style={{
                          background: "linear-gradient(90deg,#22d3ee,#0284c7)",
                          color: "#fff",
                          border: "none",
                          borderRadius: 8,
                          padding: "7px 18px",
                          fontWeight: 800,
                          fontSize: 15,
                          cursor: "pointer",
                          boxShadow: "0 2px 8px #0284c722",
                          display: "flex",
                          alignItems: "center",
                          gap: 7,
                          transition: "background 0.2s"
                        }}
                        title="Change Status"
                      >
                        <span role="img" aria-label="Change">🔄</span>
                        Change Status
                      </button>
                      <button
                        onClick={() => openDetailsModal(order)}
                        style={{
                          background: "#fff",
                          color: "#0284c7",
                          border: "1.5px solid #22d3ee",
                          borderRadius: "50%",
                          width: 40,
                          height: 40,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 900,
                          fontSize: 19,
                          cursor: "pointer",
                          boxShadow: "0 2px 8px #0284c722",
                          transition: "border 0.2s"
                        }}
                        title="Order Details"
                      >
                        <span role="img" aria-label="Details">👁️</span>
                      </button>
                      <button
                        onClick={() => openDeleteModal(order.id)}
                        style={{
                          background: "#fff",
                          color: "#ef4444",
                          border: "1.5px solid #fecaca",
                          borderRadius: 8,
                          padding: "7px 18px",
                          fontWeight: 800,
                          fontSize: 15,
                          cursor: "pointer",
                          boxShadow: "0 2px 8px #ef444422",
                          display: "flex",
                          alignItems: "center",
                          gap: 7,
                          transition: "border 0.2s"
                        }}
                        title="Delete Order"
                      >
                        <span role="img" aria-label="Delete">🗑️</span>
                        Delete
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={8} style={{ color: "#b3b3cb", textAlign: "center", padding: 38 }}>
                      No web orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Status Modal */}
        {statusModal.open && statusModal.order && (
          <div style={{
            position: "fixed",
            inset: 0,
            background: "rgba(109,40,217,0.10)",
            backdropFilter: "blur(4px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <div style={{
              background: "#fff",
              borderRadius: 18,
              padding: 36,
              minWidth: 320,
              boxShadow: "0 8px 48px #0284c744, 0 2px 16px #0284c722",
              border: "2px solid #22d3ee",
              position: "relative"
            }}>
              <button
                onClick={closeStatusModal}
                style={{
                  position: "absolute", top: 14, left: 14, background: "none", border: "none",
                  color: "#0284c7", fontSize: 28, cursor: "pointer", fontWeight: 900, transition: "color 0.2s"
                }}
                aria-label="Close"
                onMouseOver={e => e.currentTarget.style.color = "#ef4444"}
                onMouseOut={e => e.currentTarget.style.color = "#0284c7"}
              >×</button>
              <h3 style={{ color: "#0284c7", fontWeight: 900, fontSize: 22, marginBottom: 18, textAlign: "center" }}>
                Change Order Status
              </h3>
              <select
                value={statusModal.current}
                onChange={e => setStatusModal(s => ({ ...s, current: e.target.value }))}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1.5px solid #e0e7ff",
                  fontWeight: 700,
                  fontSize: 16,
                  marginBottom: 24,
                  color: STATUS_MAP[statusModal.current]?.color || "#0284c7",
                  background: STATUS_MAP[statusModal.current]?.bg || "#f7f8fe"
                }}
              >
                {Object.keys(STATUS_MAP).map(key => (
                  <option key={key} value={key}>{STATUS_MAP[key].label}</option>
                ))}
              </select>
              <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                <button
                  onClick={handleStatusChange}
                  style={{
                    background: "linear-gradient(90deg,#22d3ee,#0284c7)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "9px 28px",
                    fontWeight: 800,
                    fontSize: 16,
                    cursor: "pointer",
                    boxShadow: "0 2px 16px #0284c722"
                  }}
                >
                  Save
                </button>
                <button
                  onClick={closeStatusModal}
                  style={{
                    background: "#fff",
                    color: "#0284c7",
                    border: "1.5px solid #22d3ee",
                    borderRadius: 8,
                    padding: "9px 28px",
                    fontWeight: 800,
                    fontSize: 16,
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {deleteModal.open && (
          <div style={{
            position: "fixed",
            inset: 0,
            background: "rgba(109,40,217,0.10)",
            backdropFilter: "blur(4px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <div style={{
              background: "#fff",
              borderRadius: 18,
              padding: 36,
              minWidth: 320,
              boxShadow: "0 8px 48px #ef444444, 0 2px 16px #ef444422",
              border: "2px solid #fecaca",
              position: "relative"
            }}>
              <button
                onClick={closeDeleteModal}
                style={{
                  position: "absolute", top: 14, left: 14, background: "none", border: "none",
                  color: "#ef4444", fontSize: 28, cursor: "pointer", fontWeight: 900, transition: "color 0.2s"
                }}
                aria-label="Close"
                onMouseOver={e => e.currentTarget.style.color = "#0284c7"}
                onMouseOut={e => e.currentTarget.style.color = "#ef4444"}
              >×</button>
              <h3 style={{ color: "#ef4444", fontWeight: 900, fontSize: 22, marginBottom: 18, textAlign: "center" }}>
                Delete Order
              </h3>
              <p style={{ color: "#232347", fontWeight: 500, marginBottom: 24, textAlign: "center" }}>
                Are you sure you want to delete this order? This action cannot be undone.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                <button
                  onClick={() => handleDelete(deleteModal.orderId)}
                  style={{
                    background: "#ef4444",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "9px 28px",
                    fontWeight: 800,
                    fontSize: 16,
                    cursor: "pointer",
                    boxShadow: "0 2px 16px #ef444422"
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={closeDeleteModal}
                  style={{
                    background: "#fff",
                    color: "#ef4444",
                    border: "1.5px solid #fecaca",
                    borderRadius: 8,
                    padding: "9px 28px",
                    fontWeight: 800,
                    fontSize: 16,
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Details Modal */}
        {detailsModal.open && detailsModal.order && (
          <div style={{
            position: "fixed",
            inset: 0,
            background: "rgba(109,40,217,0.10)",
            backdropFilter: "blur(4px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <div style={{
              background: "#fff",
              maxWidth: 650,
              width: "100%",
              textAlign: "left",
              direction: "ltr",
              padding: 40,
              position: "relative",
              border: "3px solid #0284c7",
              borderRadius: 28,
              boxShadow: "0 12px 64px #0284c744, 0 2px 16px #0284c722"
            }}>
              <button
                onClick={closeDetailsModal}
                style={{
                  position: "absolute", top: 18, right: 18, background: "none", border: "none",
                  color: "#0284c7", fontSize: 32, cursor: "pointer", fontWeight: 900, transition: "color 0.2s"
                }}
                aria-label="Close"
                onMouseOver={e => e.currentTarget.style.color = "#ef4444"}
                onMouseOut={e => e.currentTarget.style.color = "#0284c7"}
              >
                ×
              </button>
              <h2 style={{
                color: "#0284c7",
                fontWeight: 900,
                fontSize: 27,
                marginBottom: 18,
                textAlign: "center",
                letterSpacing: 1.2,
                textShadow: "0 2px 12px #b3a1f7aa"
              }}>
                Web Order Details #{detailsModal.order.id}
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
                    { label: "Customer", value: detailsModal.order.customer, color: "#0284c7" },
                    { label: "Type", value: getSectionLabel(detailsModal.order.section), color: "#6366f1" },
                    { label: "Description", value: detailsModal.order.description || "—", color: "#10b981" },
                    { label: "Description", value: detailsModal.order.app_name || detailsModal.order.site || "—", color: "#10b981" },
                    { label: "Budget", value: detailsModal.order.budget_obj?.label ? `${detailsModal.order.budget_obj.label} SAR` : (detailsModal.order.budget || "—"), color: "#f43f5e" },
                    { label: "Status", value: (
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
                    { label: "Created At", value: detailsModal.order.created_at ? new Date(detailsModal.order.created_at).toLocaleString() : "—", color: "#64748b" },
                    Array.isArray(detailsModal.order.features) && detailsModal.order.features.length ? {
                      label: "Selected Features",
                      value: (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                          {detailsModal.order.features.map((f, i) => (
                            <span key={i} style={{
                              background: "#e0e7ff",
                              color: "#0284c7",
                              borderRadius: 8,
                              padding: "4px 13px",
                              fontWeight: 700,
                              fontSize: 15,
                              display: "inline-block"
                            }}>{f}</span>
                          ))}
                        </div>
                      ),
                      color: "#0284c7"
                    } : null
                  ].filter(Boolean).map((row, i) => (
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
                    background: "linear-gradient(90deg,#22d3ee,#0284c7)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 14,
                    padding: "13px 38px",
                    fontWeight: 900,
                    fontSize: 18,
                    cursor: "pointer",
                    boxShadow: "0 2px 16px #0284c722",
                    letterSpacing: 1.2,
                    transition: "background 0.2s",
                    marginTop: 24,
                    display: "flex",
                    alignItems: "center",
                    gap: 10
                  }}
                  onClick={() => alert("Invoice printing coming soon")}
                  disabled
                >
                  <span role="img" aria-label="Printer">🖨️</span> Print Invoice
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

