import React, { useState } from "react";
import useGetHook from "../../hook/useGet";
import AddPenRemit from "../../admin/PenRemit/AddPenRemit";

const AdminPenRemit = () => {
  const { data, loading, refetch } = useGetHook("admin/solution/pen/remit");

  return (
    <>
      <div className="p-6 bg-white min-h-screen m-2">
        <div className="flex items-center justify-between px-4">
          <p className="text-2xl font-semibold">Pen Remit</p>
        
        </div>
        {!data ? (
          <div>loading</div>
        ) : (
          <AddPenRemit item={data?.data} refetch={refetch} />
        )}
      </div>
      
     
    </>
  );
};

export default AdminPenRemit;
