import React from "react";
import { MdEdit } from "react-icons/md";
import { NavLink } from "react-router-dom";

const ViewBreadrumb = ({ item, openEdit }) => {
  return (
    <>
      <div className="flex justify-end">
        <p
          className="flex items-center gap-x-2 text-blue-800 mb-1 cursor-pointer font-semibold"
          onClick={openEdit}
        >
          <MdEdit className="text-lg" />
          Edit
        </p>
      </div>
      <div className="max-h-[500px] overflow-y-auto mb-2 no-scrollbar">
        <img
          src={item.image}
          alt="image"
          className="w-full h-72 object-cover object-center"
        />
        <h5 className="mt-5 font-semibold">{item.title}</h5>
        <p>
          <NavLink
            className="text-red-600 underline"
            to={`https://cyberpay-staging.netlify.app${item.link}`}
          >
            {`https://cyberpay-staging.netlify.app${item.link}`}
          </NavLink>
        </p>
      </div>
    </>
  );
};

export default ViewBreadrumb;
