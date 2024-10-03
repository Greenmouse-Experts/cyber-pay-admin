import React, { useState } from "react";
import useGetHook from "../../hook/useGet";
import AddPayment from "../../admin/Payment/AddPayment";

const AdminPayment = () => {
  const { data, loading, refetch } = useGetHook("admin/solution/payment");

  return (
    <>
      <div className="p-6 bg-white min-h-screen m-2">
        <div className="flex items-center justify-between px-4">
          <p className="text-2xl font-semibold">Payment Processing</p>
        
        </div>
        {!data ? (
          <div>loading</div>
        ) : (
          <AddPayment item={data?.data} refetch={refetch} />
        )}
      </div>
      
     
    </>
  );
};

export default AdminPayment;
