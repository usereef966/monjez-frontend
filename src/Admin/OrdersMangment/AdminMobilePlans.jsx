// src/components/AdminMobilePlans.jsx
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import axios from "axios";

export default function AdminMobilePlans() {
  const [tab, setTab] = useState("android");
  const [androidPlans, setAndroidPlans] = useState([]);
  const [iosPlans, setIosPlans] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [modal, setModal] = useState({ open: false, mode: "add", plan: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [budgetModal, setBudgetModal] = useState({ open: false, mode: "add", budget: null });


  

  // جلب الخطط
  const fetchPlans = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`/api/mobile-plans?type=${tab}`);
      const mapped = res.data.map(plan => ({
        id: plan.id,
        name: plan.name,
        price: plan.price,
        unit: plan.unit,
        details: plan.details || "",
        budget_id: plan.budget_id || null // تأكد من وجود budget_id
      }));
      if (tab === "android") setAndroidPlans(mapped);
      else setIosPlans(mapped);
    } catch (err) {
      setError("فشل في جلب البيانات من السيرفر");
    } finally {
      setLoading(false);
    }
  };

  // جلب الميزانيات حسب القسم
  const fetchBudgets = async () => {
    try {
      const res = await axios.get(`/api/budgets?section=${tab}`);
      setBudgets(res.data);
    } catch {
      setBudgets([]);
    }
  };

  useEffect(() => {
    fetchPlans();
    fetchBudgets();
  }, [tab]);

  // فتح المودال للإضافة أو التعديل
  const handleAdd = () => {
    setModal({
      open: true,
      mode: "add",
      plan: { name: "", price: "", unit: "", details: "", budget_id: "" }
    });
  };
  const handleEdit = plan => {
    setModal({ open: true, mode: "edit", plan });
  };

  // حذف خطة
  const handleDelete = async id => {
    try {
      await axios.delete(`/api/mobile-plans/${id}`);
      fetchPlans();
    } catch {
      setError("فشل في حذف الخطة");
    } finally {
      setModal({ open: false, mode: "add", plan: null });
    }
  };

  // حفظ الإضافة أو التعديل
  const handleSave = async planData => {
    try {
      if (modal.mode === "add") {
 await axios.post("/api/mobile-plans", {
  name: planData.name,
  title: planData.name,
  description: planData.details || planData.name,
  price: planData.price,
  unit: planData.unit,
  details: planData.details,
  budget_id: Number(planData.budget_id) || null, // ✅ تأكد من هذا السطر
  type: tab,
  features: []
});
      } else {
await axios.put(`/api/mobile-plans/${planData.id}`, {
  name: planData.name,
  title: planData.name,
  description: planData.details || planData.name,
  price: planData.price,
  unit: planData.unit,
  details: planData.details,
  budget_id: Number(planData.budget_id) || null, // ✅ تأكد من هذا السطر
  type: tab,
  features: []
});
      }
      fetchPlans();
      setModal({ open: false, mode: "add", plan: null });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000); // تختفي بعد ثانيتين
    } catch (err) {
      setError("فشل في حفظ التغييرات");
    }
  };

  // حذف ميزانية
  const handleDeleteBudget = async id => {
    try {
      await axios.delete(`/api/budgets/${id}`);
      fetchBudgets();
    } catch {
      setError("فشل في حذف الميزانية");
    }
  };

  // حفظ الميزانية (إضافة أو تعديل)
  const handleSaveBudget = async budgetData => {
    try {
      if (budgetModal.mode === "add") {
        await axios.post("/api/budgets", {
          label: budgetData.label,
          section: tab
        });
      } else {
        await axios.put(`/api/budgets/${budgetData.id}`, {
          label: budgetData.label,
          section: tab
        });
      }
      fetchBudgets();
      setBudgetModal({ open: false, mode: "add", budget: null });
    } catch {
      setError("فشل في حفظ الميزانية");
    }
  };

  const plans = tab === "android" ? androidPlans : iosPlans;

  return (
    <div style={{ position: "relative", zIndex: 800 }}>
      <div style={{ padding: "44px 0 64px" }}>
        <div style={{
          maxWidth: 1500, margin: "0 auto", background: "#fff",
          borderRadius: 22, boxShadow: "0 4px 32px #6D28D911", padding: 32
        }}>
          <h2 style={{
            color: "#6D28D9", fontWeight: 800, fontSize: 26,
            letterSpacing: ".2px", marginBottom: 22
          }}>
            Mobile Plans Management
          </h2>
          {/* Tabs */}
          <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
            {["android", "ios"].map(type => (
              <button
                key={type}
                onClick={() => setTab(type)}
                style={{
                  background: tab === type ? (type === "android"
                    ? "#6D28D9" : "#6366f1")
                    : "#f3f3fa",
                  color: tab === type ? "#fff" : (type === "android"
                    ? "#6D28D9" : "#6366f1"),
                  fontWeight: 700, fontSize: 16, border: "none",
                  borderRadius: 11, padding: "8px 28px",
                  boxShadow: tab === type
                    ? `0 2px 16px ${type === "android"
                      ? "#6d28d922" : "#6366f199"}`
                    : "none",
                  cursor: "pointer"
                }}
              >
                {type === "android" ? "Android Plans" : "iOS Plans"}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", marginBottom: 18
          }}>
            <span style={{
              fontSize: 16, fontWeight: 600, color: "#8787a2"
            }}>
              {tab === "android" ? "Android" : "iOS"} plans: {plans.length}
            </span>
            <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={handleAdd}
              style={{
                background: "linear-gradient(90deg,#6366f1,#6d28d9)",
                color: "#fff", fontWeight: 700,
                padding: "8px 30px", border: "none",
                borderRadius: 11, fontSize: 16,
                cursor: "pointer",
                boxShadow: "0 2px 16px #6d28d922"
              }}
            >
              + Add {tab === "android" ? "Android" : "iOS"} Plan
            </button>
            <button
              onClick={() => setBudgetModal({ open: true, mode: "add", budget: { label: "" } })}
              style={{
                background: "#10b981",
                color: "#fff",
                fontWeight: 700,
                padding: "8px 30px",
                border: "none",
                borderRadius: 11,
                fontSize: 16,
                cursor: "pointer",
                marginLeft: 10,
                boxShadow: "0 2px 16px #10b98133"
              }}
            >
              + Manage Budgets
            </button>
            </div>
          </div>

          {/* Loading & Error */}
          {loading && <p>جاري التحميل...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && (
  <div style={{
    background: "#e6ffed",
    color: "#1a7f37",
    border: "1.5px solid #b7f5c5",
    borderRadius: 10,
    padding: "13px 22px",
    fontWeight: 700,
    fontSize: 17,
    marginBottom: 18,
    textAlign: "center"
  }}>
    ✅ تم الحفظ بنجاح!
  </div>
)}

          {/* Table */}
          {!loading && !error && (
            <table style={{
              width: "100%", borderCollapse: "collapse",
              background: "#fff", fontSize: 15,
              borderRadius: 13, overflow: "hidden"
            }}>
              <thead>
                <tr style={{ background: "#f3f3fa" }}>
                  <th style={th}>ID</th>
                  <th style={th}>Name</th>
                  <th style={th}>Price</th>
                  <th style={th}>Unit</th>
                  <th style={th}>Details</th>
                  <th style={th}>Budget</th>
                  <th style={th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans.length > 0 ? plans.map(plan => (
                  <tr key={plan.id} style={{ borderBottom: "1px solid #f0f0f4" }}>
                    <td style={td}>{plan.id}</td>
                    <td style={td}>{plan.name}</td>
                    <td style={td}>{plan.price}</td>
                    <td style={td}>{plan.unit}</td>
                    <td style={td}>{plan.details}</td>
 <td style={td}>
  {budgets.find(b => Number(b.id) === Number(plan.budget_id || plan.budget))?.label || <span style={{ color: "#bbb" }}>—</span>}
</td>
                    <td style={{ ...td, minWidth: 160 }}>
                      <button onClick={() => handleEdit(plan)} style={editBtn}>Edit</button>
                      <button onClick={() => handleDelete(plan.id)} style={deleteBtn}>Delete</button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} style={{
                      color: "#b3b3cb", textAlign: "center", padding: 38
                    }}>
                      No plans found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Modal */}
        {modal.open && createPortal(
          <div style={{
            position: "fixed", top: 0, left: 0,
            width: "100vw", height: "100vh",
            background: "rgba(0,0,20,0.16)",
            zIndex: 99999,
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <div style={{
              background: "#fff", borderRadius: 17,
              padding: "44px 40px", minWidth: 350,
              boxShadow: "0 4px 50px #6D28D922"
            }}>
              <h3 style={{
                color: "#6D28D9", fontWeight: 700,
                fontSize: 21, marginBottom: 17
              }}>
                {modal.mode === "add"
                  ? `Add ${tab === "android" ? "Android" : "iOS"} Plan`
                  : `Edit ${tab === "android" ? "Android" : "iOS"} Plan`}
              </h3>
              <EditPlanForm
                plan={modal.plan}
                budgets={budgets}
                onSave={handleSave}
                onCancel={() => setModal({ open: false, mode: "add", plan: null })}
              />
            </div>
          </div>,
          document.body
        )}

        {/* Budget Modal */}
        {budgetModal.open && createPortal(
  <div style={{
    position: "fixed", top: 0, left: 0,
    width: "100vw", height: "100vh",
    background: "rgba(0,0,20,0.16)",
    zIndex: 99999,
    display: "flex", alignItems: "center", justifyContent: "center"
  }}>
    <div style={{
      background: "#fff", borderRadius: 17,
      padding: "44px 40px", minWidth: 350,
      boxShadow: "0 4px 50px #10b98133"
    }}>
      <h3 style={{
        color: "#10b981", fontWeight: 700,
        fontSize: 21, marginBottom: 17
      }}>
        {budgetModal.mode === "add" ? "Add Budget" : "Edit Budget"}
      </h3>
      <form onSubmit={e => { e.preventDefault(); handleSaveBudget(budgetModal.budget); }}>
        <label style={lbl}>Budget Label</label>
        <input
          type="text" required
          value={budgetModal.budget.label}
          onChange={e => setBudgetModal({ ...budgetModal, budget: { ...budgetModal.budget, label: e.target.value } })}
          style={inp}
        />
        <div style={{ marginTop: 24 }}>
          <button type="submit" style={{ ...editBtn, background: "#10b981" }}>Save</button>
          <button type="button" onClick={() => setBudgetModal({ open: false, mode: "add", budget: null })} style={{ ...deleteBtn, marginLeft: 10 }}>Cancel</button>
        </div>
      </form>

      <div style={{ marginTop: 30 }}>
        <h4 style={{ color: "#10b981", marginBottom: 10 }}>Current Budgets:</h4>
        {budgets.map(b => (
          <div key={b.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span>{b.label}</span>
            <div>
              <button onClick={() => setBudgetModal({ open: true, mode: "edit", budget: b })} style={{ ...editBtn, padding: "4px 10px", fontSize: 13 }}>Edit</button>
              <button onClick={() => handleDeleteBudget(b.id)} style={{ ...deleteBtn, padding: "4px 10px", fontSize: 13 }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>,
  document.body
)}
      </div>
    </div>
  );
}

// فورم التعديل/الإضافة مع حقل الميزانية
function EditPlanForm({ plan, budgets, onSave, onCancel }) {
  const [edit, setEdit] = useState(plan);

  return (
    <form onSubmit={e => { e.preventDefault(); onSave(edit); }}>
      <label style={lbl}>Name</label>
      <input
        type="text" required
        value={edit.name}
        onChange={e => setEdit({ ...edit, name: e.target.value })}
        style={inp}
      />

      <label style={lbl}>Price</label>
      <input
        value={edit.price}
        onChange={e => setEdit({ ...edit, price: Number(e.target.value) })}
        style={inp}
      />

      <label style={lbl}>Unit</label>
      <input
        type="text" required
        value={edit.unit}
        onChange={e => setEdit({ ...edit, unit: e.target.value })}
        style={inp}
      />

      <label style={lbl}>Details</label>
      <input
        type="text"
        value={edit.details}
        onChange={e => setEdit({ ...edit, details: e.target.value })}
        style={inp}
      />

      <label style={lbl}>Budget</label>
<select
  value={edit.budget_id || ""}
  onChange={e => setEdit({ ...edit, budget_id: Number(e.target.value) })}
  style={inp}
  required
>
  <option value="">اختر الميزانية</option>
  {budgets.map(b => (
    <option key={b.id} value={b.id}>{b.label}</option>
  ))}
</select>

      <div style={{ marginTop: 24 }}>
        <button
          type="submit"
          style={{ ...editBtn, padding: "10px 28px", fontSize: 16, fontWeight: 700 }}
        >
          Save
        </button>
        <button
          type="button" onClick={onCancel}
          style={{ ...deleteBtn, padding: "10px 28px", marginLeft: 10, fontSize: 16 }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// ستايلات الجدول والفورم (unchanged)
const th   = { padding: "16px 8px", fontWeight: 700, color: "#6D28D9", textAlign: "left", background: "#f3f3fa", fontSize: 15.5 };
const td   = { padding: "15px 8px", background: "#fff", fontWeight: 500, color: "#232347", verticalAlign: "middle", fontSize: 15, borderBottom: "1px solid #f0f0f4" };
const lbl  = { display: "block", fontWeight: 700, color: "#4b4f60", marginBottom: 7, fontSize: 15, marginTop: 13 };
const inp  = { width: "100%", padding: "10px 14px", borderRadius: 9, border: "1px solid #ece8fa", marginBottom: 6, fontWeight: 600, fontSize: 15, outline: "none", background: "#f7f8fe" };
const editBtn   = { background: "#6D28D9", color: "#fff", border: "none", borderRadius: 8, padding: "6px 18px", fontWeight: 700, cursor: "pointer", marginRight: 8, boxShadow: "0 2px 8px #6d28d922" };
const deleteBtn = { background: "#fff", color: "#ff4d6d", border: "1px solid #ffd6dd", borderRadius: 8, padding: "6px 18px", fontWeight: 700, cursor: "pointer" };
