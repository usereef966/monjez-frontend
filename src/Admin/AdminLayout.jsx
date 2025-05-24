import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { MNZ } from "../theme";
import Sidebar from "./Sidebar";
import Header  from "./Header";

export default function AdminLayout({ setLogoutModal }) { // ← أضفتها هنا
  const [collapsed, setCollapsed] = useState(false);

  /* مقاسات ثابتة */
  const headerHeight   = 72;
  const waveHeight     = 240;
  const expandedWidth  = 240;
  const collapsedWidth = 64;
  const sidebarWidth   = collapsed ? collapsedWidth : expandedWidth;

  return (
    <div>
      {/* Header */}
      <Header
        height={headerHeight}
        sidebarWidth={sidebarWidth}
        onToggleSidebar={() => setCollapsed((c) => !c)}
        setLogoutModal={setLogoutModal} // تأكد من وجود هذا السطر
      />

      {/* Sidebar */}
      <Sidebar
        width={sidebarWidth}
        top={headerHeight}
        collapsed={collapsed}
        setLogoutModal={setLogoutModal}   // أهم سطر
      />

      {/* Main content */}
      <main
        style={{
          marginLeft : sidebarWidth,
          marginTop  : headerHeight + waveHeight - 220,
          padding    : 24,
          background : MNZ.colors.gray100,
          minHeight  : `calc(100vh - ${headerHeight}px)`,
          transition : `margin ${MNZ.timing}`,
          zIndex     : 300,
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
