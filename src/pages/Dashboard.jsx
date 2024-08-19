import React, { useEffect, useState } from "react";
import Sidenav from "../components/Sidenav";
import { Topnav } from "../components/Topnav";
import { Route, Routes } from "react-router-dom";
import "../stylesheet/layout.css";
import Home from "./Home";
import Notify from "./Notify";
import useGetHook from "../hook/useGet";
import SubscribeModal from "../users/SubscribeModal";
import MembersTransactions from "./users/Transactions";
import MembersSetting from "./users/Setting";
import MembersDues from "./users/Dues";

const Dashboard = () => {
  const sub = localStorage.getItem("bripan_sub");
  const [subModal, setSubModal] = useState(false);

  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 650);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const { data, isLoading } = useGetHook("member/count/unread/notifications");
  
  useEffect(() => {
    if (sub === "0") {
      setSubModal(true);
    }
  }, [sub]);

  return (
    <div className="layout">
      <div className="cide">
        <Sidenav showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      </div>
      <div className={showSidebar ? "component" : "close-side"}>
        <div className="pl-4">
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
            <Route path="/" element={<Home />} />
            <Route path="notify" element={<Notify datas={data?.data} />} />
           
            <Route path="transact" element={<MembersTransactions />} />
            <Route path="settings" element={<MembersSetting />} />
            <Route path="dues" element={<MembersDues />} />
          </Routes>
        </div>
      </div>
      {subModal && (
        <SubscribeModal/>
      )}
    </div>
  );
};

export default Dashboard;
