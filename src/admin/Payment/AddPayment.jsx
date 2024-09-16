import React, { useState, useEffect } from "react";
import usePostHook from "../../hook/usePost";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddPayment = ({ close, refetch, item }) => {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [setFirstContent, setSetFirstContent] = useState([
    { question: "", answer: "" },
  ]);

  useEffect(() => {
    if (item) {
      setDescription(item.setDescription || "");
      setImagePreview(item.setImage || "");
      setSetFirstContent(
        JSON.parse(item.setContent) || [{ title: "", description: "" }]
      );
    }
  }, [item]);

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFirstContentChange = (index, field, value) => {
    const updatedContent = [...setFirstContent];
    updatedContent[index][field] = value;
    setSetFirstContent(updatedContent);
  };

  const addFirstContent = () => {
    setSetFirstContent([...setFirstContent, { title: "", description: "" }]);
  };

  const removeFirstContent = (index) => {
    const updatedContent = setFirstContent.filter((_, i) => i !== index);
    setSetFirstContent(updatedContent);
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

    // Append additional fields
    fd.append("setContent", JSON.stringify(setFirstContent));

    handlePost(`admin/payment`, fd, `multipart/form-data`, onSuccess);
  };

  return (
    <>
      <div>
        <img src={imagePreview} alt="" className="h-32 w-32" />
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

      {/* First Content Section */}
      <div className="mt-4">
        <label className="text-lg font-medium">SetContent</label>
        {setFirstContent &&
          setFirstContent.map((content, index) => (
            <div key={index} className="mt-2">
              {/* <textarea
                type="text"
                placeholder="Title"
                value={content.title}
                onChange={(e) =>
                  handleFirstContentChange(index, "title", e.target.value)
                }
                className="border border-gray-400 w-full p-2 rounded mb-2"
              /> */}
              <ReactQuill
                theme="snow"
                value={content.description}
                onChange={(value) =>
                  handleFirstContentChange(index, "description", value)
                }
              />
              <button
                onClick={() => removeFirstContent(index)}
                className="mt-2 bg-red-500 text-white p-2 rounded"
              >
                Remove Content
              </button>
            </div>
          ))}
        <button
          onClick={addFirstContent}
          className="mt-2 bg-gray-300 p-2 rounded"
        >
          Add Content
        </button>
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

export default AddPayment;
