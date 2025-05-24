import React, { useState } from "react";
import UserSidebarProfile from "./SidebarProfile";
import UserProfile from "./UserProfile";
import UserDashboard from "./Dashboard";
import UserCompanySettings from "./Companysettings";
import UserNotifications from "./Notifications";

export default function UserMainpage() {
  const [activeTab, setActiveTab] = useState("profile");

  // تعريف التبويبات
  const tabs = [
    { id: "profile", label: "الملف الشخصي" },
    { id: "dashboard", label: "لوحة القيادة" },
    { id: "company", label: "إعدادات الشركة" },
    { id: "notifications", label: "الإشعارات" },
  ];

  // ستايلات
  const containerStyle = {
    width: "100%",
    background: "#f7f6fc",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "24px 0 200px",
    direction: "rtl",
  };

  const cardStyle = {
    width: "60%",
    minHeight: 680,
    background: "#fff",
    borderRadius: 28,
    boxShadow: "0 8px 32px rgba(173, 149, 246, 0.1)",
    display: "flex",
    overflow: "hidden",
  };

  const sidebarStyle = {
    width: 275,
    background: "#faf9ff",
    borderLeft: "1.2px solid #f0e9ff",
    padding: "38px 15px 24px 10px",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const mainContentStyle = {
    flex: 1,
    padding: "36px 46px 38px",
    display: "flex",
    flexDirection: "column",
  };

  const tabsWrapper = {
    display: "flex",
    gap: 36,
    borderBottom: "1.5px solid #ede7fa",
    margin: "0 auto 34px",
    paddingBottom: 2,
    justifyContent: "center",
    overflowX: "auto",
    width: "fit-content",
  };

  const tabBtn = (isActive) => ({
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 22,
    fontWeight: isActive ? 800 : 500,
    color: isActive ? "#7c4dff" : "#4b447b",
    padding: "12px 8px 14px",
    borderBottom: isActive ? "4px solid #7c4dff" : "4px solid transparent",
    transition: "color 0.18s, border 0.19s",
    minWidth: 138,
    textAlign: "center",
  });

  // دالة عرض المحتوى بناءً على التبويب
  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <UserProfile />;
      
      case "dashboard":
        return <UserDashboard />;
      case "company":
        return <UserCompanySettings />;
      case "notifications":
        return <UserNotifications />;
      default:
        return null;
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* العمود الجانبي للمعلومات العامة */}
        <aside style={sidebarStyle}>
          <UserSidebarProfile />
        </aside>

        {/* العمود الرئيسي: تبويبات + محتوى */}
        <section style={mainContentStyle}>
          <div style={tabsWrapper}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                style={tabBtn(activeTab === tab.id)}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {renderTabContent()}
        </section>
      </div>
    </div>
  );
}
