import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeaderMyOrder from './HeaderMyOrder'; 
import OrderList from './OrderList';
import OrderDetails from './OrderDetails';
import Charts from './Charts';
import Notifications from './Notifications';
import InboxPage from './InboxPage';
import axios from 'axios';






export default function MyOrdersLayout() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('orders');
  

 useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) return;

  // جلب بيانات العضو
  axios.get('/api/user/me', {
    headers: { Authorization: `Bearer ${token}` },
  })
  .then((res) => setUser(res.data))
  .catch((err) => {
    console.error('Error fetching user data:', err);
    setUser(null);
  });

  // جلب إحصائيات الطلبات
  axios.get('/api/my-orders/stats', {
    headers: { Authorization: `Bearer ${token}` },
  })
  .then((res) => setStats(res.data))
  .catch((err) => {
    console.error('Error fetching stats:', err);
    setStats(null);
  });

}, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8f8ff',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Header />

      <div style={{
        flex: 1,
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        display: 'flex',
        gap: '20px',
      }}>
        {/* المحتوى المتغير لكل صفحة */}
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
          flex: 1,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
        }}>
           <HeaderMyOrder activeTab={activeTab} setActiveTab={setActiveTab} />

              {activeTab === 'orders' && <OrderList />}
              {activeTab === 'details' && <OrderDetails />}
              {activeTab === 'charts' && <Charts />}
              {activeTab === 'notifications' && <Notifications />}
              {activeTab === 'inbox' && <InboxPage />}
          </div>

        {/* السايدبار الجانبي الديناميكي */}
        <div style={{
          width: '280px',
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          direction: 'rtl'
        }}>
          {/* بيانات العضو */}
          <div style={{
            width: '100%',
            marginBottom: '18px',
            textAlign: 'center',
            borderBottom: '1px solid #f3f3f3',
            paddingBottom: '14px'
          }}>
            <div style={{
              width: 54, height: 54, borderRadius: '50%',
              background: '#f8f8ff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 26, color: '#3867d6', margin: '0 auto 7px'
            }}>
              {user ? (user.first_name?.[0] || '?') : <span>?</span>}
            </div>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#222', marginBottom: 2 }}>
              {user ? `${user.first_name || ''} ${user.last_name || ''}` : '...'}
            </div>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 2 }}>
              {user?.email || ''}
            </div>
            <div style={{ fontSize: 13, color: '#aaa' }}>
              {user?.country ? `${user.country}${user.city ? '، ' + user.city : ''}` : ''}
            </div>
          </div>

          {/* إحصائيات الطلبات بشكل بطاقات صغيرة */}
          <div style={{
            width: '100%',
            textAlign: 'center',
            marginTop: 10,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'center',
            direction: 'rtl'
          }}>
            <div style={{
              flex: '1 1 110px',
              minWidth: 90,
              background: '#f6f8ff',
              borderRadius: 10,
              padding: '12px 6px',
              boxShadow: '0 2px 8px rgba(56,103,214,0.04)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <span style={{ color: '#3867d6', fontWeight: 700, fontSize: 13 }}>عدد الطلبات</span>
              <span style={{ color: '#3867d6', fontWeight: 800, fontSize: 20 }}>{stats?.total ?? '...'}</span>
            </div>
            <div style={{
              flex: '1 1 110px',
              minWidth: 90,
              background: '#eafaf1',
              borderRadius: 10,
              padding: '12px 6px',
              boxShadow: '0 2px 8px rgba(32,191,107,0.04)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <span style={{ color: '#20bf6b', fontWeight: 700, fontSize: 13 }}>مدفوعة</span>
              <span style={{ color: '#20bf6b', fontWeight: 800, fontSize: 20 }}>{stats?.paid ?? '...'}</span>
            </div>
            <div style={{
              flex: '1 1 110px',
              minWidth: 90,
              background: '#fff7e6',
              borderRadius: 10,
              padding: '12px 6px',
              boxShadow: '0 2px 8px rgba(247,183,49,0.04)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <span style={{ color: '#f7b731', fontWeight: 700, fontSize: 13 }}>بانتظار الدفع</span>
              <span style={{ color: '#f7b731', fontWeight: 800, fontSize: 20 }}>{stats?.pending ?? '...'}</span>
            </div>
            <div style={{
              flex: '1 1 110px',
              minWidth: 90,
              background: '#fdeeee',
              borderRadius: 10,
              padding: '12px 6px',
              boxShadow: '0 2px 8px rgba(235,59,90,0.04)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <span style={{ color: '#eb3b5a', fontWeight: 700, fontSize: 13 }}>مرفوضة/ملغية</span>
              <span style={{ color: '#eb3b5a', fontWeight: 800, fontSize: 20 }}>{stats?.rejected ?? '...'}</span>
            </div>
            <div style={{
              flex: '1 1 110px',
              minWidth: 90,
              background: '#f0f4f7',
              borderRadius: 10,
              padding: '12px 6px',
              boxShadow: '0 2px 8px rgba(75,101,132,0.04)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <span style={{ color: '#4b6584', fontWeight: 700, fontSize: 13 }}>مستردة</span>
              <span style={{ color: '#4b6584', fontWeight: 800, fontSize: 20 }}>{stats?.refunded ?? '...'}</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}