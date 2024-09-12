import React from "react";
import useGetHook from "../../hook/useGet";
import AddMobileApp from "../../admin/MobileApp/AddMobileApp";

const AdminMobileApp = () => {
  const { data, loading, refetch } = useGetHook("admin/solution/mobile/app");

  return (
    <>
      <div className="p-6 bg-white min-h-screen m-2">
        <div className="flex items-center justify-between px-4">
          <p className="text-2xl font-semibold">Mobile App</p>
        
        </div>
        {!data ? (
          <div>loading</div>
        ) : (
          <AddMobileApp item={data?.data} refetch={refetch} />
        )}
      </div>
      
     
    </>
  );
};

export default AdminMobileApp;
