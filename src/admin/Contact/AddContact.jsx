import React, { useState } from "react";
import usePostHook from "../../hook/usePost";
import { toast } from "react-toastify";

const AddContact = ({ close, refetch, item }) => {
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState(item.addresses || [""]);
  const [phones, setPhones] = useState(item.phones || [""]);
  const [emails, setEmails] = useState(item.emails|| [""]);

  const { handlePost } = usePostHook();
  
  const onSuccess = () => {
    setLoading(false);
    refetch();
    toast.success("Office record updated successfully");
    close();
  };

  const handleAddField = (setState, values) => {
    setState([...values, '']);
  };

  const handleUpdateField = (index, newValue, setState, values) => {
    const updatedValues = [...values];
    updatedValues[index] = newValue;
    setState(updatedValues);
  };

  const handleRemoveField = (index, setState, values) => {
    const updatedValues = values.filter((_, i) => i !== index);
    setState(updatedValues);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const fd = new FormData();
    addresses.forEach((address, index) => fd.append(`addresses[${index}]`, address));
    phones.forEach((phone, index) => fd.append(`phones[${index}]`, phone));
    emails.forEach((email, index) => fd.append(`emails[${index}]`, email));

    handlePost(
      `admin/office`,
      fd,
      `multipart/form-data`,
      onSuccess
    );
  };

  return (
    <>
     

      <div className="mt-4">
        <h3 className="text-lg font-medium">Addresses</h3>
        {addresses.map((address, index) => (
          <div key={index} className="mt-2">
            <textarea
              type="text"
              className="border border-gray-400 w-full p-2 rounded"
              value={address}
              onChange={(e) => handleUpdateField(index, e.target.value, setAddresses, addresses)}
            />
            <button
              type="button"
              onClick={() => handleRemoveField(index, setAddresses, addresses)}
              className="text-red-500 mt-2"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddField(setAddresses, addresses)}
          className="text-blue-500 mt-2"
        >
          Add Address
        </button>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-medium">Phones</h3>
        {phones.map((phone, index) => (
          <div key={index} className="mt-2">
            <input
              type="tel"
              className="border border-gray-400 w-full p-2 rounded"
              value={phone}
              onChange={(e) => handleUpdateField(index, e.target.value, setPhones, phones)}
            />
            <button
              type="button"
              onClick={() => handleRemoveField(index, setPhones, phones)}
              className="text-red-500 mt-2"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddField(setPhones, phones)}
          className="text-blue-500 mt-2"
        >
          Add Phone
        </button>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-medium">Emails</h3>
        {emails.map((email, index) => (
          <div key={index} className="mt-2">
            <input
              type="email"
              className="border border-gray-400 w-full p-2 rounded"
              value={email}
              onChange={(e) => handleUpdateField(index, e.target.value, setEmails, emails)}
            />
            <button
              type="button"
              onClick={() => handleRemoveField(index, setEmails, emails)}
              className="text-red-500 mt-2"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddField(setEmails, emails)}
          className="text-blue-500 mt-2"
        >
          Add Email
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

export default AddContact;
