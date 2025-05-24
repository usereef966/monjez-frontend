import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList
} from "recharts";

// ألوان الحالات
const STATUS_COLORS = {
  "قيد المعالجة": "#ffd166",
  "مقبولة": "#26de81",
  "مدفوعة": "#7c4dff",
  "مرفوضة": "#ff2d55"
};

const STATUS_LABELS = {
  "قيد المعالجة": "قيد المعالجة",
  "مقبولة": "مقبولة",
  "مدفوعة": "مدفوعة",
  "مرفوضة": "مرفوضة"
};

export default function UserDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // جلب البيانات عند التحميل
  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.id) {
          setOrders([]);
          setLoading(false);
          return;
        }
        const res = await fetch(`https://monjez-online.onrender.com/api/orders?user_id=${user.id}`);
        const data = await res.json();
        setOrders(data.orders || []);
      } catch {
        setOrders([]);
      }
      setLoading(false);
    }
    fetchOrders();
  }, []);

  // إحصائيات
  const total = orders.length;
  const countByStatus = (status) => orders.filter(o => o.status === status).length;

  const stats = [
    { label: "كل الطلبات", value: total, color: "#7c4dff" },
    { label: "قيد المعالجة", value: countByStatus("قيد المعالجة"), color: "#ffd166" },
    { label: "مقبولة", value: countByStatus("مقبولة"), color: "#26de81" },
    { label: "مدفوعة", value: countByStatus("مدفوعة"), color: "#7c4dff" },
    { label: "مرفوضة", value: countByStatus("مرفوضة"), color: "#ff2d55" }
  ];

  const chartData = [
    { name: "قيد المعالجة", value: countByStatus("قيد المعالجة") },
    { name: "مقبولة", value: countByStatus("مقبولة") },
    { name: "مدفوعة", value: countByStatus("مدفوعة") },
    { name: "مرفوضة", value: countByStatus("مرفوضة") }
  ];

  // ستايل عام للداشبورد الصغير
  const boxStyle = {
    width: "100%",
    maxWidth: 850,
    background: "#fff",
    borderRadius: 22,
    boxShadow: "0 4px 20px #7c4dff12",
    padding: "30px 34px 24px 34px",
    margin: "0 auto 22px auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 12,
    direction: "rtl"
  };

  const statsRow = {
    width: "100%",
    display: "flex",
    gap: 28,
    marginBottom: 12,
    flexWrap: "wrap",
    alignItems: "center"
  };

  const statCard = (color) => ({
    flex: "1 1 110px",
    background: "#fafbfc",
    borderRadius: 14,
    padding: "16px 0 11px 0",
    textAlign: "center",
    boxShadow: "0 2px 8px #7c4dff0c",
    minWidth: 120,
    marginBottom: 7,
    border: `1.5px solid ${color}25`,
    transition: "box-shadow 0.16s"
  });

  const statLabel = {
    color: "#888aad",
    fontWeight: 600,
    fontSize: 15.5,
    marginBottom: 7
  };

  const statValue = (color) => ({
    color,
    fontWeight: 900,
    fontSize: 28,
    marginBottom: 0
  });

  return (
    <div style={boxStyle}>
      <div style={{
        fontSize: 24,
        fontWeight: 900,
        color: "#7c4dff",
        marginBottom: 18,
        letterSpacing: ".02em"
      }}>
        ملخص طلباتك
      </div>

      {/* Counters */}
      <div style={statsRow}>
        {stats.map((s, i) => (
          <div key={s.label} style={statCard(s.color)}>
            <div style={statLabel}>{s.label}</div>
            <div style={statValue(s.color)}>
              {loading ? <span style={{ fontSize: 18, color: "#bbb" }}>...</span> : s.value}
            </div>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div style={{ width: "100%", marginTop: 8, marginBottom: 8, minHeight: 180 }}>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={chartData} barCategoryGap="30%">
            <XAxis
              dataKey="name"
              tick={{ fontSize: 15, fill: "#4d5672", fontWeight: 700 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 14, fill: "#999" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: "rgba(124,77,255,0.07)" }}
              contentStyle={{ borderRadius: 10, fontWeight: 800 }}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
              {chartData.map((entry, idx) => (
                <Cell key={idx} fill={STATUS_COLORS[entry.name]} />
              ))}
              <LabelList
                dataKey="value"
                position="top"
                style={{ fill: "#7c4dff", fontWeight: 800, fontSize: 15 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
