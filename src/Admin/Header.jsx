import React, { useState, useEffect, useRef } from "react";
import { MNZ } from "../theme";
import { FiMenu, FiFilter } from "react-icons/fi";
import profileAvatar from "../assets/svg/avatar.png";

import NotificationBell from "./NotificationBell";
import SearchButton from "./SearchButton";
import AccountDropdown from "./AccountDropdown";
import StarBubblesEffect from './StarBubblesEffect';

// موجة الهيدر
function WaveSVG({ fill, height = 240 }) {
  return (
    <svg viewBox="0 0 1440 240" preserveAspectRatio="none"
      style={{
        position: "absolute", bottom: -1, left: 0, width: "100%", height, zIndex: 1
      }}>
      <path d="M0 120 C 360 200, 720 40, 1080 160 S 1440 80, 1440 80 L1440 240 L0 240 Z" fill={fill} />
    </svg>
  );
}

export default function Header({ height = 72, onToggleSidebar, setLogoutModal }) {
  const waveHeight = 240;
  const totalH = height + waveHeight;
  const [offset, setOffset] = useState(0);

  // حساب (الصورة المنسدلة)
  const [showAccount, setShowAccount] = useState(false);
  const [anchorPos, setAnchorPos] = useState({ top: 0, left: 0 });
  const avatarRef = useRef();

  // Responsive للعرض
  const [isSmall, setIsSmall] = useState(window.innerWidth < 1200);
  useEffect(() => {
    function handleResize() {
      setIsSmall(window.innerWidth < 1200);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // الهيدر عند السحب
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const newOffset = Math.min(y, height);
      setOffset(newOffset);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [height]);

  // حساب/آفاتار
  function handleAvatarClick() {
    if (avatarRef.current) {
      const rect = avatarRef.current.getBoundingClientRect();
      setAnchorPos({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX
      });
    }
    setShowAccount(s => !s);
  }

  return (
    <header
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        height: totalH,
        background: MNZ.colors.gray900,
        color: "#fff",
        transform: `translateY(-${offset}px)`,
        transition: "transform 0.2s ease-out",
        zIndex: 80,
        boxShadow: "0 4px 32px #1114",
      }}
    >
      <div style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: "0 22px",
        height: height,
        position: "relative",
      }}>
        {/* يسار: زر القائمة + سيرتش */}
        <div style={{
          flex: 2, // يسيطر على العرض الأكبر (خاصة لو RTL)
          display: "flex",
          alignItems: "center",
          minWidth: 220,
          gap: 20
        }}>
          {/* زر طي السايدبار (الهامبرجر) */}
          <button
            onClick={onToggleSidebar}
            style={{
              width: 38, height: 38, border: "none",
              background: "transparent", color: "inherit", cursor: "pointer",
              marginLeft: 250, display: "flex", alignItems: "center", justifyContent: "center",
            }}>
            <FiMenu size={22} />
          </button>
          {/* السيرتش - SearchButton */}
          <div style={{
            width: "100%",
            maxWidth: isSmall ? 210 : 400,
            minWidth: 140,
            marginLeft: 0,
            marginRight: 0,
            transition: "max-width 0.2s"
          }}>
            <SearchButton />
          </div>
        </div>
        {/* يمين الهيدر: بوتونات منفصلة */}
        <div style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: 8,
          gap: 18,
          minWidth: 200,
        }}>
          {/* جرس الإشعارات */}
          <NotificationBell />
          
          {/* زر الفلاتر */}
          <button
            style={{
              height: 36, padding: "0 16px",
              border: `1px solid ${MNZ.colors.primary}`,
              borderRadius: MNZ.radius,
              background: "transparent",
              color: "#fff", fontSize: 13,
              fontWeight: 600,
              display: "flex", alignItems: "center", gap: 4, cursor: "pointer",
            }}>
            <FiFilter style={{ marginRight: 3 }} />
            Filters
          </button>
          {/* صورة الحساب (آفاتار) */}
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              ref={avatarRef}
              src={profileAvatar}
              alt="Profile"
              style={{
                width: 50, height: 55, borderRadius: "50%",
                marginRight: 60, marginLeft: 8, marginTop: 8,
                objectFit: "cover", border: "2px solid #2a2a56", cursor: "pointer"
              }}
              onClick={handleAvatarClick}
            />
            <AccountDropdown
            
              show={showAccount}
              onClose={() => setShowAccount(false)}
              anchorPos={anchorPos}
              setLogoutModal={setLogoutModal}
            />
          </div>
          
        </div>
      </div>
      <WaveSVG fill={MNZ.colors.gray900} height={waveHeight} />
    </header>
  );
}
