import React, { useState } from "react";
import androidIcon from "../assets/svg/android-icon.svg";
import seoIcon from "../assets/svg/seo.svg";
import webIcon from "../assets/svg/web.svg";
import systemIcon from "../assets/svg/system.svg";

// ضيف خاصية link لكل كرت (عدا كرت الموبايل)
const cards = [
  {
    title: "تطبيقات الموبايل",
    icon: androidIcon,
    desc: "تطوير تطبيقات Android وiOS عصرية وبأحدث التقنيات.",
    action: "طلب الآن",
    dropdown: true // flag فقط لتسهيل الكود
  },
  {
    title: "تهيئة المواقع (SEO)",
    icon: seoIcon,
    desc: "رفع ترتيب موقعك بمحركات البحث بأساليب متقدمة.",
    action: "طلب الآن",
    link: "/seo"
  },
  {
    title: "برمجة المواقع",
    icon: webIcon,
    desc: "برمجة مواقع سريعة وآمنة بدعم متكامل.",
    action: "طلب الآن",
    link: "/web"
  },
  {
    title: "تطوير الأنظمة",
    icon: systemIcon,
    desc: "بناء حلول أنظمة متكاملة وذكية لكل أنواع الأعمال.",
    action: "طلب الآن",
    link: "/dev"
  },
];

export default function ServicesGrid() {
  const [rotatingIndex, setRotatingIndex] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <section
      style={{
        padding: "26px 0 20px",
        background: "linear-gradient(120deg,#f8f8ff 60%,#ede7fb 100%)",
        direction: "rtl"
      }}
    >
      <h2 style={{
        textAlign: "center",
        color: "#7c4dff",
        fontFamily: "Tajawal, Arial",
        fontSize: "2.3rem",
        fontWeight: "bold",
        marginBottom: "18px",
        letterSpacing: ".5px"
      }}>
        خدماتنا
      </h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))",
        gap: 22,
        maxWidth: 1150,
        margin: "0 auto"
      }}>
        {cards.map((card, idx) => (
          <div
            key={card.title}
            style={{
              background: "rgba(255,255,255,0.93)",
              boxShadow: "0 4px 24px 0 rgba(124,77,255,0.12)",
              borderRadius: 28,
              padding: "40px 20px 28px",
              textAlign: "center",
              position: "relative",
              transition: "transform 0.18s, box-shadow 0.18s"
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = "translateY(-8px) scale(1.035)";
              e.currentTarget.style.boxShadow = "0 16px 44px 0 rgba(124,77,255,0.18)";
              setRotatingIndex(idx);
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 4px 24px 0 rgba(124,77,255,0.12)";
              setRotatingIndex(null);
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg,#a18fff 0%,#7c4dff 90%)",
                borderRadius: "50%",
                width: 72,
                height: 72,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 18px",
                boxShadow: "0 4px 24px 0 rgba(124,77,255,0.15)",
                transition: "box-shadow .17s"
              }}
            >
              <img
                src={card.icon}
                alt={card.title}
                style={{
                  width: 36,
                  height: 36,
                  transition: "transform 0.5s cubic-bezier(.53,.02,.39,1.53)",
                  transform: rotatingIndex === idx ? "rotate(360deg)" : "none"
                }}
              />
            </div>
            <h3 style={{
              fontWeight: "bold",
              fontSize: 21,
              color: "#23273c",
              fontFamily: "Tajawal, Arial",
              marginBottom: 12
            }}>
              {card.title}
            </h3>
            <p style={{
              color: "#7a7896",
              fontSize: 15,
              fontWeight: 500,
              margin: "0 0 18px",
              lineHeight: 1.8
            }}>
              {card.desc}
            </p>
            {/* كرت تطبيقات الموبايل (Dropdown) */}
            {card.dropdown ? (
              <div style={{ position: "relative" }}>
                <button
                  style={{
                    padding: "9px 32px",
                    borderRadius: 18,
                    background: "linear-gradient(90deg,#7c4dff 50%,#a18fff 100%)",
                    color: "#fff",
                    border: "none",
                    fontWeight: 700,
                    fontFamily: "Tajawal, Arial",
                    fontSize: 15.5,
                    boxShadow: "0 4px 18px 0 rgba(124,77,255,0.10)",
                    cursor: "pointer",
                    transition: "background 0.17s"
                  }}
                  onMouseOver={e => (e.currentTarget.style.background = "linear-gradient(90deg,#a18fff 30%,#7c4dff 100%)")}
                  onMouseOut={e => (e.currentTarget.style.background = "linear-gradient(90deg,#7c4dff 50%,#a18fff 100%)")}
                  onClick={() => setDropdownOpen(v => !v)}
                >
                  {card.action}
                </button>
                {dropdownOpen && (
                  <div style={{
                    position: "absolute",
                    left: "50%", transform: "translateX(-50%)",
                    top: "110%",
                    zIndex: 22,
                    background: "#fff",
                    borderRadius: 12,
                    boxShadow: "0 10px 30px #a18fff24",
                    minWidth: 168,
                    padding: "8px 0",
                    marginTop: 5,
                  }}>
                    <button
                      onClick={() => { window.location.href = "/apps/android"; }}
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "9px 0",
                        background: "none",
                        border: "none",
                        color: "#7c4dff",
                        fontWeight: 800,
                        fontSize: 15.3,
                        cursor: "pointer",
                        borderRadius: 9,
                        transition: ".15s"
                      }}
                      onMouseOver={e => (e.currentTarget.style.background = "#f3edfd")}
                      onMouseOut={e => (e.currentTarget.style.background = "#fff")}
                    >
                      طلب تطبيق أندرويد
                    </button>
                    <button
                      onClick={() => { window.location.href = "/apps/ios"; }}
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "9px 0",
                        background: "none",
                        border: "none",
                        color: "#7c4dff",
                        fontWeight: 800,
                        fontSize: 15.3,
                        cursor: "pointer",
                        borderRadius: 9,
                        transition: ".15s"
                      }}
                      onMouseOver={e => (e.currentTarget.style.background = "#f3edfd")}
                      onMouseOut={e => (e.currentTarget.style.background = "#fff")}
                    >
                      طلب تطبيق آيفون
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // باقي الكروت: زر واحد فقط مع الرابط من الخاصية link
              <button
                style={{
                  padding: "9px 32px",
                  borderRadius: 18,
                  background: "linear-gradient(90deg,#7c4dff 50%,#a18fff 100%)",
                  color: "#fff",
                  border: "none",
                  fontWeight: 700,
                  fontFamily: "Tajawal, Arial",
                  fontSize: 15.5,
                  boxShadow: "0 4px 18px 0 rgba(124,77,255,0.10)",
                  cursor: "pointer",
                  transition: "background 0.17s"
                }}
                onMouseOver={e => (e.currentTarget.style.background = "linear-gradient(90deg,#a18fff 30%,#7c4dff 100%)")}
                onMouseOut={e => (e.currentTarget.style.background = "linear-gradient(90deg,#7c4dff 50%,#a18fff 100%)")}
                onClick={() => window.location.href = card.link}
              >
                {card.action}
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
