import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../image/logo.png";
import { FiSettings, FiLogOut, FiPhone } from "react-icons/fi";
import { MdAnnouncement, MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdNetworkPing } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { GrAnnounce, GrTransaction } from "react-icons/gr";
import { GoBell } from "react-icons/go";
import { LuLayoutDashboard } from "react-icons/lu";
import "../stylesheet/component.css";
import { AiOutlineClose } from "react-icons/ai";
import { FaQuestionCircle, FaRegImages } from "react-icons/fa";
import useModal from "../hook/useModal";
import { PiCertificate } from "react-icons/pi";
import { RiPagesLine } from "react-icons/ri";

const Sidebar = ({ showSidebar, toggleSidebar }) => {
  const [showUsersMenu, setShowUsersMenu] = useState(false);
  const [duesMenu, setDuesMenu] = useState(false);
  const [payments, setPayments] = useState(false);
  const navigate = useNavigate();
  const { Modal, setShowModal } = useModal();
  const toggleUsersMenu = () => {
    if (showSidebar) {
      setShowUsersMenu(!showUsersMenu);
    }
  };

  const toggleDuesMenu = () => {
    if (showSidebar) {
      setDuesMenu(!duesMenu);
    }
  };

  const togglePaymentMenu = () => {
    if (showSidebar) {
      setPayments(!payments);
    }
  };

  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSidebar && sidebarRef.current && window.innerWidth <= 550) {
        const sidebarRect = sidebarRef.current.getBoundingClientRect();
        const isOutsideSidebar =
          event.clientX < sidebarRect.left - 550 ||
          event.clientX > sidebarRect.right + 550 ||
          event.clientY < sidebarRect.top - 550 ||
          event.clientY > sidebarRect.bottom + 550;

        if (isOutsideSidebar) {
          toggleSidebar(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSidebar, toggleSidebar]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin/login");
  };

  return (
    <div
      ref={sidebarRef}
      className={showSidebar ? "sidebar" : "sidebar closed"}
    >
      <div className={showSidebar ? "side_img" : "img-side"}>
        <a href="https://cyberpay.net.ng">
          <img className="img-logo" src={logo} alt="Logo" />
        </a>{" "}
        <div className="men" onClick={toggleSidebar}>
          <AiOutlineClose />
        </div>
      </div>
      <nav className={`side-nav ${showSidebar ? "active" : ""}`}>
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/admin/" className="nav-link">
              <span className="nav-icon">
                <LuLayoutDashboard /> {showSidebar && "Dashboard"}
              </span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin/banner" className="nav-link">
              <span className="nav-icon">
                <MdAnnouncement />
                {showSidebar && "Banner"}
              </span>
            </NavLink>
          </li>
          {/* <li className="nav-item">
            <NavLink to="/admin/faq" className="nav-link">
              <span className="nav-icon">
                <FaQuestionCircle />
                {showSidebar && "Faqs"}
              </span>
            </NavLink>
          </li> */}
          <li className="nav-item">
            <NavLink to="/admin/certification" className="nav-link">
              <span className="nav-icon">
              <PiCertificate />
                {showSidebar && "Certification"}
              </span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin/advert" className="nav-link">
              <span className="nav-icon">
              <GrAnnounce />
                {showSidebar && "Advert"}
              </span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin/contact" className="nav-link">
              <span className="nav-icon">
              <FiPhone />
                {showSidebar && "Contact"}
              </span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin/breadcrumb" className="nav-link">
              <span className="nav-icon">
              <FaRegImages />
                {showSidebar && "Breadcrumb"}
              </span>
            </NavLink>
          </li>
          <li className="nav-item">
            <span className="nav-link" onClick={toggleDuesMenu}>
              <span className="nav-icon">
              <RiPagesLine /> {showSidebar && "EditablePages"}
              </span>
              {showSidebar && (
                <div className="bb">
                  {duesMenu ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
              )}
            </span>
            {duesMenu && (
              <ul className="submenu">
                <li className="submenu-item">
                  <NavLink to="pages/story" className="nav-link">
                    {showSidebar && "Story"}
                  </NavLink>
                </li>
                <li className="submenu-item">
                  <NavLink to="pages/people" className="nav-link">
                    {showSidebar && "People"}
                  </NavLink>
                </li>
                <li className="submenu-item">
                  <NavLink to="pages/about" className="nav-link">
                    {showSidebar && "About Us"}
                  </NavLink>
                </li>
                <li className="submenu-item">
                  <NavLink to="pages/whycyberpay" className="nav-link">
                    {showSidebar && "WhyCyberPay"}
                  </NavLink>
                </li>
                <li className="submenu-item">
                  <NavLink to="pages/terms" className="nav-link">
                    {showSidebar && "Terms & Condition"}
                  </NavLink>
                </li>
                <li className="submenu-item">
                  <NavLink to="pages/people" className="nav-link">
                    {showSidebar && "Privacy Policy"}
                  </NavLink>
                </li>
              
                <li className="submenu-item">
                  <NavLink to="pages/faqs" className="nav-link">
                    {showSidebar && "FAQs"}
                  </NavLink>
                </li>
                {/* <li className="submenu-item">
                  <NavLink to="dues/list" className="nav-link">
                    {showSidebar && "Dues List"}
                  </NavLink>
                </li> */}
              </ul>
            )}
          </li>
          <li className="nav-item">
            <span className="nav-link" onClick={togglePaymentMenu}>
              <span className="nav-icon">
              <MdNetworkPing /> {showSidebar && "Careers"}
              </span>
              {showSidebar && (
                <div className="bb">
                  {payments ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
              )}
            </span>
            {payments && (
              <ul className="submenu">
                <li className="submenu-item">
                  <NavLink to="careers/add" className="nav-link">
                    {showSidebar && "Add Careers"}
                  </NavLink>
                </li>
                <li className="submenu-item">
                  <NavLink to="careers/view" className="nav-link">
                    {showSidebar && "View Applicants"}
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li className="nav-item">
            <NavLink to="/admin/subadmin" className="nav-link">
              <span className="nav-icon">
              <MdOutlineAdminPanelSettings />
                {showSidebar && "Sub Admin"}
              </span>
            </NavLink>
          </li>
          {/* <li className="nav-item">
            <NavLink to="notify" className="nav-link">
              <span className="nav-icon">
              <GoBell />
                {showSidebar && "Notification"}
              </span>
            </NavLink>
          </li> */}
          {/* <li className="nav-item">
            <NavLink to="settings" className="nav-link">
              <span className="nav-icon">
                <FiSettings />
                {showSidebar && "Settings"}
              </span>
            </NavLink>
          </li> */}
          <li className="nav-item" onClick={handleLogout}>
            <div className="nav-link">
              <span className="nav-icon">
                {" "}
                <FiLogOut /> {showSidebar && "Logout"}
              </span>
            </div>
          </li>
        </ul>
      </nav>
      <Modal title={""} noHead>
        <div className="p-5">
          <p className="text-center">Are you sure you want to logout?</p>
          <div className="mt-6 flex items-center justify-between">
            <button
              className="px-5 py-2 bg-red-500 rounded text-white"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              className="px-5 py-2 bg-blue-900 rounded text-white"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Sidebar;
