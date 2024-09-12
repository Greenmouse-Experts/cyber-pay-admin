import React, { useState } from "react";
import useGetHook from "../../hook/useGet";
import AddDirectDebit from "../../admin/DirectDebit/AddDirectDebit";

const AdminDirectDebit = () => {
  const { data, loading, refetch } = useGetHook("admin/solution/direct/debit");

  return (
    <>
      <div className="p-6 bg-white min-h-screen m-2">
        <div className="flex items-center justify-between px-4">
          <p className="text-2xl font-semibold">Direct Debit</p>
        
        </div>
        {!data ? (
          <div>loading</div>
        ) : (
          <AddDirectDebit item={data?.data} refetch={refetch} />
        )}
      </div>
      
     
    </>
  );
};

export default AdminDirectDebit;
