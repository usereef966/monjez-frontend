import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import axios from "axios";

export default function AdminSeoGoals() {
  const [goals, setGoals] = useState([]);
  const [features, setFeatures] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [modal, setModal] = useState({ open: false, mode: "add", goal: null });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [showBudgetsModal, setShowBudgetsModal] = useState(false);
  const [showFeaturesModal, setShowFeaturesModal] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // أضف هذا السطر في أعلى AdminSeoGoals
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null, name: "" }); // جديد

  // Fetch features
  useEffect(() => {
    axios.get('/api/seo-features').then(res => setFeatures(res.data));
  }, []);

  // Fetch budgets
  const fetchBudgets = async () => {
    try {
      const { data } = await axios.get('/api/budgets/SEO & تسويق رقمي');
      setBudgets(data);
    } catch {
      setError("فشل في جلب الميزانيات");
    }
  };
  useEffect(() => { fetchBudgets(); }, []);

  // Fetch goals
  useEffect(() => {
    const fetchGoals = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await axios.get('/api/seo-goals');
        setGoals(data);
      } catch (err) {
        setError('فشل في جلب خطط الـ SEO');
      } finally {
        setLoading(false);
      }
    };
    fetchGoals();
  }, [refresh]);

  // CRUD handlers
  const handleAdd = () => {
    setModal({
      open: true,
      mode: "add",
      goal: { name: "", description: "", budget_id: "", unit: "", duration: "", features: [], is_popular: 0, link: "" }
    });
  };

  const handleEdit = (goal) => {
    setModal({
      open: true,
      mode: "edit",
      goal: {
        ...goal,
        features: Array.isArray(goal.features) ? goal.features.map(f => f.id) : [],
        budget_id: goal.budget?.id || goal.budget_id || ""
      }
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/seo-goals/${id}`);
      setRefresh(r => r + 1);
    } catch {
      setError('فشل في حذف خطة الـ SEO');
    } finally {
      setModal({ open: false, mode: "add", goal: null });
    }
  };

  const handleSave = async (form) => {
    try {
      const payload = {
        name: form.name,
        description: form.description,
        budget_id: form.budget_id,
        unit: form.unit,
        duration: form.duration,
        is_popular: form.is_popular ? 1 : 0,
        link: form.link,
        features: form.features
      };
      if (modal.mode === 'add') {
        await axios.post('/api/seo-goals', payload);
      } else {
        await axios.put(`/api/seo-goals/${form.id}`, payload);
      }
      setRefresh(r => r + 1);
      setModal({ open: false, mode: "add", goal: null });
    } catch {
      setError('فشل في حفظ التغييرات');
    }
  };

  // Filtered list
  const filtered = goals.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    (g.budget?.label || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ position: "relative", zIndex: 800 }}>
      <div style={{ padding: "44px 0 64px" }}>
        <div style={{ maxWidth: 1500, margin: "0 auto", background: "#fff", borderRadius: 22, boxShadow: "0 4px 32px #6D28D911", padding: 32 }}>
          <h2 style={{ color: "#6D28D9", fontWeight: 800, fontSize: 28, marginBottom: 18 }}>
            SEO Goals Management
          </h2>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <input
              type="text"
              placeholder="Search by goal or budget..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: 220, height: 36, borderRadius: 12, border: "1px solid #e0e7ff", padding: "0 14px", fontSize: 15, background: "#f6f7fb", color: "#2D2D2D" }}
            />
            <div>
              <button
                onClick={() => setShowBudgetsModal(true)}
                style={{
                  background: "linear-gradient(90deg,#21c692,#7c4dff)",
                  color: "#fff",
                  fontWeight: 700,
                  padding: "8px 24px",
                  border: "none",
                  borderRadius: 11,
                  fontSize: 16,
                  cursor: "pointer",
                  marginRight: 10,
                  boxShadow: "0 2px 16px #21c69222"
                }}
              >
                Edit Budgets
              </button>
              <button
                onClick={() => setShowFeaturesModal(true)}
                style={{
                  background: "linear-gradient(90deg,#21c692,#7c4dff)",
                  color: "#fff",
                  fontWeight: 700,
                  padding: "8px 24px",
                  border: "none",
                  borderRadius: 11,
                  fontSize: 16,
                  cursor: "pointer",
                  marginRight: 10,
                  boxShadow: "0 2px 16px #21c69222"
                }}
              >
                Seo Features
              </button>
              <button onClick={handleAdd} style={{ background: "linear-gradient(90deg,#6366f1,#6d28d9)", color: "#fff", fontWeight: 700, padding: "8px 32px", border: "none", borderRadius: 11, fontSize: 16, cursor: "pointer", boxShadow: "0 2px 16px #6d28d922" }}>
                + Add SEO Goal
              </button>
              
            </div>
            
            
          </div>

          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          {!loading && !error && (
            <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", fontSize: 15, borderRadius: 13, overflow: "hidden" }}>
              <thead>
                <tr style={{ background: "#f3f3fa" }}>
                  <th style={th}>ID</th>
                  <th style={th}>Name</th>
                  <th style={th}>Budget</th>
                  <th style={th}>Unit</th>
                  <th style={th}>Duration</th>
                  <th style={th}>Features</th>
                  <th style={th}>Link</th>
                  <th style={th}>Popular?</th>
                  <th style={th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length ? filtered.map(goal => (
                  <tr key={goal.id} style={{ borderBottom: "1px solid #f0f0f4" }}>
                    <td style={td}>{goal.id}</td>
                    <td style={td}>{goal.name}</td>
                    <td style={td}>{goal.budget?.label || <span style={{ color: "#bbb" }}>—</span>}</td>
                    <td style={td}>{goal.unit}</td>
                    <td style={td}>{goal.duration || <span style={{ color: "#bbb" }}>—</span>}</td>
                    <td style={td}>
                      {Array.isArray(goal.features) && goal.features.length
                        ? goal.features.map(f => f.name).join(", ")
                        : <span style={{ color: "#bbb" }}>No features</span>}
                    </td>
                    <td style={td}>
                      {goal.link
                        ? <a href={goal.link} target="_blank" rel="noopener noreferrer" style={{ color: "#6D28D9", fontWeight: 700 }}>Link</a>
                        : <span style={{ color: "#bbb" }}>—</span>}
                    </td>
                    <td style={td}>{goal.is_popular ? "⭐" : <span style={{ color: "#bbb" }}>—</span>}</td>
                    <td style={{ ...td, minWidth: 120 }}>
                      <button onClick={() => handleEdit(goal)} style={editBtn}>Edit</button>
                      <button
                        onClick={() => setDeleteModal({ open: true, id: goal.id, name: goal.name })}
                        style={deleteBtn}
                      >Delete</button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={9} style={{ color: "#b3b3cb", textAlign: "center", padding: 38 }}>No SEO goals found.</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {modal.open && createPortal(
          <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,20,0.16)", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ background: "#fff", borderRadius: 17, padding: "44px 40px", minWidth: 340, boxShadow: "0 4px 50px #6D28D922" }}>
              <h3 style={{ color: "#6D28D9", fontWeight: 700, fontSize: 21, marginBottom: 17 }}>
                {modal.mode === 'add' ? 'Add SEO Goal' : 'Edit SEO Goal'}
              </h3>
              <EditGoalForm
                goal={modal.goal}
                features={features}
                budgets={budgets}
                onSave={handleSave}
                onCancel={() => setModal({ open: false, mode: 'add', goal: null })}
              />
            </div>
          </div>, document.body
        )}

        {showBudgetsModal && createPortal(
          <BudgetsModal
            budgets={budgets}
            setBudgets={setBudgets}
            onClose={() => { setShowBudgetsModal(false); fetchBudgets(); }}
          />,
          document.body
        )}
        {showFeaturesModal && createPortal(
          <FeaturesModal
            onClose={() => setShowFeaturesModal(false)}
          />,
          document.body
        )}

        {deleteModal.open && createPortal(
          <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,20,0.16)", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ background: "#fff", borderRadius: 17, padding: "24px 32px", minWidth: 300, boxShadow: "0 4px 50px #6D28D922", textAlign: "center" }}>
              <h3 style={{ color: "#6D28D9", fontWeight: 700, fontSize: 19, marginBottom: 16 }}>
                Confirm delete
              </h3>
              <p style={{ color: "#333", marginBottom: 24, fontSize: 15 }}>
                Are you sure you want to delete <strong style={{ color: "#6D28D9" }}>{deleteModal.name}</strong>?
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
                <button
                  onClick={async () => {
                    try {
                      await axios.delete(`/api/seo-goals/${deleteModal.id}`);
                      setRefresh(r => r + 1);
                    } catch {
                      setError('Failed to delete SEO goal');
                    } finally {
                      setDeleteModal({ open: false, id: null, name: "" });
                    }
                  }}
                  style={{
                    background: "#ff4d6d",
                    color: "#fff",
                    fontWeight: 700,
                    padding: "10px 24px",
                    border: "none",
                    borderRadius: 8,
                    fontSize: 16,
                    cursor: "pointer",
                    boxShadow: "0 2px 16px rgba(255, 77, 109, 0.3)"
                  }}
                >
                  Confirm delete
                </button>
                <button
                  onClick={() => setDeleteModal({ open: false, id: null, name: "" })}
                  style={{
                    background: "#f0f0f4",
                    color: "#333",
                    fontWeight: 600,
                    padding: "10px 24px",
                    border: "none",
                    borderRadius: 8,
                    fontSize: 16,
                    cursor: "pointer",
                    boxShadow: "0 2px 16px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>, document.body
        )}
      </div>
    </div>
  );
}

function EditGoalForm({ goal, features, budgets, onSave, onCancel }) {
  const [edit, setEdit] = useState(goal);
  const [tab, setTab] = useState("name");

  useEffect(() => { setEdit(goal); }, [goal]);

  // حفظ حقل واحد فقط (للتعديل)
  const handleFieldSave = (field) => {
    onSave({ ...goal, [field]: edit[field] });
  };

  // حفظ الكل (للإضافة)
  const handleAddSave = (e) => {
    e.preventDefault();
    onSave(edit);
  };

  // إذا كان تعديل: Tabs، إذا إضافة: نموذج كامل
  if (goal && goal.id) {
    // وضع التعديل (Tabs)
    return (
      <div>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
          <button onClick={() => setTab("name")} style={tab === "name" ? tabActive : tabBtn}>Name</button>
          <button onClick={() => setTab("budget")} style={tab === "budget" ? tabActive : tabBtn}>Budget</button>
          <button onClick={() => setTab("unit")} style={tab === "unit" ? tabActive : tabBtn}>Unit</button>
          <button onClick={() => setTab("duration")} style={tab === "duration" ? tabActive : tabBtn}>Duration</button>
          <button onClick={() => setTab("description")} style={tab === "description" ? tabActive : tabBtn}>Description</button>
          <button onClick={() => setTab("link")} style={tab === "link" ? tabActive : tabBtn}>Link</button>
          <button onClick={() => setTab("is_popular")} style={tab === "is_popular" ? tabActive : tabBtn}>Is Popular?</button>
          <button onClick={() => setTab("features")} style={tab === "features" ? tabActive : tabBtn}>Features</button>
        </div>
        {/* كل Tab يعرض حقل واحد فقط */}
        {tab === "name" && (
          <form onSubmit={e => { e.preventDefault(); handleFieldSave("name"); }}>
            <label style={lbl}>Name</label>
            <input type="text" required value={edit.name} onChange={e => setEdit({ ...edit, name: e.target.value })} style={inp} />
            <button type="submit" style={editBtn}>Save</button>
          </form>
        )}
        {tab === "budget" && (
          <form onSubmit={e => { e.preventDefault(); handleFieldSave("budget_id"); }}>
            <label style={lbl}>Budget</label>
            <select
              required
              value={edit.budget_id}
              onChange={e => setEdit({ ...edit, budget_id: e.target.value })}
              style={inp}
            >
              <option value="">Select budget...</option>
              {budgets.map(b => (
                <option key={b.id} value={b.id}>
                  {b.label}
                  {b.min_price && b.max_price ? ` (${b.min_price} - ${b.max_price} SAR)` : ""}
                </option>
              ))}
            </select>
            <button type="submit" style={editBtn}>Save</button>
          </form>
        )}
        {tab === "unit" && (
          <form onSubmit={e => { e.preventDefault(); handleFieldSave("unit"); }}>
            <label style={lbl}>Unit</label>
            <input type="text" required value={edit.unit} onChange={e => setEdit({ ...edit, unit: e.target.value })} style={inp} />
            <button type="submit" style={editBtn}>Save</button>
          </form>
        )}
        {tab === "duration" && (
          <form onSubmit={e => { e.preventDefault(); handleFieldSave("duration"); }}>
            <label style={lbl}>Duration</label>
            <input type="text" value={edit.duration || ""} onChange={e => setEdit({ ...edit, duration: e.target.value })} style={inp} />
            <button type="submit" style={editBtn}>Save</button>
          </form>
        )}
        {tab === "description" && (
          <form onSubmit={e => { e.preventDefault(); handleFieldSave("description"); }}>
            <label style={lbl}>Description</label>
            <textarea value={edit.description || ""} onChange={e => setEdit({ ...edit, description: e.target.value })} style={{ ...inp, minHeight: 60 }} />
            <button type="submit" style={editBtn}>Save</button>
          </form>
        )}
        {tab === "link" && (
          <form onSubmit={e => { e.preventDefault(); handleFieldSave("link"); }}>
            <label style={lbl}>Link (optional)</label>
            <input type="text" value={edit.link || ""} onChange={e => setEdit({ ...edit, link: e.target.value })} style={inp} />
            <button type="submit" style={editBtn}>Save</button>
          </form>
        )}
        {tab === "is_popular" && (
          <form onSubmit={e => { e.preventDefault(); handleFieldSave("is_popular"); }}>
            <label style={lbl}>Popular?</label>
            <input
              type="checkbox"
              checked={!!edit.is_popular}
              onChange={e => setEdit({ ...edit, is_popular: edit.is_popular ? 0 : 1 })}
              style={{ marginLeft: 8, accentColor: "#7c3aed", width: 18, height: 18, borderRadius: 5 }}
            /> <span style={{ fontWeight: 600, color: "#6D28D9" }}>⭐</span>
            <button type="submit" style={editBtn}>Save</button>
          </form>
        )}
        {tab === "features" && (
          <form onSubmit={e => { e.preventDefault(); handleFieldSave("features"); }}>
            <label style={lbl}>Features</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
              {features.map(f => (
                <label key={f.id} style={{ display: "flex", alignItems: "center", gap: 7, fontWeight: 600, color: "#4b4f60" }}>
                  <input
                    type="checkbox"
                    checked={edit.features && edit.features.includes(f.id)}
                    onChange={e => {
                      if (e.target.checked) {
                        setEdit(prev => ({ ...prev, features: [...(prev.features || []), f.id] }));
                      } else {
                        setEdit(prev => ({ ...prev, features: (prev.features || []).filter(id => id !== f.id) }));
                      }
                    }}
                    style={{ accentColor: "#7c3aed", width: 18, height: 18, borderRadius: 5, marginLeft: 7 }}
                  />
                  {f.name}
                </label>
              ))}
            </div>
            <button type="submit" style={editBtn}>Save</button>
          </form>
        )}
          <div style={{ marginTop: 24 }}>
            <button type="button" onClick={onCancel} style={{ ...deleteBtn, padding: "10px 28px", marginLeft: 10, fontSize: 16 }}>Cancel</button>
          </div>
        </div>
      );
    } else {
      // وضع الإضافة (نموذج كامل)
      return (
        <form onSubmit={handleAddSave}>
        <label style={lbl}>Name</label>
        <input type="text" required value={edit.name} onChange={e => setEdit({ ...edit, name: e.target.value })} style={inp} />

        <label style={lbl}>Budget</label>
        <select
          required
          value={edit.budget_id}
          onChange={e => setEdit({ ...edit, budget_id: e.target.value })}
          style={inp}
        >
          <option value="">Select budget...</option>
          {budgets.map(b => (
            <option key={b.id} value={b.id}>
              {b.label}
              {b.min_price && b.max_price ? ` (${b.min_price} - ${b.max_price} SAR)` : ""}
            </option>
          ))}
        </select>

        <label style={lbl}>Unit</label>
        <input type="text" required value={edit.unit} onChange={e => setEdit({ ...edit, unit: e.target.value })} style={inp} />

        <label style={lbl}>Duration</label>
        <input type="text" value={edit.duration || ""} onChange={e => setEdit({ ...edit, duration: e.target.value })} style={inp} />

        <label style={lbl}>Description</label>
        <textarea value={edit.description || ""} onChange={e => setEdit({ ...edit, description: e.target.value })} style={{ ...inp, minHeight: 60 }} />

        <label style={lbl}>Link (optional)</label>
        <input type="text" value={edit.link || ""} onChange={e => setEdit({ ...edit, link: e.target.value })} style={inp} />

        <label style={lbl}>Popular?</label>
        <input
          type="checkbox"
          checked={!!edit.is_popular}
          onChange={e => setEdit({ ...edit, is_popular: edit.is_popular ? 0 : 1 })}
          style={{ marginLeft: 8, accentColor: "#7c3aed", width: 18, height: 18, borderRadius: 5 }}
        /> <span style={{ fontWeight: 600, color: "#6D28D9" }}>⭐</span>

        <label style={lbl}>Features</label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
          {features.map(f => (
            <label key={f.id} style={{ display: "flex", alignItems: "center", gap: 7, fontWeight: 600, color: "#4b4f60" }}>
              <input
                type="checkbox"
                checked={edit.features && edit.features.includes(f.id)}
                onChange={e => {
                  if (e.target.checked) {
                    setEdit(prev => ({ ...prev, features: [...(prev.features || []), f.id] }));
                  } else {
                    setEdit(prev => ({ ...prev, features: (prev.features || []).filter(id => id !== f.id) }));
                  }
                }}
                style={{ accentColor: "#7c3aed", width: 18, height: 18, borderRadius: 5, marginLeft: 7 }}
              />
              {f.name}
            </label>
          ))}
        </div>

        <div style={{ marginTop: 24 }}>
          <button type="submit" style={editBtn}>Add</button>
          <button type="button" onClick={onCancel} style={{ ...deleteBtn, padding: "10px 28px", marginLeft: 10, fontSize: 16 }}>Cancel</button>
        </div>
      </form>
    );
  }
}

// Budgets Modal
function BudgetsModal({ budgets, setBudgets, onClose }) {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [newBudget, setNewBudget] = useState({ label: "", min_price: "", max_price: "" });
  const [error, setError] = useState("");
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null, name: "" });


  const fetchBudgets = async () => {
    try {
      const { data } = await axios.get('/api/budgets/SEO & تسويق رقمي');
      setBudgets(data);
    } catch {
      setError("Failed to fetch budgets");
    }
  };

  const handleEdit = (budget) => {
    setEditId(budget.id);
    setEditData({ ...budget });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = async () => {
    try {
      await axios.put(`/api/budgets/${editId}`, editData);
      setEditId(null);
      fetchBudgets();
    } catch {
      setError("Failed to update budget");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/budgets/${id}`);
      setConfirmDeleteId(null);
      fetchBudgets();
    } catch {
      setError("Failed to delete budget");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/budgets', { ...newBudget, section: "SEO & تسويق رقمي" });
      setNewBudget({ label: "", min_price: "", max_price: "" });
      fetchBudgets();
    } catch {
      setError("Failed to add budget");
    }
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(0,0,20,0.16)", zIndex: 99999,
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#fff", borderRadius: 17, padding: "38px 32px", minWidth: 340,
        boxShadow: "0 4px 50px #6D28D922", maxWidth: 500
      }}>
        <h3 style={{ color: "#6D28D9", fontWeight: 700, fontSize: 21, marginBottom: 17 }}>
          Budgets Management
        </h3>
        {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 18 }}>
          <thead>
            <tr style={{ background: "#f3f3fa" }}>
              <th style={th}>ID</th>
              <th style={th}>Label</th>
              <th style={th}>Min Price</th>
              <th style={th}>Max Price</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map(budget =>
              editId === budget.id ? (
                <tr key={budget.id}>
                  <td style={td}>{budget.id}</td>
                  <td style={td}><input name="label" value={editData.label} onChange={handleEditChange} style={inp} /></td>
                  <td style={td}><input name="min_price" value={editData.min_price} onChange={handleEditChange} style={inp} /></td>
                  <td style={td}><input name="max_price" value={editData.max_price} onChange={handleEditChange} style={inp} /></td>
                  <td style={td}>
                    <button onClick={handleEditSave} style={editBtn}>Save</button>
                    <button onClick={() => setEditId(null)} style={deleteBtn}>Cancel</button>
                  </td>
                </tr>
              ) : (
                <tr key={budget.id}>
                  <td style={td}>{budget.id}</td>
                  <td style={td}>{budget.label}</td>
                  <td style={td}>{budget.min_price}</td>
                  <td style={td}>{budget.max_price}</td>
                  <td style={td}>
                    <button onClick={() => handleEdit(budget)} style={editBtn}>Edit</button>
                    {confirmDeleteId === budget.id ? (
                      <span>
                        <span style={{ color: "#ff4d6d", fontWeight: 700, marginRight: 8 }}>تأكيد؟</span>
                        <button
                          onClick={() => handleDelete(budget.id)}
                          style={{ ...deleteBtn, background: "#ff4d6d", color: "#fff", marginRight: 6 }}
                        >نعم</button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          style={{ ...deleteBtn, marginRight: 0 }}
                        >إلغاء</button>
                      </span>
                    ) : (
                      <button
                        onClick={() => setConfirmDeleteId(budget.id)}
                        style={deleteBtn}
                      >Delete</button>
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <form onSubmit={handleAdd} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 18 }}>
          <input
            placeholder="Label"
            value={newBudget.label}
            name="label"
            onChange={e => setNewBudget({ ...newBudget, label: e.target.value })}
            style={inp}
            required
          />
          <input
            placeholder="Min Price"
            value={newBudget.min_price}
            name="min_price"
            onChange={e => setNewBudget({ ...newBudget, min_price: e.target.value })}
            style={inp}
          />
          <input
            placeholder="Max Price"
            value={newBudget.max_price}
            name="max_price"
            onChange={e => setNewBudget({ ...newBudget, max_price: e.target.value })}
            style={inp}
          />
          <button type="submit" style={editBtn}>Add</button>
        </form>
        <button onClick={onClose} style={{ ...deleteBtn, padding: "8px 28px", fontSize: 16, marginTop: 8 }}>Close</button>
      </div>
    </div>
  );
}

// Features Modal
function FeaturesModal({ onClose }) {
  const [features, setFeatures] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // جديد


  // جلب الميزات
  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      const { data } = await axios.get('/api/seo-features');
      setFeatures(data);
    } catch {
      setError("فشل في جلب المميزات");
    }
  };

  const handleEdit = (feature) => {
    setEditId(feature.id);
    setEditName(feature.name);
  };

  const handleEditSave = async () => {
    try {
      await axios.put(`/api/seo-features/${editId}`, { name: editName });
      setEditId(null);
      setEditName("");
      fetchFeatures();
    } catch {
      setError("فشل في التعديل");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/seo-features/${id}`);
      setConfirmDeleteId(null);
      fetchFeatures();
    } catch {
      setError("فشل في الحذف");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/seo-features', { name: newName });
      setNewName("");
      fetchFeatures();
    } catch {
      setError("فشل في الإضافة");
    }
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(0,0,20,0.16)", zIndex: 99999,
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#fff", borderRadius: 17, padding: "38px 32px", minWidth: 340,
        boxShadow: "0 4px 50px #6D28D922", maxWidth: 400
      }}>
        <h3 style={{ color: "#6D28D9", fontWeight: 700, fontSize: 21, marginBottom: 17 }}>
          إدارة المميزات
        </h3>
        {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 18 }}>
          <thead>
            <tr style={{ background: "#f3f3fa" }}>
              <th style={th}>ID</th>
              <th style={th}>Name</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {features.map(feature =>
              editId === feature.id ? (
                <tr key={feature.id}>
                  <td style={td}>{feature.id}</td>
                  <td style={td}>
                    <input value={editName} onChange={e => setEditName(e.target.value)} style={inp} />
                  </td>
                  <td style={td}>
                    <button onClick={handleEditSave} style={editBtn}>Save</button>
                    <button onClick={() => setEditId(null)} style={deleteBtn}>Cancel</button>
                  </td>
                </tr>
              ) : (
                <tr key={feature.id}>
                  <td style={td}>{feature.id}</td>
                  <td style={td}>{feature.name}</td>
                  <td style={td}>
                    <button onClick={() => handleEdit(feature)} style={editBtn}>Edit</button>
                    {confirmDeleteId === feature.id ? (
                      <span>
                        <span style={{ color: "#ff4d6d", fontWeight: 700, marginRight: 8 }}>تأكيد؟</span>
                        <button
                          onClick={() => handleDelete(feature.id)}
                          style={{ ...deleteBtn, background: "#ff4d6d", color: "#fff", marginRight: 6 }}
                        >نعم</button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          style={{ ...deleteBtn, marginRight: 0 }}
                        >إلغاء</button>
                      </span>
                    ) : (
                      <button
                        onClick={() => setConfirmDeleteId(feature.id)}
                        style={deleteBtn}
                      >Delete</button>
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <form onSubmit={handleAdd} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 18 }}>
          <input
            placeholder="اسم الميزة"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            style={inp}
            required
          />
          <button type="submit" style={editBtn}>إضافة</button>
        </form>
        <button onClick={onClose} style={{ ...deleteBtn, padding: "8px 28px", fontSize: 16, marginTop: 8 }}>إغلاق</button>
      </div>
    </div>
  );
}

// Styles
const th = { padding: "16px 8px", fontWeight: 700, color: "#6D28D9", textAlign: "left", background: "#f3f3fa", fontSize: 15.5 };
const td = { padding: "15px 8px", background: "#fff", fontWeight: 500, color: "#232347", verticalAlign: "middle", fontSize: 15, borderBottom: "1px solid #f0f0f4" };
const lbl = { display: "block", fontWeight: 700, color: "#4b4f60", marginBottom: 7, fontSize: 15, marginTop: 13 };
const inp = { width: "100%", padding: "10px 14px", borderRadius: 9, border: "1px solid #ece8fa", marginBottom: 6, fontWeight: 600, fontSize: 15, outline: "none", background: "#f7f8fe" };
const editBtn = { background: "#6D28D9", color: "#fff", border: "none", borderRadius: 8, padding: "6px 18px", fontWeight: 700, cursor: "pointer", marginRight: 8, boxShadow: "0 2px 8px #6d28d922" };
const deleteBtn = { background: "#fff", color: "#ff4d6d", border: "1px solid #ffd6dd", borderRadius: 8, padding: "6px 18px", fontWeight: 700, cursor: "pointer" };
const tabBtn = { background: "#f7f7fd", color: "#6D28D9", border: "1.5px solid #e0e7ff", borderRadius: 8, padding: "7px 13px", fontWeight: 700, cursor: "pointer", fontSize: 15.5 };
const tabActive = { ...tabBtn, background: "linear-gradient(90deg,#6366f1,#6d28d9)", color: "#fff", border: "none" };