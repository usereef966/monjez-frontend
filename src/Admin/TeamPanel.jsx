import { useEffect, useState } from "react";
import axios from "../api";
import defaultAvatar from "../assets/svg/avatar.png"; // Default avatar

const API = "https://monjez-online.onrender.com";

export default function TeamPanel() {
  const [list, setList] = useState([]);
  const [load, setLoad] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    axios.get(`${API}/api/admin/team`)
      .then(r => setList(r.data))
      .catch(() => setErr("No team members found"))
      .finally(() => setLoad(false));
  }, []);

  if (load) return <p>…Loading</p>;
  if (err) return <p style={{color:"red"}}>{err}</p>;

  return (
    <ul style={{
      listStyle: "none",
      margin: 0,
      padding: 0,
      maxHeight: "450px",
      overflowY: "auto"
    }}>
      {list.map(m => (
        <li key={m.id} style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 14,
          padding: "14px 12px",
          backgroundColor: "#f8f9fa",
          borderRadius: "10px",
          boxShadow: "0 2px 8px #7c4dff10",
          transition: "box-shadow 0.2s, background 0.2s",
          cursor: "pointer",
        }}
        onMouseOver={e => e.currentTarget.style.background = "#f1f3f6"}
        onMouseOut={e => e.currentTarget.style.background = "#f8f9fa"}
        >
          <img
            src={m.avatar || defaultAvatar}
            alt=""
            style={{
              width: 44, height: 44, borderRadius: "50%",
              objectFit: "cover", border: "2px solid #ececec"
            }}
          />
          <div style={{flexGrow:1}}>
            <div style={{fontWeight: "bold", fontSize: 16, color: "#222"}}>{m.full_name}</div>
            <div style={{color:"#555", fontSize: 13}}>{m.email}</div>
            <div style={{color:"#aaa", fontSize:"12px"}}>
              Last seen: {new Date(m.last_online).toLocaleString()}
            </div>
          </div>
          <div style={{display: "flex", alignItems: "center", gap: 6}}>
            <span style={{
              width:14, height:14, borderRadius:"50%",
              background: m.status === "online" ? "#30db5b" : "#aaa",
              border: "2px solid #fff", boxShadow: "0 0 4px #0002"
            }}/>
            <span style={{
              color: m.status === "online" ? "#30db5b" : "#aaa",
              fontSize: 12, fontWeight: 600
            }}>
              {m.status === "online" ? "Online" : "Offline"}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
