import React, { useState, useEffect } from "react";
import usePostHook from "../../hook/usePost";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddBulkSms = ({ close, refetch, item }) => {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // State for additional fields
  const [setFirstContent, setSetFirstContent] = useState([
    { question: "", answer: "" },
  ]);
  const [setSecondContent, setSetSecondContent] = useState([
    { title: "", description: "" },
  ]);

  useEffect(() => {
    if (item) {
      setDescription(item.setDescription || "");
      setImagePreview(item.setImage || "");
      setSetFirstContent(JSON.parse(item.setFirstContent ) || [{ question: "", answer: "" }]);
      setSetSecondContent( JSON.parse(item.setSecondContent) || [{ title: "", description: "" }]);
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

  const handleSecondContentChange = (index, field, value) => {
    const updatedContent = [...setSecondContent];
    updatedContent[index][field] = value;
    setSetSecondContent(updatedContent);
  };

  const addFirstContent = () => {
    setSetFirstContent([...setFirstContent, { question: "", answer: "" }]);
  };

  const addSecondContent = () => {
    setSetSecondContent([...setSecondContent, { title: "", description: "" }]);
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
    fd.append("setFirstContent", JSON.stringify(setFirstContent));
    fd.append("setSecondContent", JSON.stringify(setSecondContent));

    handlePost(`admin/bulk/sms`, fd, `multipart/form-data`, onSuccess);
  };

  console.log(setFirstContent)

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
          className="h-32"
        />
      </div>

      {/* First Content Section */}
      <div className="mt-4">
        <label className="text-lg font-medium">First Content</label>
        { setFirstContent && setFirstContent?.map((content, index) => (
          <div key={index} className="mt-2">
            <input
              type="text"
              placeholder="Question"
              value={content.question}
              onChange={(e) => handleFirstContentChange(index, "question", e.target.value)}
              className="border border-gray-400 w-full p-2 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Answer"
              value={content.answer}
              onChange={(e) => handleFirstContentChange(index, "answer", e.target.value)}
              className="border border-gray-400 w-full p-2 rounded"
            />
          </div>
        ))}
        <button onClick={addFirstContent} className="mt-2 bg-gray-300 p-2 rounded">
          Add First Content
        </button>
      </div>

      {/* Second Content Section */}
      <div className="mt-4">
        <label className="text-lg font-medium">Second Content</label>
        {setSecondContent.map((content, index) => (
          <div key={index} className="mt-2">
            <input
              type="text"
              placeholder="Title"
              value={content.title}
              onChange={(e) => handleSecondContentChange(index, "title", e.target.value)}
              className="border border-gray-400 w-full p-2 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Description"
              value={content.description}
              onChange={(e) => handleSecondContentChange(index, "description", e.target.value)}
              className="border border-gray-400 w-full p-2 rounded"
            />
          </div>
        ))}
        <button onClick={addSecondContent} className="mt-2 bg-gray-300 p-2 rounded">
          Add Second Content
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

export default AddBulkSms;
