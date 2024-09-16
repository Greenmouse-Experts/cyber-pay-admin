import React, { useState, useEffect } from "react";
import usePostHook from "../../hook/usePost";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddPolicy = ({ close, refetch, item }) => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState([{ title: "", description: "" }]);

  useEffect(() => {
    if (item) {
      setContent(
        item.content
          ? JSON.parse(item.content) // Ensure valid JSON content
          : [{ title: "", description: "" }]
      );
    }
  }, [item]);

  const { handlePost } = usePostHook();

  const onSuccess = () => {
    setLoading(false);
    refetch();
    toast.success("Data updated successfully");
    close();
  };

  const handleAddField = (setState, values) => {
    setState([...values, { title: "", description: "" }]);
  };

  const handleUpdateField = (index, key, newValue, setState, values) => {
    const updatedValues = [...values];
    updatedValues[index][key] = newValue;
    setState(updatedValues);
  };

  const handleRemoveField = (index, setState, values) => {
    const updatedValues = values.filter((_, i) => i !== index);
    setState(updatedValues);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const fd = new FormData();
    fd.append("content", JSON.stringify(content));
    handlePost(`admin/term/condition`, fd, `multipart/form-data`, onSuccess);
  };

  return (
    <>
      {content.map((item, index) => (
        <div key={index} className="mt-2">
          <textarea
            type="text"
            className="border border-gray-400 w-full p-2 rounded"
            value={item.title}
            placeholder="Item Title"
            onChange={(e) =>
              handleUpdateField(index, "title", e.target.value, setContent, content)
            }
          />
          <div className="mt-4 mb-12">
            <label className="text-lg font-medium">Description</label>
            <ReactQuill
              theme="snow"
              value={item.description}
              placeholder="Item Description"
              onChange={(newValue) =>
                handleUpdateField(index, "description", newValue, setContent, content)
              }
            
            />
          </div>

          <button
            type="button"
            onClick={() => handleRemoveField(index, setContent, content)}
            className="text-red-500 mt-2"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => handleAddField(setContent, content)}
        className="text-blue-500 mt-2"
      >
        Submit
      </button>

      <div className="mt-4">
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

export default AddPolicy;
