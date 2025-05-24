import React, { useState, useEffect } from "react";
import axios from "axios";
import { createPortal } from "react-dom";

export default function AdminPlans() {
  const [plans, setPlans] = useState([]);
  const [modal, setModal] = useState({ open: false, mode: "add", plan: null });
  const [search, setSearch] = useState("");
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    fetch("https://monjez-online.onrender.com/api/features")
      .then(res => res.json())
      .then(setFeatures);
  }, []);

  useEffect(() => {
    fetchPlans();
  }, []);

  async function fetchPlans() {
    const res = await axios.get('/api/plans');
    setPlans(res.data);
  }

  function handleEdit(plan) {
    // حول الميزات إلى مصفوفة أرقام فقط
    const featuresArr = Array.isArray(plan.features)
      ? plan.features.map(f => f.id)
      : [];
    setModal({ open: true, mode: "edit", plan: { ...plan, features: featuresArr } });
  }

  function handleAdd() {
    setModal({
      open: true,
      mode: "add",
      plan: { name: "", price: "", unit: "USD", is_best: false, features: [] }
    });
  }

  async function handleDelete(id) {
    await axios.delete(`/api/plans/${id}`);
    setPlans(plans => plans.filter(p => p.id !== id));
  }

  async function handleSave(updatedPlan) {
    if (modal.mode === "add") {
      const res = await axios.post('/api/plans', updatedPlan);
      setPlans([...plans, { ...updatedPlan, id: res.data.planId }]);
    } else {
      await axios.put(`/api/plans/${updatedPlan.id}`, updatedPlan);
      setPlans(plans.map(p => p.id === updatedPlan.id ? { ...updatedPlan } : p));
    }
    setModal({ open: false, mode: "add", plan: null });
  }

  const filteredPlans = plans.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    String(p.price).includes(search)
  );

  return (
    <div style={{ position: "relative", zIndex: 800 }}>
      <div style={{ padding: "44px 0 64px 0" }}>
        <div style={{
          maxWidth: 1500, margin: "0 auto", background: "#fff",
          borderRadius: 22, boxShadow: "0 4px 32px #6D28D911", padding: 32
        }}>
          <h2 style={{ color: "#6D28D9", fontWeight: 800, fontSize: 28, letterSpacing: ".2px", marginBottom: 18 }}>
            Plans Management
          </h2>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <input
              type="text"
              placeholder="Search plans by name or price..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: 260, height: 36, borderRadius: 12, border: "1px solid #e0e7ff",
                padding: "0 14px", fontSize: 15, background: "#f6f7fb", color: "#2D2D2D"
              }}
            />
            <button onClick={handleAdd} style={{
              background: "linear-gradient(90deg,#6366f1,#6d28d9)", color: "#fff", fontWeight: 700,
              padding: "8px 32px", border: "none", borderRadius: 11, fontSize: 16,
              cursor: "pointer", boxShadow: "0 2px 16px #6d28d922"
            }}>
              + Add Plan
            </button>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", fontSize: 15, borderRadius: 13, overflow: "hidden" }}>
            <thead>
              <tr style={{ background: "#f3f3fa" }}>
                <th style={th}>ID</th>
                <th style={th}>Name</th>
                <th style={th}>Price</th>
                <th style={th}>Unit</th>
                <th style={th}>Most Popular</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlans.map(plan => (
                <tr key={plan.id}>
                  <td style={td}>{plan.id}</td>
                  <td style={td}>{plan.name}</td>
                  <td style={td}>{plan.price}</td>
                  <td style={td}>{plan.unit}</td>
                  <td style={td}>{plan.is_best ? <span style={{ background: "#a78bfa", color: "#fff", padding: "4px 13px", borderRadius: 9, fontSize: 14, fontWeight: 600 }}>Popular</span> : ""}</td>
                  <td style={{ ...td, minWidth: 140 }}>
                    <button onClick={() => handleEdit(plan)} style={editBtn}>Edit</button>
                    <button onClick={() => handleDelete(plan.id)} style={deleteBtn}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {modal.open && createPortal(
          <div style={{
            position: "fixed",
            top: 0, left: 0, width: "100vw", height: "100vh",
            background: "rgba(60,40,120,0.18)",
            backdropFilter: "blur(4px)",
            zIndex: 99999,
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <div style={{
              background: "#fff",
              borderRadius: 22,
              padding: "44px 40px 32px 40px",
              minWidth: 390,
              maxWidth: "96vw",
              boxShadow: "0 8px 48px #6D28D944, 0 2px 16px #6D28D922",
              border: "2px solid #ede9fe",
              transition: "box-shadow 0.2s",
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch"
            }}>
              <h2 style={{
                color: "#6D28D9",
                fontWeight: 800,
                fontSize: 22,
                marginBottom: 18,
                letterSpacing: ".2px",
                textAlign: "center"
              }}>
                {modal.mode === "edit" ? "تعديل الخطة" : "إضافة خطة"}
              </h2>
              <EditPlanForm
                plan={modal.plan}
                features={features}
                onSave={handleSave}
                onCancel={() => setModal({ open: false, mode: "add", plan: null })}
              />
            </div>
          </div>,
          document.body
        )}
      </div>
    </div>
  );
}

// Rest of the component styles and EditPlanForm unchanged (for brevity)

const th = { padding: "16px 8px", fontWeight: 700, color: "#6D28D9", textAlign: "left", background: "#f3f3fa", fontSize: 15.5 };
const td = { padding: "15px 8px", background: "#fff", fontWeight: 500, color: "#232347", verticalAlign: "middle", fontSize: 15, borderBottom: "1px solid #f0f0f4" };
const editBtn = {
  background: "linear-gradient(90deg,#6366f1,#6d28d9)",
  color: "#fff",
  borderRadius: 10,
  padding: "10px 28px",
  fontSize: 16,
  fontWeight: 700,
  border: "none",
  cursor: "pointer",
  boxShadow: "0 2px 12px #6d28d922",
  transition: "background 0.18s"
};
const deleteBtn = {
  background: "#fff",
  color: "#ff4d6d",
  borderRadius: 10,
  padding: "10px 28px",
  fontSize: 16,
  border: "1.5px solid #ffe0e6",
  fontWeight: 700,
  cursor: "pointer",
  marginLeft: 10,
  transition: "background 0.18s, color 0.18s"
};

function EditPlanForm({ plan, features, onSave, onCancel }) {
  const [edit, setEdit] = useState(plan);

  useEffect(() => {
    setEdit(plan);
  }, [plan]);

  // استخدم uniqueFeatures بدلاً من features
  return (
    <form onSubmit={e => { e.preventDefault(); onSave(edit); }}>
      <label style={lbl}>Name</label>
      <input type="text" required value={edit.name}
        onChange={e => setEdit({ ...edit, name: e.target.value })} style={inp} />

      <label style={lbl}>Price</label>
      <input type="number" required value={edit.price}
        onChange={e => setEdit({ ...edit, price: Number(e.target.value) })} style={inp} />

      <label style={lbl}>Unit</label>
      <input type="text" required value={edit.unit}
        onChange={e => setEdit({ ...edit, unit: e.target.value })} style={inp} />

      <label style={lbl}>ميزات الخطة</label>
      <div
        style={{
          maxHeight: 200,
          overflow: "auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "7px 18px",
          direction: "rtl",
          marginBottom: 10,
          marginTop: 5,
          paddingRight: 6
        }}
      >
        {features.filter(
          (feat, idx, arr) => arr.findIndex(f => f.name === feat.name) === idx
        ).map(feature => (
          <label
            key={feature.id}
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 15.5,
              fontWeight: 600,
              color: "#4b4f60",
              cursor: "pointer",
              gap: 7,
              userSelect: "none"
            }}
          >
            <input
              type="checkbox"
              checked={edit.features && edit.features.includes(feature.id)}
              onChange={e => {
                if (e.target.checked) {
                  setEdit(prev => ({
                    ...prev,
                    features: [...(prev.features || []), feature.id]
                  }));
                } else {
                  setEdit(prev => ({
                    ...prev,
                    features: (prev.features || []).filter(f => f !== feature.id)
                  }));
                }
              }}
              style={{
                accentColor: "#7c3aed",
                width: 20,
                height: 20,
                borderRadius: 6,
                border: "2px solid #a78bfa",
                marginLeft: 7,
                cursor: "pointer",
                boxShadow: "0 1px 6px #a78bfa22"
              }}
            />
            {feature.name}
          </label>
        ))}
      </div>

      <div style={{ marginTop: 24 }}>
        <button type="submit" style={{ ...editBtn, padding: "10px 28px", fontSize: 16, fontWeight: 700 }}>Save</button>
        <button type="button" onClick={onCancel} style={{ ...deleteBtn, padding: "10px 28px", marginLeft: 10, fontSize: 16 }}>Cancel</button>
      </div>
    </form>
  );
}

// Styles for the form
const lbl = {
  display: "block",
  fontWeight: 700,
  color: "#4b4f60",
  marginBottom: 7,
  fontSize: 15,
  marginTop: 13
};
const inp = {
  width: "100%",
  padding: "13px 16px",
  borderRadius: 11,
  border: "1.5px solid #e0e7ff",
  marginBottom: 10,
  fontWeight: 600,
  fontSize: 16,
  outline: "none",
  background: "#f7f8fe",
  transition: "border 0.2s"
};
