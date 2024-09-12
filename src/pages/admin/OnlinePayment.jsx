import React from "react";
import useGetHook from "../../hook/useGet";
import AddOnlinePayment from "../../admin/OnlinePayment/AddOnlinePayment";

const AdminOnlinePayment = () => {
  const { data, loading, refetch } = useGetHook("admin/solution/payment/link");

  return (
    <>
      <div className="p-6 bg-white min-h-screen m-2">
        <div className="flex items-center justify-between px-4">
          <p className="text-2xl font-semibold">Online Payment With Link</p>
        
        </div>
        {!data ? (
          <div>loading</div>
        ) : (
          <AddOnlinePayment item={data?.data} refetch={refetch} />
        )}
      </div>
      
     
    </>
  );
};

export default AdminOnlinePayment;
