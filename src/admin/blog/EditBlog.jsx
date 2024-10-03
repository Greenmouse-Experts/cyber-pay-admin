import React, { useState } from "react";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import usePostHook from "../../hook/usePost";
import useGetHook from "../../hook/useGet";

const EditBlog = ({ item, close, refetch }) => {
  const { data } = useGetHook(`admin/banks`);
  const [loading, setLoading] = useState(false);
  
  const [title, setTitle] = useState(item.title || "");
  const [description, setDescription] = useState(item.description || "");
  const [photo, setPhoto] = useState("");
  const [scheduledAt, setScheduledAt] = useState(item.scheduled_at || ""); // initialize scheduled_at

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const { handlePost } = usePostHook();
  const onSuccess = () => {
    setLoading(false);
    refetch();
    toast.success("Post updated successfully");
    close();
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    const fd = new FormData();
    fd.append("post_id", item.id);
    fd.append("title", title);
    fd.append("description", description);
    fd.append("image", photo);
    fd.append("scheduled_at", scheduledAt); // append scheduled_at

    handlePost(`admin/blog/update`, fd, `multipart/form-data`, onSuccess);
  };

  return (
    <>
      <div>
        <label className="text-lg font-medium">Title</label>
        <input
          type="text"
          className="border border-gray-400 w-full mt-2 p-2 rounded"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="text-lg font-medium">Description</label>
        <ReactQuill
          theme="snow"
          value={description}
          onChange={setDescription}
          className={"h-32"}
        />
      </div>

      <div className="mt-14">
        <label className="text-lg font-medium">Image</label>
        <input
          type="file"
          accept="image/*"
          placeholder="Add Photo"
          onChange={handlePhotoChange}
        />
      </div>

      <div className="mt-12">
        <label className="text-lg font-medium">Schedule At</label>
        <input
          type="datetime-local"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
          className="border border-gray-400 w-full mt-2 p-2 rounded"
        />
      </div>

      <div className="mt-8">
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-3 bg-[#291670] font-semibold text-lg rounded text-white"
        >
          {loading ? `Submitting...` : `Submit`}
        </button>
      </div>
    </>
  );
};

export default EditBlog;
