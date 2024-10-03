import React, { useState } from "react";
import usePostHook from "../../hook/usePost";
import { toast } from "react-toastify";

const AddAdvert = ({ close, refetch }) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [scheduledAt, setScheduledAt] = useState(""); // new state for scheduled_at

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const { handlePost } = usePostHook();
  const onSuccess = () => {
    setLoading(false);
    refetch();
    toast.success("Ads added successfully");
    close();
  };

  const handleSubmit = async () => {
    setLoading(true);
    const fd = new FormData();
    // fd.append("title", title);
    // fd.append("description", body);
    fd.append("image", image);
    fd.append("scheduled_at", scheduledAt); // append scheduled_at to FormData

    handlePost(
      `admin/ads/banner/post`,
      fd,
      `multipart/form-data`,
      onSuccess
    );
  };

  return (
    <>
      <div className="mt-4">
        <label className="text-lg font-medium w-full">
          Ads Image <span className="text-sm">(less than 1mb)</span>
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="border border-gray-400 w-full mt-2 p-2 rounded"
        />
      </div>

      <div className="mt-4">
        <label className="text-lg font-medium w-full">Schedule At</label>
        <input
          type="datetime-local"
          onChange={(e) => setScheduledAt(e.target.value)}
          className="border border-gray-400 w-full mt-2 p-2 rounded"
        />
      </div>

      <div className="mt-8">
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-3 bg-[#042e46] font-semibold text-lg rounded text-white"
        >
          {loading ? `Submitting...` : `Submit`}
        </button>
      </div>
    </>
  );
};

export default AddAdvert;
