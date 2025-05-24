import { useEffect, useState } from "react";
import axios from "../api";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
  LabelList,
} from "recharts";

// صياغة الأرقام بشكل جميل
const formatNumber = val =>
  new Intl.NumberFormat("en-US", { useGrouping: true }).format(val);

// Tooltip مخصص
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload.length) return null;
  const { name, value } = payload[0].payload;
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #ddd",
      borderRadius: 8,
      padding: 10,
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      fontWeight: 600
    }}>
      <p style={{ margin: 0 }}>{name}</p>
      <p style={{ margin: 0 }}>Count: {formatNumber(value)}</p>
    </div>
  );
};

export default function InvoicesChart() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const [hovered, setHovered] = useState(null); // لتأثير الهوفـر

  useEffect(() => {
    axios
      .get("https://monjez-online.onrender.com/api/admin/invoices-stats")
      .then(r => {
        setData([
          { name: "Paid", value: r.data.paid },
          { name: "Unpaid", value: r.data.unpaid },
        ]);
      })
      .finally(() => setLoad(false));
  }, []);

  if (load) return <p>...جاري</p>;
  if (!data.length) return <p>لا بيانات</p>;

  return (
    <div style={{
      background: "#fff",
      padding: 20,
      borderRadius: 16,
      boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
      marginTop: 20,
      height: 360
    }}>
      <h3 style={{ color: "#333", marginBottom: 16 }}>Invoices Status</h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={data}
          barCategoryGap="30%"
          margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id="paidGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7ce6b2" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="#30db5b" stopOpacity={0.2}/>
            </linearGradient>
            <linearGradient id="unpaidGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff8a97" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="#ff4d6d" stopOpacity={0.2}/>
            </linearGradient>
          </defs>

          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 16, fontWeight: 600 }}
            padding={{ left: 20, right: 20 }}
          />
          <YAxis
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 14 }}
            tickFormatter={formatNumber}
          />

          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" align="right" iconType="circle" />

          <Bar
            dataKey="value"
            maxBarSize={64}
            radius={[18, 18, 0, 0]}
            animationDuration={1200}
            onMouseLeave={() => setHovered(null)}
            onMouseEnter={(_, idx) => setHovered(idx)}
          >
            {data.map((entry, idx) => (
              <Cell
                key={idx}
                fill={
                  entry.name === "Paid"
                    ? "url(#paidGradient)"
                    : "url(#unpaidGradient)"
                }
                style={{
                  filter:
                    hovered === idx
                      ? entry.name === "Paid"
                        ? "drop-shadow(0px 8px 24px rgba(48,219,91,0.4))"
                        : "drop-shadow(0px 8px 24px rgba(255,77,109,0.4))"
                      : "none",
                  transform:
                    hovered === idx ? "scale(1.08)" : "scale(1)",
                  transition: "all 0.3s ease-in-out",
                  cursor: "pointer",
                }}
              />
            ))}
            <LabelList
              dataKey="value"
              position="top"
              formatter={formatNumber}
              style={{
                fontSize: 18,
                fontWeight: 700,
                fill: "#222",
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
