import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";

/* ─── Common Components ───────────────────────────────────────────── */
import Header from "./components/Header";
import Footer from "./components/Footer";
import Chatgpt from "./components/Chatgpt";

/* ─── Public Pages ──────────────────────────────────────────────── */
import Home from "./pages/Home";
import Apps from "./pages/Apps";
import AndroidOrder from "./components/AndroidOrder";
import IOSOrder from "./components/IOSOrder";
import Seopage from "./components/Seopage";
import Seopageorder from "./components/Seopageorder";
import Developmentpage from "./components/Developmentpage";
import Webdevorder from "./components/webdevorder";
import Services from "./components/Services";
import Support from "./components/Support";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contacts from "./pages/Contacts";
import About from "./pages/About";
import License from "./pages/License";
import Plans from "./pages/Plans";
import Whatsnew from "./pages/Whatsnew";
import Cookiesettings from "./pages/Cookiesettings";
import Copyright from "./pages/Copyright";
import Cookies from "./pages/Cookies";
import Terms from "./pages/Terms";
import Orders from "./pages/Orders";
import WebPage from "./components/WebPage";
import WebOrder from "./components/WebOrder";



/* ─── Authentication Pages ────────────────────────────────────────── */
import Register from "./pages/Register";
import Login from "./pages/Login";

/* ─── User Settings ───────────────────────────────────────────────── */
import UserMainpage from "./pages/Usersettings/Mainpage";
import UserDashboard from "./pages/Usersettings/Dashboard";
import UserSidebarProfile from "./pages/Usersettings/SidebarProfile";
import UserProfile from "./pages/Usersettings/UserProfile";
import UserCompanySettings from "./pages/Usersettings/Companysettings";
import UserNotifications from "./pages/Usersettings/Notifications";

/* ─── Admin Pages ──────────────────────────────────────────────────── */
import AdminLayout from "./Admin/AdminLayout";
import Dashboard from "./Admin/Dashboard";
import OrdersAdmin from "./Admin/Orders";
import UsersAdmin from "./Admin/Users";
import Stats_Order from "./Admin/Stats_Order";
import StatsAdmin from "./Admin/Stats";
import InboxAdmin from "./Admin/Inbox";
import MangmentOrderAdmin from "./Admin/MangmentOrderAdmin";
import SettingsAdmin from "./Admin/Settings";
import Adminlogin from "./Admin/Login";
import AdminProfile from "./Admin/Profile";



/* ─── Myorder Pages ──────────────────────────────────────────────────── */
import MyOrdersLayout from "./MyOrders/Layout";
import OrderList from "./MyOrders/OrderList";
import Notifications from './MyOrders/Notifications';
import OrderDetails from './MyOrders/OrderDetails';
import Invoice from './MyOrders/Invoice';
import Charts from './MyOrders/Charts';
import InboxPage from './MyOrders/InboxPage';





/* ─── Layout (Public & User Settings) ──────────────────────────── */
function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <Chatgpt />
    </>
  );
}

/* ─── Admin Route (Protected) ──────────────────────────── */
function AdminRoute({ children }) {
  const adminUser = JSON.parse(localStorage.getItem("adminUser"));
  const adminToken = localStorage.getItem("adminToken");

  return adminUser && adminToken && adminUser.role === "admin"
    ? children
    : <Navigate to="/adminlogin" replace />;
}


/* ─── App Routes ──────────────────────────────────────── */
export default function App() {
  const [logoutModal, setLogoutModal] = useState(false);
  return (
    <Router>
      <Routes>
        <Route path="adminlogin" element={<Adminlogin />} /> 

        {/* Admin Routes (محميّة للأدمن فقط) */}
        <Route
        
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout setLogoutModal={setLogoutModal} />
            </AdminRoute>
          }
        >
         
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<OrdersAdmin />} />
          <Route path="users" element={<UsersAdmin />} />
           <Route path="Admin-Profile" element={<AdminProfile />} />
          <Route path="Stats_Order" element={<Stats_Order />} />
          <Route path="stats" element={<StatsAdmin />} />
          <Route path="inbox" element={<InboxAdmin />} />
          <Route path="Mange_orders" element={<MangmentOrderAdmin />} />
          <Route path="settings" element={<SettingsAdmin />} />
        </Route>

        {/* Public & User Routes (مع الهيدر والفوتر) */}
        <Route element={<MainLayout />}>
          {/* الصفحات العامة */}
          <Route path="/" element={<Home />} />
          <Route path="/apps/:platform" element={<Apps />} />
          <Route path="/order/android" element={<AndroidOrder />} />
          <Route path="/order/ios" element={<IOSOrder />} />
          <Route path="/seo" element={<Seopage />} />
          <Route path="/seo/seorder" element={<Seopageorder />} />
          <Route path="/dev" element={<Developmentpage />} />
          <Route path="/dev/order" element={<Webdevorder />} />
          <Route path="/support" element={<Support />} />
          <Route path="/services" element={<Services />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/about" element={<About />} />
          <Route path="/license" element={<License />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/whatsnew" element={<Whatsnew />} />
          <Route path="/cookie-settings" element={<Cookiesettings />} />
          <Route path="/copyright" element={<Copyright />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/terms" element={<Terms />} />

          {/* الصفحات الخاصة بالطلبات */}





          <Route path="/web" element={<WebPage />} />
          <Route path="/web/weborder" element={<WebOrder />} />

          {/* صفحات إعدادات المستخدم */}
          <Route path="/settings" element={<UserMainpage />} />
          <Route path="/settings/dashboard" element={<UserDashboard />} />
          <Route path="/settings/sidebar" element={<UserSidebarProfile />} />
          <Route path="/settings/profile" element={<UserProfile />} />
          <Route path="/settings/company" element={<UserCompanySettings />} />
          <Route path="/settings/notifications" element={<UserNotifications />} />
        </Route>

        {/* صفحات تسجيل الدخول والتسجيل (بدون هيدر وفوتر) */}

<Route path="/orders" element={<MyOrdersLayout />}>

  <Route index element={<OrderList />} />       // صفحة رئيسية للطلبات
  <Route path="details/:orderId" element={<OrderDetails />} />   // تفاصيل الطلب
  <Route path="invoice/:orderId" element={<Invoice />} />        // الفواتير
  <Route path="charts" element={<Charts />} />                   // الإحصائيات
  <Route path="notifications" element={<Notifications />} />     // الإشعارات
  <Route path="inbox" element={<InboxPage />} />                 // المراسلات
  <Route path="inbox/:orderId" element={<InboxPage />} />        // محادثة خاصة بالطلب

</Route>


          
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>


{logoutModal && (
  <div style={{
    position: "fixed",
    top: 0, left: 0, width: "100vw", height: "100vh",
    background: "rgba(24,24,44,0.15)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 99999,
  }}>
    <div style={{
      background: "#fff",
      borderRadius: 16,
      padding: "36px 40px",
      boxShadow: "0 8px 40px #7c4dff19",
      display: "flex", flexDirection: "column", alignItems: "center",
      minWidth: 270, gap: 18, border: "1.5px solid #ece8fa"
    }}>
      <span style={{ fontSize: 38, color: "#7c4dff" }}>👋</span>
      <div style={{
        fontWeight: 900, color: "#7c4dff", fontSize: 22, letterSpacing: ".5px"
      }}>See you soon!</div>
      <div style={{
        fontSize: 15, color: "#8e8dad", fontWeight: 500, marginTop: -5, textAlign: "center"
      }}>
        You have been logged out successfully.
      </div>
    </div>
  </div>
)}




    </Router>



  );
}


