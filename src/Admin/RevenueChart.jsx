import React, { useEffect, useState } from "react";
import axios from "../api";
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, Brush
} from "recharts";

const formatCurrency = val =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0
  }).format(val);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload.length) return null;
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #ddd",
      padding: 10,
      borderRadius: 8,
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}>
      <p style={{ margin: 0, fontWeight: "bold" }}>
        {new Date(label).toLocaleDateString()}
      </p>
      <p style={{ margin: 0 }}>
        Revenue: {formatCurrency(payload[0].value)}
      </p>
    </div>
  );
};

export default function RevenueChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          "https://monjez-online.onrender.com/api/admin/orders/revenue-chart"
        );
        setData(
          res.data.map(d => ({
            date: d.date,
            revenue: Number(d.revenue)
          }))
        );
      } catch (e) {
        console.error("Error fetching data:", e);
        setData([]);
      }
    })();
  }, []);

  return (
    <div style={{
      height: 350,
      background: "#fff",
      marginTop: 20,
      padding: 20,
      borderRadius: 16,
      boxShadow: "0 2px 16px rgba(16,22,58,0.1)"
    }}>
      <h3 style={{ color: "#333", marginBottom: 20 }}>Revenue Overview</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          {/* 1. Gradient */}
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7c4dff" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#7c4dff" stopOpacity={0}/>
            </linearGradient>
          </defs>

          {/* 2. Grid */}
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />

          {/* 3. Axes */}
          <XAxis
            dataKey="date"
            tickFormatter={date =>
              new Date(date).toLocaleDateString("en-US", {
                month: "short", day: "numeric"
              })
            }
            tick={{ fontSize: 12 }}
            stroke="#888"
          />
          <YAxis
            tickFormatter={formatCurrency}
            tick={{ fontSize: 12 }}
            stroke="#888"
          />

          {/* 4. Tooltip & Legend */}
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" align="right" />

          {/* 5. The Line */}
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#7c4dff"
            strokeWidth={3}
            dot={{
              r: 6,
              stroke: "#7c4dff",
              strokeWidth: 2,
              fill: "#fff"
            }}
            activeDot={{ r: 8 }}
            fill="url(#revenueGradient)"
            isAnimationActive={true}
            animationDuration={2000}
          />

          {/* 6. Brush for zooming */}
          <Brush
            dataKey="date"
            height={30}
            stroke="#888"
            travellerWidth={10}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
