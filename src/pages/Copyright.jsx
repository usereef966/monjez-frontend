import React from "react";
import systemIcon from "../assets/svg/system-center.svg";

export default function Copyright() {
  return (
    <div dir="rtl" style={{
      minHeight: "100vh",
      background: "linear-gradient(120deg, #f8faff 0%, #eaf4fa 100%)",
      fontFamily: "Tajawal, Arial, sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        maxWidth: 560,
        margin: "0 auto",
        background: "#fff",
        borderRadius: 22,
        boxShadow: "0 3px 22px #7c4dff0d",
        padding: "42px 24px 34px",
        color: "#262743"
      }}>
        <div style={{ textAlign: "center", marginBottom: 17 }}>
          <img src={systemIcon} alt="منجز" style={{
            width: 46, marginBottom: 7, borderRadius: 12, boxShadow: "0 2px 9px #7c4dff12"
          }} />
          <h1 style={{
            color: "#7c4dff", fontWeight: 900, fontSize: 23, marginBottom: 6
          }}>حقوق النشر والملكية الفكرية</h1>
        </div>
        <div style={{ color: "#333", fontWeight: 700, fontSize: 16, lineHeight: 2 }}>
          <b>جميع الحقوق محفوظة &copy; {new Date().getFullYear()} منجز السعودية.</b><br /><br />
          يمنع نسخ أو إعادة إنتاج أو توزيع أو نشر أو تحميل أو نقل أو تخزين أو تعديل أي جزء من هذا الموقع أو المواد أو المحتوى المعروض عليه (نصوص، صور، تصاميم، شيفرات برمجية) 
          دون الحصول على إذن خطي وصريح من إدارة منصة منجز.
          <br /><br />
          كل العلامات التجارية والشعارات المستخدمة في الموقع هي ملك حصري لمنجز أو للجهات الشريكة، 
          ويحظر استخدامها أو تقليدها لأي غرض تجاري أو غير تجاري دون موافقة رسمية مسبقة.
          <br /><br />
          أي انتهاك لحقوق الملكية الفكرية أو حقوق النشر الخاصة بالموقع يُعرّض صاحبه للمساءلة القانونية وفق الأنظمة السعودية والدولية ذات الصلة.
          <br /><br />
          للاستخدام العادل أو طلب إذن رسمي أو استفسار قانوني، راسلنا عبر صفحة 
          <a href="/contact" style={{ color: "#24e9ca", textDecoration: "underline", fontWeight: 800, marginRight: 5 }}>تواصل معنا</a>
          .
        </div>
        <div style={{
          color: "#888", fontWeight: 600, marginTop: 29, textAlign: "center", fontSize: 14, letterSpacing: ".02em"
        }}>
          جميع المواد والمحتوى البرمجي على هذا الموقع مشمولة بالحماية القانونية — رقم السجل التجاري: 1234567890
        </div>
      </div>
    </div>
  );
}
