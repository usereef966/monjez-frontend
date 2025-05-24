import React from "react";
import systemIcon from "../assets/svg/system-center.svg";
import verifiedIcon from "../assets/svg/verified.svg";
import shieldIcon from "../assets/svg/shield.svg";
import checkIcon from "../assets/svg/check.svg";

export default function License() {
  return (
    <div dir="rtl" style={{
      minHeight: "100vh",
      background: "linear-gradient(120deg, #e6f3ff 0%, #f4eaff 100%)",
      fontFamily: "Tajawal, Arial, sans-serif"
    }}>
      {/* هيدر مميز */}
      <div style={{
        width: "100%", textAlign: "center", marginTop: 45, marginBottom: 6
      }}>
        <img src={verifiedIcon} alt="توثيق" style={{
          width: 52, marginBottom: 8, borderRadius: 12, boxShadow: "0 3px 8px #259f4522"
        }} />
        <h1 style={{
          color: "#7c4dff", fontWeight: 900, fontSize: 30, marginBottom: 2
        }}>رخصة استخدام منتجات وخدمات منجز</h1>
        <div style={{
          color: "#555", fontWeight: 700, fontSize: 16, marginBottom: 7
        }}>
          صفحة رسمية — استخدام مرخّص محمي لجميع العملاء
        </div>
      </div>

      {/* الختم الرسمي */}
      <div style={{
        width: 110, margin: "0 auto", background: "#fff", borderRadius: "50%",
        boxShadow: "0 2px 12px #7c4dff22", padding: 18, marginBottom: 8
      }}>
        <img src={systemIcon} alt="ختم منجز" style={{
          width: 70, display: "block", margin: "0 auto"
        }} />
      </div>

      {/* نبذة مختصرة عن الرخصة */}
      <div style={{
        maxWidth: 600, margin: "0 auto 14px auto", background: "#fff", borderRadius: 20,
        boxShadow: "0 2px 8px #7c4dff0b", padding: "24px 18px 14px", color: "#333",
        fontSize: 15, lineHeight: 2
      }}>
        <p>
          جميع خدمات وبرمجيات وتصاميم منجز محمية بموجب قوانين الملكية الفكرية والرخص الرقمية المعتمدة في السعودية ودول العالم.<br/>
          يسمح باستخدام المنتجات للأغراض التجارية والشخصية فقط ضمن الشروط التالية:
        </p>
        <ul style={{ color: "#7c4dff", marginTop: 10, fontWeight: 700, fontSize: 15, marginRight: 17 }}>
          <li>✅ يُسمح باستخدام المنتج (موقع/تطبيق/تصميم) لمشروعك الخاص أو لعميلك مع التزام كامل بالهوية.</li>
          <li>✅ التعديل على الكود والتصميم متاح لكن يمنع إعادة البيع أو إعادة النشر بدون إذن رسمي كتابي من فريق منجز.</li>
          <li>✅ يجب الحفاظ على الشعارات أو توقيع المطور ما لم يُنص على غير ذلك في العقد.</li>
          <li>✅ يمنع استخدام المنتجات لأي أغراض مخالفة للقانون السعودي أو حقوق الملكية الفكرية الدولية.</li>
        </ul>
        <div style={{
          background: "#e8fff1",
          color: "#259f45",
          borderRadius: 9,
          padding: "9px 0 5px",
          textAlign: "center",
          fontWeight: 800,
          marginTop: 14,
          fontSize: 15
        }}>
          أي استفسار قانوني أو شراكة استخدام راسلنا مباشرة عبر صفحة <a href="/contact" style={{ color: "#7c4dff", textDecoration: "underline" }}>تواصل معنا</a>
        </div>
      </div>

      {/* أنواع الرخصة بشكل Cards */}
      <div style={{
        display: "flex", gap: 22, justifyContent: "center", margin: "32px auto 18px", flexWrap: "wrap", maxWidth: 900
      }}>
        <LicenseCard
          icon={checkIcon}
          title="رخصة شخصية"
          desc="مسموح باستخدام المنتجات والتصاميم لأغراضك الشخصية أو مشاريعك الخاصة."
          color="#24e9ca"
        />
        <LicenseCard
          icon={shieldIcon}
          title="رخصة تجارية"
          desc="مشروعك التجاري محمي قانونياً — استخدم منتجاتنا داخل أعمالك أو مشاريعك لعملائك."
          color="#7c4dff"
        />
        <LicenseCard
          icon={systemIcon}
          title="رخصة شراكة خاصة"
          desc="تواصل معنا لأي طلب خاص أو استخدام غير اعتيادي (بيع/توزيع/شراكة رسمية)."
          color="#259f45"
        />
      </div>

      {/* نصوص قانونية صغيرة */}
      <div style={{
        maxWidth: 600, margin: "0 auto", color: "#777", fontSize: 13, marginTop: 12, textAlign: "center"
      }}>
        * صفحة الرخصة هذه تُحدّث بشكل دوري وفق أي تغييرات قانونية جديدة،  
        وجميع المنتجات مشمولة بضمان الحماية البرمجية وحقوق الملكية الفكرية.<br/>
        <b>تاريخ آخر تحديث:</b> مايو 2024
      </div>

      {/* فوتر مختصر */}
      
    </div>
  );
}

function LicenseCard({ icon, title, desc, color }) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 17,
      boxShadow: `0 2px 8px ${color}22`,
      border: `1.8px solid ${color}44`,
      padding: "22px 14px 13px",
      minWidth: 180, maxWidth: 240, flex: 1, textAlign: "center"
    }}>
      <img src={icon} alt={title} style={{ width: 30, marginBottom: 7 }} />
      <div style={{ color, fontWeight: 900, fontSize: 16, marginBottom: 4 }}>{title}</div>
      <div style={{ color: "#333", fontWeight: 700, fontSize: 14, minHeight: 60 }}>{desc}</div>
    </div>
  );
}
