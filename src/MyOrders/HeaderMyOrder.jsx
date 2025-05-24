import React from 'react';

export default function MyOrdersHeader({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'orders',       label: 'طلباتي' },
    { id: 'charts',       label: 'إحصائيات' },
    { id: 'notifications',label: 'الإشعارات' },
    { id: 'inbox',        label: 'الرسائل' },
  ];

  // ستايل الحاوية
  const containerStyle = {
    width: '100%',
    marginBottom: '24px',
    display: 'flex',
    justifyContent: 'center',
    background: '#f8f8ff',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(56,103,214,0.04)',
    border: '1px solid #f0f0f0',
    overflow: 'hidden',
    direction: 'rtl'
  };

  // ستايل الأزرار الافتراضي والمفعل
  const getButtonStyle = (isActive) => ({
    flex: 1,
    padding: '16px 0',
    fontWeight: 900,
    fontSize: '19px',
    color: isActive ? '#3867d6' : '#888',
    background: isActive ? '#fff' : 'transparent',
    border: 'none',
    borderBottom: isActive ? '3px solid #3867d6' : '3px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.18s',
    outline: 'none',
    letterSpacing: '1px'
  });

  return (
    <div style={containerStyle}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          style={getButtonStyle(activeTab === tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
