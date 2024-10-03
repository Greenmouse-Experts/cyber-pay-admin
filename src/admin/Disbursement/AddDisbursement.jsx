import React, { useState, useEffect } from "react";
import usePostHook from "../../hook/usePost";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddDisbursement = ({ close, refetch, item }) => {
  const [loading, setLoading] = useState(false);
  const [setTitle, setSetTitle] = useState(""); // New field for setTitle
  const [setDescription, setSetDescription] = useState(""); // New field for setDescription
  const [setContents, setSetContents] = useState([
    { title: "", description: "", image: null },
  ]);

  useEffect(() => {
    if (item) {
      setSetTitle(item.setTitle || ""); // Set existing setTitle if available
      setSetDescription(item.setDescription || ""); // Set existing setDescription if available
      setSetContents(
        JSON.parse(item.setContent) || [{ title: "", description: "", image: null }]
      );
    }
  }, [item]);

  const handleImageChange = (index, file) => {
    const updatedContents = [...setContents];
    updatedContents[index].image = file;
    setSetContents(updatedContents);
  };

  const handleContentChange = (index, field, value) => {
    const updatedContents = [...setContents];
    updatedContents[index][field] = value;
    setSetContents(updatedContents);
  };

  const addContent = () => {
    setSetContents([...setContents, { title: "", description: "", image: null }]);
  };

  const removeContent = (index) => {
    const updatedContents = setContents.filter((_, i) => i !== index);
    setSetContents(updatedContents);
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
    fd.append("setTitle", setTitle); // Append setTitle field
    fd.append("setDescription", setDescription); // Append setDescription field

    // Append each setContent fields (image, title, and description)
    setContents.forEach((content, index) => {
      if (content.image) {
        fd.append(`setContent[${index}][image]`, content.image);
      }
      fd.append(`setContent[${index}][title]`, content.title);
      fd.append(`setContent[${index}][description]`, content.description);
    });

    handlePost(`admin/disbursement`, fd, `multipart/form-data`, onSuccess);
  };

  return (
    <>
      {/* SetTitle Field */}
      <div className="mt-4">
        <label className="text-lg font-medium">Set Title</label>
        <input
          type="text"
          value={setTitle}
          onChange={(e) => setSetTitle(e.target.value)}
          className="border border-gray-400 w-full p-2 rounded mb-4"
        />
      </div>

      {/* SetDescription Field */}
      <div className="mt-4">
        <label className="text-lg font-medium">Set Description</label>
        <ReactQuill
          theme="snow"
          value={setDescription}
          onChange={setSetDescription}
          className="h-32 mb-4"
        />
      </div>

      {/* SetContent Section */}
      <div className="mt-4">
        <label className="text-lg font-medium">SetContent</label>
        {setContents.map((content, index) => (
          <div key={index} className="mt-2">
            {/* Title Input */}
            <input
              type="text"
              placeholder="Title"
              value={content.title}
              onChange={(e) => handleContentChange(index, "title", e.target.value)}
              className="border border-gray-400 w-full p-2 rounded mb-2"
            />

            {/* Description Editor */}
            <ReactQuill
              theme="snow"
              value={content.description}
              onChange={(value) =>
                handleContentChange(index, "description", value)
              }
              className=" mb-2"
            />

            {/* Image Input */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(index, e.target.files[0])}
              className="border border-gray-400 w-full p-2 rounded"
            />

            {/* Remove Content Button */}
            <button
              onClick={() => removeContent(index)}
              className="mt-2 bg-red-500 text-white p-2 rounded"
            >
              Remove Content
            </button>
          </div>
        ))}

        {/* Add Content Button */}
        <button onClick={addContent} className="mt-4 bg-gray-300 p-2 rounded">
          Add Content
        </button>
      </div>

      {/* Submit Button */}
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

export default AddDisbursement;
