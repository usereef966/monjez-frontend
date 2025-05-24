import React from "react";
import UsersChart from './UsersChart';
import SalesChart from './SalesChart';
import InvoicesChart from './InvoicesChart';
import InvoicesTable from './InvoicesTable';
import MessagesChart from './MessagesChart';  
      // الشارت الجديد
import NotificationsChart from './NotificationsChart';  // الشارت الجديد

export default function Stats() {
  // ستايل الجريد
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 28,
     boxSizing: 'border-box',
    zIndex: 100,
    margin: "44px auto 0 auto",
    maxWidth: 2000,
    
  };
  return (

    <div style={{ position: "relative", zIndex: 100 }}>
    <div>
      <div style={{
  background: "linear-gradient(90deg, #6366f1 20%, #6d28d9 100%)",
  padding: "28px 36px",
  borderRadius: 22,
  boxShadow: "0 6px 36px 0 rgba(109,40,217,0.12)",
  margin: "24px auto 42px auto",
  maxWidth: 200,
  marginLeft: 130 , 
  display: "flex",
  position: "relative"
}}>
 
  <h1 style={{
    fontSize: 20,
    color: "#fff",
    fontWeight: 900,
    letterSpacing: ".6px",
    margin: 0,
    textShadow: "0 1px 10px #4f46e5a8, 0 1px 10px #a5b4fc5d"
  }}>
    Statistics Overview
  </h1>
</div>
      <div style={gridStyle}>
        <UsersChart />
        <SalesChart />
        <InvoicesChart />
        <InvoicesTable />
        <MessagesChart />
        <NotificationsChart />
      </div>
    </div>
    </div>
  );
}