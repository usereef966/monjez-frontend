import React, { useEffect, useState } from "react";
import api from "../api";
import { Mail, Bell, CheckCircle, Circle, Trash2, Send, RefreshCw } from "lucide-react"; 
 

export default function Inbox() {
  const [tab, setTab] = useState("inbox");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reply, setReply] = useState("");
  const [activeItem, setActiveItem] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const pageSize = 10;
  const endpoint = `/api/${tab}`;
  const isInbox = tab === "inbox";

  const fetchData = () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    setLoading(true);
    setError("");
    api
      .get(endpoint)
      .then((res) => setItems(res.data))
      .catch(() => setError(`Failed to load ${tab}`))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setPage(1);
    fetchData();
    // eslint-disable-next-line
  }, [tab]);

  // Search filter
  const filtered = items.filter((item) => {
    const searchStr = search.toLowerCase();
    return (
      String(item.id).includes(searchStr) ||
      (item.sender_name || "").toLowerCase().includes(searchStr) ||
      (item.subject || item.content || "").toLowerCase().includes(searchStr) ||
      (isInbox
        ? (item.message || "")
        : (item.link || "")
      ).toLowerCase().includes(searchStr)
    );
  });

  const pages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const toggleRead = (id, isRead) => {
    api.patch(`${endpoint}/${id}`, { is_read: isRead ? 0 : 1 }).then(() => {
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, is_read: isRead ? 0 : 1 } : item
        )
      );
    });
  };

  const deleteItem = (id) => {
    api
      .delete(`${endpoint}/${id}`)
      .then(() => setItems(items.filter((item) => item.id !== id)));
  };

  const sendReply = () => {
    if (!reply || !activeItem) return;
    api
      .post("/inbox/send", {
        receiver_id: activeItem.sender_id,
        subject: `Re: ${activeItem.subject || activeItem.content}`,
        message: reply,
      })
      .then(() => {
        alert("✅ Reply sent successfully");
        setReply("");
        setActiveItem(null);
      });
  };

  // STYLES
  const color = {
    purple: "#6D28D9",
    lightPurple: "#F3F4F6",
    white: "#fff",
    gray: "#4B5563",
    green: "#10B981",
    red: "#EF4444",
    yellow: "#FBBF24",
    blue: "#60A5FA",
    darkText: "#2D2D2D",
    border: "#F1F1F1",
    
    badgeGray: "#E5E7EB",
    unreadBg: "#EDE9FE",
    readBg: "#F9FAFB",
  };

  const styles = {
    wrapper: {
      maxWidth: 1600,
      marginTop:90, 
      margin: "48px auto 0 auto",
      padding: 32,
      background: color.white,
      borderRadius: 24,
      boxShadow: "0 4px 32px 0 rgba(109,40,217,0.07)",
      position: "relative",
      zIndex: 1,
    },
    headerRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 28,
    },
    title: {
      fontSize: 28,
      fontWeight: 700,
      color: color.purple,
      margin: 0,
      letterSpacing: ".5px",
    },
    tabs: {
      display: "flex",
      gap: 16,
      alignItems: "center",
    },
    tabBtn: (active) => ({
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "8px 22px",
      borderRadius: 999,
      border: "none",
      background: active ? color.purple : color.lightPurple,
      color: active ? "#fff" : color.gray,
      fontWeight: active ? 600 : 500,
      fontSize: 16,
      boxShadow: active ? "0 4px 16px 0 rgba(109,40,217,0.09)" : "none",
      cursor: "pointer",
      transition: "all 0.18s",
    }),
    reloadBtn: {
      background: "linear-gradient(90deg, #a78bfa 0%, #9333ea 100%)",
      color: "#fff",
      fontWeight: 600,
      fontSize: 16,
      padding: "9px 28px",
      border: "none",
      borderRadius: 999,
      boxShadow: "0 4px 14px 0 rgba(109,40,217,0.11)",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginLeft: 18,
    },
    searchRow: {
      margin: "0 0 18px 0",
      display: "flex",
      alignItems: "center",
      gap: 16,
    },
    searchInput: {
      flex: 1,
      background: color.lightPurple,
      padding: "12px 22px",
      borderRadius: 12,
      border: "1px solid #F3F4F6",
      fontSize: 15,
      color: color.darkText,
      outline: "none",
      fontWeight: 500,
      transition: "border 0.12s",
    },
    tableWrap: {
      borderRadius: 18,
      overflow: "hidden",
      border: `1px solid ${color.border}`,
      marginBottom: 24,
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      background: "#fff",
      fontSize: 15,
    },
    th: {
      padding: "18px 8px",
      fontWeight: 700,
      color: color.gray,
      textAlign: "left",
      background: color.lightPurple,
      borderBottom: `2px solid ${color.border}`,
      fontSize: 15.5,
    },
    td: (read) => ({
      padding: "16px 8px",
      background: read ? color.readBg : color.unreadBg,
      borderBottom: `1px solid ${color.border}`,
      fontWeight: read ? 400 : 600,
      color: color.darkText,
      verticalAlign: "middle",
      fontSize: 15,
      transition: "background 0.12s",
    }),
    badge: (bg, colorText) => ({
      background: bg,
      color: colorText,
      padding: "4px 13px",
      borderRadius: 9,
      fontSize: 14,
      fontWeight: 600,
      display: "inline-block",
      minWidth: 72,
      textAlign: "center",
    }),
    actions: {
      display: "flex",
      gap: 6,
      justifyContent: "center",
      alignItems: "center",
    },
    actionBtn: (bg) => ({
      background: bg,
      border: "none",
      borderRadius: 10,
      width: 36,
      
      height: 36,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "background 0.13s",
      boxShadow: "0 1px 3px rgba(109,40,217,0.07)",
      
    }),
    
    // Modal styles
    modalOverlay: {
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(30,24,75,0.19)",
      
      display: "flex",
      justifyContent: "center",
      
      alignItems: "center",
      animation: "fadeIn 0.2s"
    },
    modal: {
      background: "#fff",
      borderRadius: 18,
      maxWidth: 420,
      padding: 28,
      boxShadow: "0 8px 44px rgba(109,40,217,0.21)",
      minWidth: 320,
      zIndex: 41,
      animation: "popup .19s"
    },
    modalTitle: {
      marginBottom: 10,
      fontWeight: 700,
      fontSize: 20,
      color: color.purple
    },
    textarea: {
      width: "100%",
      padding: 12,
      borderRadius: 10,
      border: "1px solid #D1D5DB",
      marginBottom: 10,
      fontSize: 15,
      outline: "none",
      minHeight: 90,
      fontWeight: 500,
      color: "#2D2D2D",
      background: color.lightPurple
    },
    modalBtn: {
      background: color.purple,
      color: "#fff",
      border: "none",
      borderRadius: 9,
      padding: "8px 22px",
      fontWeight: 600,
      fontSize: 15,
      marginTop: 4,
      cursor: "pointer",
      transition: "background 0.12s"
    },
    pagination: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: 8,
      fontSize: 15,
      fontWeight: 500,
      color: color.gray,
      marginTop: 0,
    },
    pageBtn: (active) => ({
      padding: "4px 14px",
      borderRadius: 8,
      border: "none",
      background: active ? color.purple : color.lightPurple,
      color: active ? "#fff" : color.gray,
      fontWeight: active ? 600 : 500,
      cursor: "pointer",
    }),
  
  };
  

  // Pagination size
  const handlePageSize = (e) => {
    // optional: dynamic page size
    // setPageSize(Number(e.target.value));
  };

  // CHART DATA
  const chartData = {
    labels: items
      .slice()
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      .map((i) =>
        new Date(i.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      ),
    datasets: [
      {
        label: "Messages",
        data: items
          .slice()
          .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
          .map((_, i) => i + 1),
        borderColor: color.purple,
        backgroundColor: color.unreadBg,
        tension: 0.35,
        pointRadius: 4,
        pointBorderWidth: 2,
        fill: true,
        pointBackgroundColor: color.purple
        
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, ticks: { font: { size: 13 } } },
      x: { ticks: { font: { size: 13 } } }
    }
  };

  // STATUS BADGE
  const statusBadge = (read) => {
    return read
      ? (
        <span style={styles.badge(color.badgeGray, color.gray)}>
          <CheckCircle size={14} color={color.green} style={{ marginRight: 4, marginBottom: -2 }} />
          Read
        </span>
      )
      : (
        <span style={styles.badge("#FDE68A", color.yellow)}>
          <Circle size={14} color={color.yellow} style={{ marginRight: 4, marginBottom: -2 }} />
          Unread
        </span>
      );
  };
  

  // --------- COMPONENT RENDER ---------
  return (


    <div style={{ position: "relative", zIndex: 100  }}>

      <div style={{
  background: "linear-gradient(90deg,#6366f1 20%, #6d28d9 100%)",
  padding: "20px 30px",
  borderRadius: 22,
  boxShadow: "0 6px 36px 0 rgba(109,40,217,0.12)",
  margin: "24px auto 42px auto",
  maxWidth: 200,
  marginLeft: 300 , 
  display: "flex",
  position: "relative"
}}>
 
  <h1 style={{
    fontSize: 18,
    color: "#fff",
    fontWeight: 900,
    letterSpacing: ".6px",
    margin: 0,
    textShadow: "0 1px 10px#4f46e5, 0 1px 10px #a5b4fc5d"
  }}>
    Inbox & Notification
  </h1>
</div>

    <div 
    

    
    
    
    style={styles.wrapper  }>
      {/* Header + Tabs + Reload */}
      <div style={styles.headerRow}>
        <div>
          <div style={styles.title}>Inbox & Notifications</div>
          <div style={{ color: "#7C3AED", fontWeight: 400, fontSize: 14, marginTop: 4, marginLeft: 2 }}>
            Manage all your messages and notifications like a pro 🚀
          </div>
        </div>
        <div style={styles.tabs}>
          <button style={styles.tabBtn(tab === "inbox")} onClick={() => setTab("inbox")}>
            <Mail size={17} /> Inbox
          </button>
          <button style={styles.tabBtn(tab === "notifications")} onClick={() => setTab("notifications")}>
            <Bell size={17} /> Notifications
          </button>
          <button style={styles.reloadBtn} onClick={fetchData}>
            <RefreshCw size={17} /> Reload
          </button>
        </div>
      </div>

      {/* Search */}
      <div style={styles.searchRow}>
        <input
          style={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by ID, sender, subject, message..."
        />
      </div>

      {/* Table */}
      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Sender</th>
              <th style={styles.th}>{isInbox ? "Subject" : "Content"}</th>
              <th style={styles.th}>{isInbox ? "Message" : "Link"}</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: 28 }}>Loading...</td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={7} style={{ color: color.red, textAlign: "center", padding: 18 }}>{error}</td>
              </tr>
            )}
            {!loading && !error && paginated.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", color: color.gray, padding: 18 }}>
                  No {tab} found.
                </td>
              </tr>
            )}
            {!loading && !error && paginated.map((item) => (
              <tr key={item.id}>
                <td style={styles.td(!!item.is_read)}>{item.id}</td>
                <td style={styles.td(!!item.is_read)}>
                  {new Date(item.created_at).toLocaleString("en-US", {
                    year: "2-digit", month: "2-digit", day: "2-digit",
                    hour: "2-digit", minute: "2-digit"
                  })}
                </td>
                <td style={styles.td(!!item.is_read)}>
                  {item.sender_name || "System"}
                </td>
                <td style={styles.td(!!item.is_read)}>
                  <span style={{ color: color.purple, fontWeight: 600 }}>{isInbox ? item.subject : item.content}</span>
                </td>
                <td style={styles.td(!!item.is_read)}>
                  {isInbox ? item.message : (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: color.blue }}>
                      {item.link}
                    </a>
                  )}
                </td>
                <td style={styles.td(!!item.is_read)}>
                  {statusBadge(!!item.is_read)}
                </td>
                <td style={styles.td(!!item.is_read)}>
                  <div style={styles.actions}>
                    <button
                      style={styles.actionBtn(color.badgeGray)}
                      title={item.is_read ? "Mark as Unread" : "Mark as Read"}
                      onClick={() => toggleRead(item.id, item.is_read)}
                    >
                      {item.is_read ? <Circle size={17} color={color.yellow} /> : <CheckCircle size={17} color={color.green} />}
                    </button>
                    <button
                      style={styles.actionBtn("#FEE2E2")}
                      title="Delete"
                      onClick={() => deleteItem(item.id)}
                    >
                      <Trash2 size={17} color={color.red} />
                    </button>
                    {isInbox && (
                      <button
                        style={styles.actionBtn(color.unreadBg)}
                        title="Reply"
                        onClick={() => setActiveItem(item)}
                      >
                        <Send size={17} color={color.purple} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
      


      {/* Pagination */}
      <div style={styles.pagination}>
        <span style={{ marginRight: 10, color: color.gray, fontWeight: 400, fontSize: 14 }}>
          Showing {paginated.length} of {filtered.length} {tab}
        </span>
        <button
          style={styles.pageBtn(false)}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >Prev</button>
        <span style={{ minWidth: 35, textAlign: "center" }}>Page {page} of {pages || 1}</span>
        <button
          style={styles.pageBtn(false)}
          onClick={() => setPage((p) => Math.min(pages, p + 1))}
          disabled={page === pages || pages === 0}
        >Next</button>
      </div>

      {/* Reply Modal */}
      {activeItem && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalTitle}>
              Reply to: {activeItem.subject || activeItem.content}
            </div>
            <textarea
              style={styles.textarea}
              rows="5"
              placeholder="Type your reply here..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            <button style={styles.modalBtn} onClick={sendReply}>
              Send Reply
            </button>
            <button
              style={{
                ...styles.modalBtn,
                background: "#E5E7EB",
                color: color.gray,
                marginLeft: 9,
              }}
              onClick={() => { setActiveItem(null); setReply(""); }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}


    </div>
    </div>
    
  );
}
