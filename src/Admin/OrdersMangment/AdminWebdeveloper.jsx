import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import axios from "axios";

export default function AdminWebDeveloper() {
  // الخطط
  const [plans, setPlans] = useState([]);
  const [modal, setModal] = useState({ open: false, mode: "add", plan: null });
  const [loading, setLoading] = useState(false);

  // الخدمات (system types)
  const [services, setServices] = useState([]);
  const [serviceLoading, setServiceLoading] = useState(false);
  const [serviceError, setServiceError] = useState("");
  const [editServiceModal, setEditServiceModal] = useState({ open: false, service: null, name: "" });
  const [featureAssignModal, setFeatureAssignModal] = useState({ open: false, service: null, selected: [] });

  // الميزات
  const [allFeatures, setAllFeatures] = useState([]);
  const [featureModal, setFeatureModal] = useState({ open: false, mode: "add", feature: null });

  // مودال تأكيد الحذف
  const [confirmModal, setConfirmModal] = useState({ open: false, type: "", id: null, name: "" });

  // رسائل
  const [error, setError] = useState("");
  const [serviceSuccess, setServiceSuccess] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [search, setSearch] = useState("");



const [budgetModal, setBudgetModal] = useState({ open: false });
const [budgets, setBudgets] = useState([]);
const [budgetLoading, setBudgetLoading] = useState(false);
const [budgetError, setBudgetError] = useState("");





const fetchBudgets = async () => {
  setBudgetLoading(true);
  setBudgetError("");
  try {
    const { data } = await axios.get("/api/budgets/تطوير الأنظمة");
    setBudgets(data);
  } catch {
    setBudgetError("فشل في جلب الميزانيات");
  } finally {
    setBudgetLoading(false);
  }
};


useEffect(() => {
  if (budgetModal.open) fetchBudgets();
}, [budgetModal.open]);



useEffect(() => {
  const handleEsc = e => {
    if (e.key === "Escape") {
      setFeatureModal(m => m.open ? { open: false, mode: "add", feature: null } : m);
      setBudgetModal(m => m.open ? { open: false } : m);
      setEditServiceModal(m => m.open ? { open: false, service: null, name: "" } : m);
      setFeatureAssignModal(m => m.open ? { open: false, service: null, selected: [] } : m);
      setConfirmModal(m => m.open ? { open: false, type: "", id: null, name: "" } : m);
    }
  };
  window.addEventListener("keydown", handleEsc);
  return () => window.removeEventListener("keydown", handleEsc);
}, []);



  // جلب الخطط
  const fetchPlans = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get('/api/web-developer');
      setPlans(data);
    } catch {
      setError('فشل في جلب خطط المطور');
    } finally {
      setLoading(false);
    }
  };

  // جلب الخدمات
  const fetchServices = async () => {
    setServiceLoading(true);
    setServiceError("");
    try {
      const { data } = await axios.get("/api/system-types");
      setServices(data);
    } catch {
      setServiceError("فشل في جلب الخدمات");
    } finally {
      setServiceLoading(false);
    }
  };

  // جلب الميزات
  const fetchFeatures = async () => {
    try {
      const { data } = await axios.get('/api/developer-features');
      setAllFeatures(data);
    } catch {
      setError("فشل في جلب الميزات");
    }
  };

  useEffect(() => { fetchPlans(); fetchServices(); fetchFeatures(); }, []);

  // حذف خطة مطور مع مودال تأكيد
  const handleDeletePlan = id => {
    const plan = plans.find(p => p.id === id);
    setConfirmModal({ open: true, type: "plan", id, name: plan?.name || "" });
  };
  const confirmDeletePlan = async () => {
    try {
      await axios.delete(`/api/web-developer/${confirmModal.id}`);
      fetchPlans();
      setModal({ open: false, mode: "add", plan: null });
      setConfirmModal({ open: false, type: "", id: null, name: "" });
      setSuccessMsg("تم حذف الخطة بنجاح!");
    } catch {
      setError('فشل في حذف خطة المطور');
    }
  };

  // حذف خدمة مع مودال تأكيد
  const handleDeleteService = id => {
    const service = services.find(s => s.id === id);
    setConfirmModal({ open: true, type: "service", id, name: service?.name || "" });
  };
  const confirmDeleteService = async () => {
    try {
      await axios.delete(`/api/system-types/${confirmModal.id}`);
      fetchServices();
      setConfirmModal({ open: false, type: "", id: null, name: "" });
      setServiceSuccess("تم حذف الخدمة بنجاح!");
    } catch {
      setServiceError("فشل في حذف الخدمة");
    }
  };

  // حذف ميزة مع مودال تأكيد
  const handleFeatureDelete = id => {
    const feature = allFeatures.find(f => f.id === id);
    setConfirmModal({ open: true, type: "feature", id, name: feature?.name || "" });
  };
  const confirmDeleteFeature = async () => {
    try {
      await axios.delete(`/api/developer-features/${confirmModal.id}`);
      fetchFeatures();
      setFeatureModal({ open: false, mode: "add", feature: null });
      setConfirmModal({ open: false, type: "", id: null, name: "" });
      setSuccessMsg("تم حذف الميزة بنجاح!");
    } catch {
      setError("فشل في حذف الميزة");
    }
  };

  // ربط الميزات مع الخدمة
  const openAssignFeatures = async service => {
    try {
      const { data } = await axios.get(`/api/system-types/${service.id}/features`);
      setFeatureAssignModal({
        open: true,
        service,
        selected: data.map(f => f.id)
      });
    } catch {
      setError("فشل في جلب ميزات الخدمة");
    }
  };
  const handleAssignFeatures = async () => {
    try {
      await axios.post(`/api/system-types/${featureAssignModal.service.id}/features`, {
        features: featureAssignModal.selected
      });
      setFeatureAssignModal({ open: false, service: null, selected: [] });
      fetchServices();
      setServiceSuccess("تم تحديث الميزات بنجاح!");
    } catch {
      setError("فشل في تعيين الميزات");
    }
  };

  // تعديل اسم الخدمة
  const handleEditServiceName = async () => {
    try {
      await axios.put(`/api/system-types/${editServiceModal.service.id}`, { name: editServiceModal.name });
      fetchServices();
      setEditServiceModal({ open: false, service: null, name: "" });
      setServiceSuccess("تم تعديل اسم الخدمة!");
    } catch {
      setServiceError("فشل في تحديث اسم الخدمة");
    }
  };

  // إدارة الميزات
  const handleFeatureSave = async feature => {
    try {
      if (featureModal.mode === "add") {
        await axios.post("/api/developer-features", { name: feature.name });
      } else {
        await axios.put(`/api/developer-features/${feature.id}`, { name: feature.name });
      }
      fetchFeatures();
      setFeatureModal({ open: false, mode: "add", feature: null });
      setSuccessMsg("تم حفظ الميزة بنجاح!");
    } catch {
      setError("فشل في حفظ الميزة");
    }
  };

  // رسائل نجاح/خطأ مؤقتة
  useEffect(() => {
    if (successMsg || serviceSuccess) {
      const t = setTimeout(() => { setSuccessMsg(""); setServiceSuccess(""); }, 2200);
      return () => clearTimeout(t);
    }
  }, [successMsg, serviceSuccess]);

  // --- UI ---
  return (
    <div style={{ position: "relative", zIndex: 800 }}>
      {/* رسائل نجاح/خطأ */}
      {(successMsg || serviceSuccess) && (
        <div style={{
          position: "fixed", top: 30, left: "50%", transform: "translateX(-50%)",
          background: "#e7fbe7", color: "#1a7f37", border: "2px solid #a7f3d0",
          borderRadius: 12, padding: "13px 38px", fontWeight: 800, fontSize: 17,
          boxShadow: "0 2px 16px #a7f3d033", zIndex: 999999
        }}>
          {successMsg || serviceSuccess}
        </div>
      )}
      {error && (
        <div style={{
          position: "fixed", top: 30, left: "50%", transform: "translateX(-50%)",
          background: "#fff6f6", color: "#ff4d6d", border: "2px solid #ffd6dd",
          borderRadius: 12, padding: "13px 38px", fontWeight: 800, fontSize: 17,
          boxShadow: "0 2px 16px #ffd6dd33", zIndex: 999999
        }}>
          {error}
        </div>
      )}

      <div style={{ padding: "44px 0 64px" }}>
        
        {/* أزرار الميزات فوق الجدول */}
        <div style={{ maxWidth: 1500, margin: "0 auto", marginBottom: 18, display: "flex", justifyContent: "flex-end", gap: 12 }}>



          <button
            onClick={() => setFeatureModal({ open: true, mode: "add", feature: null })}
            style={addBtn}
          >
            Features
          </button>


          <button
    onClick={() => setBudgetModal({ open: true })}
    style={addBtn}
  >
    Budgets
  </button>
        </div>
        {/* جدول الخدمات */}
        <div style={{ maxWidth: 1500, margin: "0 auto", background: "#fff", borderRadius: 22, boxShadow: "0 4px 32px #6D28D911", padding: 32 }}>
          <h2 style={{ color: "#6D28D9", fontWeight: 800, fontSize: 27, marginBottom: 18 }}>
            System Types Management
          </h2>
          {serviceError && <div style={{ color: "red", marginBottom: 12 }}>{serviceError}</div>}
          <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", fontSize: 15, borderRadius: 13, overflow: "hidden" }}>
            <thead>
              <tr style={{ background: "#f3f3fa" }}>
                <th style={th}>ID</th>
                <th style={th}>Name</th>
                <th style={th}>Assign Features</th>
                <th style={th}>Edit</th>
                <th style={th}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {services.map(service => (
                <tr key={service.id} style={{ borderBottom: "1px solid #f0f0f4" }}>
                  <td style={td}>{service.id}</td>
                  <td style={td}>{service.name}</td>
                  <td style={td}>
                    <button style={editBtn} onClick={() => openAssignFeatures(service)}>
                      Assign Features
                    </button>
                  </td>
                  <td style={td}>
                    <button
                      style={editBtn}
                      onClick={() => setEditServiceModal({ open: true, service, name: service.name })}
                    >
                      Edit
                    </button>
                  </td>
                  <td style={td}>
                    <button style={deleteBtn} onClick={() => handleDeleteService(service.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* مودال تأكيد الحذف */}
        {confirmModal.open && createPortal(
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
            background: "rgba(0,0,20,0.18)", zIndex: 999999, display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <div style={{
              background: "#fff", borderRadius: 17, padding: "38px 32px", minWidth: 320,
              boxShadow: "0 4px 50px #7c4dff22", minHeight: 180, textAlign: "center"
            }}>
              <h3 style={{ color: "#ff4d6d", fontWeight: 800, fontSize: 22, marginBottom: 17 }}>
                تأكيد الحذف
              </h3>
              <div style={{ fontWeight: 700, color: "#232347", fontSize: 17, marginBottom: 18 }}>
                هل أنت متأكد أنك تريد حذف&nbsp;
                <span style={{ color: "#7c4dff" }}>
                  {confirmModal.type === "service" && "الخدمة"}
                  {confirmModal.type === "plan" && "الخطة"}
                  {confirmModal.type === "feature" && "الميزة"}
                </span>
                &nbsp;
                <span style={{ color: "#ff4d6d" }}>{confirmModal.name}</span>
                ؟
              </div>
              <div style={{ marginTop: 18 }}>
                <button
                  style={{ ...deleteBtn, background: "#ff4d6d", color: "#fff", marginRight: 12 }}
                  onClick={() => {
                    if (confirmModal.type === "service") confirmDeleteService();
                    else if (confirmModal.type === "plan") confirmDeletePlan();
                    else if (confirmModal.type === "feature") confirmDeleteFeature();
                  }}
                >تأكيد الحذف</button>
                <button
                  style={{ ...editBtn, background: "#6D28D9", color: "#fff" }}
                  onClick={() => setConfirmModal({ open: false, type: "", id: null, name: "" })}
                >إلغاء</button>
              </div>
            </div>
          </div>, document.body
        )}

        {/* --- Assign Features Modal --- */}
        {featureAssignModal.open && createPortal(
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
            background: "rgba(0,0,20,0.18)", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <div style={{
              background: "#fff", borderRadius: 17, padding: "44px 40px", minWidth: 350,
              boxShadow: "0 4px 50px #7c4dff22"
            }}>
              <h3 style={{ color: "#7c4dff", fontWeight: 700, fontSize: 21, marginBottom: 17 }}>
                Assign Features to: {featureAssignModal.service?.name}
              </h3>
              <form onSubmit={e => { e.preventDefault(); handleAssignFeatures(); }}>
                <div style={{ maxHeight: 320, overflowY: "auto", marginBottom: 18 }}>
                  {allFeatures.map(f => (
                    <label key={f.id} style={featureLbl}>
                      <input
                        type="checkbox"
                        checked={featureAssignModal.selected.includes(f.id)}
                        onChange={() => {
                          setFeatureAssignModal(m => ({
                            ...m,
                            selected: m.selected.includes(f.id)
                              ? m.selected.filter(id => id !== f.id)
                              : [...m.selected, f.id]
                          }));
                        }}
                        style={checkbox}
                      />{" "}
                      {f.name}
                    </label>
                  ))}
                </div>
                <div style={{ textAlign: "center", marginTop: 18 }}>
                  <button type="submit" style={editBtn}>Save</button>
                  <button type="button" style={deleteBtn} onClick={() => setFeatureAssignModal({ open: false, service: null, selected: [] })}>Cancel</button>
                </div>
              </form>
            </div>
          </div>, document.body
        )}

        {/* --- Edit Service Name Modal --- */}
        {editServiceModal.open && createPortal(
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
            background: "rgba(0,0,20,0.18)", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <div style={{
              background: "#fff", borderRadius: 17, padding: "44px 40px", minWidth: 350,
              boxShadow: "0 4px 50px #7c4dff22"
            }}>
              <h3 style={{ color: "#7c4dff", fontWeight: 700, fontSize: 21, marginBottom: 17 }}>
                Edit Service Name
              </h3>
              <form onSubmit={e => { e.preventDefault(); handleEditServiceName(); }}>
                <input
                  type="text"
                  value={editServiceModal.name}
                  onChange={e => setEditServiceModal(m => ({ ...m, name: e.target.value }))}
                  style={inp}
                  required
                />
                <div style={{ textAlign: "center", marginTop: 18 }}>
                  <button type="submit" style={editBtn}>Save</button>
                  <button type="button" style={deleteBtn} onClick={() => setEditServiceModal({ open: false, service: null, name: "" })}>Cancel</button>
                </div>
              </form>
            </div>
          </div>, document.body
        )}

        {/* --- Features Modal --- */}
        {featureModal.open && createPortal(
          <FeatureModal
            featureModal={featureModal}
            setFeatureModal={setFeatureModal}
            allFeatures={allFeatures}
            onSave={handleFeatureSave}
            onDelete={handleFeatureDelete}
          />, document.body
        )}

        {budgetModal.open && createPortal(
  <div style={{
    position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
    background: "rgba(0,0,20,0.18)", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center"
  }}>
    <div style={{
      background: "#fff", borderRadius: 17, padding: "44px 40px", minWidth: 370,
      boxShadow: "0 4px 50px #7c4dff22", maxHeight: "90vh", overflowY: "auto"
    }}>
      <h3 style={{ color: "#7c4dff", fontWeight: 700, fontSize: 21, marginBottom: 17 }}>
        إدارة الميزانيات (تطوير الأنظمة)
      </h3>
      {budgetError && <div style={{ color: "red", marginBottom: 10 }}>{budgetError}</div>}
      <BudgetForm
        onSuccess={() => fetchBudgets()}
        section="تطوير الأنظمة"
      />
      <table style={{ width: "100%", marginTop: 18, borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f3f3fa" }}>
            <th style={th}>Label</th>
            <th style={th}>Min</th>
            <th style={th}>Max</th>
            <th style={th}>Edit</th>
            <th style={th}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map(b => (
            <BudgetRow
              key={b.id}
              budget={b}
              onUpdated={fetchBudgets}
            />
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: "center", marginTop: 18 }}>
        <button type="button" style={deleteBtn} onClick={() => setBudgetModal({ open: false })}>إغلاق</button>
      </div>
    </div>
  </div>, document.body
)}



      </div>
    </div>
  );
}

// ====== Feature Modal ======
function FeatureModal({ featureModal, setFeatureModal, allFeatures, onSave, onDelete }) {
  const [edit, setEdit] = useState(featureModal.feature || { name: "" });

  return createPortal(
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(0,0,20,0.18)", zIndex: 999999, display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#fff", borderRadius: 17, padding: "38px 32px", minWidth: 320,
        boxShadow: "0 4px 50px #7c4dff22", minHeight: 320
      }}>
        <h3 style={{ color: "#7c4dff", fontWeight: 700, fontSize: 20, marginBottom: 17, textAlign: "center" }}>
          Features Management
        </h3>
        <form onSubmit={e => { e.preventDefault(); onSave(edit); }}>
          <input
            type="text"
            required
            value={edit.name}
            onChange={e => setEdit({ ...edit, name: e.target.value })}
            placeholder="Feature name"
            style={inp}
          />
          <div style={{ textAlign: "center", margin: "18px 0 10px" }}>
            <button type="submit" style={editBtn}>
              {featureModal.mode === "add" ? "Add Feature" : "Save"}
            </button>
            {featureModal.mode === "edit" && (
              <button
                type="button"
                onClick={() => onDelete(edit.id)}
                style={{ ...deleteBtn, marginLeft: 12 }}
              >Delete</button>
            )}
            <button
              type="button"
              onClick={() => setFeatureModal({ open: false, mode: "add", feature: null })}
              style={{ ...deleteBtn, marginLeft: 12 }}
            >Cancel</button>
          </div>
        </form>
        <div style={{ marginTop: 18 }}>
          <div style={{ fontWeight: 700, color: "#7c4dff", marginBottom: 7 }}>All Features:</div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {allFeatures.map(f => (
              <li key={f.id} style={{
                background: "#f7f6ff", borderRadius: 8, padding: "7px 13px", marginBottom: 7,
                display: "flex", alignItems: "center", justifyContent: "space-between", fontWeight: 600, fontSize: 15
              }}>
                <span>{f.name}</span>
                <span>
                  <button
                    style={{ ...editBtn, padding: "3px 13px", fontSize: 14, marginRight: 6 }}
                    onClick={() => setFeatureModal({ open: true, mode: "edit", feature: f })}
                  >Edit</button>
                  <button
                    style={{ ...deleteBtn, padding: "3px 13px", fontSize: 14 }}
                    onClick={() => onDelete(f.id)}
                  >Delete</button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>,
    document.body
  );
}

function BudgetForm({ onSuccess, section }) {
  const [label, setLabel] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleAdd = async e => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await axios.post("/api/budgets", {
        label, section, min_price: min, max_price: max
      });
      setLabel(""); setMin(""); setMax("");
      onSuccess();
    } catch {
      setErr("فشل في إضافة الميزانية");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleAdd} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
      <input value={label} onChange={e => setLabel(e.target.value)} placeholder="اسم الميزانية" required style={inp} />
      <input value={min} onChange={e => setMin(e.target.value)} placeholder="الحد الأدنى" type="number" required style={inp} />
      <input value={max} onChange={e => setMax(e.target.value)} placeholder="الحد الأعلى" type="number" required style={inp} />
      <button type="submit" style={editBtn} disabled={loading}>إضافة</button>
      {err && <span style={{ color: "red", fontWeight: 700 }}>{err}</span>}
    </form>
  );
}

function BudgetRow({ budget, onUpdated }) {
  const [edit, setEdit] = useState(false);
  const [label, setLabel] = useState(budget.label);
  const [min, setMin] = useState(budget.min_price);
  const [max, setMax] = useState(budget.max_price);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await axios.put(`/api/budgets/${budget.id}`, {
      label, section: budget.section, min_price: min, max_price: max
    });
    setEdit(false);
    setLoading(false);
    onUpdated();
  };

  const handleDelete = async () => {
    if (!window.confirm("تأكيد حذف الميزانية؟")) return;
    setLoading(true);
    await axios.delete(`/api/budgets/${budget.id}`);
    setLoading(false);
    onUpdated();
  };

  return (
    <tr>
      <td style={td}>
        {edit
          ? <input value={label} onChange={e => setLabel(e.target.value)} style={inp} />
          : label}
      </td>
      <td style={td}>
        {edit
          ? <input value={min} onChange={e => setMin(e.target.value)} type="number" style={inp} />
          : min}
      </td>
      <td style={td}>
        {edit
          ? <input value={max} onChange={e => setMax(e.target.value)} type="number" style={inp} />
          : max}
      </td>
      <td style={td}>
        {edit
          ? <button style={editBtn} onClick={handleSave} disabled={loading}>حفظ</button>
          : <button style={editBtn} onClick={() => setEdit(true)}>تعديل</button>
        }
      </td>
      <td style={td}>
        <button style={deleteBtn} onClick={handleDelete} disabled={loading}>حذف</button>
      </td>
    </tr>
  );
}

// ====== Styles ======
const th = { padding: "16px 8px", fontWeight: 700, color: "#6D28D9", textAlign: "left", background: "#f3f3fa", fontSize: 15.5 };
const td = { padding: "15px 8px", background: "#fff", fontWeight: 500, color: "#232347", verticalAlign: "middle", fontSize: 15, borderBottom: "1px solid #f0f0f4" };
const inp = { width: "100%", padding: "10px 14px", borderRadius: 9, border: "1px solid #ece8fa", marginBottom: 6, fontWeight: 600, fontSize: 15, outline: "none", background: "#f7f8fe" };
const editBtn = { background: "#6D28D9", color: "#fff", border: "none", borderRadius: 8, padding: "6px 18px", fontWeight: 700, cursor: "pointer", marginRight: 8, boxShadow: "0 2px 8px #6d28d922" };
const deleteBtn = { background: "#fff", color: "#ff4d6d", border: "1px solid #ffd6dd", borderRadius: 8, padding: "6px 18px", fontWeight: 700, cursor: "pointer" };
const addBtn = { background: "linear-gradient(90deg,#6366f1,#6d28d9)", color: "#fff", fontWeight: 700, padding: "8px 32px", border: "none", borderRadius: 11, fontSize: 16, cursor: "pointer", boxShadow: "0 2px 16px #6d28d922" };
const featureLbl = {
  display: "block",
  marginBottom: 12,
  fontWeight: 600,
  fontSize: 15.5,
  background: "#fff",
  borderRadius: 7,
  padding: "7px 12px 7px 8px",
  border: "1px solid #ece8fa",
  boxShadow: "0 1px 4px #6d28d911",
  cursor: "pointer",
  transition: "background 0.2s, border 0.2s"
};
const checkbox = {
  accentColor: "#6D28D9",
  marginRight: 7,
  width: 17,
  height: 17,
  verticalAlign: "middle"
};
