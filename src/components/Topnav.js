import React, { useState, useEffect, useRef } from "react";
import { LuMenu } from "react-icons/lu";
import "../stylesheet/component.css";
import { BiSearch } from "react-icons/bi";
import { GoBell } from "react-icons/go";
import user from "../image/Ellipse 922.png";
import useGetHook from "../hook/useGet";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

export const Topnav = ({ toggleSidebar }) => {
  const formatTimeAgo = (timestamp) => {
    const apiDate = new Date(timestamp);
    return formatDistanceToNow(apiDate);
  };
  const [activeDropdown, setActiveDropdown] = useState(false);
 

  const name = localStorage.getItem("fName");
  const currentDate = new Date();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // const dayNames = [
  //   "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  // ];

  const day = currentDate.getDate();
  const month = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  const formattedDate = `${day} ${month} ${year}`;

  const popup = () => {
    setActiveDropdown(!activeDropdown);
  };

  const bellIconRef = useRef(null);
  const handleClickOutside = (event) => {
    if (
      bellIconRef.current &&
      !bellIconRef.current.contains(event.target) &&
      !activeDropdown
    ) {
      setActiveDropdown(false);
    }
  };

  // Add click event listener when the component mounts
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="top_nav">
      <div className="icon_menu">
        <div className="menu-icon" onClick={toggleSidebar}>
          <LuMenu />
        </div>
        <div className="icon_text">
          <h3>Hello {name}</h3>
          <p>{formattedDate}</p>
        </div>
      </div>
      <div className="icon_menu">
        {/* <div className="search">
          <BiSearch />
          <input type="text" placeholder="Search" />
        </div> */}
     
        <img src={user} alt="" />
      </div>
    </div>
  );
};
