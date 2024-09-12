import React, { useState } from "react";
import useGetHook from "../../hook/useGet";
import AddBulkSms from "../../admin/BulkSms/AddBulkSms";

const AdminBulkSms = () => {
  const { data, loading, refetch } = useGetHook("admin/solution/bulk/sms");

  return (
    <>
      <div className="p-6 bg-white min-h-screen m-2">
        <div className="flex items-center justify-between px-4">
          <p className="text-2xl font-semibold">Bulk Sms</p>
        
        </div>
        {!data ? (
          <div>loading</div>
        ) : (
          <AddBulkSms item={data?.data} refetch={refetch} />
        )}
      </div>
      
     
    </>
  );
};

export default AdminBulkSms;
