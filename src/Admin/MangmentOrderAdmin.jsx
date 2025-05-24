import React, { useState } from "react";
// استيراد صفحات الإدارة الخمسة
import AdminMobilePlans from "./OrdersMangment/AdminMobilePlans";
import AdminPlans from "./OrdersMangment/AdminPlans";
import AdminSeoGoals from "./OrdersMangment/AdminSeoGoals";
import AdminWebdeveloper from "./OrdersMangment/AdminWebdeveloper";
import AdminWebTypes from "./OrdersMangment/AdminWebTypes";
import StarBubblesEffect from './StarBubblesEffect';
// Tabs metadata
const tabs = [
  { label: "Mobile Plans", key: "mobile", component: <AdminMobilePlans /> },
  { label: "Plans", key: "plans", component: <AdminPlans /> },
  { label: "SEO Goals", key: "seo", component: <AdminSeoGoals /> },
  { label: "Web Types", key: "webtypes", component: <AdminWebTypes /> },
  { label: "Web Developer", key: "webdev", component: <AdminWebdeveloper /> },
];

export default function MangmentOrderAdmin() {
  // أول Tab مفتوح تلقائيًا
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  return (


      <div style={{ position: "relative", zIndex: 800 }}>

         <div style={{ position: "relative", zIndex: 800 }}>
<StarBubblesEffect/>

</div>

    <div style={{
      
      
      padding: "0 0 100px 0",
      position: "relative", // سياق زيندكس لكل الصفحة
      zIndex: 1
    }}>
      {/* هيدر القوائم (Tabs) */}
      <div style={{
        maxWidth: 2050,
        margin: "0 auto",
        paddingTop: 42,
        marginBottom: 28,
        display: "flex",
        justifyContent: "center",
        gap: 18,
        position: "sticky",
        top: 0,
        
        zIndex: 11,
      }}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              background: activeTab === tab.key
                ? "linear-gradient(90deg,#6366f1,#6d28d9)"
                : "#ede9fe",
              color: activeTab === tab.key ? "#fff" : "#6D28D9",
              fontWeight: 700,
              fontSize: 17,
              border: "none",
              borderRadius: 15,
              padding: "10px 40px",
              boxShadow: activeTab === tab.key
                ? "0 4px 20px #6d28d933"
                : "none",
              cursor: "pointer",
              transition: "all .13s",
              letterSpacing: ".1px"
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
       <div style={{ position: "relative", zIndex: 800 }}>
<StarBubblesEffect/>

</div>

      {/* محتوى التاب (صفحة الإدارة المختارة) */}
      <div style={{
        maxWidth: 1650,
        margin: "0 auto",
        borderRadius: 28,
        background: "#fff",
        boxShadow: "0 2px 30px #6D28D90a",
        
        padding: "32px 0",
        position: "relative",
        zIndex: 1
      }}>
        {tabs.map(tab =>
          tab.key === activeTab &&
          <div key={tab.key} style={{ animation: "fadeinTab .22s" }}>
            {tab.component}
          </div>
        )}
      </div>

       <div style={{ position: "relative", zIndex: 800 }}>
<StarBubblesEffect/>

</div>
      <style>{`
        @keyframes fadeinTab {
          from { opacity: 0; transform: translateY(28px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
       <div style={{ position: "relative", zIndex: 800 }}>
<StarBubblesEffect/>

</div>

    </div>
    </div>
  );
}
