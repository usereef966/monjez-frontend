import React, { useState, useEffect } from "react";
import webRocketIcon from "../assets/svg/web-rocket.svg";
import icons from "../assets/svg";

export default function WebOrder() {
  const [webTypes, setWebTypes] = useState([]);
  const [type, setType] = useState(""); // id نوع الموقع
  const [desc, setDesc] = useState("");
  const [budget, setBudget] = useState("");
  const [features, setFeatures] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [showWebSuccess, setShowWebSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [lastOrder, setLastOrder] = useState(null);

  // جلب أنواع المواقع مع ميزاتها
useEffect(() => {
  fetch("https://monjez-online.onrender.com/api/site_types")
    .then(res => res.json())
    .then(data => {
      
      setWebTypes(Array.isArray(data) ? [...data] : []);
    })
    .catch(() => setWebTypes([]));
}, []);

  // جلب الميزانيات (لو عندك جدول ميزانيات في الـ backend)
  useEffect(() => {
    fetch("https://monjez-online.onrender.com/api/budgets")
      .then(res => res.json())
      .then(data => setBudgets(data))
      .catch(() => setBudgets([
        { id: 1, label: "5,000 – 10,000 ريال" },
        { id: 2, label: "10,000 – 20,000 ريال" },
        { id: 3, label: "أكثر من 20,000 ريال" }
      ]));
  }, []);

  // عند تغيير نوع الموقع، أفرغ الميزات المختارة
  useEffect(() => {
    setFeatures([]);
  }, [type]);

  // نوع الموقع الحالي
  const currentType = webTypes.find(t => t.id === Number(type));
  const featureOptions = currentType?.features || [];

  // تحقق من اكتمال البيانات
  const isFormValid = type && desc.trim() && budget;

  // إرسال الطلب
  const handleSubmit = async () => {
    setErrorMsg("");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.id) {
      setErrorMsg("🔑 يجب تسجيل الدخول أولًا!");
      return;
    }
    if (!type) {
      setErrorMsg("🌐 يرجى اختيار نوع الموقع أولاً.");
      return;
    }
    if (!desc.trim()) {
      setErrorMsg("📝 يرجى كتابة وصف أو فكرة المشروع.");
      return;
    }
    if (!budget) {
      setErrorMsg("💰 يرجى اختيار الميزانية المتوقعة.");
      return;
    }
    try {
      const payload = {
        user_id: user.id,
        description: desc,
        site_type_id: type,
        budget_id: budget,
        feature_ids: features,
        section: currentType?.name || "",
        platform: "ويب"
      };
      console.log("WebOrder payload:", payload); // هنا يظهر في الكونسول
      const res = await fetch("https://monjez-online.onrender.com/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      if (res.ok) {
  setLastOrder({
    type,
    desc,
    budget,
    features,
  });
  setShowWebSuccess(true);
  setType("");
  setDesc("");
  setBudget("");
  setFeatures([]);
  setErrorMsg("");
} else {
        setErrorMsg(result.error || "❌ حدث خطأ أثناء إرسال الطلب");
      }
    } catch {
      setErrorMsg("⚠️ تعذر الاتصال بالخادم");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F7F8FF",
      fontFamily: "Tajawal, Arial",
      direction: "rtl",
      padding: 0
    }}>
      <div style={{
        width: "100%",
        minHeight: 150,
        background: "linear-gradient(97deg,#7c4dff 55%,#24e6ca 100%)",
        borderBottomLeftRadius: 44,
        borderBottomRightRadius: 80,
        boxShadow: "0 16px 48px #7c4dff14",
        textAlign: "center",
        padding: "40px 0"
      }}>
        <h1 style={{
          color: "#fff",
          fontWeight: 900,
          fontSize: 36,
          letterSpacing: ".7px",
          margin: 0
        }}>
          🚀 اطلب برمجة موقعك — كل شيء ديناميكي!
        </h1>
        <p style={{
          color: "#d7fffa",
          fontSize: 19,
          fontWeight: 700,
          margin: "8px 0 0"
        }}>
          صمم فكرتك بنفسك… ثم أرسلها فوراً بنظام تفاعلي لم تشاهده من قبل!
        </p>
      </div>

      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "36px 20px",
        display: "flex",
        gap: 24,
        alignItems: "flex-start",
        justifyContent: "center",
        flexWrap: "wrap",
      }}>
        {/* عمود اختيار نوع الموقع */}
        <div style={{
          flex: "0 0 330px",
          background: "#fff",
          borderRadius: 21,
          boxShadow: "0 7px 24px #a18fff13",
          border: "2px solid #e7e3ff",
          padding: "36px 30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
          minWidth: 260,
          maxWidth: 350,
          marginBottom: 18,
        }}>
          <div style={{
            color: "#7c4dff",
            fontWeight: 900,
            fontSize: 19,
            marginBottom: 14
          }}>اختر نوع الموقع:</div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 15
          }}>
            {webTypes.length === 0 && (
              <div style={{ color: "#aaa", fontWeight: 700, fontSize: 15 }}>جاري التحميل...</div>
            )}
            {webTypes.map(opt => (
              <button
                key={opt.id}
                onClick={() => setType(opt.id)}
                style={{
                  background: Number(type) === opt.id
                    ? "linear-gradient(93deg,#24e6ca 40%,#7c4dff 100%)"
                    : "#f6faff",
                  border: Number(type) === opt.id
                    ? "2px solid #21c692"
                    : "1.6px solid #ececff",
                  color: Number(type) === opt.id ? "#fff" : "#222",
                  borderRadius: 13,
                  fontWeight: 900,
                  fontSize: 16,
                  padding: "22px 14px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transition: "all .18s",
                  minHeight: 110
                }}
              >
                {/* الأيقونة */}
                {opt.icon && icons[opt.icon] && (
                  <img
                    src={icons[opt.icon]}
                    alt={opt.name}
                    style={{ width: 38, height: 38, marginBottom: 7, objectFit: "contain" }}
                  />
                )}
                {opt.name}
              </button>
            ))}
          </div>
        </div>

        {/* عمود كل شيء آخر */}
        <div style={{
          flex: 1,
          background: "#fff",
          borderRadius: 21,
          boxShadow: "0 7px 24px #a18fff13",
          border: "2px solid #e7e3ff",
          padding: "38px 38px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 22,
          minWidth: 320,
          maxWidth: 540,
          marginBottom: 18,
        }}>
          {/* رسالة الخطأ */}
          {errorMsg && (
            <div style={{
              background: "#fff6f6",
              color: "#a259e6",
              border: "1.5px solid #e5c6fa",
              borderRadius: 10,
              padding: "10px 16px",
              marginBottom: 10,
              fontWeight: 700,
              fontSize: 15,
              boxShadow: "0 2px 12px #e5c6fa33",
              textAlign: "center",
              transition: "all .2s"
            }}>
              <span style={{ fontSize: 18, marginLeft: 6 }}>💡</span>
              {errorMsg}
            </div>
          )}

          {/* وصف المشروع */}
          <div style={{ fontWeight: 900, color: "#23273c", fontSize: 19 }}>
            فكرة مشروعك أو وصف مختصر:
          </div>
          <textarea
            value={desc}
            onChange={e => setDesc(e.target.value)}
            rows={5}
            placeholder="مثال: متجر إلكتروني عصري لبيع منتجات…"
            style={{
              width: "100%",
              borderRadius: 12,
              border: "1.6px solid #ececff",
              fontSize: 17,
              padding: "18px 17px",
              background: "#f8f7fd",
              resize: "none",
              maxHeight: 140,
              overflowY: "auto"
            }}
          />

          {/* المميزات الإضافية */}
          <div style={{
            background: "#f8f7fd",
            borderRadius: 16,
            boxShadow: "0 4px 18px #24e6ca08",
            border: "1.5px solid #e7e3ff",
            padding: "18px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            margin: "10px 0"
          }}>
            <div style={{ color: "#21c692", fontWeight: 900, fontSize: 17, marginBottom: 6 }}>
              المميزات الإضافية:
            </div>
            {featureOptions.length === 0 && (
              <div style={{ color: "#aaa", fontWeight: 700, fontSize: 15 }}>لا يوجد مميزات لهذا النوع</div>
            )}
            {featureOptions.map(f => (
              <label key={f.id} style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                fontWeight: 800,
                cursor: "pointer"
              }}>
                <input
                  type="checkbox"
                  checked={features.includes(f.id)}
                  onChange={() =>
                    setFeatures(features.includes(f.id)
                      ? features.filter(x => x !== f.id)
                      : [...features, f.id]
                    )
                  }
                  style={{
                    accentColor: "#21c692",
                    width: 18,
                    height: 18,
                    marginLeft: 4
                  }}
                />
                <span>{f.name}</span>
              </label>
            ))}
          </div>

          {/* الميزانية */}
          <div style={{ marginTop: 8, marginBottom: 8 }}>
            <div style={{
              fontWeight: 900,
              color: "#7c4dff",
              marginBottom: 8,
              fontSize: 17,
              display: "flex",
              alignItems: "center",
              gap: 7
            }}>
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 22,
                height: 22,
                background: "linear-gradient(93deg,#24e6ca 40%,#7c4dff 100%)",
                borderRadius: "50%",
                color: "#fff",
                fontSize: 16,
                boxShadow: "0 2px 8px #7c4dff22"
              }}>💰</span>
              اختر ميزانية:
            </div>
            <div style={{ position: "relative", width: "100%" }}>
              <select
                value={budget}
                onChange={e => setBudget(e.target.value)}
                style={{
                  width: "100%",
                  borderRadius: 13,
                  border: "2px solid #e1deff",
                  fontSize: 17,
                  fontWeight: 900,
                  padding: "13px 44px 13px 16px",
                  background: "linear-gradient(93deg,#f8f7fd 80%,#e7e3ff 100%)",
                  color: budget ? "#7c4dff" : "#888",
                  appearance: "none",
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  outline: "none",
                  boxShadow: "0 2px 12px #a18fff0a",
                  cursor: "pointer",
                  transition: "border 0.18s"
                }}
              >
                <option value="">اختر...</option>
                {budgets.map(b => (
                  <option key={b.id} value={b.id}>{b.label}</option>
                ))}
              </select>
              <span style={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                fontSize: 18,
                color: "#7c4dff",
                opacity: 0.7
              }}>▼</span>
            </div>
          </div>

          {/* معاينة + إرسال */}
          <div
            style={{
              background: "linear-gradient(110deg,#f8f7fd 80%,#e7e3ff 100%)",
              borderRadius: 21,
              boxShadow: "0 7px 24px #a18fff13",
              border: "2px solid #e7e3ff",
              padding: "30px 22px 22px",
              display: "flex",
              flexDirection: "column",
              gap: 18,
              alignItems: "center",
              position: "relative",
              minHeight: 210,
              marginTop: 8
            }}
          >
            {/* شارة Live */}
            <div style={{
              position: "absolute",
              top: -18,
              right: 18,
              background: "linear-gradient(93deg,#7c4dff 60%,#24e6ca 100%)",
              color: "#fff",
              fontWeight: 900,
              fontSize: 15,
              borderRadius: 12,
              padding: "4px 18px",
              boxShadow: "0 2px 10px #7c4dff22",
              letterSpacing: ".5px"
            }}>
              <span role="img" aria-label="live">🔥</span> معاينة Live
            </div>

            {/* محتوى المعاينة */}
            <div style={{
              width: "100%",
              maxWidth: 400,
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 2px 12px #7c4dff0a",
              padding: "20px 18px",
              display: "flex",
              flexDirection: "column",
              gap: 13,
              fontSize: 16,
              fontWeight: 700,
              color: "#23273c"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <img src={webRocketIcon} alt="" style={{ width: 22, opacity: 0.8 }} />
                <span>نوع الموقع:</span>
                <span style={{ color: "#7c4dff", fontWeight: 900 }}>{currentType?.name || "—"}</span>
                {currentType && (
                  <span style={{ color: "#888", fontWeight: 700, fontSize: 15, marginRight: 8 }}>
                    (تقريباً {currentType.price} {currentType.unit})
                  </span>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{
                  display: "inline-flex",
                  width: 20,
                  height: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  color: "#24e6ca"
                }}>📝</span>
                <span>الوصف:</span>
                <span style={{
                  color: "#444",
                  fontWeight: 700,
                  opacity: 0.92,
                  maxWidth: 180,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}>
                  {desc || "—"}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
                <span style={{
                  display: "inline-flex",
                  width: 20,
                  height: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  color: "#21c692"
                }}>✨</span>
                <span>المميزات:</span>
                <span style={{ color: "#444", fontWeight: 700 }}>
                  {features.length
                    ? (
                      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                        {features.map((id, i) => (
                          <li key={i} style={{ color: "#23273c", fontWeight: 700, marginBottom: 2 }}>
                            ✅ {featureOptions.find(f => f.id === id)?.name}
                          </li>
                        ))}
                      </ul>
                    )
                    : <span style={{ color: "#bbb" }}>—</span>
                  }
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{
                  display: "inline-flex",
                  width: 20,
                  height: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  color: "#7c4dff"
                }}>💰</span>
                <span>الميزانية:</span>
                <span style={{ color: "#7c4dff", fontWeight: 900 }}>
                  {budgets.find(b => b.id === Number(budget))?.label || "—"}
                </span>
              </div>
            </div>

            {/* زر الإرسال */}
            <button
              onClick={isFormValid ? handleSubmit : () => setErrorMsg("يرجى تعبئة جميع الحقول المطلوبة لإرسال الطلب.")}
              disabled={!isFormValid}
              style={{
                marginTop: 18,
                padding: "15px 0",
                width: 220,
                borderRadius: 14,
                background: isFormValid
                  ? "linear-gradient(93deg,#7c4dff 55%,#24e6ca 100%)"
                  : "linear-gradient(93deg,#d1c6e6 40%,#b6e6f7 120%)",
                color: "#fff",
                fontWeight: 900,
                fontSize: 19,
                border: "none",
                cursor: isFormValid ? "pointer" : "not-allowed",
                boxShadow: "0 2px 18px #8376fd33",
                opacity: isFormValid ? 1 : 0.6,
                transition: "background 0.2s, box-shadow 0.2s"
              }}
              onMouseOver={e => isFormValid && (e.currentTarget.style.boxShadow = "0 4px 24px #7c4dff44")}
              onMouseOut={e => isFormValid && (e.currentTarget.style.boxShadow = "0 2px 18px #8376fd33")}
            >
              أرسل الطلب الآن 🚀
            </button>
          </div>
        </div>
      </div>

      {/* رسالة النجاح */}
{showWebSuccess && lastOrder && (
  <div style={{
    position: "fixed", inset: 0, zIndex: 99,
    background: "rgba(125,88,255,0.11)",
    backdropFilter: "blur(10px)",
    display: "flex", alignItems: "center", justifyContent: "center"
  }}>
    <div style={{
      background: "#fff", borderRadius: 24, boxShadow: "0 8px 48px #9768fa33",
      padding: "54px 36px 30px", minWidth: 355, textAlign: "center", maxWidth: "92vw",
      border: "2px solid #25eacb"
    }}>
      <img src={webRocketIcon} alt="نجاح" style={{
        width: 60, marginBottom: 14, filter: "drop-shadow(0 2px 8px #00ffb3aa)"
      }} />
      <h2 style={{
        color: "#7c4dff", margin: "14px 0 9px", fontSize: 25, fontWeight: 800
      }}>
        🚀 تم استلام طلبك بنجاح!
      </h2>
      <div style={{
        color: "#5c5695", fontSize: 18, marginBottom: 18, lineHeight: "2", fontWeight: 500
      }}>
        شكرًا لاختيارك خدمة <span style={{ color: "#28d6b8", fontWeight: 700 }}>مواقع الويب</span> من منجز.<br />
        فريقنا سيبدأ فورًا بمتابعة طلبك وتحليل فكرتك.<br />
        استعد لموقع عصري وتجربة احترافية!
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
          <span style={{ color: "#7c4dff", fontWeight: 900 }}>نوع الموقع:</span>
          <span style={{ marginRight: 8 }}>
            {webTypes.find(t => t.id === Number(lastOrder.type))?.name || "—"}
          </span>
        </div>
        <div style={{ marginBottom: 7 }}>
          <span style={{ color: "#21c692", fontWeight: 900 }}>المميزات:</span>
          {lastOrder.features?.length ? (
            <ul style={{ margin: "4px 0 0 0", padding: 0, listStyle: "none" }}>
              {lastOrder.features.map((id, i) => (
                <li key={i} style={{ color: "#23273c", fontWeight: 700, marginBottom: 2 }}>
                  ✅ {webTypes.find(t => t.id === Number(lastOrder.type))?.features?.find(f => f.id === id)?.name}
                </li>
              ))}
            </ul>
          ) : <span style={{ color: "#bbb", marginRight: 8 }}>—</span>}
        </div>
        <div style={{ marginBottom: 7 }}>
          <span style={{ color: "#7c4dff", fontWeight: 900 }}>الميزانية:</span>
          <span style={{ marginRight: 8 }}>
            {budgets.find(b => b.id === Number(lastOrder.budget))?.label || "—"}
          </span>
        </div>
        <div>
          <span style={{ color: "#24e6ca", fontWeight: 900 }}>الوصف:</span>
          <span style={{ marginRight: 8 }}>{lastOrder.desc || "—"}</span>
        </div>
      </div>
      <button onClick={() => setShowWebSuccess(false)} style={{
        marginTop: 16,
        background: "linear-gradient(90deg,#7c4dff,#24e6ca 90%)",
        color: "#fff", border: "none", borderRadius: 13,
        fontWeight: "bold", fontSize: 17, padding: "11px 38px",
        boxShadow: "0 2px 18px #00ffb344", cursor: "pointer"
      }}>إغلاق</button>
    </div>
  </div>
)}
    </div>
  );
}
