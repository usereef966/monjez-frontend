import React, { useState } from "react";
import IosOrdertManagment from "./IosOrdertManagment";
import AndroidOrdertManagment from "./AndroidOrderManagement"; // جهزها لاحقاً

export default function MobileOrderStats() {
  const [tab, setTab] = useState("ios");

  return (
    <div>
      <div style={{
        display: "flex",
        gap: 12,
        justifyContent: "center",
        marginBottom: 28,
        marginTop: 8
      }}>
        <button
          onClick={() => setTab("ios")}
          style={{
            background: tab === "ios"
              ? "linear-gradient(90deg,#6366f1,#6d28d9)"
              : "#f3f3fa",
            color: tab === "ios" ? "#fff" : "#6D28D9",
            fontWeight: 700,
            padding: "8px 32px",
            border: "none",
            borderRadius: 11,
            fontSize: 16,
            cursor: "pointer",
            boxShadow: tab === "ios" ? "0 2px 16px #6d28d922" : "none",
            transition: "all 0.2s"
          }}
        >
          iOS Orders
        </button>
        <button
          onClick={() => setTab("android")}
          style={{
            background: tab === "android"
              ? "linear-gradient(90deg,#6366f1,#6d28d9)"
              : "#f3f3fa",
            color: tab === "android" ? "#fff" : "#6D28D9",
            fontWeight: 700,
            padding: "8px 32px",
            border: "none",
            borderRadius: 11,
            fontSize: 16,
            cursor: "pointer",
            boxShadow: tab === "android" ? "0 2px 16px #6d28d922" : "none",
            transition: "all 0.2s"
          }}
        >
          Android Orders
        </button>
      </div>
      <div>
        {tab === "ios" && <IosOrdertManagment />}
         {tab === "android" && <AndroidOrdertManagment />} 
      </div>
    </div>
  );
}