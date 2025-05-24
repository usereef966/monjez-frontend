import React, { useState, useEffect } from "react";
import appleIcon    from "../assets/svg/apple-logo.svg";
import shopIcon     from "../assets/svg/ios-store.svg";
import eduIcon      from "../assets/svg/ios-education.svg";
import healthIcon   from "../assets/svg/ios-health.svg";
import chatIcon     from "../assets/svg/ios-chat.svg";
import designIcon   from "../assets/svg/ios-design.svg";
import financeIcon  from "../assets/svg/ios-finance.svg";
import serviceIcon  from "../assets/svg/ios-service.svg";
import ideaIcon     from "../assets/svg/idea.svg";
import badgeMedal   from "../assets/svg/ios-medal.svg";
import badgeSafe    from "../assets/svg/ios-safe.svg";
import badgeSupport from "../assets/svg/ios-support.svg";
import shieldIcon   from "../assets/svg/apple-shield.svg";
import checkIcon    from "../assets/svg/check.svg";
import axios from "axios";

const iconMap = {
  store: shopIcon,
  edu: eduIcon,
  health: healthIcon,
  chat: chatIcon,
  design: designIcon,
  finance: financeIcon,
  service: serviceIcon,
  idea: ideaIcon
};

const badges = [
  {
    icon: badgeMedal,
    title: "جودة Apple",
    desc: "تجربة مستخدم فاخرة بأدق التفاصيل."
  },
  {
    icon: badgeSupport,
    title: "دعم فني متواصل",
    desc: "فريق متخصص لخدمتك من البداية للنهاية."
  },
  {
    icon: badgeSafe,
    title: "حماية بياناتك",
    desc: "خصوصيتك محفوظة بتقنيات أمان متقدمة."
  }
];

export default function IOSOrder() {
  const [plans, setPlans] = useState([]);
  const [selected, setSelected] = useState(null);
  const [idea, setIdea] = useState("");
  const [budget, setBudget] = useState("");
  const [audience, setAudience] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [features, setFeatures] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);


  useEffect(() => {
    async function fetchBudgets() {
      try {
        const res = await fetch('https://monjez-online.onrender.com/api/budgets?section=ios');
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
        const res = await fetch('https://monjez-online.onrender.com/api/mobile-plans?type=ios');
        const data = await res.json();
        setPlans(data);
        if (data.length) setSelected(data[0].id);
      } catch (error) {
        console.error('❌ فشل تحميل الخطط:', error);
      }
    }
    fetchPlans();
  }, []);

  // جلب الميزات من الـ API حسب نوع الخطة (iOS)
  useEffect(() => {
    if (!selected) {
      setFeatures([]);
      setSelectedFeatures([]);
      return;
    }
    axios.get(`https://monjez-online.onrender.com/api/mobile-features/ios`)
      .then(res => setFeatures(res.data))
      .catch(() => setFeatures([]));
    setSelectedFeatures([]);
  }, [selected]);

  const selectedPlan = plans.find(p => p.id === selected);
  const selectedBudget = budgets.find(b => b.id === Number(budget));

  const handleSubmit = async e => {
    e.preventDefault();
    setErrorMsg(""); // Reset error message

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.id) {
      setErrorMsg("يجب تسجيل الدخول أولًا.");
      return;
    }
    if (!idea.trim() || !description.trim() || !budget) {
      setErrorMsg("يرجى تعبئة جميع الحقول المطلوبة لإكمال الطلب. كل معلومة تساعدنا نخدمك بشكل أفضل!");
      return;
    }
    if (features.length > 0 && selectedFeatures.length === 0) {
      setErrorMsg("يرجى اختيار ميزة واحدة على الأقل.");
      return;
    }

      console.log({
    user_id: user.id,
    app_type_id: selected,
    description,
    platform: "iOS"
  });
    try {
const res = await fetch("https://monjez-online.onrender.com/api/orders/mobile", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    user_id: user.id,              // ✅ تأكد أن user.id موجودة فعلاً
    app_type_id: selected,         // ✅ يجب أن يكون selected موجود
    app_name: idea, // <-- صح!                 
    description: description,      // ✅ تأكد من ملء حقل description
    details: details || null, // <-- هنا التعديل
    audience: audience || null,
    notes: details || null,
    budget_id: budget,
    budget: selectedBudget?.label || null,
    platform: "iOS",               // ✅ صحيح
    selectedFeatures: selectedFeatures // <-- هنا التعديل
  })
});
      const data = await res.json();
      if (res.ok) {
  setLastOrder({
    planTitle: selectedPlan?.title,
    idea,
    details,
    description,
    audience,
    budgetLabel: selectedBudget?.label,
    features: selectedFeatures,
    featuresList: features
  });
  setShowSuccess(true);
  setIdea("");
  setDescription("");
  setAudience("");
  setBudget("");
  setDetails("");
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
      background: "linear-gradient(110deg, #edefff 80%, #e6f0fa 100%)",
      paddingTop: 48,
      paddingBottom: 90,
      fontFamily: "San Francisco, Tajawal, Arial"
    }}>
      {/* الهيدر */}
      <div style={{
        width: "100%",
        background: "linear-gradient(115deg, #b6c1ff 60%, #e8eafd 100%)",
        height: 115,
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 120,
        boxShadow: "0 10px 42px #b6c1ff22",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center"
      }}>
        <img src={appleIcon} alt="Apple" style={{ width: 56, marginRight: 18 }} />
        <h1 style={{
          color: "#525dcb",
          fontWeight: 900,
          fontSize: 29,
          margin: 0,
          paddingBottom: 13
        }}>
          عالم تطبيقات iOS الفاخر
        </h1>
      </div>

      {/* نص إرشادي */}
      <div style={{
        textAlign: "center",
        color: "#6a70c8",
        fontWeight: 800,
        fontSize: 19,
        margin: "32px auto 12px"
      }}>
        اختر نوع الخدمة وابدأ مشروعك مع تجربة Apple الأصلية.
      </div>

      {/* كروت الخدمات */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 38,
        maxWidth: 1050,
        margin: "35px auto 18px",
        justifyItems: "center"
      }}>
        {plans.map(plan => (
          <button
            key={plan.id}
            className={`ios-card${selected === plan.id ? " active" : ""}`}
            onClick={() => setSelected(plan.id)}
            style={{
              width: 148,
              minHeight: 122,
              background: "rgba(255,255,255,0.88)",
              border: selected === plan.id
                ? "2.9px solid #6a70c8"
                : "1.5px solid #e2e7f7",
              borderRadius: 22,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: selected === plan.id
                ? "0 0 0 7px #a6b4fc25, 0 7px 30px #cad1fc28"
                : "0 2px 11px #cfd7fc26",
              fontWeight: 900,
              cursor: "pointer",
              transition: "all .23s cubic-bezier(.5,2.3,.4,1)",
              filter: selected === plan.id
                ? "drop-shadow(0 8px 24px #8395fc42)"
                : "",
              backdropFilter: "blur(9px)",
              WebkitBackdropFilter: "blur(9px)"
            }}
          >
            <img
              src={iconMap[plan.icon_key] || ideaIcon}
              alt={plan.title}
              style={{ width: 41, height: 41, marginBottom: 8 }}
            />
            <span style={{
              color: "#6a70c8",
              fontWeight: 900,
              fontSize: 15,
              marginTop: 2
            }}>
              {plan.title}
            </span>
          </button>
        ))}
      </div>

      {/* نموذج الطلب */}
      <form onSubmit={handleSubmit} style={{
        background: "#fff",
        borderRadius: 22,
        boxShadow: "0 8px 48px #a6b4fc22",
        maxWidth: 500,
        margin: "0 auto",
        padding: "38px 32px 28px",
        marginTop: 32,
        display: "flex",
        flexDirection: "column",
        gap: 18,
        alignItems: "center",
        border: "1.7px solid #e2e7f7"
      }}>
        <h2 style={{
          color: "#6a70c8",
          fontWeight: 900,
          fontSize: 21,
          marginBottom: 18
        }}>
          {selectedPlan?.title || "اختر نوع التطبيق"}
        </h2>
        {errorMsg && (
          <div style={{
            background: "#fff6f6",
            color: "#e74c3c",
            border: "1.5px solid #f5c6cb",
            borderRadius: 10,
            padding: "10px 16px",
            marginBottom: 10,
            fontWeight: 700,
            fontSize: 15,
            boxShadow: "0 2px 12px #f5c6cb33",
            textAlign: "center",
            transition: "all .2s"
          }}>
            {errorMsg}
          </div>
        )}
        <input
          type="text"
          placeholder="فكرة التطبيق أو اسم المشروع"
          value={idea}
          onChange={e => setIdea(e.target.value)}
          required
          style={{
            padding: "13px 15px",
            borderRadius: 13,
            border: "1.6px solid #6a70c838",
            fontSize: 17,
            width: "100%",
            background: "#f8faff"
          }}
        />
        <textarea
          placeholder="تفاصيل إضافية عن المشروع (يرجى شرح فكرتك بوضوح)"
          value={details}
          onChange={e => setDetails(e.target.value)}
          style={{
            padding: "13px 15px",
            borderRadius: 13,
            border: "1.6px solid #6a70c838",
            fontSize: 16,
            width: "100%",
            minHeight: 90,
            background: "#f8faff"
          }}
        />
        <select
          value={budget}
          onChange={e => setBudget(e.target.value)}
          required
          style={{
            padding: "10px 12px",
            borderRadius: 13,
            border: "1.5px solid #6a70c838",
            fontSize: 16,
            color: "#6a70c8",
            width: "100%",
            background: "#f8faff"
          }}
        >
          <option value="">الميزانية المتوقعة</option>
          {budgets.map(b => (
            <option key={b.id} value={b.id}>
              {b.label}
            </option>
          ))}
        </select>

        {/* واجهة اختيار الميزات */}
        {features.length > 0 && (
          <div style={{
            width: "100%",
            background: "#f8faff",
            border: "1.7px solid #6a70c8",
            borderRadius: 13,
            padding: "16px 13px 10px",
            margin: "10px 0 8px 0",
            boxShadow: "0 2px 12px #b6c1ff22"
          }}>
            <div style={{
              fontWeight: 900, fontSize: 16, color: "#6a70c8", marginBottom: 10, display: "flex", alignItems: "center", gap: 8
            }}>
              <span>اختر الميزات المطلوبة <span style={{ color: "#e74c3c" }}>*</span></span>
              <span style={{
                background: "#b6c1ff22", color: "#6a70c8", borderRadius: 7, fontSize: 13, padding: "2px 10px", fontWeight: 700
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
                  background: selectedFeatures.includes(f.id) ? "#f0f3ff" : "#fff",
                  border: selectedFeatures.includes(f.id) ? "2px solid #6a70c8" : "1.5px solid #e2e7f7",
                  borderRadius: 8, padding: "7px 13px", cursor: "pointer",
                  fontWeight: 700, fontSize: 15, color: "#6a70c8",
                  boxShadow: selectedFeatures.includes(f.id) ? "0 2px 10px #b6c1ff22" : "none",
                  transition: "all .16s"
                }}>
                  <input
                    type="checkbox"
                    checked={selectedFeatures.includes(f.id)}
                    onChange={e => {
                      if (e.target.checked) setSelectedFeatures([...selectedFeatures, f.id]);
                      else setSelectedFeatures(selectedFeatures.filter(id => id !== f.id));
                    }}
                    style={{ accentColor: "#6a70c8", width: 18, height: 18 }}
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
            padding: "13px 15px",
            borderRadius: 13,
            border: "1.5px solid #6a70c838",
            fontSize: 16,
            width: "100%",
            background: "#f8faff"
          }}
        />
        <textarea
          placeholder="وصف مختصر للتطبيق"
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{
            padding: "13px 15px",
            borderRadius: 13,
            border: "1.6px solid #6a70c838",
            fontSize: 16,
            width: "100%",
            minHeight: 60,
            background: "#f8faff"
          }}
        />
        <button
          type="submit"
          disabled={!selected || !idea.trim() || !description.trim() || !budget || (features.length > 0 && selectedFeatures.length === 0)}
          style={{
            marginTop: 8,
            background: "linear-gradient(94deg,#7b88f4 50%,#50c0fa 100%)",
            color: "#fff",
            fontWeight: 900,
            fontSize: 17,
            borderRadius: 12,
            border: "none",
            boxShadow: "0 5px 18px #7b88f438",
            padding: "13px 0",
            letterSpacing: 0.5,
            cursor: (!selected || !idea.trim() || !description.trim() || !budget || (features.length > 0 && selectedFeatures.length === 0)) ? "not-allowed" : "pointer",
            opacity: (!selected || !idea.trim() || !description.trim() || !budget || (features.length > 0 && selectedFeatures.length === 0)) ? 0.6 : 1,
            width: "100%"
          }}
        >
          أرسل الطلب 🚀
        </button>
        {showSuccess && <div className="success-msg" style={{ color: "#2ecc40", marginTop: 10 }}>✅ تم إرسال الطلب بنجاح!</div>}
      </form>
{showSuccess && lastOrder && (
  <div style={{
    position: "fixed", inset: 0, zIndex: 99,
    background: "rgba(120, 80, 255, 0.12)",
    backdropFilter: "blur(9px)",
    display: "flex", alignItems: "center", justifyContent: "center"
  }}>
    <div style={{
      background: "#fff", borderRadius: 22,
      boxShadow: "0 8px 48px #958aff44",
      padding: "54px 38px 34px", minWidth: 355, textAlign: "center", maxWidth: "92vw",
      border: "2.2px solid #9f97f4"
    }}>
      <img src={appleIcon} alt="نجاح Apple" style={{
        width: 60, marginBottom: 12, filter: "drop-shadow(0 2px 8px #a594fc88)"
      }} />
      <h2 style={{
        color: "#705af7", margin: "14px 0 10px", fontSize: 25,
        fontWeight: 800, letterSpacing: 0.3
      }}>
        تم استقبال طلبك بنجاح 🍏
      </h2>
      <div style={{
        color: "#5c5695", fontSize: 18, marginBottom: 18, lineHeight: "2",
        fontWeight: 500
      }}>
        <span style={{ color: "#705af7", fontWeight: 700 }}>Apple</span> يشكرك على اختيارك لنا!<br />
        تجربة استثنائية في انتظارك.<br />
        سنراجع طلبك ونرتب لك كل التفاصيل لتكون على أتم جاهزية.<br />
        أنت مع <b>Apple الأصلية</b>, الجودة والأمان أولاً دائمًا.<br />
        شكرًا لثقتك. 💜
      </div>
      {/* تفاصيل الطلب */}
      <div style={{
        background: "#f8f7fd",
        borderRadius: 16,
        boxShadow: "0 2px 12px #7c4dff0a",
        padding: "20px 18px",
        margin: "18px 0 0",
        textAlign: "right",
        fontSize: 16,
        fontWeight: 700,
        color: "#23273c"
      }}>
        <div style={{ marginBottom: 7 }}>
          <span style={{ color: "#705af7", fontWeight: 900 }}>نوع التطبيق:</span>
          <span style={{ marginRight: 8 }}>{lastOrder.planTitle || "—"}</span>
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
          <span style={{ color: "#705af7", fontWeight: 900 }}>الميزانية:</span>
          <span style={{ marginRight: 8 }}>{lastOrder.budgetLabel || "—"}</span>
        </div>
        <div style={{ marginBottom: 7 }}>
          <span style={{ color: "#705af7", fontWeight: 900 }}>فكرة التطبيق:</span>
          <span style={{ marginRight: 8 }}>{lastOrder.idea || "—"}</span>
        </div>
        <div style={{ marginBottom: 7 }}>
          <span style={{ color: "#705af7", fontWeight: 900 }}>تفاصيل إضافية:</span>
          <span style={{ marginRight: 8 }}>{lastOrder.details || "—"}</span>
        </div>
        <div style={{ marginBottom: 7 }}>
          <span style={{ color: "#705af7", fontWeight: 900 }}>الوصف المختصر:</span>
          <span style={{ marginRight: 8 }}>{lastOrder.description || "—"}</span>
        </div>
        <div>
          <span style={{ color: "#705af7", fontWeight: 900 }}>الجمهور المستهدف:</span>
          <span style={{ marginRight: 8 }}>{lastOrder.audience || "—"}</span>
        </div>
      </div>
      <button onClick={() => setShowSuccess(false)} style={{
        marginTop: 6,
        background: "linear-gradient(90deg,#8675ff,#60eaff 95%)",
        color: "#fff", border: "none", borderRadius: 13,
        fontWeight: "bold", fontSize: 17, padding: "11px 38px",
        boxShadow: "0 2px 18px #a5a6fa55", cursor: "pointer",
        transition: "background 0.2s"
      }}>إغلاق</button>
    </div>
  </div>
)}

      {/* بطاقات التحفيز */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 30,
        margin: "38px auto 0 auto",
        maxWidth: 960,
        flexWrap: "wrap"
      }}>
        {badges.map((b, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.77)",
            borderRadius: 19,
            minWidth: 205,
            maxWidth: 255,
            padding: "19px 18px 13px 17px",
            boxShadow: "0 7px 27px #a6b4fc26",
            border: "2.2px solid #e2e7f7",
            textAlign: "center",
            marginBottom: 11,
            backdropFilter: "blur(7.5px)",
            WebkitBackdropFilter: "blur(7.5px)"
          }}>
            <img src={b.icon} alt={b.title} style={{ width: 31, height: 31, marginBottom: 5 }} />
            <div style={{
              fontWeight: 900,
              fontSize: 15.8,
              margin: "7px 0",
              color: "#6a70c8"
            }}>
              {b.title}
            </div>
            <div style={{
              color: "#7a7fa4",
              fontSize: 13.3,
              fontWeight: 500
            }}>
              {b.desc}
            </div>
          </div>
        ))}
      </div>

      {/* شريط توثيق Apple */}
      <div style={{
        margin: "34px auto 0 auto",
        maxWidth: 520,
        padding: "13px 18px",
        background: "rgba(250,250,255,0.91)",
        border: "2.1px solid #b6c1ff99",
        borderRadius: 17,
        display: "flex",
        alignItems: "center",
        gap: 12,
        boxShadow: "0 3px 15px #a6b4fc1a",
        backdropFilter: "blur(6px)"
      }}>
        <img src={shieldIcon} alt="توثيق Apple" style={{ width: 28, height: 28 }} />
        <span style={{
          color: "#6a70c8",
          fontWeight: 900,
          fontSize: 14.5,
          letterSpacing: 0.7,
          display: "flex",
          alignItems: "center"
        }}>
          جميع الطلبات مصدّقة Apple
          <img src={checkIcon} alt="توثيق" style={{ height: 17, margin: "0 7px" }} />
        </span>
      </div>

      <style>
        {`
          .ios-card:hover,
          .ios-card.active {
            filter: drop-shadow(0 9px 30px #7b88f488) !important;
            z-index: 20 !important;
            background: #f5f7ff !important;
            border-color: #7b88f4 !important;
          }
        `}
      </style>
    </div>
  );
}
