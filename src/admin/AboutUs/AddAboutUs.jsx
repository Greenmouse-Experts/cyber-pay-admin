import React, { useEffect, useState } from "react";
import usePostHook from "../../hook/usePost";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddAbout = ({ close, refetch, item }) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [caption, setCaption] = useState("");
  const [quickFacts, setQuickFacts] = useState("");
  const [visionTitle, setVisionTitle] = useState("");
  const [visionDescription, setVisionDescription] = useState("");
  const [missionTitle, setMissionTitle] = useState("");
  const [missionDescription, setMissionDescription] = useState("");
  const [image, setImage] = useState(null); // For image upload

  useEffect(() => {
    if (item) {
      setTitle(item.title || "");
      setDescription(item.description || "");
      setCaption(item.caption || "");
      setQuickFacts(item.quick_facts || "");
      setVisionTitle(item.vision_title || "");
      setVisionDescription(item.vision_description || "");
      setMissionTitle(item.mission_title || "");
      setMissionDescription(item.mission_description || "");
      setImage(item.image_url || null);
    }
  }, [item]);
 
  const { handlePost } = usePostHook();

  const onSuccess = () => {
    setLoading(false);
    refetch();
    toast.success("Added successfully");
    close();
  };

  const handleSubmit = async () => {
    setLoading(true);
    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    fd.append("caption", caption);
    fd.append("quick_facts", quickFacts);
    fd.append("vision_title", visionTitle);
    fd.append("vision_description", visionDescription);
    fd.append("mission_title", missionTitle);
    fd.append("mission_description", missionDescription);
    if (image) {
      fd.append("image", image);
    }

    handlePost(
      `admin/about`,
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
          className="border border-gray-400 w-full mt-2 p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <label className="text-lg font-medium">Description</label>
        <ReactQuill
          value={description}
          onChange={setDescription}
          className="border border-gray-400 w-full mt-2 p-2 rounded"
        />
      </div>

      <div className="mt-4">
        <label className="text-lg font-medium">Caption</label>
        <textarea
          className="border border-gray-400 w-full mt-2 p-2 rounded"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <label className="text-lg font-medium">Quick Facts</label>
        <ReactQuill
          value={quickFacts}
          onChange={setQuickFacts}
          className="border border-gray-400 w-full mt-2 p-2 rounded"
        />
      </div>

      <div className="mt-4">
        <label className="text-lg font-medium">Vision Title</label>
        <textarea
          className="border border-gray-400 w-full mt-2 p-2 rounded"
          value={visionTitle}
          onChange={(e) => setVisionTitle(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <label className="text-lg font-medium">Vision Description</label>
        <ReactQuill
          value={visionDescription}
          onChange={setVisionDescription}
          className="border border-gray-400 w-full mt-2 p-2 rounded"
        />
      </div>

      <div className="mt-4">
        <label className="text-lg font-medium">Mission Title</label>
        <textarea
          className="border border-gray-400 w-full mt-2 p-2 rounded"
          value={missionTitle}
          onChange={(e) => setMissionTitle(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <label className="text-lg font-medium">Mission Description</label>
        <ReactQuill
          value={missionDescription}
          onChange={setMissionDescription}
          className="border border-gray-400 w-full mt-2 p-2 rounded"
        />
      </div>

      <div className="mt-4">
        <label className="text-lg font-medium">Image</label>
        <input
          type="file"
          className="border border-gray-400 w-full mt-2 p-2 rounded"
          onChange={(e) => setImage(e.target.files[0])}
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

export default AddAbout;
