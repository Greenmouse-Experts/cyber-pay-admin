import React, { useState, useEffect } from "react";
import usePostHook from "../../hook/usePost";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddWhyCyberPay = ({ close, refetch, item }) => {
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [description, setDescription] = useState("");
  const [benefitCaption, setBenefitCaption] = useState("");
  const [benefitList, setBenefitList] = useState([{ title: '', description: '' }]);
  const [why_us, setWhyUs] = useState("");
  const [benefitMerchantCaption, setBenefitMerchantCaption] = useState("");
  const [benefitMerchantList, setBenefitMerchantList] = useState([{ title: '', description: '' }]);

  useEffect(() => {
    if (item) {
      setTitle(item.title || "");
      setSubtitle(item.subtitle || "");
      setCaption(item.caption || "");
      setDescription(item.description || "");
      setBenefitCaption(item.benefitCaption || "");
      setBenefitList(item.benefitList ? JSON.parse(item.benefitList) : [{ title: '', description: '' }]);
      setWhyUs(item.why_us || "");
      setBenefitMerchantCaption(item.benefitMerchantCaption || "");
      setBenefitMerchantList(item.benefitMerchantList ? JSON.parse(item.benefitMerchantList) : [{ title: '', description: '' }]);
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

  const handleAddField = (setState, values) => {
    setState([...values, { title: '', description: '' }]);
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
    fd.append("title", title);
    fd.append("subtitle", subtitle);
    fd.append("caption", caption);
    fd.append("description", description);
    fd.append("benefitCaption", benefitCaption);
    fd.append("benefitList", JSON.stringify(benefitList));
    fd.append("why_us", why_us);
    fd.append("benefitMerchantCaption", benefitMerchantCaption);
    fd.append("benefitMerchantList", JSON.stringify(benefitMerchantList));
    if (image) {
      fd.append("image_url", image);
    }

    handlePost(
      `admin/why`,
      fd,
      `multipart/form-data`,
      onSuccess
    );
  };

  return (
    <>
      <div className="mt-4 mb-12">
        <label className="text-lg font-medium">Title</label>
        <ReactQuill
          theme="snow"
          value={title}
          onChange={setTitle}
          className="h-32"
        />
      </div>

      <div className="mt-4">
        <label className="text-lg font-medium">Image</label>
        <input
          type="file"
          className="border border-gray-400 w-full p-2 rounded"
         
          onChange={handleImage}
        />
      </div>
      <div className="mt-4">
        <label className="text-lg font-medium">Subtitle</label>
        <input
          type="text"
          className="border border-gray-400 w-full p-2 rounded"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <label className="text-lg font-medium">Caption</label>
        <input
          type="text"
          className="border border-gray-400 w-full p-2 rounded"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <label className="text-lg font-medium">Description</label>
        <textarea
          type="text"
          className="border border-gray-400 w-full p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <label className="text-lg font-medium">Benefits to Customers</label>
        <input
          type="text"
          className="border border-gray-400 w-full p-2 rounded"
          value={benefitCaption}
          onChange={(e) => setBenefitCaption(e.target.value)}
        />
        {benefitList.map((benefit, index) => (
          <div key={index} className="mt-2">
            <input
              type="text"
              className="border border-gray-400 w-full p-2 rounded"
              value={benefit.title}
              placeholder="Benefit Title"
              onChange={(e) => handleUpdateField(index, 'title', e.target.value, setBenefitList, benefitList)}
            />
            <textarea
              className="border border-gray-400 w-full p-2 rounded mt-2"
              value={benefit.description}
              placeholder="Benefit Description"
              onChange={(e) => handleUpdateField(index, 'description', e.target.value, setBenefitList, benefitList)}
            />
            <button
              type="button"
              onClick={() => handleRemoveField(index, setBenefitList, benefitList)}
              className="text-red-500 mt-2"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddField(setBenefitList, benefitList)}
          className="text-blue-500 mt-2"
        >
          Add Benefit
        </button>
      </div>

      <div className="mt-4 mb-12">
        <label className="text-lg font-medium">Why Us?</label>
        <ReactQuill
          theme="snow"
          value={why_us}
          onChange={setWhyUs}
          className="h-32"
        />
      </div>

      <div className="mt-4">
        <label className="text-lg font-medium">Benefits to Merchants</label>
        <input
          type="text"
          className="border border-gray-400 w-full p-2 rounded"
          value={benefitMerchantCaption}
          onChange={(e) => setBenefitMerchantCaption(e.target.value)}
        />
        {benefitMerchantList.map((benefit, index) => (
          <div key={index} className="mt-2">
            <input
              type="text"
              className="border border-gray-400 w-full p-2 rounded"
              value={benefit.title}
              placeholder="Merchant Benefit Title"
              onChange={(e) => handleUpdateField(index, 'title', e.target.value, setBenefitMerchantList, benefitMerchantList)}
            />
            <textarea
              className="border border-gray-400 w-full p-2 rounded mt-2"
              value={benefit.description}
              placeholder="Merchant Benefit Description"
              onChange={(e) => handleUpdateField(index, 'description', e.target.value, setBenefitMerchantList, benefitMerchantList)}
            />
            <button
              type="button"
              onClick={() => handleRemoveField(index, setBenefitMerchantList, benefitMerchantList)}
              className="text-red-500 mt-2"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddField(setBenefitMerchantList, benefitMerchantList)}
          className="text-blue-500 mt-2"
        >
          Add Merchant Benefit
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

export default AddWhyCyberPay;
