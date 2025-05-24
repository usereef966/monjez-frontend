import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ألوان الحالات بشكل أنعم وحديث
const statusColors = {
  pending:   { bg: '#fff7e6', color: '#f7b731' },
  accepted:  { bg: '#eafaf1', color: '#20bf6b' },
  paid:      { bg: '#eaf0fb', color: '#3867d6' },
  rejected:  { bg: '#fdeeee', color: '#eb3b5a' },
  blocked:   { bg: '#f3effa', color: '#8854d0' },
  refunded:  { bg: '#f0f4f7', color: '#4b6584' },
};

const PAGE_SIZE = 7;

function OrderDetailsModal({ order, onClose }) {
  if (!order) return null;

  const statusColors = {
    pending:   { bg: '#fff7e6', color: '#f7b731' },
    accepted:  { bg: '#eafaf1', color: '#20bf6b' },
    paid:      { bg: '#eaf0fb', color: '#3867d6' },
    rejected:  { bg: '#fdeeee', color: '#eb3b5a' },
    blocked:   { bg: '#f3effa', color: '#8854d0' },
    refunded:  { bg: '#f0f4f7', color: '#4b6584' },
  };
  const status = statusColors[order.status] || { bg: '#f0f0f0', color: '#888' };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(120, 90, 220, 0.13)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        direction: 'rtl'
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: 24,
          minWidth: 340,
          maxWidth: 480,
          width: '97%',
          boxShadow: '0 8px 32px 0 rgba(120,90,220,0.13), 0 0px 0px #fff',
          padding: '0 0 32px 0',
          position: 'relative',
          textAlign: 'right',
          animation: 'fadeIn .22s',
          border: '2px solid #e0d7fa'
        }}
      >
        {/* رأس المودال: العنوان يمين، زر الإغلاق يسار */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          margin: '0 0 18px 0',
          paddingTop: 32,
          paddingRight: 32,
          paddingLeft: 32
        }}>
          {/* العنوان */}
          <span style={{
            fontWeight: 800,
            fontSize: 20,
            color: '#222'
          }}>{order.type_ar}</span>
          {/* زر إغلاق */}
          <button
            onClick={onClose}
            style={{
              background: '#f6f8ff',
              border: 'none',
              borderRadius: '50%',
              width: 38,
              height: 38,
              fontSize: 22,
              color: '#7c3aed',
              cursor: 'pointer',
              transition: 'background 0.2s',
              boxShadow: '0 2px 8px #e7e3fa',
              marginLeft: 0,
              marginRight: 0
            }}
            aria-label="إغلاق"
          >
            ×
          </button>
        </div>

        {/* جدول التفاصيل مع خطوط ناعمة */}
        <div style={{
          background: '#fafaff',
          borderRadius: 16,
          margin: '0 auto 18px auto',
          padding: '0 0 0 0',
          maxWidth: 440,
          boxShadow: '0 2px 12px #f3e8ff',
          border: '1px solid #f3f3fa'
        }}>
          <table style={{
            width: '100%',
            fontSize: 16,
            color: '#222',
            borderCollapse: 'collapse'
          }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f0f0f7' }}>
                <td style={{ fontWeight: 700, color: '#888', width: 90, padding: '16px 12px' }}>القسم:</td>
                <td style={{ fontWeight: 600, padding: '16px 12px' }}>{order.section_ar}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f0f0f7' }}>
                <td style={{ fontWeight: 700, color: '#888', padding: '12px' }}>الميزانية:</td>
                <td style={{ fontWeight: 600, padding: '12px' }}>{order.budget_obj?.label || '-'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f0f0f7' }}>
                <td style={{ fontWeight: 700, color: '#888', padding: '12px' }}>التاريخ:</td>
                <td style={{ direction: 'ltr', fontFamily: 'monospace', fontWeight: 700, padding: '12px' }}>
                  {order.created_at?.slice(0, 10)}
                </td>
              </tr>
              {order.features?.length > 0 && (
                <tr style={{ borderBottom: '1px solid #f0f0f7' }}>
                  <td style={{ fontWeight: 700, color: '#888', padding: '12px', verticalAlign: 'top' }}>المميزات:</td>
                  <td style={{ fontWeight: 600, padding: '12px' }}>
                    {order.features.join('، ')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* وصف الطلب */}
        {order.description && (
          <div style={{
            marginTop: 18,
            background: '#f8f8ff',
            borderRadius: 12,
            padding: '16px 18px',
            color: '#222',
            fontSize: 16,
            fontWeight: 500,
            lineHeight: 2,
            width: '90%',
            marginRight: 'auto',
            marginLeft: 'auto',
            marginBottom: 0,
            boxShadow: '0 1px 4px #f3e8ff',
            border: '1px solid #ede9fe',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <span style={{ color: '#3867d6', fontWeight: 800, fontSize: 16, marginLeft: 8 }}>وصف الطلب:</span>
            <span>{order.description}</span>
          </div>
        )}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}</style>
      </div>
    </div>
  );
}

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('يجب تسجيل الدخول أولاً');
      setLoading(false);
      return;
    }

    fetch('/api/my-orders', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          if (res.status === 401) throw new Error('انتهت صلاحية الجلسة، سجل دخولك مجددًا');
          throw new Error('حدث خطأ أثناء جلب الطلبات');
        }
        const data = await res.json();
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>جاري تحميل الطلبات...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center', padding: '40px' }}>{error}</div>;
  }

  if (!orders.length) {
    return <div style={{ textAlign: 'center', color: '#888', padding: '40px' }}>لا يوجد طلبات حتى الآن.</div>;
  }

  // Pagination logic
  const totalPages = Math.ceil(orders.length / PAGE_SIZE);
  const paginatedOrders = orders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div style={{ overflowX: 'auto', direction: 'rtl' }}>
      <table style={{
        width: '100%',
        borderCollapse: 'separate',
        borderSpacing: 0,
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
        fontSize: '17px',
        minWidth: '700px',
        margin: 'auto'
      }}>
        <thead>
          <tr style={{ background: '#f8f8ff', color: '#333' }}>
            <th style={{ padding: '16px 12px', textAlign: 'center', fontWeight: 800 }}>اسم الطلب</th>
            <th style={{ padding: '16px 12px', textAlign: 'center', fontWeight: 800 }}>القسم</th>
            <th style={{ padding: '16px 12px', textAlign: 'center', fontWeight: 800 }}>الحالة</th>
            <th style={{ padding: '16px 12px', textAlign: 'center', fontWeight: 800 }}>الميزانية</th>
            <th style={{ padding: '16px 12px', textAlign: 'center', fontWeight: 800 }}>التاريخ</th>
            <th style={{ padding: '16px 12px', textAlign: 'center', fontWeight: 800 }}></th>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.map(order => {
            const status = statusColors[order.status] || { bg: '#f0f0f0', color: '#888' };
            return (
              <tr key={order.id} style={{ borderBottom: '1px solid #f0f0f0', textAlign: 'center' }}>
                <td style={{ padding: '14px 8px', fontWeight: 600 }}>{order.type_ar}</td>
                <td style={{ padding: '14px 8px', color: '#555', fontWeight: 500 }}>{order.section_ar}</td>
                <td style={{
                  padding: '10px 0',
                  borderRadius: '8px',
                  background: status.bg,
                  color: status.color,
                  fontWeight: 800,
                  minWidth: '90px',
                  display: 'inline-block',
                  margin: 'auto',
                  fontSize: '15px',
                  letterSpacing: '1px',
                  textTransform: 'capitalize'
                }}>
                  {order.status}
                </td>
                <td style={{ padding: '14px 8px', color: '#222', fontWeight: 500 }}>{order.budget_obj?.label || '-'}</td>
                <td style={{ padding: '14px 8px', direction: 'ltr', color: '#444', fontFamily: 'monospace', fontWeight: 500 }}>
                  {order.created_at?.slice(0, 10)}
                </td>
                <td style={{ padding: '10px 8px' }}>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    style={{
                      background: '#3867d6',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '7px 22px',
                      fontWeight: 700,
                      fontSize: 15,
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  >
                    تفاصيل
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          marginTop: '24px'
        }}>
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{
              padding: '7px 18px',
              borderRadius: 8,
              border: 'none',
              background: page === 1 ? '#eee' : '#3867d6',
              color: page === 1 ? '#aaa' : '#fff',
              fontWeight: 700,
              fontSize: 15,
              cursor: page === 1 ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s'
            }}
          >
            السابق
          </button>
          <span style={{ fontWeight: 700, fontSize: 15 }}>
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            style={{
              padding: '7px 18px',
              borderRadius: 8,
              border: 'none',
              background: page === totalPages ? '#eee' : '#3867d6',
              color: page === totalPages ? '#aaa' : '#fff',
              fontWeight: 700,
              fontSize: 15,
              cursor: page === totalPages ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s'
            }}
          >
            التالي
          </button>
        </div>
      )}

      {/* مودال التفاصيل */}
      <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </div>
  );
}

export default OrderList;