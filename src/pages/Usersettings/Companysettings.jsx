import React, { useEffect, useState } from "react";

export default function UserCompanySettings() {
  const user = JSON.parse(localStorage.getItem("user")); // تأكد أن المستخدم مسجل دخول
  const userId = user?.id;

  // الحالة
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({
    companyName: "",
    companyIndustry: "",
    companyCountry: "",
    companyCity: "",
    companyWebsite: "",
    companyRegNo: ""
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // أول تحميل: جلب البيانات
  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    fetch(`https://monjez-online.onrender.com/api/user/${userId}`)
      .then(res => res.json())
      .then(res => {
        setData({
          companyName:      res.company_name    || res.name     || "",
          companyIndustry:  res.industry       || "",
          companyCountry:   res.country        || "",
          companyCity:      res.city           || "",
          companyWebsite:   res.website        || "",
          companyRegNo:     res.reg_no         || "",
        });
        setLoading(false);
      })
      .catch(() => {
        setError("فشل تحميل البيانات");
        setLoading(false);
      });
  }, [userId]);

  // حدث المدخلات
  function handleChange(e) {
    const { name, value } = e.target;
    setData(d => ({ ...d, [name]: value }));
  }

  // إرسال التحديث
  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    // تقسيم الاسم الأول والأخير من اسم الشركة
    const first_name = data.companyName?.split(" ")[0] || "";
    const last_name  = data.companyName?.split(" ").slice(1).join(" ") || "";

    // بناء الجسم للإرسال
    const body = {
      first_name,
      last_name,
      phone: data.companyRegNo,
      city: data.companyCity,
      country: data.companyCountry
    };

    try {
      const res = await fetch(`https://monjez-online.onrender.com/api/user/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const json = await res.json();

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2200);
      } else {
        setError(json.error || "فشل التحديث");
      }
    } catch {
      setError("حدث خطأ في الاتصال بالخادم");
    }
    setSaving(false);
  }

  // الستايلات - كما هي (نسخ من عندك)
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
    width: 180,
    padding: "10px 0",
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
    opacity: saving ? 0.7 : 1
  };

  if (loading) return <div style={{ textAlign: "center", margin: 50 }}>جاري تحميل بيانات الشركة...</div>;

  return (
    <form style={formStyle} autoComplete="off" onSubmit={handleSubmit}>
      {/* اسم الشركة */}
      <div>
        <label style={labelStyle}>اسم الشركة</label>
        <input
          style={inputStyle}
          type="text"
          placeholder="شركة منجز التقنية"
          name="companyName"
          value={data.companyName}
          onChange={handleChange}
        />
      </div>
      {/* مجال العمل */}
      <div>
        <label style={labelStyle}>مجال العمل</label>
        <input
          style={inputStyle}
          type="text"
          placeholder="مثال: برمجة، تسويق، تقنية..."
          name="companyIndustry"
          value={data.companyIndustry}
          onChange={handleChange}
           // غير ديناميك لأن جدول المستخدم لا يدعمها، بس خليها placeholder فقط
        />
      </div>
      {/* الدولة */}
      <div>
        <label style={labelStyle}>الدولة</label>
        <select
          style={selectStyle}
          name="companyCountry"
          value={data.companyCountry}
          onChange={handleChange}
        >
          <option value="">اختر الدولة</option>
          <option>السعودية</option>
          <option>الإمارات</option>
          <option>مصر</option>
          <option>أخرى</option>
        </select>
      </div>
      {/* المدينة */}
      <div>
        <label style={labelStyle}>المدينة</label>
        <input
          style={inputStyle}
          type="text"
          placeholder="الرياض"
          name="companyCity"
          value={data.companyCity}
          onChange={handleChange}
        />
      </div>
      {/* موقع الشركة */}
      <div>
        <label style={labelStyle}>موقع الشركة الإلكتروني</label>
        <input
          style={inputStyle}
          type="url"
          placeholder="https://yourcompany.com"
          name="companyWebsite"
          value={data.companyWebsite}
          onChange={handleChange}
           // غير ديناميك (ليس في جدول users حالياً)
        />
      </div>
      {/* رقم السجل التجاري */}
      <div>
        <label style={labelStyle}>رقم السجل التجاري</label>
        <input
          style={inputStyle}
          type="text"
          placeholder="1234567890"
          name="companyRegNo"
          value={data.companyRegNo}
          onChange={handleChange}
        />
      </div>
      {/* زر التحديث */}
      <button type="submit" style={btnStyle} disabled={saving}>
        {saving ? "جاري الحفظ..." : "تحديث بيانات الشركة"}
      </button>

      {/* رسائل نجاح/خطأ */}
      {success && <div style={{ gridColumn: "1/3", color: "#26de81", fontWeight: 700, marginTop: 14, textAlign: "center" }}>✅ تم تحديث بيانات الشركة!</div>}
      {error && <div style={{ gridColumn: "1/3", color: "#ff2d55", fontWeight: 700, marginTop: 14, textAlign: "center" }}>{error}</div>}
    </form>
  );
}
