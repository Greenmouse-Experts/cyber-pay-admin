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
import jsPDF from "jspdf";
import "jspdf-autotable";
// eslint-disable-next-line

const Admin = () => {
  const currentYear = new Date().getFullYear();
  const { data, refetch } = useGetHook(`admin/dashboard?startDate&endDate`)

  console.log(data)

  const list = [
    {
      head: "Total Banners",
      num: data?.data?.totalBanners ,
      Image: img1,
    },
    {
      head: "Total Breadcrumbs",
      num: data?.data?.totalBreadcrumb,
      Image: img2,
    },
    {
      head: "Total Certification",
      num: data?.data?.totalCertification,
      Image: img3,
    },
    // {
    //   head: "Total Subscription Paid",
    //   num: user && formatAsNgnMoney(user?.data.totalSubscriptionPaid),
    //   Image:
    //     "https://img.freepik.com/premium-vector/sack-money-big-pile-cash-money-icon-illustration-money-bag-flat-icon_385450-362.jpg",
    // },
  ];

  const downloadAsPDF = () => {
    const doc = new jsPDF();
  
    // Adding the title
    doc.text("Analytics Report", 20, 10);
  
    // Adding Total Counts
    doc.text("Total Banners: " + data?.data?.totalBanners, 20, 20);
    doc.text("Total Breadcrumbs: " + data?.data?.totalBreadcrumb, 20, 30);
    doc.text("Total Careers: " + data?.data?.totalCareers, 20, 40);
    doc.text("Total Contacts: " + data?.data?.totalContacts, 20, 50);
    doc.text("Total Certifications: " + data?.data?.totalCertification, 20, 60);
  
    // Adding Get Visitors Table
    doc.autoTable({
      startY: 70,
      head: [['City', 'Active Users']],
      body: data?.data?.getVisitors?.rows.map((row) => [
        row.dimensionValues[0]?.value,
        row.metricValues[0]?.value,
      ]),
    });
  
    // Adding Get Bounce Rate Table
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 10, // To position after the previous table
      head: [['City', 'Bounce Rate']],
      body: data?.data?.getBounceRate?.rows.map((row) => [
        row.dimensionValues[0]?.value,
        row.metricValues[0]?.value,
      ]),
    });
  
    // Adding Get User Behavior Table
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 10,
      head: [['Page Path', 'Engaged Sessions', 'Avg. Session Duration']],
      body: data?.data?.getUserBehavior?.rows.map((row) => [
        row.dimensionValues[0]?.value,
        row.metricValues[0]?.value,
        row.metricValues[1]?.value,
      ]),
    });
  
    // Save the PDF
    doc.save("analytics.pdf");
  };

  return (
    <div className="home">
      <div className="home_top">
        {" "}
       
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
              <button onClick={downloadAsPDF} className="flex items-center gap-x-2 bg-blue-900 text-white px-2 py-1 rounded-lg">
                Download Data
              
              </button>
            </div>
            {data && <Analytics data={data?.data} />}
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default Admin;
