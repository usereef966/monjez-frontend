import React from "react";
import systemIcon from "../assets/svg/system-center.svg";

export default function Terms() {
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
        maxWidth: 650,
        margin: "0 auto",
        background: "#fff",
        borderRadius: 22,
        boxShadow: "0 3px 24px #7c4dff0d",
        padding: "42px 28px 34px",
        color: "#222",
      }}>
        <div style={{ textAlign: "center", marginBottom: 17 }}>
          <img src={systemIcon} alt="منجز" style={{
            width: 46, marginBottom: 7, borderRadius: 13, boxShadow: "0 2px 10px #7c4dff11"
          }} />
          <h1 style={{
            color: "#7c4dff", fontWeight: 900, fontSize: 23, marginBottom: 5
          }}>الشروط والأحكام</h1>
        </div>
        <div style={{ fontWeight: 700, fontSize: 16, lineHeight: 2 }}>
          <h2 style={{ color: "#259f45", fontWeight: 900, fontSize: 18, margin: "24px 0 8px" }}>١. قبول الشروط</h2>
          استخدامك لموقع منجز يعني موافقتك الكاملة على جميع الشروط والأحكام الموضحة أدناه.  
          إذا لم توافق على أي بند يرجى عدم استخدام الموقع أو أي من خدماتنا.
          
          <h2 style={{ color: "#7c4dff", fontWeight: 900, fontSize: 18, margin: "24px 0 8px" }}>٢. استخدام الموقع</h2>
          - يُسمح باستخدام هذا الموقع والخدمات المرتبطة به فقط للأغراض القانونية والشخصية أو التجارية المصرّح بها.<br/>
          - يمنع إساءة استخدام الموقع بأي طريقة تضر بحقوق الشركة أو أي طرف ثالث.<br/>
          - يجب أن تكون جميع البيانات المقدمة دقيقة ومحدثة.

          <h2 style={{ color: "#259f45", fontWeight: 900, fontSize: 18, margin: "24px 0 8px" }}>٣. الملكية الفكرية</h2>
          - جميع حقوق الملكية الفكرية (نصوص، صور، تصاميم، شيفرات برمجية) مملوكة بالكامل لمنجز.<br/>
          - لا يجوز نسخ أو إعادة إنتاج أي جزء من الموقع أو الخدمات إلا بإذن كتابي رسمي.

          <h2 style={{ color: "#7c4dff", fontWeight: 900, fontSize: 18, margin: "24px 0 8px" }}>٤. حدود المسؤولية</h2>
          - الموقع وفريقه غير مسؤولين عن أي أضرار مباشرة أو غير مباشرة ناتجة عن استخدام الموقع أو الخدمات.<br/>
          - جميع الخدمات تقدم "كما هي" بدون أي ضمانات إضافية إلا ما هو مذكور بالعقد أو العرض.

          <h2 style={{ color: "#259f45", fontWeight: 900, fontSize: 18, margin: "24px 0 8px" }}>٥. تعديلات الشروط</h2>
          - تحتفظ إدارة منجز بحق تعديل أو تحديث الشروط في أي وقت دون إشعار مسبق.<br/>
          - يجب عليك مراجعة هذه الصفحة بشكل دوري لمعرفة التغييرات.

          <h2 style={{ color: "#7c4dff", fontWeight: 900, fontSize: 18, margin: "24px 0 8px" }}>٦. روابط وسياسات أخرى</h2>
          - للاطلاع على <a href="/privacy" style={{ color: "#24e9ca", fontWeight: 800, textDecoration: "underline" }}>سياسة الخصوصية</a>  
          و <a href="/cookies" style={{ color: "#7c4dff", fontWeight: 800, textDecoration: "underline" }}>سياسة الكوكيز</a> يرجى زيارة الصفحات المخصصة لذلك.<br/>
          - أي نزاع يخضع للأنظمة والقوانين المعمول بها في المملكة العربية السعودية.

          <h2 style={{ color: "#259f45", fontWeight: 900, fontSize: 18, margin: "24px 0 8px" }}>٧. تواصل معنا</h2>
          لأي استفسار أو طلب قانوني يرجى التواصل عبر صفحة 
          <a href="/contact" style={{ color: "#7c4dff", fontWeight: 800, textDecoration: "underline", marginRight: 4 }}>تواصل معنا</a>.

          <div style={{
            color: "#888", fontWeight: 600, marginTop: 30, textAlign: "center", fontSize: 14
          }}>
            آخر تحديث: مايو 2024 — جميع الحقوق محفوظة لمنجز السعودية &copy;
          </div>
        </div>
      </div>
    </div>
  );
}
