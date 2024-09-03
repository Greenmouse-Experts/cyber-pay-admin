import React, { useState } from "react";
import usePostHook from "../../hook/usePost";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

const AddBlog = ({ close, refetch }) => {
  
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setimage] = useState(null); // initialize as null

  const { handlePost } = usePostHook();
  const onSuccess = () => {
    setLoading(false);
    refetch();
    toast.success("Post added successfully");
    close();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setimage(file)
    // const reader = new FileReader();
    // reader.onloadend = () => {
    //   setimage(reader.result); // this will be a base64 string
    // };
    // reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    setLoading(true);

    // const payload = {
     
    //   title,
    //   description,
    //   image, // image is now a base64 string
    // };
 const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    fd.append("image", image);
    handlePost(`admin/blog/post`, fd,   `multipart/form-data`, onSuccess);
  };

  return (
    <>
      {/* <div>
        <label className="text-lg font-medium"> Name</label>
        <input
          type="text"
          className="border border-gray-400 w-full mt-2 p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div> */}
      <div>
        <label className="text-lg font-medium"> Title</label>
        <input
          type="text"
          className="border border-gray-400 w-full mt-2 p-2 rounded"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label className="text-lg font-medium">description</label>
        {/* <textarea
          className="border border-gray-400 w-full mt-2 p-2 rounded"
          name=""
          id=""
          cols="30"
          rows="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea> */}
         <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription} 
            className={"h-32"}
          />
      </div>
      <div className="mt-12">
        <label className="text-lg font-medium">image</label>
        <input
          type="file"
          accept="image/*"
          placeholder="add image"
          onChange={handleImageChange}
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
