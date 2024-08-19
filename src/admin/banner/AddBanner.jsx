import React, { useState } from "react";
import usePostHook from "../../hook/usePost";
import { toast } from "react-toastify";

const AddBanner = ({ close, refetch }) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };
  const { handlePost } = usePostHook();
  const onSuccess = () => {
    setLoading(false);
    refetch();
    toast.success("Banner added successfully");
    close();
  };
  const handleSubmit = async () => {
    setLoading(true);
    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", body);
    fd.append("image", image);
    handlePost(
      `admin/banner/post`,
      fd,
      `multipart/form-data`,
      onSuccess
    );
  };
  return (
    <>
      <div>
        <label className="text-lg font-medium">Title</label>
        <textarea
          type="text"
          className="border border-gray-400 w-full mt-2 p-2 rounded"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <label className="text-lg font-medium">Description</label>
        <textarea
          className="border border-gray-400 w-full h-24 mt-2 p-2 rounded"
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <label className="text-lg font-medium w-full">Image Cover</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="border border-gray-400 w-full mt-2 p-2 rounded"
        />
      </div>
      <div className="mt-8">
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-3 bg-[#042e46] font-semibold text-lg rounded text-white"
        >
          {loading ? `Submiting...` : `Submit`}
        </button>
      </div>
    </>
  );
};

export default AddBanner;
