import React, { useState, useEffect } from "react";

// SVG IMPORTS
import storeIcon    from "../assets/svg/android-store.svg";
import eduIcon      from "../assets/svg/android-education.svg";
import healthIcon   from "../assets/svg/android-health.svg";
import chatIcon     from "../assets/svg/android-chat.svg";
import designIcon   from "../assets/svg/android-design.svg";
import financeIcon  from "../assets/svg/android-finance.svg";
import serviceIcon  from "../assets/svg/android-service.svg";
import ideaIcon     from "../assets/svg/idea.svg";
import shieldIcon   from "../assets/svg/saudi-shield.svg";
import supportRocketIcon from "../assets/svg/support-rocket.svg";
import checkIcon    from "../assets/svg/check.svg";
import launchIcon   from "../assets/svg/sa-launch.svg";
import supportIcon  from "../assets/svg/sa-support.svg";
import safeIcon     from "../assets/svg/sa-safe.svg";

const badges = [
  {
    icon: launchIcon,
    title: "تسليم سريع",
    desc: "تطبيقك بين يديك خلال أيام بجودة سعودية وتوافق كامل."
  },
  {
    icon: supportIcon,
    title: "دعم فني سعودي",
    desc: "فريقنا معك خطوة بخطوة حتى بعد الإطلاق."
  },
  {
    icon: safeIcon,
    title: "حماية وأمان",
    desc: "بياناتك وتطبيقك تحت حماية تقنيات سعودية حديثة."
  }
];

const iconMap = {
  store: storeIcon,
  edu: eduIcon,
  health: healthIcon,
  chat: chatIcon,
  design: designIcon,
  finance: financeIcon,
  service: serviceIcon,
  idea: ideaIcon
};

export default function AndroidOrder() {
  useEffect(() => {
    document.title = "منجز - تطبيقات الاندرويد";
  }, []);

  const [selectedAppId, setSelectedAppId] = useState("");
  const [appName, setAppName] = useState("");
  const [idea, setIdea] = useState(""); // فكرة التطبيق
  const [budget, setBudget] = useState("");
  const [audience, setAudience] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [description, setDescription] = useState("");
  const [plans, setPlans] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [features, setFeatures] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);

  useEffect(() => {
    async function fetchBudgets() {
      try {
        const res = await fetch('https://monjez-online.onrender.com/api/budgets?section=android');
        const data = await res.json();
        setBudgets(data);
      } catch (error) {
        console.error('❌ فشل تحميل الميزانيات:', error);
      }
    }
    fetchBudgets();
  }, []);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const res = await fetch('https://monjez-online.onrender.com/api/mobile-plans?type=android');
        const data = await res.json();
        setPlans(data);
      } catch (error) {
        console.error('❌ فشل تحميل الخطط:', error);
      }
    }
    fetchPlans();
  }, []);

  // جلب الميزات حسب نوع الخطة
  useEffect(() => {
    if (!selectedAppId) {
      setFeatures([]);
      setSelectedFeatures([]);
      return;
    }
    const planType = plans.find(p => p.id === selectedAppId)?.type || "android";
    fetch(`https://monjez-online.onrender.com/api/mobile-features/${planType}`)
      .then(res => res.json())
      .then(data => setFeatures(data))
      .catch(() => setFeatures([]));
    setSelectedFeatures([]); // إعادة تعيين الميزات عند تغيير الخطة
  }, [selectedAppId, plans]);

  const serviceLabel = plans.find(plan => plan.id === selectedAppId)?.title || "";
  const selectedBudgetLabel = budgets.find(b => Number(b.id) === Number(budget))?.label || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.id) {
      setErrorMsg("يجب تسجيل الدخول أولًا.");
      return;
    }
    if (!selectedAppId) {
      setErrorMsg("🚦 يرجى اختيار نوع التطبيق أولاً لإكمال الطلب.");
      return;
    }
    if (!idea.trim() || !description.trim() || !budget) {
      setErrorMsg("💡 نحتاج منك تعبئة جميع الحقول المهمة حتى نفهم فكرتك ونخدمك بأفضل صورة! الرجاء إكمال البيانات ثم أرسل الطلب.");
      return;
    }
    if (features.length > 0 && selectedFeatures.length === 0) {
      setErrorMsg("يرجى اختيار ميزة واحدة على الأقل.");
      return;
    }

    try {
      const res = await fetch("https://monjez-online.onrender.com/api/orders/mobile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
  user_id: user.id,
  app_type_id: selectedAppId,
  app_name: serviceLabel,     // اسم التطبيق
  idea,                       // فكرة التطبيق
  description,                // وصف مختصر (إذا عندك حقل له)
  notes: null,
  audience: audience || null,
  budget_id: budget,
  budget: selectedBudgetLabel,
  platform: "Android",
  selectedFeatures,
  details: description        // تفاصيل إضافية (أو استخدم حقل منفصل لو عندك)
})
      });

      const data = await res.json();
      if (res.ok) {
  setLastOrder({
    appName: serviceLabel,
    idea,
    description,
    audience,
    budget,
    budgetLabel: selectedBudgetLabel,
    features: selectedFeatures,
    featuresList: features, // قائمة كل الميزات لهذا النوع
  });
  setShowSuccess(true);
  setAppName("");
  setIdea("");
  setDescription("");
  setAudience("");
  setBudget("");
  setSelectedFeatures([]);
  setErrorMsg("");
} else {
        setErrorMsg(data.error || "❌ حدث خطأ أثناء الإرسال.");
      }

    } catch {
      setErrorMsg("⚠️ تعذّر الاتصال بالخادم، حاول مرة أخرى.");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(117deg, #e3fff0 70%, #e3eeff 100%)",
      position: "relative",
      paddingTop: 44, paddingBottom: 100,
      fontFamily: "Cairo, Tajawal, Arial",
      overflow: "hidden"
    }}>
      {/* العنوان */}
      <div style={{
        width: "100%",
        background: "linear-gradient(110deg, #a18fff 64%, #fff 100%)",
        height: 112,
        borderBottomLeftRadius: 54,
        borderBottomRightRadius: 84,
        boxShadow: "0 12px 44px #a18fff19",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center"
      }}>
        <h1 style={{ color: "#222", fontWeight: 900, fontSize: 32, margin: 0, paddingBottom: 16 }}>
          اختر نوع التطبيق وابدأ رحلتك معنا
        </h1>
      </div>

      {/* الدوائر الكبيرة (صفين Grid) */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 44,
        maxWidth: 970,
        margin: "55px auto 22px auto",
        justifyItems: "center"
      }}>
        {plans.map((plan) => (
          <div key={plan.id} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <button
              onClick={() => setSelectedAppId(plan.id)}
              className={`circle-card${selectedAppId === plan.id ? " active" : ""}`}
              style={{
                width: 124,
                height: 124,
                background: "#fff",
                border: selectedAppId === plan.id ? "4px solid #18e388" : "2px solid #d4ffe9",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: selectedAppId === plan.id
                  ? "0 0 0 10px #18e38832, 0 6px 36px #24d3ad15"
                  : "0 3px 18px #21e5a422",
                cursor: "pointer",
                transition: "all .22s cubic-bezier(.4,2.1,.4,1)",
                filter: selectedAppId === plan.id ? "drop-shadow(0 8px 32px #18e38833)" : "",
                padding: "5px",
              }}
            >
              <img
                src={iconMap[plan.icon_key] || ideaIcon}
                alt={plan.title}
                style={{
                  width: 53,
                  height: 53,
                  filter: selectedAppId === plan.id
                    ? "drop-shadow(0 4px 16px #19ca8955)"
                    : "drop-shadow(0 2px 10px #baffd944)",
                  transition: "all .19s"
                }}
              />
            </button>

            <span style={{
              marginTop: "10px",
              color: "#21c692",
              fontWeight: 900,
              fontSize: 17,
              letterSpacing: ".2px",
              whiteSpace: "nowrap",
              textAlign: "center"
            }}>
              {plan.title}
            </span>
          </div>
        ))}
      </div>

      {/* مربع الطلب الكبير */}
      <form
        className="order-form"
        style={{
          background: "#fff",
          borderRadius: 28,
          boxShadow: "0 7px 30px #18e38822, 0 2px 6px #23e38a10",
          maxWidth: 520,
          margin: "0 auto",
          padding: "36px 32px 26px",
          marginTop: 25,
          display: "flex",
          flexDirection: "column",
          gap: 22,
          fontFamily: "Cairo, Tajawal, Arial",
          zIndex: 2,
          alignItems: "center"
        }}
        onSubmit={handleSubmit}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 10 }}>
          <img src={serviceIcon} alt="نوع الخدمة" style={{ width: 38, height: 38 }} />
          <h2 style={{ color: "#19ca89", textAlign: "center", fontWeight: 900, fontSize: 23, margin: 0 }}>
            {serviceLabel}
          </h2>
        </div>

        {errorMsg && (
          <div style={{
            background: "#f7fff9",
            color: "#19ca89",
            border: "1.7px solid #18e388",
            borderRadius: 11,
            padding: "10px 16px",
            marginBottom: 10,
            fontWeight: 700,
            fontSize: 15,
            boxShadow: "0 2px 12px #18e38822",
            textAlign: "center",
            transition: "all .2s"
          }}>
            <span style={{ fontSize: 18, marginLeft: 6 }}>💡</span>
            {errorMsg}
          </div>
        )}

        <input
          type="text"
          placeholder="فكرة التطبيق"
          value={idea}
          onChange={e => setIdea(e.target.value)}
          required
          style={{
            padding: "13px 16px",
            borderRadius: 12,
            border: "1.8px solid #19ca8955",
            fontSize: 17,
            width: "100%"
          }}
        />

        <textarea
          placeholder="تفاصيل إضافية عن المشروع (يرجى شرح فكرتك بوضوح)"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          style={{
            padding: "13px 16px",
            borderRadius: 12,
            border: "1.8px solid #19ca8955",
            fontSize: 17,
            width: "100%",
            minHeight: 100,
            resize: "vertical"
          }}
        />

        <select
          value={budget}
          onChange={e => setBudget(e.target.value)}
          required
          style={{
            padding: "10px 12px",
            borderRadius: 13,
            border: "1.5px solid #ccc",
            fontSize: 16,
            width: "100%",
            background: "#fff",
            color: "#444"
          }}
        >
          <option value="">الميزانية المتوقعة</option>
          {budgets.map(b => (
            <option key={b.id} value={b.id}>
              {b.label}
            </option>
          ))}
        </select>


        {/* وصف الميزانية المختارة بشكل ديناميكي وجذاب */}
        {budget && (
          <div
            style={{
              marginTop: 8,
              marginBottom: 2,
              fontSize: 15.5,
              fontWeight: 700,
              color:
                budgets.find(b => Number(b.id) === Number(budget))?.min_price < 7000
                  ? "#21c692"
                  : budgets.find(b => Number(b.id) === Number(budget))?.min_price < 15000
                  ? "#ff9800"
                  : "#e74c3c",
              background:
                budgets.find(b => Number(b.id) === Number(budget))?.min_price < 7000
                  ? "#e7fff4"
                  : budgets.find(b => Number(b.id) === Number(budget))?.min_price < 15000
                  ? "#fffbe7"
                  : "#fff0f0",
              borderRadius: 9,
              padding: "7px 13px",
              transition: "all .18s"
            }}
          >
            {budgets.find(b => Number(b.id) === Number(budget))?.label}
            {budgets.find(b => Number(b.id) === Number(budget))?.min_price && budgets.find(b => Number(b.id) === Number(budget))?.max_price
              ? ` (من ${Number(budgets.find(b => Number(b.id) === Number(budget))?.min_price).toLocaleString()} إلى ${Number(budgets.find(b => Number(b.id) === Number(budget))?.max_price).toLocaleString()} ريال)`
              : ""}
          </div>
        )}

        {/* واجهة اختيار الميزات */}
        {features.length > 0 && (
          <div style={{
            width: "100%",
            background: "#f7fff9",
            border: "1.7px solid #18e388",
            borderRadius: 13,
            padding: "18px 14px 12px",
            margin: "10px 0 8px 0",
            boxShadow: "0 2px 12px #18e38822"
          }}>
            <div style={{
              fontWeight: 900, fontSize: 17, color: "#19ca89", marginBottom: 10, display: "flex", alignItems: "center", gap: 8
            }}>
              <span>اختر الميزات المطلوبة <span style={{ color: "#e74c3c" }}>*</span></span>
              <span style={{
                background: "#19ca8922", color: "#19ca89", borderRadius: 7, fontSize: 13, padding: "2px 10px", fontWeight: 700
              }}>
                {selectedFeatures.length} / {features.length}
              </span>
            </div>
            <div style={{
              display: "flex", flexWrap: "wrap", gap: 10
            }}>
              {features.map(f => (
                <label key={f.id} style={{
                  display: "flex", alignItems: "center", gap: 7,
                  background: selectedFeatures.includes(f.id) ? "#e0fff2" : "#fff",
                  border: selectedFeatures.includes(f.id) ? "2px solid #19ca89" : "1.5px solid #d2fbe7",
                  borderRadius: 8, padding: "7px 13px", cursor: "pointer",
                  fontWeight: 700, fontSize: 15, color: "#19ca89",
                  boxShadow: selectedFeatures.includes(f.id) ? "0 2px 10px #19ca8922" : "none",
                  transition: "all .16s"
                }}>
                  <input
                    type="checkbox"
                    checked={selectedFeatures.includes(f.id)}
                    onChange={e => {
                      if (e.target.checked) setSelectedFeatures([...selectedFeatures, f.id]);
                      else setSelectedFeatures(selectedFeatures.filter(id => id !== f.id));
                    }}
                    style={{ accentColor: "#19ca89", width: 18, height: 18 }}
                  />
                  <span>{f.name}</span>
                </label>
              ))}
            </div>
            {selectedFeatures.length === 0 && (
              <div style={{ color: "#e74c3c", fontWeight: 700, fontSize: 14, marginTop: 8 }}>
                يجب اختيار ميزة واحدة على الأقل!
              </div>
            )}
          </div>
        )}

        <input
          type="text"
          placeholder="الجمهور المستهدف (اختياري)"
          value={audience}
          onChange={e => setAudience(e.target.value)}
          style={{
            padding: "13px 16px",
            borderRadius: 12,
            border: "1.6px solid #19ca8955",
            fontSize: 16,
            width: "100%"
          }}
        />

        <button
          type="submit"
          disabled={
            !selectedAppId ||
            //!appName.trim()  // ← احذف هذا الشرط
            !idea.trim() ||
            !description.trim() ||
            !budget ||
            (features.length > 0 && selectedFeatures.length === 0)
          }
          style={{
            marginTop: 10,
            background: "linear-gradient(93deg,#17fd7b 50%,#3ae371 100%)",
            color: "#fff", fontWeight: 900, fontSize: 18,
            borderRadius: 13, border: "none",
            boxShadow: "0 6px 18px #18e38838",
            padding: "14px 0", letterSpacing: 0.5,
            cursor: (!selectedAppId || !idea.trim() || !description.trim() || !budget || (features.length > 0 && selectedFeatures.length === 0)) ? "not-allowed" : "pointer",
            opacity: (!selectedAppId || !idea.trim() || !description.trim() || !budget || (features.length > 0 && selectedFeatures.length === 0)) ? 0.6 : 1,
            transition: "background .18s",
            width: "100%"
          }}
        >
          أرسل الطلب 🚀
        </button>
      </form>

      {showSuccess && lastOrder && (
  <div style={{
    position: "fixed", inset: 0, zIndex: 99,
    background: "rgba(180,255,220,0.35)",
    backdropFilter: "blur(10px)",
    display: "flex", alignItems: "center", justifyContent: "center"
  }}>
    <div style={{
      background: "#fff", borderRadius: 22, boxShadow: "0 8px 48px #21ecb966",
      padding: "44px 30px 32px", minWidth: 350, textAlign: "center", maxWidth: "92vw",
      border: "2.5px solid #13e99f"
    }}>
      <img src={supportRocketIcon} alt="تم بنجاح" style={{ width: 65, marginBottom: 10 }} />
      <h2 style={{ color: "#16d982", margin: "16px 0 10px", fontSize: 26, fontWeight: 800, letterSpacing: 0.5 }}>
        تم استلام طلبك بنجاح!
      </h2>
      <div style={{ color: "#237e62", fontSize: 18, marginBottom: 16, lineHeight: "2" }}>
        شكراً لثقتك بنا ❤️ <br />
        سيتم التواصل معك خلال وقت قياسي للبدء بتنفيذ فكرتك.<br />
        نحن في فريق <span style={{ color: "#16d982", fontWeight: 600 }}>منجز</span> نعتني بكل تفاصيل طلبك من البداية للنهاية.<br />
        أنت بيد أمينة!
      </div>
      {/* تفاصيل الطلب */}
      <div style={{
        background: "#f7fff9",
        borderRadius: 16,
        boxShadow: "0 2px 12px #18e3880a",
        padding: "20px 18px",
        margin: "18px 0 0",
        textAlign: "right",
        fontSize: 16,
        fontWeight: 700,
        color: "#23273c"
      }}>
        <div style={{ marginBottom: 7 }}>
          <span style={{ color: "#19ca89", fontWeight: 900 }}>نوع التطبيق:</span>
          <span style={{ marginRight: 8 }}>{lastOrder.appName || "—"}</span>
        </div>
        <div style={{ marginBottom: 7 }}>
          <span style={{ color: "#21c692", fontWeight: 900 }}>المميزات:</span>
          {lastOrder.features?.length ? (
            <ul style={{ margin: "4px 0 0 0", padding: 0, listStyle: "none" }}>
              {lastOrder.features.map((id, i) => (
                <li key={i} style={{ color: "#23273c", fontWeight: 700, marginBottom: 2 }}>
                  ✅ {lastOrder.featuresList?.find(f => f.id === id)?.name}
                </li>
              ))}
            </ul>
          ) : <span style={{ color: "#bbb", marginRight: 8 }}>—</span>}
        </div>
        <div style={{ marginBottom: 7 }}>
          <span style={{ color: "#19ca89", fontWeight: 900 }}>الميزانية:</span>
          <span style={{ marginRight: 8 }}>{lastOrder.budgetLabel || "—"}</span>
        </div>
        <div style={{ marginBottom: 7 }}>
          <span style={{ color: "#19ca89", fontWeight: 900 }}>فكرة التطبيق:</span>
          <span style={{ marginRight: 8 }}>{lastOrder.idea || "—"}</span>
        </div>
        <div style={{ marginBottom: 7 }}>
          <span style={{ color: "#19ca89", fontWeight: 900 }}>الوصف:</span>
          <span style={{ marginRight: 8 }}>{lastOrder.description || "—"}</span>
        </div>
        <div>
          <span style={{ color: "#19ca89", fontWeight: 900 }}>الجمهور المستهدف:</span>
          <span style={{ marginRight: 8 }}>{lastOrder.audience || "—"}</span>
        </div>
      </div>
      <button onClick={() => setShowSuccess(false)} style={{
        marginTop: 16,
        background: "linear-gradient(90deg,#1df4a3,#39d780 90%)",
        color: "#fff", border: "none", borderRadius: 13,
        fontWeight: "bold", fontSize: 18, padding: "11px 38px",
        boxShadow: "0 2px 18px #21ecb94d", cursor: "pointer"
      }}>إغلاق</button>
    </div>
  </div>
)}

      {/* كروت تحفيز/شهادات فاخرة */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 33,
        margin: "50px auto 0 auto",
        maxWidth: 970,
        flexWrap: "wrap"
      }}>
        {badges.map((b, i) => (
          <div key={i} style={{
            background: "#fff",
            borderRadius: 20,
            minWidth: 215,
            maxWidth: 270,
            padding: "23px 20px 18px 20px",
            boxShadow: `0 8px 36px ${i === 0 ? "#21e5a418" : i === 1 ? "#738cff26" : "#e6ad4e1b"}`,
            borderBottom: `4.3px solid ${i === 0 ? "#17e388" : i === 1 ? "#6b79f3" : "#e6ad4e"}`,
            textAlign: "center",
            marginBottom: 14
          }}>
            <img src={b.icon} alt={b.title} style={{ width: 36, height: 36, marginBottom: 7 }} />
            <div style={{ fontWeight: 900, fontSize: 17.5, margin: "7px 0", color: i === 0 ? "#19ca89" : i === 1 ? "#6270e4" : "#d59a27" }}>
              {b.title}
            </div>
            <div style={{ color: "#444", fontSize: 14.8, fontWeight: 500 }}>{b.desc}</div>
          </div>
        ))}
      </div>

      {/* شريط توثيق سعودي */}
      <div style={{
        margin: "38px auto 0 auto",
        maxWidth: 540,
        padding: "14px 21px",
        background: "#f8fff7",
        border: "2.3px solid #21c69255",
        borderRadius: 18,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 13,
        boxShadow: "0 3px 15px #b2ffd229"
      }}>
        <img src={shieldIcon} alt="ختم سعودي" style={{ width: 31, height: 31 }} />
        <span style={{
          color: "#19ca89",
          fontWeight: 900,
          fontSize: 16.5,
          letterSpacing: 1.1,
          display: "flex",
          alignItems: "center"
        }}>
          جميع الطلبات تحت إشراف سعودي 100%
          <img src={checkIcon} alt="توثيق" style={{ height: 22, marginRight: 9, marginLeft: 4 }} />
        </span>
      </div>

      <style>
        {`
          .circle-card:hover, .circle-card.active {
            filter: drop-shadow(0 12px 32px #27e5a868);
            z-index: 20 !important;
            background: #f3fff9 !important;
          }
        `}
      </style>
    </div>
  
  );
}
