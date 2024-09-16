import React, { useState } from "react";
import useGetHook from "../../hook/useGet";
import AddDisbursement from "../../admin/Disbursement/AddDisbursement";

const AdminDisbursement = () => {
  const { data, loading, refetch } = useGetHook("admin/solution/disbursement");

  return (
    <>
      <div className="p-6 bg-white min-h-screen m-2">
        <div className="flex items-center justify-between px-4">
          <p className="text-2xl font-semibold">Disbursement Solution</p>
        
        </div>
        {!data ? (
          <div>loading</div>
        ) : (
          <AddDisbursement item={data?.data} refetch={refetch} />
        )}
      </div>
      
     
    </>
  );
};

export default AdminDisbursement;
