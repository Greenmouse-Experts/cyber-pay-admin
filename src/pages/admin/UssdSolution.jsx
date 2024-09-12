import React, { useState } from "react";
import useGetHook from "../../hook/useGet";
import AddUssdSolution from "../../admin/UssdSolution/AddUssdSolution";

const AdminUssdSolution = () => {
  const { data, loading, refetch } = useGetHook("admin/solution/ussd/collection");

  return (
    <>
      <div className="p-6 bg-white min-h-screen m-2">
        <div className="flex items-center justify-between px-4">
          <p className="text-2xl font-semibold">Ussd Solution</p>
        
        </div>
        {!data ? (
          <div>loading</div>
        ) : (
          <AddUssdSolution item={data?.data} refetch={refetch} />
        )}
      </div>
      
     
    </>
  );
};

export default AdminUssdSolution;
