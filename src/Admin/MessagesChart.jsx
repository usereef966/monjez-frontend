import { useEffect, useState } from "react";
import api from "../api";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  Legend,
  LabelList,
} from "recharts";

// لون رئيسي للشارت
const mainColor = "#6D28D9";

export default function MessagesChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    api.get("/api/inbox")  // نفس اللي في كودك
      .then(res => {
        // استخراج إحصائيات الرسائل حسب اليوم أو أي grouping بدكياه
        // هون رح أعملها حسب عدد الرسائل لكل يوم
        const countByDay = {};
        res.data.forEach(item => {
          const d = new Date(item.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" });
          countByDay[d] = (countByDay[d] || 0) + 1;
        });
        const chartData = Object.entries(countByDay).map(([name, value]) => ({ name, value }));
        setData(chartData);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: 30, textAlign: "center" }}>Loading...</div>;
  if (!data.length) return <div style={{ padding: 30, textAlign: "center" }}>No Data</div>;

  return (
    <div style={{
      background: "#fff",
      padding: 20,
      borderRadius: 16,
      boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
      minHeight: 300
    }}>
      <h3 style={{ color: "#333", marginBottom: 16 }}>Messages Activity</h3>
      <ResponsiveContainer width="100%" height={360} >
        <BarChart
          data={data}
          barCategoryGap="30%"
          margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
          onMouseLeave={() => setHovered(null)}
        >
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 15, fontWeight: 600 }} />
          <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fontSize: 13 }} />
          <Tooltip />
          <Legend verticalAlign="top" align="right" iconType="circle" />
          <Bar
            dataKey="value"
            radius={[14, 14, 0, 0]}
            fill={mainColor}
            onMouseEnter={(_, idx) => setHovered(idx)}
          >
            {data.map((entry, idx) => (
              <Cell
                key={idx}
                fill={mainColor}
                style={{
                  filter: hovered === idx ? "drop-shadow(0 4px 18px #6D28D977)" : "none",
                  transform: hovered === idx ? "scale(1.05)" : "scale(1)",
                  transition: "all 0.22s",
                  cursor: "pointer",
                }}
              />
            ))}
            <LabelList dataKey="value" position="top" style={{ fontSize: 15, fontWeight: 600, fill: "#2D2D2D" }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
