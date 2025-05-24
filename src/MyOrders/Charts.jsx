import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

/***********************************************************
 * 🎨  ثابت الألوان الرئيسي (نفس الترتيب للكروت والشارت)     *
 ***********************************************************/
const COLORS = [
  "#7c4dff", // pending – بنفسجي
  "#24e6ca", // accepted – تركواز
  "#2196f3", // paid – أزرق
  "#ffb300", // rejected – برتقالي
  "#e53935", // blocked – أحمر
  "#757575", // refunded – رمادي
  "#9c27b0"  // extra – بنفسجي غامق (احتياطي)
];

/****************************************************************
 * 🏷️  ترجمة الحالات + اللون المطابق للشارت                      *
 ****************************************************************/
const STATUS_CONFIG = {
  pending:  { label: "قيد المعالجة", color: COLORS[0] },
  accepted: { label: "مقبول",        color: COLORS[1] },
  paid:     { label: "مدفوع",        color: COLORS[2] },
  rejected: { label: "مرفوض",        color: COLORS[3] },
  blocked:  { label: "محظور",        color: COLORS[4] },
  refunded: { label: "مسترد",        color: COLORS[5] }
};

/*****************************************************
 * 🥧  دالة اللابل داخل الشارت (داخل كل قطعة)           *
 *****************************************************/
const RADIAN = Math.PI / 180;
function renderLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }) {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="middle"
      style={{ fontSize: 13, fontWeight: 700 }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

/*****************************************************
 * 📊  الصفحة الرئيسية (فقط الشارت بدون أي بوكس خارجي) *
 *****************************************************/
export default function StatsDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // جلب البيانات من السيرفر
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://monjez-online.onrender.com/api/my-orders/stats", {
      headers: { Authorization: "Bearer " + token }
    })
      .then(res => res.json())
      .then(data => setStats(data))
      .finally(() => setLoading(false));
  }, []);

  // تجهيز بيانات الدونات
  const pieData = stats
    ? Object.entries(STATUS_CONFIG)
        .map(([key, cfg]) => ({ name: cfg.label, value: Number(stats[key] || 0) }))
        .filter(d => d.value > 0)
    : [];

  // إجمالي الطلبات
  const total = stats ? stats.total || 0 : 0;

  return (
    <div style={{ width: "100%" }}>
      <h2
        style={{
          color: "#7c4dff",
          fontWeight: 900,
          fontSize: 28,
          textAlign: "center",
          letterSpacing: 1,
          marginBottom: 32,
          marginTop: 0
        }}
      >
        📈 إحصائيات طلباتك
      </h2>

      {loading ? (
        <div style={{ color: "#7c4dff", fontSize: 20, textAlign: "center", margin: 40, direction: "rtl" }}>
          جاري التحميل...
        </div>
      ) : stats ? (
        <div style={{
          width: "100%",
          maxWidth: 520,
          margin: "0 auto",
          background: "transparent",
          boxShadow: "none",
          borderRadius: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <h3 style={{
            color: "#7c4dff",
            fontWeight: 900,
            fontSize: 20,
            marginBottom: 8,
            textAlign: "center"
          }}>
            توزيع الطلبات حسب الحالة
          </h3>

          <div style={{ width: "100%", maxWidth: 420, height: 320, position: "relative" }}>
            {/* Label في مركز الدونات */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                textAlign: "center",
                pointerEvents: "none"
              }}
            >
              <div style={{ fontSize: 14, color: "#888" }}>الإجمالي</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: "#333" }}>{total}</div>
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={4}
                  labelLine={false}
                  label={renderLabel}
                  isAnimationActive
                  animationDuration={1000}
                >
                  {pieData.map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value}`, name]}
                  contentStyle={{ borderRadius: 10 }}
                />
                <Legend
                  align="center"
                  verticalAlign="bottom"
                  iconType="circle"
                  formatter={value => <span style={{ fontSize: 14 }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div style={{ color: "#f44336", fontWeight: 900, textAlign: "center", margin: 40 }}>
          تعذّر تحميل البيانات!
        </div>
      )}
    </div>
  );
}
