import React, { useState, useEffect } from "react";

export default function UserProfile() {
  // ======= ستايلاتك نفسها =========
  const formStyle = {
    width: "100%",
    maxWidth: 830,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "26px 36px",
    direction: "rtl",
  };
  const labelStyle = {
    fontSize: 16,
    color: "#636587",
    fontWeight: 600,
    marginBottom: 6,
    display: "block",
    letterSpacing: 0.1,
  };
  const inputStyle = {
    width: "100%",
    padding: "11px 13px",
    fontSize: 16,
    border: "1.1px solid #e5e7eb",
    borderRadius: 8,
    background: "#fafbfc",
    outline: "none",
    color: "#222",
    fontWeight: 500,
    marginBottom: 2,
    transition: "border 0.14s, box-shadow 0.18s",
    boxShadow: "0 0.5px 4px #ece9fc0b",
    boxSizing: 'border-box',
  };
  const selectStyle = {
    ...inputStyle,
    appearance: "none",
    backgroundImage:
      "url('data:image/svg+xml,%3Csvg width=\"22\" height=\"22\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M7 10l5 5 5-5\" stroke=\"%23928be6\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/%3E%3C/svg%3E')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "calc(100% - 12px) center",
    backgroundSize: 20,
  };
  const btnStyle = {
    gridColumn: "1 / span 2",
    margin: "28px 0 0 0",
    width: 162,
    padding: '11px 13px',
    border: "none",
    borderRadius: 9,
    background: "#7c4dff",
    color: "#fff",
    fontWeight: 800,
    fontSize: 18,
    cursor: "pointer",
    letterSpacing: 0.6,
    boxShadow: "0 2px 12px #7c4dff12",
    transition: "background 0.16s",
  };

  // ======= الحالة =========
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    country: "",
    
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const editable = !(form.city && form.country);

  // ========== جلب بيانات المستخدم ==========
   

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      setError("");
      try {
        const userLocal = JSON.parse(localStorage.getItem("user"));
        if (!userLocal?.id) {
          setError("المستخدم غير مسجل دخول!");
          setLoading(false);
          return;
        }
        // (يفترض عندك endpoint لجلب بيانات user/id)
        const res = await fetch(`https://monjez-online.onrender.com/api/user/${userLocal.id}`);
        if (!res.ok) throw new Error("فشل في جلب بيانات المستخدم");
        const data = await res.json();
        console.log("✅ بيانات المستخدم من السيرفر:", data);


        // ملاحظة: غيّر أسماء الحقول حسب قاعدة بياناتك الفعلية!
     setForm({
              firstName: data.first_name || "",
              lastName: data.last_name || "",
              phone: data.phone || "",
              email: data.email || "",
              city: data.city || "",
              country: data.country || "",
            });

      } catch (err) {
        setError("فشل في جلب البيانات!");
      }
      setLoading(false);
    }
    fetchUser();
  }, []);

  // ========== دالة التغيير ==========
  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  // ========== التحديث ==========
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess("");
    setError("");
    try {
        
      const userLocal = JSON.parse(localStorage.getItem("user"));
      if (!userLocal?.id) {
        setError("المستخدم غير مسجل دخول!");
        setSaving(false);
        return;
      }
      // ارسال فقط الحقول القابلة للتغيير
      const payload = {
        first_name: form.firstName,
        last_name: form.lastName,
        phone: form.phone,
        city: form.city,
        country: form.country
      };
      const res = await fetch(`https://monjez-online.onrender.com/api/user/${userLocal.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("فشل التحديث");
      setSuccess("تم تحديث بياناتك بنجاح!");
            //⟵ من الآن ممنوع تعديل ثانية

    } catch {
      setError("حدث خطأ أثناء التحديث!");
    }
    setSaving(false);
  };

  // ========== الواجهة ==========
  return (
    <form style={formStyle} autoComplete="off" onSubmit={handleSubmit}>
      {/* الاسم الأول */}
      <div>
        <label style={labelStyle}>الاسم الأول</label>
        <input
          style={inputStyle}
          type="text"
          name="firstName"
          value={form.firstName}
          disabled
          
        />



        
      </div>
      {/* اسم العائلة */}
      <div>
        <label style={labelStyle}>اسم العائلة</label>
        <input
          style={inputStyle}
          type="text"
          name="lastName"
          value={form.lastName}
          disabled
          
        />
      </div>
      {/* رقم الجوال */}
      <div>
        <label style={labelStyle}>رقم الجوال</label>
        <input
          style={inputStyle}
          type="tel"
          name="phone"
          value={form.phone}
          disabled
          
        />
      </div>
      {/* البريد الإلكتروني */}
      <div>
        <label style={labelStyle}>البريد الإلكتروني</label>
        <input
          style={{
            ...inputStyle,
            background: "#f3f4f6",
            color: "#8d9099",
            cursor: "not-allowed"
          }}
          type="email"
          name="email"
          value={form.email}
          readOnly
          tabIndex={-1}
        />
      </div>
      {/* المدينة */}
      <div>
        <label style={labelStyle}>المدينة</label>
        <select
          style={selectStyle}
          name="city"
          value={form.city}
          onChange={handleChange}
          disabled={!editable || loading || saving}


        >
          <option value="">اختر المدينة</option>
          <option value="الرياض">الرياض</option>
          <option value="جدة">جدة</option>
          <option value="الدمام">الدمام</option>
          <option value="مكة">مكة</option>
          <option value="المدينة">المدينة</option>
        </select>
      </div>
      {/* الدولة */}
      <div>
        <label style={labelStyle}>الدولة</label>
        <select
          style={selectStyle}
          name="country"
          value={form.country}
          onChange={handleChange}
         disabled={!editable || loading || saving}
        >
          <option value="السعودية">السعودية</option>
          <option value="الإمارات">الإمارات</option>
          <option value="مصر">مصر</option>
          <option value="أخرى">أخرى</option>
        </select>
      </div>
      {/* زر التحديث */}
     { !loading && editable && (
  <button type="submit" style={btnStyle} disabled={loading || saving}>
    {saving ? "جارٍ الحفظ..." : "تحديث"}
  </button>
)}

      {/* رسائل الحالة */}
      {success && (
        <div style={{ gridColumn: "1 / span 2", color: "#16c784", fontWeight: 800, marginTop: 13 }}>{success}</div>
      )}
      {error && (
        <div style={{ gridColumn: "1 / span 2", color: "#ff2d55", fontWeight: 800, marginTop: 13 }}>{error}</div>
      )}
    </form>
  );
}
