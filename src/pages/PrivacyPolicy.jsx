import React from "react";
import { Link } from "react-router-dom";
import systemIcon from "../assets/svg/system-center.svg";

export default function PrivacyPolicy() {
  return (
    <div dir="rtl" style={{
      minHeight: "100vh",
      background: "linear-gradient(120deg, #e6f3ff 0%, #f4eaff 100%)",
      fontFamily: "Tajawal, Arial, sans-serif"
    }}>
      {/* هيدر */}
      <div style={{ width: "100%", minHeight: 150, position: "relative", textAlign: "center" }}>
        <img src={systemIcon} alt="Privacy" style={{
          width: 62, marginTop: 40, marginBottom: 12, borderRadius: 13, boxShadow: "0 6px 16px #7c4dff11"
        }} />
        <h1 style={{
          color: "#7c4dff",
          fontWeight: 900,
          fontSize: 31,
          marginBottom: 4,
          letterSpacing: ".01em"
        }}>
          سياسة الخصوصية
        </h1>
        <div style={{
          color: "#555", fontWeight: 700, fontSize: 16
        }}>
          سياسة رسمية — توافق المعايير العالمية (GDPR، خصوصية سعودية)
        </div>
      </div>

      {/* نص سياسة الخصوصية */}
      <div style={{
        maxWidth: 900,
        margin: "35px auto 38px auto",
        background: "#fff",
        borderRadius: 28,
        boxShadow: "0 4px 32px #7c4dff0b",
        padding: "38px 28px 28px 28px",
        fontSize: 16.5,
        color: "#323247",
        lineHeight: 2.07
      }}>
        <p><b>منجز</b> تلتزم بحماية خصوصيتك وبياناتك وفقًا للقانون السعودي ومعايير الاتحاد الأوروبي (GDPR) وكل سياسات جوجل الرسمية.</p>
        
        <h3 style={{ color: "#7c4dff", fontWeight: 800, fontSize: 21, marginTop: 28 }}>١. جمع المعلومات</h3>
        <ul>
          <li>نقوم بجمع البيانات التي تزودنا بها مباشرة عند التسجيل أو استخدام خدماتنا (اسمك، بريدك الإلكتروني، رقم الجوال...)</li>
          <li>قد نقوم بجمع بيانات تقنية (IP، نوع المتصفح، وقت التصفح) لأغراض أمنية وتحليلية وتحسين الخدمة.</li>
        </ul>
        
        <h3 style={{ color: "#7c4dff", fontWeight: 800, fontSize: 21, marginTop: 22 }}>٢. استخدام البيانات</h3>
        <ul>
          <li>استخدام بياناتك فقط لتقديم الخدمة وتسهيل التواصل معك.</li>
          <li>لا نبيع أو نشارك بياناتك لأي طرف ثالث إلا في حال وجود طلب قانوني رسمي من جهة حكومية سعودية أو محكمة معترف بها.</li>
          <li>نحتفظ بالبيانات للفترة المطلوبة قانونيًا فقط.</li>
        </ul>
        
        <h3 style={{ color: "#7c4dff", fontWeight: 800, fontSize: 21, marginTop: 22 }}>٣. ملفات الكوكيز والتتبع</h3>
        <ul>
          <li>قد نستخدم ملفات الكوكيز لجعل تجربتك أكثر سلاسة وتحليل أداء الموقع، ويمكنك تعطيل الكوكيز من إعدادات المتصفح.</li>
          <li>أي تتبع أو تحليل يتم فقط لتحسين الخدمة أو التحليل التسويقي الداخلي (Google Analytics...)</li>
        </ul>

        <h3 style={{ color: "#7c4dff", fontWeight: 800, fontSize: 21, marginTop: 22 }}>٤. حقوق المستخدم</h3>
        <ul>
          <li>لك الحق في طلب نسخة من بياناتك أو حذفها أو تصحيحها في أي وقت (حسب سياسة GDPR والأنظمة السعودية).</li>
          <li>تستطيع التواصل معنا مباشرة عبر صفحة <Link to="/contact" style={{ color: "#24e9ca", fontWeight: 800 }}>تواصل معنا</Link> لأي استفسار أو طلب بخصوص بياناتك.</li>
        </ul>

        <h3 style={{ color: "#7c4dff", fontWeight: 800, fontSize: 21, marginTop: 22 }}>٥. حماية البيانات</h3>
        <ul>
          <li>نلتزم بتطبيق أعلى معايير الأمان (SSL, Encryption, Firewall) لحماية بياناتك من أي اختراق أو استغلال غير قانوني.</li>
          <li>نعمل باستمرار على مراجعة سياساتنا وتحديثها وفقًا لأحدث المتطلبات العالمية.</li>
        </ul>

        <h3 style={{ color: "#7c4dff", fontWeight: 800, fontSize: 21, marginTop: 22 }}>٦. إثباتات الامتثال القانوني</h3>
        <ul>
          <li>سياسة الخصوصية هذه تتوافق مع <b>GDPR</b> الأوروبي، نظام حماية البيانات السعودي، وقوانين Google Privacy Policy.</li>
          <li>يمكنك فحص صفحتنا من خلال Google Search Console أو أي خدمة تدقيق خصوصية رسمية.</li>
          <li>شهادات الأمان وتوافق SSL مُثبتة وموثقة (تأكد من ظهور 🔒 بجانب العنوان).</li>
        </ul>

        <h3 style={{ color: "#7c4dff", fontWeight: 800, fontSize: 21, marginTop: 22 }}>٧. تحديث سياسة الخصوصية</h3>
        <ul>
          <li>قد نقوم بتعديل هذه السياسة في أي وقت، وسيتم تنبيهك بذلك على الموقع أو عبر البريد الإلكتروني.</li>
          <li>نوصي بمراجعة هذه الصفحة بشكل دوري للتأكد من التعديلات الجديدة.</li>
        </ul>
        
        <div style={{ marginTop: 34, fontWeight: 800, color: "#18c27d" }}>
          آخر تحديث: مايو 2024 — كل الحقوق محفوظة لمنجز &copy;
        </div>
      </div>

      {/* فوتر رسمي */}
      <footer style={{
        background: "#262743", color: "#fff", padding: "29px 0 14px 0", marginTop: 32, textAlign: "center", fontWeight: 600, fontSize: 16
      }}>
        جميع الحقوق محفوظة &copy; منجز {new Date().getFullYear()}
        <div style={{ marginTop: 5 }}>
          <Link to="/contact" style={{ color: "#ffd166", textDecoration: "underline", margin: "0 13px" }}>تواصل معنا</Link>
          <Link to="/" style={{ color: "#24e9ca", textDecoration: "underline", margin: "0 13px" }}>الصفحة الرئيسية</Link>
        </div>
      </footer>
    </div>
  );
}
