import { useEffect, useState } from "react";
import axios from "../api";

const API = "https://monjez-online.onrender.com";

export default function InvoicesTable({ limit = 8 }) {
  const [rows, setRows] = useState([]);
  const [load, setLoad] = useState(true);
  const [err , setErr ] = useState("");

  useEffect(() => {
    axios.get(`${API}/api/admin/invoices?limit=100`)
      .then(r => setRows(r.data))
      .catch(() => setErr("لا فواتير"))
      .finally(() => setLoad(false));
  }, [limit]);

  if (load) return <p>…جارٍ التحميل</p>;
  if (err ) return <p style={{color:"red"}}>{err}</p>;

  return (
 <div style={{ 
  width: "100%", 
  maxHeight: "450px", // حدد الارتفاع المناسب
  overflowY: "auto",
  overflowX: "auto"
}}>
  <table style={{
    width: "100%",
    borderCollapse: "collapse",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    overflow: "hidden",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    display: "table",
  }}>
    <thead style={{ backgroundColor: "#3b82f6", color: "#ffffff" }}>
      <tr>
        <th style={{ padding: "15px", textAlign: "left" }}>#</th>
        <th style={{ padding: "15px", textAlign: "left" }}>Customer</th>
        <th style={{ padding: "15px", textAlign: "left" }}>Total ($)</th>
        <th style={{ padding: "15px", textAlign: "left" }}>Status</th>
      </tr>
    </thead>
    <tbody>
      {rows.map(r => (
        <tr key={r.id} style={{
          backgroundColor: "#fff",
          borderBottom: "1px solid #f0f0f0",
        }}>
          <td style={{ padding: "15px", fontWeight: "bold" }}>{r.id}</td>
          <td style={{ padding: "15px", fontWeight: "bold", color:"#374151" }}>{r.customer_name}</td>
          <td style={{ padding: "15px", color:"#111827" }}>{r.total.toFixed(2)}</td>
          <td style={{
            padding: "15px",
            color: r.paid ? "#10b981" : "#ef4444",
            fontWeight: "bold"
          }}>
            {r.paid ? "✔ Paid" : "✘ Unpaid"}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>



  );
}
