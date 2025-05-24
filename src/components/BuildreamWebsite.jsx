import React, { useState, useEffect } from "react";
import shopIcon from "../assets/svg/shop.svg";
import companyIcon from "../assets/svg/company.svg";
import blogIcon from "../assets/svg/blog.svg";
import platformIcon from "../assets/svg/platform.svg";
import cartIcon from "../assets/svg/cart.svg";
import creditIcon from "../assets/svg/credit-card.svg";
import paypalIcon from "../assets/svg/paypal.svg";
import bankIcon from "../assets/svg/bank-transfer.svg";

// أيقونات المنتجات
import shirtIcon from "../assets/svg/shirt.svg";
import laptopIcon from "../assets/svg/laptop.svg";
import bookIcon from "../assets/svg/book.svg";
import consultingIcon from "../assets/svg/consulting.svg";
import bagIcon from "../assets/svg/bag.svg";
import trainingIcon from "../assets/svg/training.svg";
import articleIcon from "../assets/svg/article.svg";
import encyclopediaIcon from "../assets/svg/encyclopedia.svg";
import tutorialIcon from "../assets/svg/tutorial.svg";
import reactIcon from "../assets/svg/react-course.svg";
import vueIcon from "../assets/svg/vue-course.svg";
import angularIcon from "../assets/svg/angular-course.svg";

const sections = [
  { id: "shop", label: "متجر إلكتروني", icon: shopIcon },
  { id: "company", label: "موقع شركة", icon: companyIcon },
  { id: "blog", label: "مدونة/موسوعة", icon: blogIcon },
  { id: "platform", label: "منصة تعليمية", icon: platformIcon },
];

const productOptions = {
  shop: [
    { id: "shirt", label: "قميص", icon: shirtIcon },
    { id: "laptop", label: "كمبيوتر محمول", icon: laptopIcon },
    { id: "book", label: "كتاب", icon: bookIcon },
  ],
  company: [
    { id: "consulting", label: "خدمات استشارية", icon: consultingIcon },
    { id: "bag", label: "حقيبة أعمال", icon: bagIcon },
    { id: "training", label: "دورة تدريبية", icon: trainingIcon },
  ],
  blog: [
    { id: "article", label: "مقال", icon: articleIcon },
    { id: "encyclopedia", label: "موسوعة", icon: encyclopediaIcon },
    { id: "tutorial", label: "دورة", icon: tutorialIcon },
  ],
  platform: [
    { id: "react", label: "دورة React", icon: reactIcon },
    { id: "vue", label: "دورة Vue", icon: vueIcon },
    { id: "angular", label: "دورة Angular", icon: angularIcon },
  ],
};

const paymentOptions = {
  shop: [
    { id: "credit", label: "بطاقة ائتمان", icon: creditIcon },
    { id: "paypal", label: "PayPal", icon: paypalIcon },
    { id: "bank", label: "تحويل بنكي", icon: bankIcon },
  ],
  default: [
    { id: "credit", label: "بطاقة ائتمان", icon: creditIcon },
    { id: "paypal", label: "PayPal", icon: paypalIcon },
  ],
};

const palette = [
  "#7c4dff", "#24e6ca", "#ffd166", "#ff6584", "#5cd3ad"
];

export default function SectionTwo() {
  const [selectedSection, setSelectedSection] = useState("");
  const [headerColor, setHeaderColor] = useState(palette[0]);
  const [sidebarColor, setSidebarColor] = useState(palette[1]);
  const [footerColor, setFooterColor] = useState(palette[2]);
  const [products, setProducts] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    setProducts([]);
    setShowCart(false);
    setPayments([]);
  }, [selectedSection]);

  const toggleArray = (arr, setter, value) => {
    setter(prev => prev.includes(value)
      ? prev.filter(item => item !== value)
      : [...prev, value]
    );
  };

  const currentProducts = productOptions[selectedSection] || [];
  const currentPayments = selectedSection === "shop"
    ? paymentOptions.shop
    : paymentOptions.default;

  return (
    <div style={{ direction: "rtl", maxWidth: 1200, margin: "0 auto", padding: "0px 00px" }}>
      {/* اختيار القسم */}
      <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", marginBottom: 30 }}>
        {sections.map(sec => (
          <div
            key={sec.id}
            onClick={() => setSelectedSection(sec.id)}
            style={{
              width: 70, height: 70, borderRadius: "50%",
              border: selectedSection === sec.id ? "3px solid #7c4dff" : "2px solid #ececff",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", background: selectedSection === sec.id ? "#f6faff" : "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)", transition: "all 0.2s"
            }}
          >
            <img src={sec.icon} alt={sec.label} style={{ width: 30, height: 30 }} />
          </div>
        ))}
      </div>

      {/* اختيار الألوان */}
      <div style={{ display: "flex", gap: 40, justifyContent: "center", marginBottom: 30 }}>
        {[
          { label: "الهيدر", color: headerColor, setter: setHeaderColor },
          { label: "السايدبار", color: sidebarColor, setter: setSidebarColor },
          { label: "الفوتر", color: footerColor, setter: setFooterColor }
        ].map(part => (
          <div key={part.label} style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 900, marginBottom: 6 }}>{part.label}</div>
            <div style={{ display: "flex", gap: 8 }}>
              {palette.map(col => (
                <div
                  key={col}
                  onClick={() => part.setter(col)}
                  style={{
                    width: 30, height: 30, borderRadius: "50%",
                    background: col, cursor: "pointer",
                    border: part.color === col ? "2px solid #000" : "2px solid #fff"
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* خيارات المنتجات والسلة وطرق الدفع */}
      {selectedSection && (
        <div style={{ display: "flex", gap: 40, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
          {/* المنتجات */}
          <div style={{ minWidth: 200 }}>
            <div style={{ fontWeight: 900, marginBottom: 8 }}>اختر منتجات:</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {currentProducts.map(item => (
                <label key={item.id} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={products.includes(item.id)}
                    onChange={() => toggleArray(products, setProducts, item.id)}
                  />
                  <img src={item.icon} alt={item.label} style={{ width: 20 }} /> {item.label}
                </label>
              ))}
            </div>
          </div>

          {/* السلة */}
          <div style={{ minWidth: 150, textAlign: "center" }}>
            <div style={{ fontWeight: 900, marginBottom: 8 }}>عرض سلة المشتريات:</div>
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", justifyContent: "center" }}>
              <input
                type="checkbox"
                checked={showCart}
                onChange={() => setShowCart(prev => !prev)}
              />
              <img src={cartIcon} alt="سلة المشتريات" style={{ width: 24 }} />
            </label>
          </div>

          {/* الدفع */}
          <div style={{ minWidth: 200 }}>
            <div style={{ fontWeight: 900, marginBottom: 8 }}>طرق الدفع:</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {currentPayments.map(m => (
                <label key={m.id} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={payments.includes(m.id)}
                    onChange={() => toggleArray(payments, setPayments, m.id)}
                  />
                  <img src={m.icon} alt={m.label} style={{ width: 20 }} /> {m.label}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* معاينة Live */}
      <div style={{ border: "2px solid #ececff", borderRadius: 21, overflow: "hidden", boxShadow: "0 7px 24px rgba(161,143,255,0.2)" }}>
        {/* Header */}
        <div style={{ background: headerColor, padding: "16px", textAlign: "center", fontWeight: 900, color: "#fff" }}>
          هيدر
        </div>

        <div style={{ display: "flex" }}>
          {/* Sidebar */}
          <div style={{ background: sidebarColor, width: 160, padding: "16px", color: "#fff", fontWeight: 800 }}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {sections.map(sec => (
                <li key={sec.id} style={{ opacity: sec.id === selectedSection ? 1 : 0.6, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <img src={sec.icon} alt={sec.label} style={{ width: 18 }} />
                  {sec.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Main Content */}
          <div style={{ flex: 1, padding: "24px", background: "#fff", position: "relative" }}>
            {showCart && (
              <img src={cartIcon} alt="" style={{ position: "absolute", top: 16, right: 16, width: 28 }} />
            )}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              {products.map(id => {
                const item = currentProducts.find(p => p.id === id);
                return (
                  <div key={id} style={{ textAlign: "center" }}>
                    <img src={item.icon} alt={item.label} style={{ width: 40, marginBottom: 6 }} />
                    <div style={{ fontWeight: 800 }}>{item.label}</div>
                  </div>
                );
              })}
            </div>
            {payments.length > 0 && (
              <div style={{ marginTop: 20, textAlign: "center" }}>
                <div style={{ fontWeight: 900, marginBottom: 6 }}>الدفع عبر:</div>
                <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                  {payments.map(id => {
                    const m = currentPayments.find(pm => pm.id === id);
                    return (
                      <img key={id} src={m.icon} alt={m.label} style={{ width: 32 }} />
                    );
                  })}
                </div>
              </div>
            )}
            {!products.length && <p style={{ color: "#888", textAlign: "center", marginTop: 40 }}>اختر منتجات لعرضها هنا</p>}
          </div>
        </div>

        {/* Footer */}
        <div style={{ background: footerColor, padding: "12px", textAlign: "center", fontWeight: 900, color: "#fff" }}>
          فوتر
        </div>
      </div>
    </div>
  );
}