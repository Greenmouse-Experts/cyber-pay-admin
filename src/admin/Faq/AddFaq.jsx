import React, { useState } from "react";
import { toast } from "react-toastify";
import usePostHook from "../../hook/usePost";

const AddFaqModal = ({ close, refetch }) => {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const { handlePost } = usePostHook();

  const onSuccess = () => {
    setLoading(false);
    refetch();
    toast.success("FAQ added successfully");
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
    fd.append("answer", answer);
    handlePost(`admin/faqs/post`, fd, `multipart/form-data`, onSuccess);
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
        />
      </div>
      <div className="mt-4">
        <label className="text-lg font-medium">Answer</label>
        <textarea
          type="text"
          className="border border-gray-400 w-full mt-2 p-2 rounded"
          onChange={(e) => setAnswer(e.target.value)}
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

export default AddFaqModal;
