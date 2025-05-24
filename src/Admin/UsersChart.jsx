import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis,
  Tooltip, CartesianGrid, Cell, Legend
} from 'recharts';

// تنسيق الأرقام
const formatCount = val =>
  new Intl.NumberFormat('en-US', { useGrouping: true }).format(val);

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload.length) return null;
  const { label, value } = payload[0].payload;
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #f3f2fa',
      borderRadius: 8,
      padding: 10,
      boxShadow: '0 4px 12px rgba(124,77,255,0.1)',
      fontWeight: 600,
    }}>
      <p style={{ margin: 0, color: '#7c4dff' }}>{label}</p>
      <p style={{ margin: 0 }}>Count: {formatCount(value)}</p>
    </div>
  );
};

export default function UserStatsChart() {
  const [data, setData] = useState([]);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    axios.get('https://monjez-online.onrender.com/api/users-stats')
      .then(res => {
        const s = res.data;
        setData([
          { label: 'Total Users', value: s.total_users, color: '#7c4dff' },
          { label: "Today's Registrations", value: s.new_registrations, color: '#ffa53e' },
          { label: 'Active Users', value: s.active_users, color: '#30db5b' },
          { label: 'Inactive Users', value: s.inactive_users, color: '#ff4d6d' },
        ]);
      })
      .catch(() => setData([]));
  }, []);

  if (!data.length) {
    return (
      <div style={{
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#888'
      }}>
        No data
      </div>
    );
  }

  return (
    <div style={{
      background: '#fff',
      borderRadius: 24,
      boxShadow: '0 8px 40px rgba(124,77,255,0.1), 0 1.5px 3px rgba(94,114,228,0.1)',
      padding: 20,
      marginTop: 20,
    }}>
      <h3 style={{
        margin: 0,
        marginBottom: 16,
        color: '#333',
        fontSize: 18,
        fontWeight: 700,
      }}>
        User Statistics
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          barCategoryGap="25%"
          onMouseLeave={() => setHovered(null)}
        >
          <CartesianGrid stroke="#f3f2fa" strokeDasharray="3 3" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 13, fill: '#7c4dff', fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 13, fill: '#7c4dff', fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={formatCount}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" align="right" iconType="circle" />
          <Bar
            dataKey="value"
            barSize={50}
            radius={[12, 12, 0, 0]}
            onMouseEnter={(_, idx) => setHovered(idx)}
          >
            {data.map((entry, idx) => (
              <Cell
                key={idx}
                fill={entry.color}
                style={{
                  filter: hovered === idx
                    ? `drop-shadow(0px 6px 20px ${entry.color}55)`
                    : 'none',
                  transform: hovered === idx ? 'scale(1.04)' : 'scale(1)',
                  transition: 'all 0.3s ease-in-out',
                  cursor: 'pointer',
                }}
              />
            ))}
            {/* تسميات القمة */}
            <Cell />{/* dummy to satisfy children */}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
