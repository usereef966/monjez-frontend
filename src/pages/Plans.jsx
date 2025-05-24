import React, { useState, useEffect } from "react";
import checkIcon from "../assets/svg/check.svg";
import systemIcon from "../assets/svg/system-center.svg";
import xIcon from "../assets/svg/x.svg"; // أضف أيقونة X (يفضل SVG شفافة وأنيقة)

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [features, setFeatures] = useState([]);
  const [selected, setSelected] = useState(1);

  useEffect(() => {
    fetch("https://monjez-online.onrender.com/api/plans")
      .then(res => res.json())
      .then(data => setPlans(data));
    fetch("https://monjez-online.onrender.com/api/features")
      .then(res => res.json())
      .then(data => setFeatures(data));
  }, []);

  // إزالة الميزات المتكررة حسب الاسم
  const uniqueFeatures = features.filter(
    (feat, idx, arr) => arr.findIndex(f => f.name === feat.name) === idx
  );

  return (
    <div dir="rtl" style={{
      minHeight: "100vh",
      background: "linear-gradient(120deg, #e6f3ff 0%, #f4eaff 100%)",
      fontFamily: "Tajawal, Arial, sans-serif"
    }}>
      {/* هيدر الصفحة */}
      <div style={{
        width: "100%", textAlign: "center", marginTop: 38, marginBottom: 8
      }}>
        <img src={systemIcon} alt="خطط منجز" style={{
          width: 54, marginBottom: 7, borderRadius: 13, boxShadow: "0 4px 12px #7c4dff18"
        }} />
        <h1 style={{
          color: "#7c4dff", fontWeight: 900, fontSize: 31, marginBottom: 3
        }}>خططنا وأسعارنا</h1>
        <div style={{
          color: "#555", fontWeight: 700, fontSize: 16
        }}>اختر الباقة التي تناسب طموحك — كل شيء ديناميكي وجاهز للطلب</div>
      </div>

      {/* الباقات */}
      <div style={{
        display: "flex",
        gap: 32,
        justifyContent: "center",
        flexWrap: "wrap",
        margin: "32px auto 12px",
        maxWidth: 1080
      }}>
        {plans.map((plan, idx) => (
          <PlanCard
            key={plan.id}
            name={plan.name}
            price={plan.price}
            unit={plan.unit}
            features={plan.features}
            best={plan.is_best === 1 || plan.is_best === true}
            link={plan.link}
            active={selected === idx}
            onClick={() => setSelected(idx)}
          />
        ))}
      </div>

      {/* جدول مقارنة ديناميكي */}
      <div style={{
        margin: "48px auto 24px auto", background: "#fff", borderRadius: 18,
        boxShadow: "0 3px 20px #7c4dff14", padding: "32px 16px", maxWidth: 980
      }}>
        <h3 style={{ textAlign: "center", color: "#24e9ca", fontWeight: 900, fontSize: 21, marginBottom: 23 }}>
          مقارنة مزايا كل خطة
        </h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%", borderCollapse: "collapse", fontWeight: 700, fontSize: 15, minWidth: 700
          }}>
            <thead>
              <tr>
                <th style={cellStyle}>الميزة</th>
                {plans.map((p, i) => (
                  <th key={i} style={cellStyle}>{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {uniqueFeatures.map((feat, i) => (
                <tr key={feat.id} style={{ background: i % 2 ? "#f8f6ff" : "#fff" }}>
                  <td style={cellStyle}>{feat.name}</td>
                  {plans.map((plan, j) => {
                    const found = Array.isArray(plan.features)
                      ? plan.features.some(f => f.id === feat.id || f.name === feat.name)
                      : false;
                    return (
                      <td key={j} style={{
                        ...cellStyle,
                        color: found ? "#26de81" : "#ff6b81",
                        fontWeight: found ? 900 : 700,
                        background: "transparent"
                      }}>
                        {found ? (
                          <span style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "#eafaf3",
                            borderRadius: "50%",
                            width: 28,
                            height: 28,
                            margin: "auto"
                          }}>
                            <img src={checkIcon} alt="متوفر" style={{ width: 18, height: 18 }} />
                          </span>
                        ) : (
                          <span style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "#fbeaec",
                            borderRadius: "50%",
                            width: 28,
                            height: 28,
                            margin: "auto",
                            opacity: 0.85
                          }}>
                            <img src={xIcon} alt="غير متوفر" style={{ width: 16, height: 16, opacity: 0.7 }} />
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PlanCard({ name, price, unit, features, best, link, active, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: best ? "linear-gradient(100deg, #f9f6ff 75%, #e6f3ff 100%)" : "#fff",
        borderRadius: 22,
        boxShadow: active
          ? "0 8px 38px #7c4dff28"
          : "0 2px 8px #24e9ca18",
        border: active
          ? "2.8px solid #7c4dff"
          : "2.2px solid #e4e6fc",
        padding: "34px 24px 22px 24px",
        minWidth: 220,
        maxWidth: 300,
        flex: "1 1 240px",
        transition: "all .16s",
        cursor: "pointer",
        marginBottom: best ? 0 : 14,
        position: "relative"
      }}
    >
      {best && (
        <div style={{
          position: "absolute", top: 18, left: 18, background: "#7c4dff", color: "#fff",
          borderRadius: 9, padding: "4px 14px", fontWeight: 900, fontSize: 14, letterSpacing: ".03em"
        }}>الأكثر طلبًا</div>
      )}
      <div style={{ color: "#7c4dff", fontWeight: 900, fontSize: 19, marginBottom: 8, textAlign: "center" }}>{name}</div>
      <div style={{
        color: best ? "#24e9ca" : "#555", fontWeight: 900, fontSize: 32, marginBottom: 3, marginTop: 5, textAlign: "center"
      }}>
        {price} <span style={{ fontSize: 15, fontWeight: 700 }}>{unit}</span>
      </div>
      <ul style={{
        listStyle: "none", padding: 0, margin: "13px 0 0 0",
        fontWeight: 700, color: "#2d2d42", fontSize: 15,
        minHeight: 80, textAlign: "center"
      }}>
        {features && features.map(f => (
          <li key={f.id || f} style={{ marginBottom: 6 }}>
            <img src={checkIcon} alt="" style={{ width: 15, verticalAlign: "middle", marginLeft: 5 }} />
            {f.name || f}
          </li>
        ))}
      </ul>
      <PlanButton href={link} highlight={best}>اطلب الآن</PlanButton>
    </div>
  );
}

function PlanButton({ children, href, highlight }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "block",
        width: "100%",
        background: highlight
          ? "linear-gradient(93deg,#7c4dff 30%,#24e9ca 110%)"
          : "linear-gradient(90deg,#e4eaff 40%,#f3f0ff 120%)",
        color: highlight ? "#fff" : "#7c4dff",
        textAlign: "center",
        borderRadius: 16,
        fontWeight: 900,
        fontSize: 21,
        letterSpacing: ".04em",
        padding: "15px 0",
        marginTop: 22,
        boxShadow: highlight
          ? "0 4px 22px #24e9ca24,0 2px 7px #7c4dff18"
          : "0 1.5px 8px #e4e6fc12",
        border: highlight ? "none" : "1.7px solid #ece8fb",
        cursor: "pointer",
        outline: "none",
        transition: "all .17s cubic-bezier(.4,1.6,.4,1)",
        position: "relative",
        overflow: "hidden"
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = highlight
          ? "linear-gradient(90deg,#24e9ca 20%,#7c4dff 120%)"
          : "linear-gradient(93deg,#f3f0ff 30%,#e4eaff 110%)";
        e.currentTarget.style.transform = "scale(1.055)";
        e.currentTarget.style.boxShadow = "0 8px 34px #24e9ca55";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = highlight
          ? "linear-gradient(93deg,#7c4dff 30%,#24e9ca 110%)"
          : "linear-gradient(90deg,#e4eaff 40%,#f3f0ff 120%)";
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = highlight
          ? "0 4px 22px #24e9ca24,0 2px 7px #7c4dff18"
          : "0 1.5px 8px #e4e6fc12";
      }}
      onMouseDown={e => {
        e.currentTarget.style.transform = "scale(0.97)";
        e.currentTarget.style.filter = "brightness(.98)";
      }}
      onMouseUp={e => {
        e.currentTarget.style.transform = "scale(1.055)";
        e.currentTarget.style.filter = "none";
      }}
    >
      {children}
    </a>
  );
}

const cellStyle = {
  padding: "11px 8px",
  border: "1.2px solid #ece8fb",
  textAlign: "center",
  background: "#fff"
};
