import React, { useState, useEffect } from "react";
import usePostHook from "../../hook/usePost";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddOnlinePayment = ({ close, refetch, item }) => {
  const [loading, setLoading] = useState(false);

  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  

  useEffect(() => {
    if (item) {
      setDescription(item.setDescription || "");
     setImagePreview(item.setImage || "")
    }
  }, [item]);

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const { handlePost } = usePostHook();

  const onSuccess = () => {
    setLoading(false);
    refetch();
    toast.success("Data updated successfully");
    close();
  };

 

  const handleSubmit = async () => {
    setLoading(true);
    const fd = new FormData();
    fd.append("setDescription", description);
   
    if (image) {
      fd.append("setImage", image);
    }

    handlePost(
      `admin/payment/link`,
      fd,
      `multipart/form-data`,
      onSuccess
    );
  };

  return (
    <>
    <div>
      <img src={imagePreview} alt="" className="h-32 w-32"/>
    </div>
     <div className="mt-4">
        <label className="text-lg font-medium">Image</label>
        <input
          type="file"
          accept="image/*"
          className="border border-gray-400 w-full p-2 rounded"
         
          onChange={handleImage}
        />
      </div>
      <div className="mt-4 mb-12">
        <label className="text-lg font-medium">Title</label>
        <ReactQuill
          theme="snow"
          value={description}
          onChange={setDescription}
        
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

export default AddOnlinePayment;
