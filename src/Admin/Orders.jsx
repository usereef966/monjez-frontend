import React, { useEffect, useState ,useRef } from "react";
import axios from "../api";
import RevenueChart from './RevenueChart';
import StarBubblesEffect from './StarBubblesEffect';


// عداد متحرك للرقم
function AnimatedNumber({ value, duration = 900 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef();

  useEffect(() => {
    let start = ref.current || 0;
    let startTime = null;
    function animate(ts) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const current = start + (value - start) * progress;
      setDisplay(current);
      if (progress < 1) requestAnimationFrame(animate);
      else ref.current = value;
    }
    requestAnimationFrame(animate);
    // eslint-disable-next-line
  }, [value]);
  return (
    <span>
      {Number(display).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </span>
  );
}

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchOrders();
  }, [page, search]);

  const fetchOrders = () => {
    axios.get("https://monjez-online.onrender.com/api/admin/orders")
      .then(r => setOrders(r.data))
      .catch(e => setOrders([]));
  };

  const filtered = orders.filter(order =>
  (order.customer && order.customer.toLowerCase().includes(search.toLowerCase())) ||
  (order.status && order.status.toLowerCase().includes(search.toLowerCase())) ||
  (order.product && order.product.toLowerCase().includes(search.toLowerCase())) ||
  String(order.id).includes(search) ||
  String(order.revenue).includes(search)
);

  const pages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  function getRevenueColor(value) {
    if (value >= 4000) return "#28a745";      // أخضر
    if (value >= 2000) return "#ff9800";      // برتقالي
    return "#ff3b30";                         // أحمر
  }
  

  return (
    

    


    
    <div style={{ position: "fixed", top: 80, zIndex: 2000, width: "calc(90vw - 140px)" }}>
      <div style={{
        background: "#fff", borderRadius: 18,
        boxShadow: "0 2px 16px #10163a10", padding: 24, marginTop: 100
      }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 18 }}>
          <input
            placeholder="Search..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            style={{
              border: "1px solid #eee", borderRadius: 8, padding: "8px 16px",
              outline: "none", minWidth: 200
            }}
          />
          <div style={{ position: "relative", zIndex: 800 }}>
<StarBubblesEffect/>

</div>
<div style={{ position: "relative", zIndex: 800 }}>
<StarBubblesEffect/>

</div>
        </div>

        
        

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#fafbfc" }}>
              <th style={th}>ID</th>
              <th style={th}>Date</th>
              <th style={th}>Status</th>
              <th style={th}>Customer</th>
              <th style={th}>Product</th>
              <th style={th}>Revenue</th>
            </tr>
          </thead>
          
          <tbody>
            {paginated.map(row => (
              <tr key={row.id} style={{ borderBottom: "1px solid #f3f3fa" }}>
                <td style={td}>#{row.id}</td>
                <td style={td}>{formatDate(row.created_at)}</td>
                <td style={td}>
                  {renderStatus(row.status)}
                </td>
                <td style={td}>
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {row.avatar &&
                      <img src={row.avatar} alt="" style={{ width: 28, height: 28, borderRadius: "50%" }} />}
                    <span>{row.customer}</span>
                  </span>
                </td>
                <td style={td}>{row.product}</td>
           <td style={{...td, color: getRevenueColor(safeRevenue(row.revenue))}}>
  <AnimatedNumber value={safeRevenue(row.revenue)} /> <span style={{ fontWeight: 400 }}>SAR</span>
</td>

              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ position: "relative", zIndex: 800 }}>
<StarBubblesEffect/>

</div><div style={{ position: "relative", zIndex: 800 }}>
<StarBubblesEffect/>

</div><div style={{ position: "relative", zIndex: 800 }}>
<StarBubblesEffect/>

</div><div style={{ position: "relative", zIndex: 800 }}>
<StarBubblesEffect/>

</div>

        {/* Pagination */}
        <div style={{ marginTop: 18, display: "flex", justifyContent: "flex-end", gap: 8 }}>
          {[...Array(pages)].map((_, i) =>
            <button key={i}
              style={{
                background: i + 1 === page ? "#4586ff" : "#eee",
                color: i + 1 === page ? "#fff" : "#444",
                border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer"
              }}
              onClick={() => setPage(i + 1)}>
              {i + 1}
            </button>
          )}
          
        </div>

      </div>

 <div>
     <div style={{ position: "relative", zIndex: 800 }}>
<StarBubblesEffect/>

</div><div style={{ position: "relative", zIndex: 800 }}>
<StarBubblesEffect/>

</div><div style={{ position: "relative", zIndex: 800 }}>
<StarBubblesEffect/>

</div><div style={{ position: "relative", zIndex: 800 }}>
<StarBubblesEffect/>

</div>
      <RevenueChart />
    </div>


    </div>
    
  );
}



// Helper styles
const th = { textAlign: "left", fontWeight: 700, color: "#adb0be", fontSize: 13, padding: "10px 8px" };
const td = { padding: "10px 8px", fontSize: 15, color: "#232942", fontWeight: 500 };

// Helper functions
function formatDate(dt) {
  const d = new Date(dt);
  return d.toLocaleDateString() + ", " + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}


function renderStatus(status) {
  if (!status) return "";
  const map = {
    "Paid": { color: "#34c759", icon: "✔️" },
    "Refunded": { color: "#5777bc", icon: "🕑" },
    "Canceled": { color: "#ff3b30", icon: "❌" },
    "Pending": { color: "#ffcc00", icon: "⏳" },
    "قيد المعالجة": { color: "#ffa500", icon: "⏳" }, // اضفتها لك بالعربي من بياناتك
    "مدفوعة": { color: "#34c759", icon: "✔️" }, // اضافات عربية حسب حالتك
    "مرفوضة": { color: "#ff3b30", icon: "❌" },
  };
  const s = map[status] || { color: "#bbb", icon: "•" };
  return <span style={{ color: s.color, fontWeight: 700 }}>{s.icon} {status}</span>;
}

function safeRevenue(val) {
  const num = Number(val);
  return isNaN(num) ? 0 : num;
}
