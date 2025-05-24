import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import rocketIcon from "../assets/svg/seo-rocket.svg";
import shieldIcon from "../assets/svg/seo-shield.svg";
import awardIcon  from "../assets/svg/seo-award.svg";
import googleIcon from "../assets/svg/google.svg";
import chartIcon  from "../assets/svg/chart.svg";
import sparkIcon  from "../assets/svg/spark.svg";
import waveCloud  from "../assets/svg/wave-cloud.svg";
import stoneIcon  from "../assets/svg/stone.svg";
import seoRocketIcon from "../assets/svg/seo-rocket.svg";

export default function SeoOrder() {
  const [site, setSite]         = useState("");
  const [goal, setGoal]         = useState(null);
  const [goalInputs, setGoalInputs] = useState({});
  const [keywords, setKeywords] = useState("");
  const [details, setDetails]   = useState("");
  const [sending, setSending]   = useState(false);
  const [goals, setGoals]       = useState([]);
  const [budgets, setBudgets]   = useState([]);
  const [budgetId, setBudgetId] = useState("");
  const [showSeoSuccess, setShowSeoSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [goalFeatures, setGoalFeatures] = useState([]);
  const [goalLoading, setGoalLoading] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);

  useEffect(() => { document.title = " (SEO) خدمة"; }, []);

  // جلب خطط السيو ديناميكياً من الباك اند
  useEffect(() => {
    fetch("https://monjez-online.onrender.com/api/seo-goals")
      .then(res => res.json())
      .then(data => setGoals(data))
      .catch(() => setGoals([]));
  }, []);

  // جلب الميزانيات من القاعدة
  useEffect(() => {
    axios.get('https://monjez-online.onrender.com/api/budgets/SEO & تسويق رقمي')
      .then(res => setBudgets(res.data))
      .catch(() => setBudgets([]));
  }, []);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const siteTypeId = parseInt(params.get("type"), 10) || 7;

  // تحقق من اكتمال البيانات
  const isFormValid =
    site.trim() &&
    goal &&
    budgetId &&
    (
      !goals.find(g => g.id === goal && (g.name || g.label)?.includes("كلمات بحث"))
        ? (goalInputs[goal] && goalInputs[goal].trim())
        : keywords.trim()
    );

 const handleSubmit = async e => {
  e.preventDefault();
  setErrorMsg("");
  setSending(true);

  let formatted = site.trim();
  if (!/^https?:\/\//i.test(formatted)) {
    formatted = `https://${formatted}`;
  }

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user?.id) {
    setErrorMsg("🔑 يجب تسجيل الدخول أولًا!");
    setSending(false);
    return;
  }
  if (!site.trim()) {
    setErrorMsg("🌐 يرجى إدخال رابط موقعك الإلكتروني.");
    setSending(false);
    return;
  }
  if (!goal) {
    setErrorMsg("🎯 يرجى اختيار هدفك الأساسي في السيو.");
    setSending(false);
    return;
  }
  if (!budgetId) {
    setErrorMsg("💰 يرجى اختيار الميزانية المناسبة.");
    setSending(false);
    return;
  }
  if (
    goals.find(g => g.id === goal && (g.name || g.label)?.includes("كلمات بحث")) &&
    !keywords.trim()
  ) {
    setErrorMsg("🔑 يرجى إدخال كلمات البحث المستهدفة.");
    setSending(false);
    return;
  }

  const goalInputDetails = goals.find(g => g.id === goal && !(g.name || g.label)?.includes("كلمات بحث"))
    ? goalInputs[goal]?.trim() || null
    : null;

  try {
    const res = await fetch("https://monjez-online.onrender.com/api/orders/seo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        site: formatted,
        goal_id: goal,
        keywords: keywords.trim() || null,
        details: goalInputDetails || details.trim() || null, // ✅ تم التصحيح
        budget_id: budgetId
      })
    });

    const data = await res.json();

   if (res.ok) {
  setLastOrder({
    site: formatted,
    goal: goals.find(g => g.id === goal)?.name || goals.find(g => g.id === goal)?.label,
    goalInput: goalInputDetails,
    keywords,
    details,
    budget: budgets.find(b => b.id === budgetId)?.label,
    goalFeatures: goalFeatures
  });
  setShowSeoSuccess(true);
  setSite("");
  setGoal(null);
  setGoalInputs({});
  setKeywords("");
  setDetails("");
  setBudgetId("");
  setErrorMsg("");
} else {
      setErrorMsg(data.error || "❌ حدث خطأ أثناء الإرسال");
    }
  } catch {
    setErrorMsg("⚠️ تعذر الاتصال بالخادم!");
  }

  setSending(false);
};


  // جلب مميزات الهدف عند تغييره
  useEffect(() => {
    if (!goal) {
      setGoalFeatures([]);
      return;
    }
    setGoalLoading(true);
    fetch(`https://monjez-online.onrender.com/api/seo-goals/${goal}`)
      .then(res => res.json())
      .then(data => setGoalFeatures(data.features || []))
      .catch(() => setGoalFeatures([]))
      .finally(() => setGoalLoading(false));
  }, [goal]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(120deg,#f8f8ff 70%,#e2e8fa 100%)",
      fontFamily: "Tajawal, Arial",
      paddingBottom: 90,
      direction: "rtl",
      overflowX: "hidden"
    }}>
      {/* Header */}
      <div style={{
        position: "relative",
        textAlign: "center",
        background: "linear-gradient(101deg,#a18fff 50%,#8fc5ff 110%)",
        padding: "60px 0 100px"
      }}>
        <img src={rocketIcon} alt="SEO Rocket" style={{ width: 80, filter: "drop-shadow(0 5px 22px #7c4dff33)" }} />
        <img src={waveCloud} alt="Cloud" style={{ position: "absolute", top: 0, left: 0, width: 60, opacity: 0.8 }} />
        <img src={waveCloud} alt="Cloud" style={{ position: "absolute", top: 10, right: 0, width: 70, opacity: 0.8 }} />
        <img src={stoneIcon} alt="Stone" style={{ position: "absolute", bottom: -10, left: 30, width: 35, opacity: 0.7 }} />
        <img src={stoneIcon} alt="Stone" style={{ position: "absolute", bottom: -10, right: 40, width: 30, opacity: 0.7 }} />

        <h1 style={{
          margin: 0,
          fontSize: "2.5rem",
          fontWeight: 900,
          color: "#fff",
          textShadow: "0 4px 18px #7c4dff33, 0 1px 0 #21c692",
          letterSpacing: ".5px"
        }}>
          🚀 اطلب خدمة SEO — انطلق للصفحة الأولى!
        </h1>
        <p style={{ color: "#e8edff", fontSize: 20, fontWeight: 700, marginTop: 8 }}>
          تقارير سعودية، جودة Google، دعم احترافي… منصة تصدر حقيقية!
        </p>
      </div>

      {/* Form Section */}
      <section style={{
        maxWidth: 570,
        margin: "50px auto 60px",
        background: "#fff",
        borderRadius: 26,
        boxShadow: "0 16px 48px #a18fff22",
        border: "2.5px solid #e8e3ff",
        padding: "44px 36px",
        position: "relative",
        zIndex: 2
      }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 22, marginBottom: 22 }}>
          {[googleIcon, shieldIcon, awardIcon].map((icon, i) =>
            <img key={i} src={icon} alt="" style={{ width: i === 0 ? 38 : 32 }} />
          )}
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {/* Error Message */}
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

          {/* Site Input */}
          <label style={{ fontWeight: 900, color: "#7c4dff", fontSize: 17, marginBottom: 3 }}>موقعك الإلكتروني:</label>
          <div style={{
            display: "flex", alignItems: "center",
            background: "#f8f7fd", borderRadius: 14, padding: "13px 16px",
            border: "1.5px solid #e0e7ff", boxShadow: "0 2px 12px #a18fff11"
          }}>
            <img src={googleIcon} alt="" style={{ width: 22, opacity: 0.7 }} />
            <input
              type="text"
              value={site}
              onChange={e => setSite(e.target.value)}
              placeholder="مثال: www.example.com"
              required
              style={{
                flex: 1, border: "none", background: "none", outline: "none",
                fontWeight: 700, fontSize: 16, padding: "0 7px"
              }}
            />
          </div>

          {/* Goal Selection */}
          <label style={{ fontWeight: 900, color: "#7c4dff", fontSize: 17, marginBottom: 3 }}>هدفك الأساسي في السيو:</label>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {goals.map(g => (
              <button
                key={g.id}
                type="button"
                onClick={() => {
                  setGoal(g.id);
                  setGoalInputs(inputs => ({ ...inputs, [g.id]: inputs[g.id] || "" }));
                }}
                style={{
                  display: "flex", alignItems: "center", gap: 7,
                  padding: "10px 16px", borderRadius: 10,
                  border: goal === g.id ? "2.5px solid #7c4dff" : "1.5px solid #e0e7ff",
                  background: goal === g.id ? "linear-gradient(90deg,#7c4dff 60%,#21c692 120%)" : "#f7f7fd",
                  color: goal === g.id ? "#fff" : "#555",
                  fontWeight: 800, cursor: "pointer",
                  fontSize: 15.5, boxShadow: goal === g.id ? "0 2px 12px #21c69222" : "none",
                  transition: "all .15s"
                }}
              >
                {g.icon && <img src={
                  g.icon === "chart" ? chartIcon :
                  g.icon === "spark" ? sparkIcon :
                  g.icon === "award" ? awardIcon :
                  g.icon === "shield" ? shieldIcon :
                  g.icon === "google" ? googleIcon :
                  ""} alt="" style={{ width: 18 }} />}
                {g.name || g.label}
              </button>
            ))}
          </div>

          {/* عرض مميزات الهدف بشكل أنيق */}
          {goal && (
            <div style={{
              margin: "18px 0 -6px 0",
              background: "#f7f7fd",
              border: "1.5px solid #e0e7ff",
              borderRadius: 14,
              padding: "18px 18px 10px 18px",
              boxShadow: "0 2px 12px #a18fff11",
              minHeight: 40,
              transition: "all .2s"
            }}>
              {goalLoading ? (
                <div style={{ color: "#7c4dff", fontWeight: 800, fontSize: 15, textAlign: "center" }}>
                  جاري تحميل مميزات الهدف...
                </div>
              ) : goalFeatures.length > 0 ? (
                <>
                  <div style={{
                    color: "#21c692",
                    fontWeight: 900,
                    fontSize: 16,
                    marginBottom: 7,
                    letterSpacing: ".5px"
                  }}>
                    <span style={{ fontSize: 18, marginLeft: 6 }}>⭐</span>
                    مميزات الهدف المختار:
                  </div>
                  <ul style={{
                    margin: 0,
                    padding: "0 18px",
                    color: "#7c4dff",
                    fontWeight: 700,
                    fontSize: 15.5,
                    lineHeight: 2.1,
                    listStyle: "disc inside"
                  }}>
                    {goalFeatures.map(f => (
                      <li key={f.id} style={{
                        marginBottom: 2,
                        background: "#ede9fe",
                        borderRadius: 7,
                        display: "inline-block",
                        padding: "3px 13px",
                        color: "#6d28d9",
                        fontWeight: 800,
                        fontSize: 15.5,
                        marginInlineEnd: 8
                      }}>
                        {f.name}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <div style={{
                  color: "#b3b3cb",
                  fontWeight: 700,
                  fontSize: 15,
                  textAlign: "center"
                }}>
                  لا توجد مميزات محددة لهذا الهدف.
                </div>
              )}
            </div>
          )}

          {/* Dynamic Input for Each Goal */}
          {goal && (() => {
            const selectedGoal = goals.find(g => g.id === goal);
            // إذا الهدف فيه "كلمات بحث" أظهر input خاص بالكلمات
            if ((selectedGoal?.name || selectedGoal?.label)?.includes("كلمات بحث")) {
              return (
                <>
                  <label style={{ fontWeight: 900, color: "#7c4dff", fontSize: 17, marginBottom: 3 }}>كلمات البحث المستهدفة:</label>
                  <input
                    type="text"
                    value={keywords}
                    onChange={e => setKeywords(e.target.value)}
                    placeholder="مثال: تصميم مواقع، استضافة سعودية..."
                    required
                    style={{
                      padding: "12px",
                      borderRadius: 10,
                      border: "1.5px solid #e0e7ff",
                      fontWeight: 700,
                      fontSize: 15.5,
                      background: "#f8f7fd",
                      marginBottom: 2,
                      boxShadow: "0 1px 6px #a18fff11"
                    }}
                  />
                </>
              );
            }
            // غير ذلك أظهر input خاص بالهدف
            return (
              <>
                <label style={{
                  fontWeight: 900,
                  color: "#7c4dff",
                  fontSize: 17,
                  marginBottom: 3
                }}>
                  {selectedGoal?.inputLabel ||
                    `تفاصيل ${selectedGoal?.name || selectedGoal?.label}:`}
                </label>
                <input
                  type="text"
                  value={goalInputs[goal] || ""}
                  onChange={e =>
                    setGoalInputs(inputs => ({ ...inputs, [goal]: e.target.value }))
                  }
                  placeholder={`أدخل تفاصيل ${selectedGoal?.name || selectedGoal?.label} هنا...`}
                  required
                  style={{
                    padding: "12px",
                    borderRadius: 10,
                    border: "1.5px solid #e0e7ff",
                    fontWeight: 700,
                    fontSize: 15.5,
                    background: "#f8f7fd",
                    marginBottom: 2,
                    boxShadow: "0 1px 6px #a18fff11"
                  }}
                />
              </>
            );
          })()}

          {/* Budget Selection */}
          <label style={{ fontWeight: 900, color: "#7c4dff", fontSize: 17, marginBottom: 3 }}>
            اختر الميزانية:
          </label>
          <select
            value={budgetId}
            onChange={e => setBudgetId(e.target.value)}
            required
            style={{
              padding: "12px",
              borderRadius: 10,
              border: "1.5px solid #e0e7ff",
              fontWeight: 700,
              fontSize: 15.5,
              background: "#f8f7fd",
              marginBottom: 2,
              boxShadow: "0 1px 6px #a18fff11"
            }}
          >
            <option value="">اختر الميزانية المناسبة…</option>
            {budgets.map(budget => (
              <option key={budget.id} value={budget.id}>
                {budget.label}
              </option>
            ))}
          </select>

          {/* Details Input */}
          <label style={{ fontWeight: 900, color: "#7c4dff", fontSize: 17, marginBottom: 3 }}>تفاصيل إضافية (اختياري):</label>
          <textarea
            value={details}
            onChange={e => setDetails(e.target.value)}
            placeholder="أي تفاصيل أو ملاحظات إضافية حول موقعك أو أهدافك..."
            rows={3}
            style={{
              padding: "12px",
              borderRadius: 10,
              border: "1.5px solid #e0e7ff",
              fontWeight: 700,
              fontSize: 15.5,
              background: "#f8f7fd",
              resize: "vertical",
              minHeight: 48,
              boxShadow: "0 1px 6px #a18fff11"
            }}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || sending}
            style={{
              padding: "15px 0",
              borderRadius: 14,
              background: sending || !isFormValid
                ? "#ccc"
                : "linear-gradient(90deg,#21c692 60%,#7c4dff 120%)",
              color: "#fff",
              fontWeight: 900,
              fontSize: 19,
              cursor: sending || !isFormValid ? "not-allowed" : "pointer",
              boxShadow: "0 4px 18px #21c69222",
              letterSpacing: ".5px",
              marginTop: 10,
              border: "none",
              transition: "all .16s"
            }}
          >
            {sending ? "🚀 جاري إرسال الطلب..." : "🚀 انطلق للصفحة الأولى!"}
          </button>
        </form>

        {showSeoSuccess && lastOrder && (
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
      <img src={seoRocketIcon} alt="نجاح SEO" style={{
        width: 60, marginBottom: 14, filter: "drop-shadow(0 2px 8px #00ffb3aa)"
      }} />
      <h2 style={{
        color: "#11cc9d", margin: "14px 0 9px", fontSize: 25, fontWeight: 800
      }}>
        🚀 تم استلام طلبك بنجاح!
      </h2>
      <div style={{
        color: "#5c5695", fontSize: 18, marginBottom: 18, lineHeight: "2", fontWeight: 500
      }}>
        شكرًا لاختيارك خدمة <span style={{ color: "#28d6b8", fontWeight: 700 }}>SEO</span> الاحترافية من منجز.<br />
        فريقنا سيبدأ فورًا بمتابعة طلبك وتحليل موقعك للوصول للصفحة الأولى في Google.<br />
        تقارير مفصلة، دعم مباشر، وتحسينات فورية.<br />
        استعد للتميز في نتائج البحث!
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
          <span style={{ color: "#7c4dff", fontWeight: 900 }}>الموقع:</span>
          <span style={{ marginRight: 8 }}>{lastOrder.site || "—"}</span>
        </div>
        <div style={{ marginBottom: 7 }}>
          <span style={{ color: "#21c692", fontWeight: 900 }}>الهدف:</span>
          <span style={{ marginRight: 8 }}>{lastOrder.goal || "—"}</span>
        </div>
        {lastOrder.goalInput && (
          <div style={{ marginBottom: 7 }}>
            <span style={{ color: "#7c4dff", fontWeight: 900 }}>تفاصيل الهدف:</span>
            <span style={{ marginRight: 8 }}>{lastOrder.goalInput}</span>
          </div>
        )}
        {lastOrder.keywords && (
          <div style={{ marginBottom: 7 }}>
            <span style={{ color: "#21c692", fontWeight: 900 }}>كلمات البحث:</span>
            <span style={{ marginRight: 8 }}>{lastOrder.keywords}</span>
          </div>
        )}
        <div style={{ marginBottom: 7 }}>
          <span style={{ color: "#7c4dff", fontWeight: 900 }}>الميزانية:</span>
          <span style={{ marginRight: 8 }}>{lastOrder.budget || "—"}</span>
        </div>
        {lastOrder.details && (
          <div style={{ marginBottom: 7 }}>
            <span style={{ color: "#21c692", fontWeight: 900 }}>تفاصيل إضافية:</span>
            <span style={{ marginRight: 8 }}>{lastOrder.details}</span>
          </div>
        )}
        {lastOrder.goalFeatures?.length > 0 && (
          <div style={{ marginBottom: 7 }}>
            <span style={{ color: "#7c4dff", fontWeight: 900 }}>مميزات الهدف:</span>
            <ul style={{ margin: "4px 0 0 0", padding: 0, listStyle: "none" }}>
              {lastOrder.goalFeatures.map(f => (
                <li key={f.id} style={{ color: "#23273c", fontWeight: 700, marginBottom: 2 }}>
                  ⭐ {f.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button onClick={() => setShowSeoSuccess(false)} style={{
        marginTop: 6,
        background: "linear-gradient(90deg,#2beeb1,#5e96fd 90%)",
        color: "#fff", border: "none", borderRadius: 13,
        fontWeight: "bold", fontSize: 17, padding: "11px 38px",
        boxShadow: "0 2px 18px #00ffb344", cursor: "pointer"
      }}>إغلاق</button>
    </div>
  </div>
)}

        <ul style={{
          marginTop: 30,
          color: "#21c692",
          fontWeight: 700,
          listStyle: "inside"
        }}>
          <li>كل الطلبات بتقارير وفواتير سعودية رسمية</li>
          <li>خدمة دعم وتعديل فوري مجانًا</li>
        </ul>
      </section>

      <section style={{ textAlign: "center", padding: "40px 20px" }}>
        <h2 style={{
          fontSize: 24, fontWeight: 900, color: "#7c4dff", marginBottom: 20
        }}>
          لماذا منصة منجز أفضل خيار SEO؟
        </h2>
        <div style={{
          display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center"
        }}>
          {[
            { icon: rocketIcon, title: "تقنيات Google Rocket", desc: "أسرع صعود بأقل تكلفة" },
            { icon: awardIcon,  title: "تقارير وفواتير سعودية", desc: "توثق كل النتائج رسمياً" },
            { icon: shieldIcon, title: "أمان وحماية متكاملة", desc: "حماية بياناتك وتجربتك" }
          ].map((item, i) => (
            <div key={i} style={{
              flex: "0 0 220px", background: "#fff", borderRadius: 12,
              padding: 20, boxShadow: "0 4px 16px #ddd"
            }}>
              <img src={item.icon} alt="" style={{ width: 40 }} />
              <h3 style={{
                fontSize: 18, fontWeight: 900, color: "#333", margin: "10px 0"
              }}>{item.title}</h3>
              <p style={{ color: "#555", fontSize: 14 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer style={{
        textAlign: "center",
        padding: 20,
        color: "#7c4dff",
        fontWeight: 700
      }}>
        🚀 SEO Rocket | powered by منجز
      </footer>
    </div>
  );
}