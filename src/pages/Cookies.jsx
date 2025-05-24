import React from "react";
import systemIcon from "../assets/svg/system-center.svg";

export default function CookiesPolicy() {
  return (
    <div dir="rtl" style={{
      minHeight: "100vh",
      background: "linear-gradient(120deg, #e6f3ff 0%, #f4eaff 100%)",
      fontFamily: "Tajawal, Arial, sans-serif"
    }}>
      {/* هيدر رسمي */}
      <div style={{
        width: "100%", textAlign: "center", marginTop: 38, marginBottom: 4
      }}>
        <img src={systemIcon} alt="كوكيز" style={{
          width: 56, marginBottom: 10, borderRadius: 13, boxShadow: "0 3px 10px #7c4dff10"
        }} />
        <h1 style={{
          color: "#7c4dff", fontWeight: 900, fontSize: 30, marginBottom: 3
        }}>سياسة الكوكيز</h1>
        <div style={{
          color: "#555", fontWeight: 700, fontSize: 15
        }}>
          موافقة للأنظمة السعودية، معايير Google & الاتحاد الأوروبي (GDPR)
        </div>
      </div>

      <div style={{
        maxWidth: 720,
        margin: "32px auto 0 auto",
        background: "#fff",
        borderRadius: 24,
        boxShadow: "0 4px 24px #7c4dff0c",
        padding: "32px 22px 19px",
        color: "#232343",
        fontSize: 16.5,
        lineHeight: 2.15
      }}>
        <h3 style={{ color: "#7c4dff", fontWeight: 900, fontSize: 20, marginTop: 0 }}>ما هي الكوكيز؟</h3>
        <p>
          الكوكيز (Cookies) هي ملفات نصية صغيرة يتم حفظها على جهاز المستخدم عندما يزور موقعنا. 
          تساعدنا الكوكيز في تذكر تفضيلاتك وتحسين تجربتك في تصفح الموقع وضمان أمان البيانات وتقديم خدمات أكثر تخصيصاً.
        </p>

        <h3 style={{ color: "#7c4dff", fontWeight: 900, fontSize: 20 }}>كيف نستخدم الكوكيز؟</h3>
        <ul>
          <li>تفعيل جلسة المستخدم وضمان استمرارية تسجيل الدخول.</li>
          <li>حفظ إعداداتك وتفضيلاتك (مثل اللغة، وأوضاع العرض).</li>
          <li>تحليل الاستخدام عبر أدوات تحليل آمنة (مثل Google Analytics) لمساعدتنا في تحسين أداء الموقع.</li>
          <li>حماية الموقع من الهجمات وضمان الأمان.</li>
        </ul>

        <h3 style={{ color: "#7c4dff", fontWeight: 900, fontSize: 20 }}>أنواع الكوكيز المستخدمة:</h3>
        <ul>
          <li><b>كوكيز ضرورية:</b> أساسية لتشغيل الموقع ولا يمكن تعطيلها.</li>
          <li><b>كوكيز التحليل:</b> تجمع بيانات غير شخصية لأغراض التحليل الإحصائي وتحسين جودة الخدمة.</li>
          <li><b>كوكيز التخصيص:</b> تُستخدم لتقديم تجربة شخصية وحفظ تفضيلاتك.</li>
        </ul>

        <h3 style={{ color: "#7c4dff", fontWeight: 900, fontSize: 20 }}>إدارة الكوكيز والتحكم بها:</h3>
        <ul>
          <li>يمكنك تعطيل الكوكيز غير الضرورية في أي وقت من خلال صفحة <a href="/cookie-settings" style={{ color: "#24e9ca", fontWeight: 800 }}>إعدادات الكوكيز</a>.</li>
          <li>أو من إعدادات المتصفح (مثل Chrome أو Safari أو Edge)، مع العلم أن تعطيل بعض الكوكيز قد يؤثر على بعض وظائف الموقع.</li>
        </ul>

        <h3 style={{ color: "#7c4dff", fontWeight: 900, fontSize: 20 }}>موافقة المستخدم:</h3>
        <ul>
          <li>عند استخدامك الموقع لأول مرة تظهر لك نافذة تطلب الموافقة على استخدام الكوكيز.</li>
          <li>استمرارك في استخدام الموقع يعني موافقتك على سياسة الكوكيز هذه.</li>
        </ul>

        <h3 style={{ color: "#7c4dff", fontWeight: 900, fontSize: 20 }}>التوافق مع القوانين:</h3>
        <ul>
          <li>هذه السياسة متوافقة مع <b>نظام حماية البيانات السعودي</b>، ومتطلبات <b>GDPR</b> الأوروبي، ومعايير <b>Google</b> لفحص سياسات الخصوصية.</li>
        </ul>

        <div style={{
          marginTop: 28, color: "#259f45", fontWeight: 800, fontSize: 15, textAlign: "center"
        }}>
          أي استفسار أو طلب تعديل يمكنك التواصل معنا عبر صفحة <a href="/contact" style={{ color: "#7c4dff", fontWeight: 800, textDecoration: "underline" }}>تواصل معنا</a>
        </div>
        <div style={{ marginTop: 24, color: "#888", fontSize: 14, textAlign: "center" }}>
          آخر تحديث: مايو 2024 — منجز السعودية &copy;
        </div>
      </div>

      {/* فوتر صغير */}
      
    </div>
  );
}
