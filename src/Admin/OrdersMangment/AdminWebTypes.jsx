// src/components/AdminWebTypes.jsx
import React, { useEffect, useState, useRef } from "react";
import icons from "../../assets/svg";
import axios from "axios";

export default function AdminWebTypes() {
  const [types, setTypes] = useState([]);
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    unit: "SAR",
    icon: "",
    features: [],
  });
  const [featuresModal, setFeaturesModal] = useState(false);
  const [featureName, setFeatureName] = useState("");
  const [featureEdit, setFeatureEdit] = useState(null);
  const modalRef = useRef();

  // جلب الأنواع والميزات
  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    setLoading(true);
    const [typesRes, featuresRes] = await Promise.all([
      axios.get("/api/site_types"),      // ✅ عدل هنا
      axios.get("/api/web-features"),    // ✅ وعدل هنا
    ]);
    setTypes(typesRes.data);
    setFeatures(featuresRes.data);
    setLoading(false);
  }

function openAddModal() {
  setEdit(null);
  setForm({
    name: "",
    description: "",
    price: "",
    unit: "SAR",
    icon: "",
    link: "",         
    image: "",         
    is_popular: false,
    features: getRandomFeaturesIds(features, 2) // ✅ رجّع هذا السطر
  });
  setModalOpen(true);
}

  function openEditModal(type) {
    setEdit(type);
    setForm({
      name: type.name || "",
      description: type.description || "",
      price: type.price || "",
      unit: type.unit || "SAR",
      icon: type.icon || "",
      link: type.link || "",
      image: type.image || "",
      is_popular: type.is_popular || false,
      // هنا الحل: تأكد أن features مصفوفة من الـ id
      features: Array.isArray(type.features)
        ? type.features.map(f => typeof f === "object" ? f.id : f)
        : [],
    });
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEdit(null);
  }

  // إضافة أو تعديل نوع موقع
  async function handleSubmit(e) {
    e.preventDefault();
    const data = { ...form, price: Number(form.price), features: form.features };
    if (edit) {
      await axios.put(`/api/site_types/${edit.id}`, data);
    } else {
      await axios.post("/api/site_types", data);
    }
    closeModal();
    await fetchAll(); // ← هنا بالضبط
  }

  // حذف نوع موقع
  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this site type?")) {
      await axios.delete(`/api/site_types/${id}`);
      await fetchAll(); // ← هنا أيضاً
    }
  }

  // تحديث حقول النموذج
  function updateForm(key, value) {
    setForm(f => ({ ...f, [key]: value }));
  }

  // تحديث الميزات (checkbox)
  function toggleFeature(id) {
    setForm(f => ({
      ...f,
      features: f.features.includes(id)
        ? f.features.filter(fid => fid !== id)
        : [...f.features, id],
    }));
  }

  // إغلاق المودال عند الضغط على ESC
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") {
        if (modalOpen) closeModal();
        if (featuresModal) setFeaturesModal(false);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [modalOpen, featuresModal]);

  return (
  <div style={{
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  paddingTop: 40
}}>
      <div style={{
        width: "90vw", // أعرض من السابق
        maxWidth: 1500, // أكبر من 1200
        background: "#fff",
        borderRadius: 28,
        boxShadow: "0 2px 24px #6d28d911",
        padding: "38px 32px 32px",
        margin: "0 auto",
        minHeight: 600
      }}>
        {/* أزرار أعلى الصفحة */}
        <div style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          gap: 12,
          marginBottom: 24
        }}>
          <button onClick={() => setFeaturesModal(true)} style={addBtn}>Features Management</button>
          <button onClick={openAddModal} style={addBtn}>+ Add Web Type</button>
        </div>

        {/* جدول الأنواع */}
        <div style={{ width: "100%", overflowX: "auto" }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#fff",
            borderRadius: 14,
            boxShadow: "0 2px 12px #6d28d911"
          }}>
            <thead>
              <tr>
                <th style={th}>ID</th>
                <th style={th}>Icon</th>
                <th style={th}>Name</th>
                <th style={th}>Description</th>
                <th style={th}>Price</th>
                <th style={th}>Unit</th>
                <th style={th}>Features</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center", padding: 40 }}>Loading...</td>
                </tr>
              ) : types.map(type => (
                <tr key={type.id}>
                  <td style={td}>{type.id}</td>
                  <td style={td}>
                    {type.icon && icons[type.icon] && (
                      <img src={icons[type.icon]} alt="" style={{ width: 32, height: 32, objectFit: "contain" }} />
                    )}
                  </td>
                  <td style={td}>{type.name}</td>
                  <td style={td}>{type.description}</td>
                  <td style={td}>{type.price}</td>
                  <td style={td}>{type.unit}</td>
                  <td style={td}>
                    <div style={{ whiteSpace: "pre-line", textAlign: "right" }}>
                      {(Array.isArray(type.features) ? type.features : []).map(f => f.name).join(", ")}
                    </div>
                  </td>
                  <td style={td}>
                    <button onClick={() => openEditModal(type)} style={editBtn}>Edit</button>
                    <button onClick={() => handleDelete(type.id)} style={deleteBtn}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* مودال إضافة/تعديل */}
        {modalOpen && (
          <div style={modalOverlay} onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
            <div ref={modalRef} style={modalBox}>
              <form onSubmit={handleSubmit}>
                <h3 style={{
                  color: "#6D28D9",
                  fontWeight: 900,
                  marginBottom: 18,
                  textAlign: "center"
                }}>
                  {edit ? "Edit Web Type" : "Add Web Type"}
                </h3>
                <div style={{ display: "flex", gap: 24 }}>
                  <div style={{ flex: 1 }}>
                    <label style={lbl}>اسم النوع (بالعربية)</label>
                    <input style={inp} required value={form.name}
                      onChange={e => updateForm("name", e.target.value)} placeholder="مثال: متجر إلكتروني" />

                    <label style={lbl}>الوصف</label>
                    <input style={inp} value={form.description}
                      onChange={e => updateForm("description", e.target.value)} placeholder="Description..." />

                    <label style={lbl}>السعر</label>
                    <input style={inp} type="number" required value={form.price}
                      onChange={e => updateForm("price", e.target.value)} placeholder="Price..." />

                    <label style={lbl}>الوحدة</label>
                    <input style={inp} value={form.unit}
                      onChange={e => updateForm("unit", e.target.value)} placeholder="SAR" />

                    <label style={lbl}>اسم ملف الأيقونة (مثال: store.svg)</label>
                    <input style={inp} value={form.icon}
                      onChange={e => updateForm("icon", e.target.value)} placeholder="store.svg" />
                    {form.icon && icons[form.icon] && (
                      <img src={icons[form.icon]} alt="" style={{ width: 38, margin: "8px 0" }} />
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={lbl}>Features</label>
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 8,
                      background: "#fff",
                      borderRadius: 10,
                      padding: 10,
                      marginBottom: 16
                    }}>
                      {features.map(f => (
                        <label key={f.id} style={{
                          fontSize: 15,
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                          gap: 7
                        }}>
                          <input
                            type="checkbox"
                            checked={form.features.includes(f.id)}
                            onChange={() => toggleFeature(f.id)}
                            style={{ accentColor: "#6D28D9", width: 18, height: 18 }}
                          />
                          {f.name}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 22, display: "flex", gap: 12, justifyContent: "center" }}>
                  <button type="submit" style={editBtn}>
                    {edit ? "Save Changes" : "Add"}
                  </button>
                  <button type="button" onClick={closeModal} style={deleteBtn}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* مودال إدارة الميزات */}
        {featuresModal && (
          <div style={modalOverlay} onClick={e => { if (e.target === e.currentTarget) setFeaturesModal(false); }}>
            <div ref={modalRef} style={modalBox}>
              <h3 style={{
                color: "#6D28D9",
                fontWeight: 900,
                marginBottom: 18,
                textAlign: "center"
              }}>Features Management</h3>
              <form onSubmit={async e => {
                e.preventDefault();
                if (featureEdit) {
                  await axios.put(`/api/web-features/${featureEdit.id}`, { name: featureName }); // ✅ عدل هنا
                } else {
                  await axios.post("/api/web-features", { name: featureName });                  // ✅ وعدل هنا
                }
                setFeatureName("");
                setFeatureEdit(null);
                await fetchAll(); // ← هنا
              }}>
                <input
                  style={inp}
                  value={featureName}
                  onChange={e => setFeatureName(e.target.value)}
                  placeholder="Feature name..."
                />
                <button type="submit" style={editBtn}>{featureEdit ? "Save" : "Add"}</button>
                {featureEdit && (
                  <button type="button" onClick={() => { setFeatureEdit(null); setFeatureName(""); }} style={deleteBtn}>Cancel</button>
                )}
              </form>
              <div style={{ marginTop: 18, maxHeight: 220, overflowY: "auto" }}>
                {features.map(f => (
                  <div key={f.id} style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 6
                  }}>
                    <span>{f.name}</span>
                    <div>
                      <button onClick={() => { setFeatureEdit(f); setFeatureName(f.name); }} style={editBtn}>Edit</button>
                      <button onClick={async () => {
                        if (window.confirm("Delete this feature?")) {
                          await axios.delete(`/api/web-features/${f.id}`); // ✅ عدل هنا
                          await fetchAll(); // ← هنا
                        }
                      }} style={deleteBtn}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => setFeaturesModal(false)} style={{ ...deleteBtn, marginTop: 18, width: "100%" }}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// أنماط الأزرار والخانات
const th = {
  padding: "14px 8px",
  fontWeight: 900,
  color: "#6D28D9",
  textAlign: "center",
  background: "#f3f3fa",
  fontSize: 15.5,
};
const td = {
  padding: "13px 8px",
  background: "#fff",
  fontWeight: 600,
  color: "#232347",
  verticalAlign: "middle",
  fontSize: 15,
  borderBottom: "1px solid #f0f0f4",
  textAlign: "center",
};
const lbl = {
  display: "block",
  fontWeight: 900,
  color: "#4b4f60",
  marginBottom: 7,
  fontSize: 15,
  marginTop: 13,
};
const inp = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: 9,
  border: "1px solid #ece8fa",
  marginBottom: 6,
  fontWeight: 600,
  fontSize: 15,
  outline: "none",
  background: "#f7f8fe",
};
const addBtn = {
  background: "linear-gradient(93deg,#7c4dff 55%,#24e6ca 100%)",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "10px 28px",
  fontWeight: 900,
  fontSize: 16,
  cursor: "pointer",
  boxShadow: "0 2px 8px #7c4dff22",
  transition: "background 0.18s, box-shadow 0.18s"
};
const editBtn = {
  background: "#6D28D9",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "8px 20px",
  fontWeight: 900,
  cursor: "pointer",
  marginRight: 8,
  boxShadow: "0 2px 8px #6d28d922",
  transition: "background 0.18s, box-shadow 0.18s"
};
const deleteBtn = {
  background: "#fff",
  color: "#ff4d6d",
  border: "1px solid #ffd6dd",
  borderRadius: 8,
  padding: "8px 20px",
  fontWeight: 900,
  cursor: "pointer",
  transition: "background 0.18s, box-shadow 0.18s"
};
const modalOverlay = {
  position: "fixed",
  top: 0, left: 0, right: 0, bottom: 0,
  background: "rgba(60,40,120,0.13)",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};
const modalBox = {
  background: "#fff",
  borderRadius: 18,
  boxShadow: "0 8px 32px #7c4dff33",
  padding: "36px 32px 28px",
  minWidth: 540,
  maxWidth: 700,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch"
};

function getRandomFeaturesIds(featuresArr, count = 2) {
  return [...featuresArr]
    .sort(() => Math.random() - 0.5)
    .slice(0, count)
    .map(f => f.id);
}
