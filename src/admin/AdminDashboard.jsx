import React, { useState } from "react";
import useGetHook from "../hook/useGet";
import Sidenav from "./Sidenav";
import { Topnav } from "./Topnav";
import { Route, Routes } from "react-router-dom";
import "../stylesheet/layout.css";
import Admin from "./Admin";
import Fellow from "../pages/admin/Fellow";
import Associate from "../pages/admin/Associate";
import Notify from "../pages/admin/Notify";

import AdminBanks from "../pages/admin/Faq";
import AdminDuesCategory from "../pages/admin/Dues/Category";
import AdminDues from "../pages/admin/Dues/Dues";
import DuesPayments from "../pages/admin/Payments/Dues";
import SubscriptionPayments from "../pages/admin/Payments/Subscription";
import SettingsPage from "../pages/admin/Settings";
import AdminBanner from "../pages/admin/Banner";
import AdminFaq from "../pages/admin/Faq";

const AdminDashboard = () => {
  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 650);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const { data, isLoading } = useGetHook("admin/count/unread/notifications");

  console.log(data);

  return (
    <div className="layout">
      <div className="cide">
        <Sidenav showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      </div>
      <div className={showSidebar ? "components" : "close-side"}>
        <div className="top_admin_nav">
          <Topnav
            data={data?.data}
            isLoading={isLoading}
            setShowSidebar={setShowSidebar}
            showSidebar={showSidebar}
            toggleSidebar={toggleSidebar}
          />
        </div>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Admin />} />
            <Route path="fellow" element={<Fellow />} />
            {/* <Route path="associate" element={<Associate />} /> */}
            <Route path="faq" element={<AdminFaq />} />
            <Route path="banner" element={<AdminBanner />} />
            <Route path="notify" element={<Notify datas={data?.data} />} />
            <Route path="dues/list" element={<AdminDues />} />
            <Route path="dues/bank" element={<AdminBanks />} />
            <Route path="dues/category" element={<AdminDuesCategory />} />
            <Route
              path="payments/subscrition"
              element={<SubscriptionPayments />}
            />
            <Route path="payments/dues" element={<DuesPayments />} />
            <Route path="settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
