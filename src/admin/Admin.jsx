import React from "react";
import "../stylesheet/layout.css";
import img1 from "../image/profit 5.png";
import img2 from "../image/profit 6.png";
import img3 from "../image/profit 7.png";
import useGetHook from "../hook/useGet";
import dayjs from "dayjs";
import { formatAsNgnMoney } from "../services/helpers";
import MembersJoined from "./charts/membersJoined";
import { IoIosArrowDown } from "react-icons/io";
import Analytics from "./charts/GoogleAnalytics";
// eslint-disable-next-line

const Admin = () => {
  const currentYear = new Date().getFullYear();
  const { data: user, refetch } = useGetHook(`admin/dashboard?startDate&endDate`)

  console.log(user)

  const list = [
    {
      head: "Total Banners",
      num: 5,
      Image: img1,
    },
    {
      head: "Total Breadcrumbs",
      num: 10,
      Image: img2,
    },
    {
      head: "Total Certificate",
      num: 7,
      Image: img3,
    },
    // {
    //   head: "Total Subscription Paid",
    //   num: user && formatAsNgnMoney(user?.data.totalSubscriptionPaid),
    //   Image:
    //     "https://img.freepik.com/premium-vector/sack-money-big-pile-cash-money-icon-illustration-money-bag-flat-icon_385450-362.jpg",
    // },
  ];

  const dummyAnalyticsData = [
    { month: 'January', pageViews: 1200, sessions: 800, users: 600 },
    { month: 'February', pageViews: 1500, sessions: 1000, users: 750 },
    { month: 'March', pageViews: 1800, sessions: 1200, users: 900 },
    { month: 'April', pageViews: 2200, sessions: 1600, users: 1200 },
    { month: 'May', pageViews: 2500, sessions: 1800, users: 1350 },
    { month: 'June', pageViews: 2700, sessions: 2000, users: 1500 },
    { month: 'July', pageViews: 3000, sessions: 2200, users: 1650 },
    { month: 'August', pageViews: 3300, sessions: 2500, users: 1800 },
    { month: 'September', pageViews: 3600, sessions: 2700, users: 1950 },
    { month: 'October', pageViews: 3900, sessions: 3000, users: 2100 },
    { month: 'November', pageViews: 4200, sessions: 3200, users: 2250 },
    { month: 'December', pageViews: 4500, sessions: 3500, users: 2400 },
  ];

  return (
    <div className="home">
      <div className="home_top">
        {" "}
        {/* <div className="bg-white p-6 w-[99%] lg:w-[70%]">
          <div className="head_table">
            <p className="text-xl font-semibold">Recent Members</p>
          </div>
          <div className="w-full overflow-x-auto">
          <table className="overflow-x-auto">
            <thead>
              <tr>
                <th className="whitespace-nowrap">S/N</th>
                <th className="whitespace-nowrap">Member Id</th>
                <th className="whitespace-nowrap">Member Name</th>
                <th className="whitespace-nowrap">Profession</th>
                <th className="whitespace-nowrap">Subscription</th>
                <th className="whitespace-nowrap">Date Registered</th>
              </tr>
            </thead>
            <tbody>
              {user &&
                user?.data?.latestFiveMember.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.membership_id}</td>
                    <td>
                      {item.first_name} {item.last_name}
                    </td>
                    <td>{item.account_type}</td>
                    <td>
                      {item?.isSubscribed === "0" ? (
                        <span className="px-2 py-1 text-sm bg-orange-100 font-medium rounded-lg">
                          Unsubscribed
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-sm bg-green-100 font-medium rounded-lg">
                          Subscribed
                        </span>
                      )}
                    </td>
                    <td>{dayjs(item.created_at).format('DD-MM-YYYY')}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          </div>
        </div> */}
        <div className="top_right">
          {list.map((item) => (
            <div className="">
              <div className="_text">
                <p>{item.head}</p> <h3>{item.num}</h3>{" "}
              </div>{" "}
              <img src={item.Image} alt="" className="w-[60px]" />
            </div>
          ))}
        </div>
      </div>
      <div className="home_bottom mt-32">
        <div className="l">
          <div className="line">
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold text-xl">Analytics</h2>
              {/* <button className="flex items-center gap-x-2 bg-blue-900 text-white px-2 py-1 rounded-lg">
                Monthly (2024){" "}
                <span>
                  <IoIosArrowDown />
                </span>
              </button> */}
            </div>
            {user && <Analytics data={user?.data} />}
          </div>
        </div>
        {/* <div className="b">
          <div className="bar">
            <h2 className="font-semibold mb-2">Analytics</h2>{" "}
            {user && <MembersJoined className="v" data={user?.data?.monthly_members_joined} />}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Admin;
