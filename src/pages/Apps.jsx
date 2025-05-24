// Apps.jsx
import React from "react";
import { useParams } from "react-router-dom";
import AndroidShowcase from "../components/AndroidShowcase";
import IOSShowcase from "../components/IOSShowcase";

export default function Apps() {
  const { platform } = useParams(); // "android" أو "ios"

  if (platform === "android") return <AndroidShowcase />;
  if (platform === "ios") return <IOSShowcase />;

  // خيار fallback لو دخل رابط غلط
  return (
    <div style={{
      minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 28, fontWeight: 800, color: "#c32", letterSpacing: 2
    }}>
      المنصة غير معروفة! يرجى اختيار Android أو iOS من القائمة.
    </div>
  );
}
