import React, { useState } from "react";
import useGetHook from "../../hook/useGet";


import AddMarketPlace from "../../admin/MarketPlace/AddMarketPlace";

const AdminMarketPlace = () => {
  const { data, loading, refetch } = useGetHook("admin/solution/market/place");

  return (
    <>
      <div className="p-6 bg-white min-h-screen m-2">
        <div className="flex items-center justify-between px-4">
          <p className="text-2xl font-semibold">MarketPlace</p>
        
        </div>
        {!data ? (
          <div>loading</div>
        ) : (
          <AddMarketPlace item={data?.data} refetch={refetch} />
        )}
      </div>
      
     
    </>
  );
};

export default AdminMarketPlace;
