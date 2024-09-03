import React from "react";
import { MdEdit } from "react-icons/md";

const ViewAdvert = ({ item, openEdit }) => {
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
        <img src={item.image} alt="image" className="w-full" />
        <h5 className="mt-5 font-semibold">{item.title}</h5>
      </div>
    </>
  );
};

export default ViewAdvert;
