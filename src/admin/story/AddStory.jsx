import React, { useState } from "react";
import usePostHook from "../../hook/usePost";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddStory = ({ close, refetch }) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");


  const { handlePost } = usePostHook();
  const onSuccess = () => {
    setLoading(false);
    refetch();
    toast.success(" Added successfully");
    close();
  };
  const handleSubmit = async () => {
    setLoading(true);
    const fd = new FormData();
    fd.append("title", title);
    fd.append("subtitle", subtitle);
    
   
    handlePost(
      `admin/story/post`,
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
      <div className="mt-4 mb-12">
        <label className="text-lg font-medium">Text </label>
        <ReactQuill
            theme="snow"
            value={subtitle}
            onChange={setSubtitle} 
           
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

export default AddStory;
