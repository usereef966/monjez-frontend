import React, { useState, useEffect } from "react";
import axios from "axios";
import systemCenterIcon from "../assets/svg/system-center.svg";
import aiIntegrationIcon from "../assets/svg/ai-integration.svg";
import securityShieldIcon from "../assets/svg/security-shield.svg";
import apiLinkIcon from "../assets/svg/api-link.svg";
import dashboardMagicIcon from "../assets/svg/dashboard-magic.svg";
import automationFlowIcon from "../assets/svg/automation-flow.svg";
import dataCloudIcon from "../assets/svg/data-cloud.svg";
import supportRocketIcon from "../assets/svg/support-rocket.svg";

const icons = {
  "system-center.svg": systemCenterIcon,
  "ai-integration.svg": aiIntegrationIcon,
  "security-shield.svg": securityShieldIcon,
  "api-link.svg": apiLinkIcon,
  "dashboard-magic.svg": dashboardMagicIcon,
  "automation-flow.svg": automationFlowIcon,
  "data-cloud.svg": dataCloudIcon,
  "support-rocket.svg": supportRocketIcon,
};

export default function WebDevOrder() {
  const [services, setServices] = useState([]);
  const [features, setFeatures] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [idea, setIdea] = useState("");
  const [budget, setBudget] = useState("");
  const [details, setDetails] = useState("");
  const [audience, setAudience] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [lastOrder, setLastOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [budgets, setBudgets] = useState([]);


  useEffect(() => {
  axios.get("/api/budgets?section=تطوير الأنظمة").then(({ data }) => setBudgets(data));
}, []);

  // جلب الخدمات
  useEffect(() => {
    axios.get("/api/system-types").then(({ data }) => setServices(data));
    document.title = "خدمة تطوير أنظمة الويب";
  }, []);

  // جلب الميزات حسب الخدمة
  useEffect(() => {
    if (selectedService) {
      axios.get(`/api/system-types/${selectedService.id}/features`)
        .then(({ data }) => setFeatures(data));
      setSelectedFeatures([]);
    } else {
      setFeatures([]);
      setSelectedFeatures([]);
    }
  }, [selectedService]);

  // تحقق من اكتمال البيانات
  const isFormValid = idea.trim() && budget && selectedService;

  // إرسال الطلب
  const handleSubmit = async e => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.id) {
      setErrorMsg("يجب تسجيل الدخول أولًا.");
      setLoading(false);
      return;
    }
    if (!selectedService) {
      setErrorMsg("🚦 يرجى اختيار نوع النظام أولاً لإكمال الطلب.");
      setLoading(false);
      return;
    }
    if (!idea.trim() || !budget) {
      setErrorMsg("💡 نحتاج منك تعبئة جميع الحقول المهمة حتى نفهم فكرتك ونخدمك بأفضل صورة! الرجاء إكمال البيانات ثم أرسل الطلب.");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.post("/api/orders/system", {
        user_id: user.id,
        system_type_id: selectedService.id,
        description: idea,
        idea,
        details,
        budget_id: Number(budget),
        features: selectedFeatures
      });
      if (res.status === 201 || res.status === 200) {
        setShowSuccess(true);
        setLastOrder(res.data.order);
        setIdea(""); setBudget(""); setDetails(""); setSelectedFeatures([]); setSelectedService(null);
      } else {
        setErrorMsg(res.data?.error || "❌ حدث خطأ أثناء الإرسال.");
      }
    } catch (err) {
      setErrorMsg("⚠️ تعذّر الاتصال بالخادم، حاول مرة أخرى.");
    }
    setLoading(false);
  };

  // إغلاق رسالة النجاح عند الضغط خارجها أو على زر إغلاق
  const handleCloseSuccess = e => {
    if (e?.target?.id === "success-modal" || !e) {
      setShowSuccess(false);
      setLastOrder(null);
    }
  };

  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #e6f3ff 0%, #e5e8ff 65%, #e5fff7 100%)",
        overflow: "hidden",
        fontFamily: "Tajawal, Arial, sans-serif",
        position: "relative",
        paddingTop: 110
      }}
    >
      {/* موجة هيدر */}
      <div style={{ position: "relative", width: "100%", minHeight: 220, zIndex: 2 }}>
        <div style={{
          position: "relative",
          width: "100%",
          textAlign: "center",
          zIndex: 3,
          paddingTop: 52
        }}>
          <h2 style={{
            fontSize: 40, fontWeight: 900, color: "#fff",
            textShadow: "0 4px 24px #7c4dffbb,0 1px 2px #24e9ca99",
            margin: 0, letterSpacing: ".03em", lineHeight: "58px", marginTop: -40
          }}>
            حلول عبقرية في تطوير الأنظمة 🚀
          </h2>
        </div>
      </div>

      {/* الخدمات */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 32,
        maxWidth: 950,
        margin: "0 auto",
        marginTop: 0,
        marginBottom: 45,
        zIndex: 10
      }}>
        {services.map((item, i) => (
          <div
            key={item.id}
            tabIndex={0}
            onClick={() => setSelectedService(item)}
            style={{
              background: selectedService?.id === item.id ? "#e9f0ff" : "#fff",
              borderRadius: 26,
              boxShadow: selectedService?.id === item.id ? "0 8px 24px #7c4dff14" : "0 2px 8px #c1e1ff11",
              border: selectedService?.id === item.id ? "2.5px solid #7c4dff" : "2.2px solid #e4e6fc",
              display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", cursor: "pointer",
              padding: "33px 0 18px 0", minWidth: 120, minHeight: 124,
              transition: "all .19s",
              fontWeight: 700,
              position: "relative"
            }}
            onMouseEnter={e => {
              const tooltip = document.createElement("div");
              tooltip.innerHTML = `
                <div style="
                  background: #fff;
                  color: #7c4dff;
                  padding: 18px 28px 16px 28px;
                  border-radius: 18px;
                  box-shadow: 0 8px 32px #7c4dff22;
                  font-size: 16px;
                  font-weight: bold;
                  z-index: 9999;
                  white-space: pre-line;
                  max-width: 380px;
                  min-width: 220px;
                  text-align: right;
                  line-height: 1.9;
                  position: relative;
                  ">
                  <span>${item.description || "لا يوجد وصف"}</span>
                  <span style="
                    position: absolute;
                    bottom: -14px;
                    right: 50%;
                    transform: translateX(50%);
                    width: 0; height: 0;
                    border-left: 13px solid transparent;
                    border-right: 13px solid transparent;
                    border-top: 14px solid #fff;
                    filter: drop-shadow(0 2px 8px #7c4dff22);
                  "></span>
                </div>
              `;
              tooltip.style.position = "absolute";
              tooltip.style.top = "-38px";
              tooltip.style.right = "50%";
              tooltip.style.transform = "translateX(50%) translateY(-100%)";
              tooltip.style.pointerEvents = "none";
              tooltip.className = "system-tooltip";
              e.currentTarget.appendChild(tooltip);
            }}
            onMouseLeave={e => {
              const tooltip = e.currentTarget.querySelector(".system-tooltip");
              if (tooltip) tooltip.remove();
            }}
          >
            <img src={item.icon_url || icons[item.icon] || systemCenterIcon} alt={item.name}
              style={{
                width: 36, height: 36, marginBottom: 11,
                filter: selectedService?.id === item.id ? "drop-shadow(0 3px 9px #7c4dff55)" : "none",
                transition: "all .16s"
              }} />
            <div style={{
              color: "#5e5a99",
              fontWeight: 800,
              fontSize: 17,
              textAlign: "center",
              letterSpacing: ".01em"
            }}>{item.name}</div>
          </div>
        ))}
      </div>

      {/* الميزات */}


      {/* النموذج */}
      <form
        onSubmit={handleSubmit}
        style={{
          background: "linear-gradient(120deg,#fff,#f3fcff 95%)",
          borderRadius: 29,
          boxShadow: "0 8px 32px #a488fa13,0 2px 10px #7c4dff09",
          border: "2.2px solid #e5e2fc",
          padding: "36px 28px 26px 28px",
          margin: "0 auto",
          maxWidth: 420,
          position: "relative",
          zIndex: 12,
          minHeight: 220,
          marginBottom: 40
        }}>
        <div style={{
          fontWeight: 900, fontSize: 22, color: "#8247e5", marginBottom: 15, textAlign: "center"
        }}>
          {selectedService?.name || "اختر الخدمة أولاً"}
        </div>
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
        <input
          placeholder="فكرة التطبيق أو اسم المشروع"
          value={idea}
          onChange={e => setIdea(e.target.value)}
          required
          style={{
            width: "100%", borderRadius: 12, border: "2px solid #ece8fb",
            background: "#f7f6ff", padding: "13px", fontWeight: 600,
            color: "#5e5a99", fontSize: 15, marginBottom: 13
          }}
        />
        <textarea
          placeholder="تفاصيل إضافية عن المشروع (يرجى شرح فكرتك بوضوح)"
          rows={3}
          value={details}
          onChange={e => setDetails(e.target.value)}
          style={{
            width: "100%", borderRadius: 11, border: "2px solid #ece8fb",
            fontSize: 15, color: "#5e5a99", fontWeight: 600,
            marginBottom: 12, background: "#f7f6ff", padding: 11, outline: "none"
          }}
        />
        <select
  value={budget}
  onChange={e => setBudget(e.target.value)}
  required
  style={{
    width: "100%", borderRadius: 12, border: "2px solid #ece8fb",
    background: "#f7f6ff", padding: "13px", fontWeight: 600,
    color: "#5e5a99", fontSize: 15, marginBottom: 13
  }}>
  <option value="">الميزانية المتوقعة</option>
  {budgets.map(b => (
    <option key={b.id} value={b.id}>
      {b.label}
    </option>
  ))}
</select>

        {/* صندوق الميزات */}
        {selectedService && (
          <div style={{
            border: "1.5px solid #b2f2e6",
            background: "#f6fffd",
            borderRadius: 16,
            padding: "18px 14px 10px 14px",
            margin: "0 0 18px 0",
            marginTop: 2,
            boxShadow: "0 2px 12px #b2f2e633"
          }}>
            <div style={{
              fontWeight: 800,
              color: "#1dbf73",
              marginBottom: 8,
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              gap: 8
            }}>
              <span>اختر الميزات المطلوبة</span>
              <span style={{
                fontSize: 13,
                color: "#888",
                fontWeight: 700
              }}>
                {selectedFeatures.length}/4
              </span>
            </div>
            {features.length > 0 ? (
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                marginBottom: 6
              }}>
                {features.map(f => (
                  <label
                    key={f.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      background: selectedFeatures.includes(f.id)
                        ? "linear-gradient(90deg,#e6f7fa 60%,#e8e0ff 100%)"
                        : "#fff",
                      border: selectedFeatures.includes(f.id)
                        ? "2px solid #1dbf73"
                        : "1.5px solid #e0e0e0",
                      borderRadius: 12,
                      padding: "8px 16px",
                      fontWeight: 800,
                      fontSize: 15,
                      boxShadow: selectedFeatures.includes(f.id)
                        ? "0 2px 8px #1dbf7333"
                        : "none",
                      cursor: "pointer",
                      minWidth: 120,
                      transition: "all .18s"
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedFeatures.includes(f.id)}
                      onChange={() => {
                        setSelectedFeatures(selectedFeatures =>
                          selectedFeatures.includes(f.id)
                            ? selectedFeatures.filter(x => x !== f.id)
                            : [...selectedFeatures, f.id]
                        );
                      }}
                      style={{
                        accentColor: "#1dbf73",
                        width: 18,
                        height: 18,
                        marginLeft: 4
                      }}
                    />
                    <span style={{
                      color: selectedFeatures.includes(f.id) ? "#1dbf73" : "#5e5a99",
                      fontWeight: 900
                    }}>
                      {f.name}
                    </span>
                  </label>
                ))}
              </div>
            ) : (
              <div style={{
                color: "#a259e6",
                background: "#f7f6ff",
                border: "1.5px solid #e5c6fa",
                borderRadius: 13,
                padding: "12px 16px",
                fontWeight: 800,
                fontSize: 15,
                textAlign: "center",
                marginBottom: 6
              }}>
                لا توجد ميزات متاحة لهذه الخدمة حالياً.
              </div>
            )}
            {/* رسالة الخطأ إذا لم يتم اختيار ميزة */}
            {selectedFeatures.length === 0 && (
              <div style={{
                color: "#e74c3c",
                fontWeight: 700,
                fontSize: 14,
                marginTop: 4
              }}>
                يجب اختيار ميزة واحدة على الأقل
              </div>
            )}
          </div>
        )}

        <input
          placeholder="الجمهور المستهدف (اختياري)"
          value={audience}
          onChange={e => setAudience(e.target.value)}
          style={{
            width: "100%", borderRadius: 12, border: "2px solid #ece8fb",
            background: "#f7f6ff", padding: "13px", fontWeight: 600,
            color: "#5e5a99", fontSize: 15, marginBottom: 13
          }}
        />

        <button
          type="submit"
          disabled={!isFormValid || loading}
          style={{
            width: "100%", padding: "13px", borderRadius: 15,
            background: isFormValid
              ? "linear-gradient(90deg,#7c4dff 40%,#22e0fd 120%)"
              : "linear-gradient(90deg,#d1c6e6 40%,#b6e6f7 120%)",
            color: "#fff", fontWeight: 900, fontSize: 19,
            border: "none", outline: "none", boxShadow: "0 3px 20px #7c4dff23",
            cursor: isFormValid && !loading ? "pointer" : "not-allowed",
            opacity: isFormValid && !loading ? 1 : 0.6,
            transition: "all .16s", letterSpacing: ".02em"
          }}
        >
          {loading ? "جاري الإرسال..." : "أرسل الطلب 🚀"}
        </button>
      </form>

      {/* رسالة النجاح مع أنميشن */}
      {showSuccess && lastOrder && (
        <div
          id="success-modal"
          onClick={handleCloseSuccess}
          style={{
            position: "fixed", inset: 0, zIndex: 99,
            background: "rgba(180,255,220,0.18)",
            backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "#fff", borderRadius: 22, boxShadow: "0 8px 48px #21ecb977",
              padding: "52px 38px 36px", minWidth: 330, textAlign: "center", maxWidth: "92vw",
              animation: "popIn .6s cubic-bezier(.23,1.3,.32,1.01)"
            }}>
            <img src={supportRocketIcon} alt="نجاح" style={{ width: 64, marginBottom: 12, animation: "rocket 1.2s" }} />
            <h2 style={{ color: "#18e388", margin: "12px 0 8px", fontSize: 26 }}>🎉 تم استقبال طلبك!</h2>
            <div style={{ color: "#337961", fontSize: 18, marginBottom: 16, lineHeight: "1.8" }}>
              <b>رقم الطلب:</b> {lastOrder.id}<br />
              <b>الخدمة:</b> {lastOrder.service?.name}<br />
              <b>الميزات:</b> {lastOrder.features?.length ? lastOrder.features.map(f => f.name).join("، ") : "بدون ميزات إضافية"}<br />
              <b>الميزانية:</b> {lastOrder.budget?.label || "غير محددة"}<br />
              <b>فكرتك:</b> {lastOrder.description}
            </div>
            <button onClick={() => handleCloseSuccess()} style={{
              marginTop: 4, background: "#18e388", color: "#fff",
              border: "none", borderRadius: 10, fontWeight: "bold",
              fontSize: 17, padding: "10px 40px", cursor: "pointer", boxShadow: "0 2px 16px #24fca922"
            }}>إغلاق</button>
          </div>
          <style>{`
            @keyframes popIn {
              0% { transform: scale(.7) translateY(60px); opacity: 0; }
              100% { transform: scale(1) translateY(0); opacity: 1; }
            }
            @keyframes rocket {
              0% { transform: translateY(60px) scale(.7) rotate(-12deg); opacity: 0; }
              70% { transform: translateY(-10px) scale(1.1) rotate(6deg); opacity: 1; }
              100% { transform: translateY(0) scale(1) rotate(0deg); }
            }
          `}</style>
        </div>
      )}

      {/* خط سفلي للتحفيز */}
      <div style={{
        margin: "18px auto 11px", color: "#25b358", fontSize: 18, fontWeight: 700, textAlign: "center"
      }}>
        ✔️ جميع الطلبات تحت إشراف سعودي 100%
      </div>
    </div>
  );
}
