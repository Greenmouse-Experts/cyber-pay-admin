import React, { useState } from "react";
import { toast } from "react-toastify";
import usePostHook from "../../hook/usePost";

const EditBreadCrumb = ({ item, refetch, close }) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(item?.title || "");
  const [subTitle, setSubTitle] = useState(item?.subtitle ||  "");
  const [link, setLink] = useState( item?.link || "")
  const [image, setImage] = useState();
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };
  const { handlePost } = usePostHook();
  const onSuccess = () => {
    setLoading(false);
    refetch();
    toast.success("Banner Updated successfully");
    close();
  };
  const handleSubmit = async () => {
    setLoading(true);
    const fd = new FormData();
    fd.append("title", title);
    fd.append("subtitle", subTitle);
    fd.append("link", link);
    fd.append("breadcrumb_id", item.id);
    if (image) {
      fd.append("image", image);
    }
    handlePost(
      `admin/breadcrumb/update`,
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <label className="text-lg font-medium">Subtitle</label>
        <textarea
          className="border border-gray-400 w-full h-24 mt-2 p-2 rounded"
          onChange={(e) => setSubTitle(e.target.value)}
          value={subTitle}
        />
      </div>
      <div className="mt-4">
        <label className="text-lg font-medium">url-path </label>
        <input
        type="text"
        placeholder="about"
          className="border border-gray-400 w-full h-12 mt-2 p-2 rounded"
          onChange={(e) => setLink(e.target.value)}
          value={link}
        />
      </div>
      <div className="mt-4">
        <img src={item.image} alt="image" className="w-24" />
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
          {loading ? `Updating...` : `Submit`}
        </button>
      </div>
    </>
  );
};

export default EditBreadCrumb;
