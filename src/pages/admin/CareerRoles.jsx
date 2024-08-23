import React, { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";
import { RiDeleteBin5Line } from "react-icons/ri";
import useGetHook from "../../hook/useGet";
import useModal from "../../hook/useModal";
import { formatString } from "../../services/helpers";
import dayjs from "dayjs";

import ReusableModal from "../../components/ReusableModal";
import usePostHook from "../../hook/usePost";
import { toast } from "react-toastify";

import AddCareer from "../../admin/careers/AddCareer";
import EditCareer from "../../admin/careers/EditCareer";
import ViewCareer from "../../admin/careers/ViewCareer";

const AdminCareer = () => {
  const [selected, setSelected] = useState();
  const [isBusy, setIsBusy] = useState(false);
  const { data, loading, refetch } = useGetHook("admin/career/role");
  const { handlePost } = usePostHook();
  const { Modal, setShowModal } = useModal();
  const { Modal: Delete, setShowModal: showDelete } = useModal();
  const { Modal: View, setShowModal: showView } = useModal();
  const { Modal: Edit, setShowModal: showEdit } = useModal();
  const openViewAnnounce = (item) => {
    setSelected(item);
    showView(true);
  };
  const openEdit = () => {
    showView(false);
    showEdit(true);
  };
  const openDelete = (item) => {
    setSelected(item);
    showDelete(true);
  };
  const onSuccess = () => {
    setIsBusy(false);
    refetch();
    toast.success(" Deleted successfully");
    showDelete(false);
  };
  const handleDelete = () => {
    setIsBusy(true);
    const payload = {
      people_id: selected.id,
    };
    handlePost(`admin/career/role/delete`, payload, `application/json`, onSuccess);
  };



  return (
    <>
      <div className="p-6 bg-white min-h-screen m-2">
        <div className="flex items-center justify-between px-4">
          <p className="text-2xl font-semibold">Careers</p>
          <button
            className="flex items-center  gap-x-2 p-2 px-4 text-blue-900 font-semibold border border-blue-900 rounded"
            onClick={() => setShowModal(true)}
          >
            <MdAddCircleOutline />
            Add
          </button>
        </div>
        {!data ? (
          <div>loading</div>
        ) : (
          <div className="pt-10 px-3 grid gap-y-4">
            {data &&
              data?.data?.map((item, i) => (
                <div
                  className="shadow w-full flex items-center justify-between hover:scale-105 duration-100 cursor-pointer py-5 "
                  onClick={() => openViewAnnounce(item)}
                  key={i}
                >
                  <div className="flex items-center gap-x-5 ">
                    
                    <div>
                      <h5 className="font-semibold">
                        {" "}
                       {item.role}
                      </h5>
                      
                     
                    </div>
                  </div>
                  <div
                    className="pr-6 flex gap-x-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <p>{dayjs(item.created_at).format("ddd-DD-MM-YYYY")}</p>
                    <RiDeleteBin5Line
                      className="text-xl text-red-600"
                      onClick={() => openDelete(item)}
                    />
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
      <Modal title={"Add"}>
        <AddCareer close={() => setShowModal(false)} refetch={refetch} />
      </Modal>
      <View title="View">
        <ViewCareer
          close={() => setShowModal(false)}
          item={selected}
          openEdit={openEdit}
        />
      </View>
      <Edit title={"Edit"}>
        <EditCareer
          item={selected}
          refetch={refetch}
          close={() => showEdit(false)}
        />
      </Edit>
      <Delete title="" noHead>
        <ReusableModal
          title="Are you sure you want to delete this data?"
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

export default AdminCareer;
