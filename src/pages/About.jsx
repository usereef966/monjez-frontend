import React from "react";
import systemIcon from "../assets/svg/system-center.svg";
import verifiedIcon from "../assets/svg/verified.svg";
import aramcoIcon from "../assets/svg/aramco.svg";
import stcIcon from "../assets/svg/stc.svg";

export default function About() {
  return (
    <div dir="rtl" style={{
      background: "linear-gradient(120deg, #e6f3ff 0%, #f4eaff 100%)",
      fontFamily: "Tajawal, Arial, sans-serif"
    }}>
      {/* هيدر صغير ومرتب */}
      <div style={{
        width: "100%", textAlign: "center", margin: "28px 0 6px 0"
      }}>
        <img src={systemIcon} alt="منجز" style={{
          width: 52, marginBottom: 8, borderRadius: 13, boxShadow: "0 3px 11px #7c4dff08"
        }} />
        <h1 style={{
          color: "#7c4dff", fontWeight: 900, fontSize: 26, marginBottom: 2
        }}>من نحن</h1>
        <div style={{
          color: "#555", fontWeight: 700, fontSize: 15, marginBottom: 8
        }}>قصة براند سعودي يصنع الفارق في التقنية</div>
      </div>

      {/* البوكس بعرض 760px فقط */}
      <div style={{
        maxWidth: 760, margin: "0 auto 18px auto", background: "#fff", borderRadius: 22,
        boxShadow: "0 3px 13px #7c4dff0a", padding: "22px 22px 14px", color: "#2d2d42",
        fontSize: 15, lineHeight: 2
      }}>
        <p><b>منجز</b> منصة تقنية سعودية متخصصة في تطوير الأنظمة والمواقع والتطبيقات بأعلى معايير الجودة والأمان.
        هدفنا: تقديم حلول ذكية تلبي متطلبات السوق السعودي والعالمي، بدعم من فريق سعودي محترف وشراكات موثقة مع أقوى الجهات.</p>
        <h3 style={{ color: "#259f45", fontWeight: 800, marginTop: 14, fontSize: 17 }}>رؤيتنا</h3>
        <p style={{ margin: "0 0 8px 0" }}>قيادة التحول الرقمي في السعودية عبر ابتكار حلول تقنية مستقبلية لكل قطاع وأعمال.</p>
        <h3 style={{ color: "#7c4dff", fontWeight: 800, marginTop: 8, fontSize: 17 }}>رسالتنا</h3>
        <p>خدمة عملائنا بأعلى مستويات الاحترافية، بناء شراكات دائمة، وتمكين المواهب المحلية لتقديم أفضل خدمة للسوق العربي والعالمي.</p>
      </div>

      {/* توثيقات مختصرة */}
      <div style={{
        textAlign: "center", margin: "14px auto 0 auto", maxWidth: 500
      }}>
        <h4 style={{
          color: "#8247e5", fontWeight: 900, fontSize: 17, marginBottom: 8, marginTop: 0
        }}>شراكات وثقة من أكبر الجهات:</h4>
        <div style={{
          display: "flex", justifyContent: "center", gap: 18, alignItems: "center", flexWrap: "wrap"
        }}>
          <img src={verifiedIcon} alt="توثيق" style={{ width: 28 }} />
          <img src={aramcoIcon} alt="أرامكو" style={{ width: 38 }} />
          <img src={stcIcon} alt="STC" style={{ width: 33 }} />
        </div>
        <div style={{ color: "#259f45", fontWeight: 800, marginTop: 9, fontSize: 14 }}>
          معتمدون وموثوقون في السوق السعودي والعالمي
        </div>
      </div>

      {/* فوتر صغير */}
     
    </div>
  );
}
