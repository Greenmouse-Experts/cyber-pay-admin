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

import DuesPayments from "../pages/admin/Payments/Dues";
import SubscriptionPayments from "../pages/admin/Payments/Subscription";
import SettingsPage from "../pages/admin/Settings";
import AdminBanner from "../pages/admin/Banner";
import AdminFaq from "../pages/admin/Faq";
import AdminCertificate from "../pages/admin/Certificate";
import AdminAdvert from "../pages/admin/Advert.jsx";
import AdminContact from "../pages/admin/Contact.jsx";
import AdminBreadCrumb from "../pages/admin/BreadCrumb.jsx";
import AdminStory   from "../pages/admin/Story.jsx"
import AdminPeople   from "../pages/admin/People.jsx"
import AdminCareer from "../pages/admin/CareerRoles.jsx";
import AdminWhyCyberPay from "../pages/admin/WhyCyberPay.jsx";
import AdminTerms from "../pages/admin/Terms.jsx";
import SubAdmin from "../pages/admin/SubAdmin.jsx";
import AdminAbout from "../pages/admin/About.jsx";
import Blogs from "../pages/admin/Blogs.jsx";
import AdminPolicy from "../pages/admin/Policy.jsx";
import AdminMarketPlace from "../pages/admin/MarketPlace.jsx";
import AdminMobileApp from "../pages/admin/MobileApp.jsx";
import AdminOnlinePayment from "../pages/admin/OnlinePayment.jsx";
import AdminUssdSolution from "../pages/admin/UssdSolution.jsx";
import AdminDirectDebit from "../pages/admin/DirectDebit.jsx";
import AdminBulkSms from "../pages/admin/BulkSms.jsx";
import AddPenRemit from "./PenRemit/AddPenRemit.jsx";
import AdminPenRemit from "../pages/admin/PenRemit.jsx";
import AdminPayment from "../pages/admin/Payment.jsx";
import AdminDisbursement from "../pages/admin/Disbursement.jsx";

const AdminDashboard = () => {
  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 650);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="layout">
      <div className="cide">
        <Sidenav showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      </div>
      <div className={showSidebar ? "components" : "close-side"}>
        <div className="top_admin_nav">
          <Topnav
         
           
            setShowSidebar={setShowSidebar}
            showSidebar={showSidebar}
            toggleSidebar={toggleSidebar}
          />
        </div>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Admin />} />
            <Route path="fellow" element={<Fellow />} />
            <Route path="blog" element={<Blogs />} />
            <Route path="pages/faqs" element={<AdminFaq />} />
            <Route path="banner" element={<AdminBanner />} />
            <Route path="certification" element={<AdminCertificate/>} />
            <Route path="advert" element={<AdminAdvert/>} />
            <Route path="contact" element={<AdminContact/>} />
            <Route path="subadmin" element={<SubAdmin/>} />

            <Route path="breadcrumb" element={<AdminBreadCrumb/>} />
            <Route path="pages/story" element={<AdminStory />} />
            <Route path="pages/people" element={<AdminPeople />} />
            <Route path="pages/whycyberpay" element={<AdminWhyCyberPay />} />
            <Route path="pages/terms" element={<AdminTerms />} />
            <Route path="pages/policy" element={<AdminPolicy />} />
            <Route path="pages/about" element={<AdminAbout />} />
            <Route path="pages/marketplace" element={<AdminMarketPlace />} />
            <Route path="pages/mobileapp" element={<AdminMobileApp />} />
            <Route path="pages/paymentlink" element={<AdminOnlinePayment />} />
            <Route path="pages/ussdsolution" element={<AdminUssdSolution />} />
            <Route path="pages/directdebit" element={<AdminDirectDebit />} />
            <Route path="pages/bulksms" element={<AdminBulkSms />} />
            <Route path="pages/penremit" element={<AdminPenRemit/>} />
            <Route path="pages/payment" element={<AdminPayment/>} />
            <Route path="pages/disbursement" element={<AdminDisbursement />} />
            <Route path="careers/add" element={<AdminCareer />} />
            <Route path="careers/view" element={<AdminCareer />} />
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
