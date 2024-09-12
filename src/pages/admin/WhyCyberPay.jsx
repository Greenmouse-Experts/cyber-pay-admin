import React, { useState } from "react";
import useGetHook from "../../hook/useGet";
import useModal from "../../hook/useModal";

import ReusableModal from "../../components/ReusableModal";
import usePostHook from "../../hook/usePost";
import { toast } from "react-toastify";

import ViewCertificate from "../../admin/certificate/ViewCertificate";

import EditAdvert from "../../admin/Advert/EditAdvert";
import AddWhyCyberPay from "../../admin/WhyCyberPay/AddWhyCyberPay";

const AdminWhyCyberPay = () => {
  const [selected, setSelected] = useState();
  const [isBusy, setIsBusy] = useState(false);
  const { data, loading, refetch } = useGetHook("admin/why/cyberpay");
  const { handlePost } = usePostHook();
  const { Modal, setShowModal } = useModal();
  const { Modal: Delete, setShowModal: showDelete } = useModal();
  const { Modal: View, setShowModal: showView } = useModal();
  const { Modal: Edit, setShowModal: showEdit } = useModal();

  const openEdit = () => {
    showView(false);
    showEdit(true);
  };
 
  const onSuccess = () => {
    setIsBusy(false);
    refetch();
    toast.success("Ads deleted successfully");
    showDelete(false);
  };
  const handleDelete = () => {
    setIsBusy(true);
    const payload = {
      banner_id: selected.id,
    };
    handlePost(`admin/banner/delete`, payload, `application/json`, onSuccess);
  };


  return (
    <>
      <div className="p-6 bg-white min-h-screen m-2">
        <div className="flex items-center justify-between px-4">
          <p className="text-2xl font-semibold">WhyCyberPay</p>
        
        </div>
        {!data ? (
          <div>loading</div>
        ) : (
          <AddWhyCyberPay item={data?.data} refetch={refetch} />
        )}
      </div>
      <Modal title={"Add Office"}>
        <AddWhyCyberPay close={() => setShowModal(false)} refetch={refetch} />
      </Modal>
      <View title="View">
        <ViewCertificate
          close={() => setShowModal(false)}
          item={selected}
          openEdit={openEdit}
        />
      </View>
      <Edit title={"Edit Advert"}>
        <EditAdvert
          item={selected}
          refetch={refetch}
          close={() => showEdit(false)}
        />
      </Edit>
      <Delete title="" noHead>
        <ReusableModal
          title="Are you sure you want to delete this ads?"
          cancelTitle="No, cancel"
          actionTitle="Yes, delete"
          closeModal={() => showDelete(false)}
          action={handleDelete}
          isBusy={isBusy}
        />
      </Delete>
    </>
  );
};

export default AdminWhyCyberPay;
