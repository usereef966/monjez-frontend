import React, { useRef, useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { createPortal } from "react-dom";
import api from "../api"; // عدل المسار إذا API في مكان آخر

export default function SearchButton() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(-1);
  const inputRef = useRef();
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 290 });

  // تحديث موقع القائمة تحت البحث
  function updateDropdownPos() {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  }

  useEffect(() => {
    if (open) {
      updateDropdownPos();
      window.addEventListener("resize", updateDropdownPos);
    }
    return () => window.removeEventListener("resize", updateDropdownPos);
  }, [open]);

  // جلب النتائج مع Debounce
  useEffect(() => {
    if (!search.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const timeout = setTimeout(async () => {
      try {
        const token = localStorage.getItem("token");
        const [inboxRes, notifRes] = await Promise.all([
          api.get("/api/inbox", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/api/notifications", { headers: { Authorization: `Bearer ${token}` } })
        ]);
        let inboxResults = inboxRes.data
          .filter(m => (m.subject + m.message).toLowerCase().includes(search.toLowerCase()))
          .map(m => ({
            type: "Message",
            id: m.id,
            text: m.subject,
            desc: m.message,
            created: m.created_at
          }));
        let notifResults = notifRes.data
          .filter(n => (n.content || "").toLowerCase().includes(search.toLowerCase()))
          .map(n => ({
            type: "Notification",
            id: n.id,
            text: n.content,
            desc: n.link,
            created: n.created_at
          }));
        let allResults = [...inboxResults, ...notifResults];
        setResults(allResults);
      } catch {
        setResults([]);
      }
      setLoading(false);
    }, 400);
    return () => clearTimeout(timeout);
  }, [search]);

  // تنقل بالكيبورد
  function handleKeyDown(e) {
    if (!results.length) return;
    if (e.key === "ArrowDown") setActive(a => (a + 1) % results.length);
    else if (e.key === "ArrowUp") setActive(a => (a - 1 + results.length) % results.length);
    else if (e.key === "Enter" && active >= 0 && active < results.length) handleResultClick(results[active]);
  }

  function handleResultClick(result) {
    setOpen(false); setActive(-1);
    if (result.type === "Message") window.location.href = `/admin/inbox/${result.id}`;
    else if (result.type === "Notification") window.location.href = result.desc || `/admin/notifications/${result.id}`;
  }

  // إغلاق البحث عند الضغط خارج الدروبداون
  useEffect(() => {
    function handleClick(e) {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setOpen(false); setActive(-1);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <>
      <div style={{
        display: "flex",
        alignItems: "center",
        background: "#232347",
        borderRadius: 12,
        boxShadow: "0 2px 10px #0001",
        padding: "0 10px",
        height: 38,
        
        width: 290,
        color: "#fff",
        cursor: "text"
      }}>
        <FiSearch size={20} style={{ marginRight: 9, color: "#888" }} />
        <input
          ref={inputRef}
          type="text"
          value={search}
          placeholder="Search messages or notifications..."
          onFocus={() => { setOpen(true); updateDropdownPos(); }}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#fff",
            fontSize: 15,
            fontWeight: 600,
            padding: "7px 0"
          }}
        />
        {search && (
          <button onClick={() => { setSearch(""); setResults([]); }} style={{
            background: "transparent", border: "none", color: "#aaa",
            marginLeft: 6, cursor: "pointer", fontSize: 18
          }}>×</button>
        )}
      </div>
      {open && (search.trim() || loading) && createPortal(
        <div style={{
          position: "fixed",
          top: dropdownPos.top,
          left: dropdownPos.left,
          width: dropdownPos.width,
          background: "#fff",
          zIndex: 9999,
          borderRadius: 12,
          boxShadow: "0 8px 28px #2222",
          padding: "8px 0",
          marginTop: 0,
          maxHeight: 340,
          overflowY: "auto"
        }}>
          {loading && (
            <div style={{ color: "#666", textAlign: "center", padding: 22, fontSize: 14 }}>
              Searching...
            </div>
          )}
          {!loading && results.length === 0 && (
            <div style={{ color: "#888", textAlign: "center", padding: 18, fontSize: 14 }}>
              No results found.
            </div>
          )}
          {!loading && results.map((r, i) => (
            <div
              key={`${r.type}-${r.id}`}
              onClick={() => handleResultClick(r)}
              style={{
                padding: "11px 22px",
                background: i === active ? "#f3f5ff" : "#fff",
                color: "#232347",
                cursor: "pointer",
                borderBottom: "1px solid #f3f3fa",
                transition: "background 0.13s"
              }}
              onMouseEnter={() => setActive(i)}
            >
              <div style={{ fontWeight: 700, color: "#6D28D9", fontSize: 14 }}>{r.type}</div>
              <div style={{ fontWeight: 600 }}>{r.text}</div>
              <div style={{ fontSize: 12, color: "#aaa", marginTop: 1 }}>{r.desc}</div>
              <div style={{ fontSize: 11, color: "#b6b6cc", marginTop: 1 }}>{new Date(r.created).toLocaleString()}</div>
            </div>
          ))}
        </div>,
        document.body
      )}
    </>
  );
}
