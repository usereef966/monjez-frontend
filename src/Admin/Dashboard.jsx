// src/Admin/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MNZ } from '../theme';
import SalesChart from './SalesChart';
import UserStatsChart from './UsersChart';
import TeamPanel from './TeamPanel';
import InvoicesTable from './InvoicesTable';
import InvoicesChart from './InvoicesChart';
import AnimatedNumber from './AnimatedNumber';
import StarBubblesEffect from './StarBubblesEffect';

// Base URL and formatter
const BASE_URL = 'https://monjez-online.onrender.com';
const formatCount = val =>
  new Intl.NumberFormat('en-US', { useGrouping: true }).format(val);

// Styles object
const styles = {
  container: { display: 'flex', flexDirection: 'column', gap: 32 },
  loading: { color: '#666' },
  error: { color: 'red' },
  statsRow: { display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))' },
  statCard: {
    background: '#fff',
    borderRadius: MNZ.radius,
    boxShadow: MNZ.shadow,
    padding: '20px 24px',
    flex: 1,
    minWidth: 180,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    zIndex: 90,
  },
  cardLabel: { color: '#636587', fontSize: 14 },
  cardValue: { fontSize: 28 },
  chartsRow: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, zIndex: 300 },
  chartBox: {
    background: '#fff',
    borderRadius: 24,
    boxShadow: '0 8px 24px #7c4dff10, 0 1.5px 3px #5e72e422',
    padding: 16,
    minHeight: 340,
    display: 'flex',
    flexDirection: 'column',
  },
  bottomRow: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, zIndex: 300 },
  panel: {
    background: '#fff',
    borderRadius: MNZ.radius,
    boxShadow: '0 3px 20px #7c4dff10, 0 1.5px 3px #5e72e4',
    padding: 10,
    minHeight: 100,
    display: 'flex',
    flexDirection: 'column',
  },
  panelTitle: { margin: 0, fontSize: 16, fontWeight: 600 },
};

// Small stat card component
function StatCard({ label, value, color }) {
  return (
    <div style={{ ...styles.statCard, borderTop: `4px solid ${color}` }}>
      <span style={styles.cardLabel}>{label}</span>
      <strong style={{ ...styles.cardValue, color }}>
        <AnimatedNumber value={value} duration={1000} />

      </strong>
    </div>
  );
}



export default function Dashboard({ userId }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // دالة جلب الإحصائيات
  const fetchStats = () => {
    setLoading(true);
    setError('');
    const endpoint = userId
      ? `/api/user/${userId}/order-stats`
      : '/api/admin/order-stats';

    axios
      .get(`${BASE_URL}${endpoint}`)
      .then(res => setStats(res.data))
      .catch(() => {
        setStats(null);
        setError('فشل في جلب الإحصائيات');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStats(); // ← جلب الإحصائيات عند أول تحميل أو تغيير userId
console.log("fetchStats called");

    const handler = () => fetchStats();
    window.addEventListener("orders-updated", handler);
    return () => window.removeEventListener("orders-updated", handler);
  }, [userId]);

  // Prepare cards data with colors
  const cardsData = stats
    ? [
        { label: 'Total',      value: stats.total,    color: MNZ.colors.primary  },
        { label: 'Accepted',   value: stats.accepted, color: MNZ.colors.success  },
        { label: 'Processing', value: stats.pending,  color: MNZ.colors.warning  },
        { label: 'Rejected',   value: stats.rejected, color: MNZ.colors.danger   },
        { label: 'Paid',       value: stats.paid,     color: MNZ.colors.accent   },
      ]
    : [];

  return (
    <div style={styles.container}>
      {loading && <p style={styles.loading}>جارٍ التحميل…</p>}
      {error   && <p style={styles.error}>{error}</p>}

      {!loading && !error && (
        <div style={styles.statsRow}>
          {cardsData.map(c => (
            <StatCard key={c.label} {...c} />
          ))}
        </div>
        
      )}
      

      <div style={styles.chartsRow}>
        <div style={styles.chartBox}>
          <SalesChart />
          <div style={{ position: "relative", zIndex: 800 }}>
<StarBubblesEffect/>

</div>
        </div>
        <div style={styles.chartBox}>
          <UserStatsChart />
        </div>
       
      </div>

      <div style={styles.bottomRow}>
        <div style={styles.panel}>
          <h4 style={styles.panelTitle}>Team members</h4>
          <TeamPanel />
   
        </div>
        <div style={styles.panel}>
          <h4 style={styles.panelTitle}>Invoices list</h4>
          <InvoicesTable />
  
        </div>
        <div style={styles.panel}>
          <h4 style={styles.panelTitle}>Invoices chart</h4>
          <InvoicesChart />
          <div style={{ position: "relative", zIndex: 800 }}>
<StarBubblesEffect/>

</div>
        </div>
      </div>
    </div>
  );
}
