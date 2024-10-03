import React, { useState } from "react";
import usePostHook from "../../hook/usePost";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

const AddBlog = ({ close, refetch }) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // initialize as null
  const [scheduledAt, setScheduledAt] = useState(""); // state for scheduled_at

  const { handlePost } = usePostHook();

  const onSuccess = () => {
    setLoading(false);
    refetch();
    toast.success("Post added successfully");
    close();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    fd.append("image", image);
    fd.append("scheduled_at", scheduledAt); // append scheduled_at to FormData

    handlePost(`admin/blog/post`, fd, `multipart/form-data`, onSuccess);
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
          
        />
      </div>

      <div className="mt-12">
        <label className="text-lg font-medium">Image</label>
        <input
          type="file"
          accept="image/*"
          placeholder="Add Image"
          onChange={handleImageChange}
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

export default AddBlog;
