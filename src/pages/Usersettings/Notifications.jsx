import React, { useEffect, useState, useRef } from "react";




// عناصر الإشعارات كما هي
function NotificationItem({ type = "info", title, message, date }) {
  // ... كما عندك بالضبط ...
  // [نفس الكود]
}

// فقاعة الرسالة كما هي
function MessageBubble({ fromMe, text, date }) {
  // ... كما عندك ...
}

// فورم الإرسال كما هو
function MessageForm({ onSend }) {
  // ... كما عندك ...
}


export default function UserNotifications() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  // الحالات الديناميكية
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msgSending, setMsgSending] = useState(false);
  const messagesEndRef = useRef(null);

  // جلب البيانات عند التحميل
  useEffect(() => {
    if (!userId) return;

    // جلب الإشعارات
    fetch(`https://monjez-online.onrender.com/api/notifications?user_id=${userId}`)
      .then(res => res.json())
      .then(data => setNotifications(data.notifications || []));

    // جلب الرسائل
    fetch(`https://monjez-online.onrender.com/api/messages?user_id=${userId}`)
      .then(res => res.json())
      .then(data => setMessages(data.messages || []));

    setLoading(false);
  }, [userId]);

  // Scroll لآخر رسالة عند الإرسال/الجلب
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // إرسال رسالة
  async function handleSendMessage(text) {
    if (!userId) return;
    setMsgSending(true);

    try {
      const res = await fetch("https://monjez-online.onrender.com/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, text }),
      });
      const data = await res.json();

      if (res.ok) {
        // بعد الإرسال، أضف الرسالة مباشرة أو أعد جلبها
        setMessages(msgs => [...msgs, { fromMe: true, text, date: new Date().toLocaleString() }]);
      } else {
        alert(data.error || "تعذر إرسال الرسالة");
      }
    } catch {
      alert("فشل الاتصال بالخادم");
    }
    setMsgSending(false);
  }

  // ستايلات (نفس عندك)
  // ...

  return (
    <div style={{
      width: "100%",
      maxWidth: 930,
      margin: "0 auto",
      marginTop: 10,
      display: "flex",
      gap: 30,
      alignItems: "flex-start",
      direction: "rtl"
    }}>
      {/* إشعارات */}
      <div style={{
        width: 290,
        minWidth: 200,
        maxHeight: 530,
        background: "#fff",
        borderRadius: 15,
        boxShadow: "0 2px 14px #7c4dff10",
        padding: "22px 12px 16px 12px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch"
      }}>
        <div style={{
          color: "#7c4dff",
          fontWeight: 800,
          fontSize: 17.5,
          marginBottom: 14,
          textAlign: "center"
        }}>
          الإشعارات
        </div>
        {loading ? <div>جاري التحميل...</div> :
          notifications.length === 0
            ? <div style={{ color: "#bbb", textAlign: "center", marginTop: 33 }}>لا يوجد إشعارات بعد.</div>
            : notifications.map((n, i) =>
              <NotificationItem
                key={i}
                type={n.type}
                title={n.title}
                message={n.message}
                date={n.date}
              />
            )
        }
      </div>
      

      {/* الرسائل */}
      <div style={{
        flex: 1,
        minWidth: 320,
        background: "#fff",
        borderRadius: 15,
        boxShadow: "0 2px 14px #7c4dff10",
        padding: "22px 18px 16px 18px",
        maxHeight: 530,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        overflow: "hidden"
      }}>
        <div style={{
          color: "#26de81",
          fontWeight: 800,
          fontSize: 17.5,
          marginBottom: 14,
          textAlign: "center"
        }}>
          رسائل الدعم والتواصل
        </div>
        <div style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 3
        }}>
          {loading ? <div>جاري التحميل...</div> :
            messages.length === 0
              ? <div style={{ color: "#bbb", textAlign: "center", marginTop: 25 }}>لا توجد رسائل بعد.</div>
              : messages.map((m, i) =>
                <MessageBubble
                  key={i}
                  fromMe={m.fromMe}
                  text={m.text}
                  date={m.date}
                />
              )
          }
          <div ref={messagesEndRef} />
        </div>
        <MessageForm onSend={handleSendMessage} disabled={msgSending} />
      </div>
    </div>
  );
}




