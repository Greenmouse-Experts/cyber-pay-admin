import React, { useState } from "react";
import { toast } from "react-toastify";
import usePostHook from "../../hook/usePost";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditFaqModal = ({ item, close, refetch }) => {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(item.type || "");
  const [question, setQuestion] = useState(item.question || "");
  const [answer, setAnswer] = useState(item.answer || ""); // state for ReactQuill
  const { handlePost } = usePostHook();

  const onSuccess = () => {
    setLoading(false);
    refetch();
    toast.success("FAQ updated successfully");
    close();
  };

  const handleSubmit = async () => {
    if (!type || !question || !answer) {
      toast.error("Please fill out all fields");
      return;
    }

    setLoading(true);
    const fd = new FormData();
    fd.append("type", type);
    fd.append("question", question);
    fd.append("answer", answer); // append the updated ReactQuill answer content
    fd.append("faq_id", item.id);
    handlePost(`admin/faqs/update`, fd, `multipart/form-data`, onSuccess);
  };

  return (
    <>
      <div>
        <label className="text-lg font-medium">Type</label>
        <div className="flex gap-5 items-center">
          <label className="cursor-pointer flex items-center">
            <input
              type="radio"
              value="general"
              name="type"
              checked={type === "general"}
              onChange={(e) => setType(e.target.value)}
              className="w-5 h-5 m-3 cursor-pointer"
            />
            General
          </label>
          <label className="cursor-pointer flex items-center">
            <input
              type="radio"
              value="security"
              name="type"
              checked={type === "security"}
              onChange={(e) => setType(e.target.value)}
              className="w-5 h-5 m-3 cursor-pointer"
            />
            Security
          </label>
        </div>
      </div>
      <div className="mt-4">
        <label className="text-lg font-medium">Question</label>
        <textarea
          type="text"
          className="border border-gray-400 w-full mt-2 p-2 rounded"
          onChange={(e) => setQuestion(e.target.value)}
          value={question}
        />
      </div>
      <div className="mt-4">
        <label className="text-lg font-medium">Answer</label>
        {/* ReactQuill for the answer field */}
        <ReactQuill
          theme="snow"
          value={answer}
          onChange={setAnswer} // update state on change
        
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

export default EditFaqModal;
