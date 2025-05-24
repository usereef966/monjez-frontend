import React, { useState, useEffect } from "react";

export default function FloatingChatBubble() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  // إظهار عند السكروول
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 350);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* أيقونة الشات العائمة */}
      <button
        className={`floating-chat-btn${visible ? " visible" : ""}${open ? " open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Chat with support"
      >
        {/* أيقونة شات SVG */}
        <svg width="36" height="36" viewBox="0 0 48 48">
          <defs>
            <radialGradient id="chatGrad" cx="60%" cy="40%" r="80%">
              <stop offset="0%" stopColor="#bdaaff"/>
              <stop offset="90%" stopColor="#7a4aff"/>
            </radialGradient>
          </defs>
          <circle cx="24" cy="24" r="22" fill="url(#chatGrad)" />
          <path d="M14 20c0-3.3 4.5-6 10-6s10 2.7 10 6-4.5 6-10 6a19.9 19.9 0 0 1-3-.2L14 32l1.7-4.5C14.7 26.2 14 23.2 14 20Z" fill="#fff" />
        </svg>
      </button>

      {/* نافذة الشات نفسها */}
      {open && (
        <div className="chat-modal">
          {/* هنا تصميم الشات الفاخر - اجعله كما تحب! */}
          <div className="chat-header">
            🤖 مساعد منجز الذكي
            <button onClick={() => setOpen(false)}>×</button>
          </div>
          <div className="chat-body">
            {/* مكان الرسائل */}
            <div className="chat-message user">مرحبا، كيف أساعدك؟</div>
            <div className="chat-message bot">اكتب استفسارك 👋</div>
            {/* ... */}
          </div>
          <div className="chat-input-row">
            <input className="chat-input" type="text" placeholder="اكتب رسالتك..." />
            <button className="chat-send-btn">إرسال</button>
          </div>
        </div>
      )}

      <style>{`
        .floating-chat-btn {
          position: fixed;
          bottom: 140px;
          Right: 45px;
          z-index: 1010;
          width: 62px;
          height: 62px;
          border-radius: 50%;
          background: #fff0;
          border: none;
          box-shadow: 0 4px 22px #bdaaff88, 0 1.5px 4px #fff0;
          opacity: 0;
          transform: translateY(110px) scale(0.6);
          transition: opacity .37s, transform .38s cubic-bezier(.43,1.6,.49,1.01);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: blur(0.2px);
        }
        .floating-chat-btn.visible {
          opacity: 1;
          transform: translateY(0) scale(1.05);
          animation: chatBobble 1.4s cubic-bezier(.51,1.5,.49,1.08);
        }
        .floating-chat-btn.open {
          box-shadow: 0 8px 36px #bdaaffcc, 0 1.5px 4px #fff0;
          filter: brightness(1.1);
        }
        @keyframes chatBobble {
          0% { opacity: 0; transform: translateY(90px) scale(.4);}
          60% { opacity: 1; transform: translateY(-10px) scale(1.11);}
          100% { opacity: 1; transform: translateY(0) scale(1.05);}
        }
        .chat-modal {
          position: fixed;
          right: 38px;
          bottom: 115px;
          width: 370px;
          max-width: 92vw;
          min-height: 420px;
          background: rgba(26, 21, 54, 0.95);
          border-radius: 23px;
          box-shadow: 0 8px 60px #7a4aff44;
          z-index: 1111;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: chatIn .68s cubic-bezier(.61,1.5,.52,1.11);
        }
        @keyframes chatIn {
          0% { opacity: 0; transform: translateY(90px) scale(.86);}
          100% { opacity: 1; transform: translateY(0) scale(1);}
        }
        .chat-header {
          background: linear-gradient(95deg, #7a4aff 10%, #bdaaff 90%);
          color: #fff;
          font-weight: bold;
          font-size: 18.7px;
          padding: 13px 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          letter-spacing: 0.01em;
        }
        .chat-header button {
          background: none;
          border: none;
          font-size: 32px;
          color: #fff;
          line-height: 1;
          cursor: pointer;
          margin-right: 8px;
          opacity: .7;
        }
        .chat-body {
          flex: 1;
          padding: 18px 16px 10px 16px;
          display: flex;
          flex-direction: column;
          gap: 13px;
          overflow-y: auto;
          background: #232647;
        }
        .chat-message {
          max-width: 78%;
          padding: 10px 16px;
          border-radius: 18px;
          font-size: 16px;
          line-height: 1.7;
          margin-bottom: 2px;
          word-break: break-word;
        }
        .chat-message.user {
          background: #7a4aff22;
          color: #a09fe6;
          align-self: flex-end;
        }
        .chat-message.bot {
          background: #bdaaff33;
          color: #fff;
          align-self: flex-start;
        }
        .chat-input-row {
          display: flex;
          padding: 12px;
          background: #1a1536;
        }
        .chat-input {
          flex: 1;
          padding: 10px 16px;
          border-radius: 14px;
          border: none;
          font-size: 16px;
          margin-right: 7px;
          outline: none;
          background: #232645;
          color: #f5f4fd;
        }
        .chat-send-btn {
          background: linear-gradient(90deg, #7a4aff 10%, #bdaaff 90%);
          color: #fff;
          border: none;
          border-radius: 13px;
          padding: 9px 20px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: filter 0.17s;
          box-shadow: 0 2px 16px #7a4aff33;
        }
        .chat-send-btn:hover {
          filter: brightness(1.15);
        }
        @media (max-width: 600px) {
          .chat-modal {
            right: 8px;
            right: 8px;
            width: 97vw;
            min-height: 350px;
          }
          .floating-chat-btn {
            right: 10px;
            bottom: 16px;
            width: 52px;
            height: 52px;
          }
        }
      `}</style>
    </>
  );
}
