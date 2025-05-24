import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import {
  ResponsiveContainer,
  LineChart, Line, XAxis, YAxis,
  Tooltip, CartesianGrid, Area, ReferenceLine,
  Legend, Brush
} from 'recharts';

const formatOrders = val => `${val} Orders`;

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload.length) return null;
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #eee",
      borderRadius: 10,
      padding: 12,
      boxShadow: "0 4px 12px rgba(124,77,255,0.1)"
    }}>
      <p style={{ margin: 0, fontWeight: 700, color: "#7c4dff" }}>
        📅 {dayjs(label).format("YYYY-MM-DD")}
      </p>
      <p style={{ margin: 0, fontSize: 14, color: "#333" }}>
        Total Orders: <strong>{payload[0].value}</strong>
      </p>
    </div>
  );
};

export default function SalesChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://monjez-online.onrender.com/api/orders-stats-daily')
      .then(res => {
        setData(res.data.map(item => ({
          order_date: dayjs(item.order_date).format("YYYY-MM-DD"),
          total_orders: Number(item.total_orders),
        })));
      })
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ textAlign: "center", padding: 40 }}>Loading...</div>;
  if (!data.length) return <div style={{ textAlign: "center", padding: 40 }}>No data</div>;

  // حساب المتوسط
  const avg = Math.round(data.reduce((sum, d) => sum + d.total_orders, 0) / data.length);

  return (
    <div style={{
      background: "#fff",
      borderRadius: 24,
      boxShadow: "0 8px 40px rgba(124,77,255,0.1), 0 1.5px 3px rgba(94,114,228,0.1)",
      padding: 20,
      marginTop: 20,
    }}>
      <h3 style={{ margin: 0, color: "#333", marginBottom: 16 }}>Daily Sales Trend</h3>
      <ResponsiveContainer width="100%" height={360}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          {/* تدرّجات */}
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#b2a7fa" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#e2bfff" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7c4dff"/>
              <stop offset="60%" stopColor="#50e4ff"/>
              <stop offset="100%" stopColor="#3cf3b5"/>
            </linearGradient>
          </defs>

          <CartesianGrid stroke="#f3f2fa" strokeDasharray="3 3" />

          <XAxis
            dataKey="order_date"
            tick={{ fontSize: 12, fill: '#7c4dff', fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
            minTickGap={20}
          />
          <YAxis
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: '#a084ee', fontWeight: 500 }}
          />

          <Tooltip content={<CustomTooltip />} />

          {/* خط المتوسّط */}
          <ReferenceLine
            y={avg}
            stroke="#ff8a00"
            strokeDasharray="4 4"
            label={{
              position: 'top',
              value: `Avg: ${avg}`,
              fill: '#ff8a00',
              fontSize: 12,
              fontWeight: 600
            }}
          />

          <Legend verticalAlign="top" align="right" />

          <Area
            type="monotone"
            dataKey="total_orders"
            stroke="none"
            fill="url(#areaGrad)"
            isAnimationActive
            animationDuration={1500}
          />

          <Line
            type="monotone"
            dataKey="total_orders"
            stroke="url(#lineGrad)"
            strokeWidth={3}
            dot={{
              r: 5,
              fill: "#fff",
              stroke: "#7c4dff",
              strokeWidth: 2,
              style: { filter: "drop-shadow(0 0 8px rgba(124,77,255,0.4))" }
            }}
            activeDot={{
              r: 8,
              fill: "#fff",
              stroke: "#3cf3b5",
              strokeWidth: 3,
              style: { filter: "drop-shadow(0 0 12px rgba(60,243,181,0.6))" }
            }}
            isAnimationActive
            animationDuration={1200}
          />

          {/* Brush للزوم */}
          <Brush
            dataKey="order_date"
            height={30}
            stroke="#8884d8"
            travellerWidth={10}
            startIndex={data.length > 30 ? data.length - 30 : 0}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
