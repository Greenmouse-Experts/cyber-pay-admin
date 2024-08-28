import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoClose } from "react-icons/io5";
import { ThreeDots } from "react-loader-spinner";
import useGetHook from "../hook/useGet";
import usePostHook from "../hook/usePost";

const AddSubAdmin = ({ onClose, refetch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { handlePost } = usePostHook();

  const [programData, setProgramData] = useState({
    
    name: "",
    email:"",
    role:"sub-admin"
    
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setProgramData({ ...programData, [name]: value });
  };

  const handleFileInput = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setProgramData({ ...programData, [name]: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };


  const isValidate = () => {
    let isProceed = true;
    let errorMessages = "";

    const today = new Date().toISOString().split("T")[0];

    if (
      programData.name === "" ||
      programData.email === "" 
    ) {
      isProceed = false;
      errorMessages += "Please fill all inputs. ";
    }

  

    if (!isProceed) {
      toast.error(errorMessages);
    }

    return isProceed;
  };

  const onSuccess = () => {
    setIsLoading(false);
    refetch();
    toast.success("Sub Admin added successfully");
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValidate()) {
      setIsLoading(true);

      const fd = new FormData();
      Object.entries(programData).forEach(([key, value]) => {
        fd.append(key, value);
      });

      handlePost(`admin/sub-admin/create`, fd, "application/json", onSuccess);
    }
  };

  return (
    <div className="add_member bg-white max-h-[90vh] overflow-y-auto">
      <div className="add_head">
        <p>Add Sub Admin</p>
        <span onClick={onClose}>
          <IoClose />
        </span>
      </div>
      <form onSubmit={handleSubmit} className="add_mem">
        <div className="double">
          <div className="input_log">
            <label htmlFor="name">Name</label>
            <div className="input-group">
              <input
                placeholder="Enter Name"
                id="name"
                name="name"
                type="text"
                value={programData.name}
                onChange={handleInput}
              />
            </div>
          </div>

          <div className="input_log">
            <label htmlFor="name">Email</label>
            <div className="input-group">
              <input
                placeholder="Enter Email"
                id="email"
                name="email"
                type="email"
                value={programData.email}
                onChange={handleInput}
              />
            </div>
          </div>
         
        </div>
       
       
       
       
        {isLoading ? (
          <div className="dotss">
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#4fa94d"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </div>
        ) : (
          <button className="add_btn" type="submit" disabled={isLoading}>
            Add Admin
          </button>
        )}
      </form>
    </div>
  );
};

export default AddSubAdmin;
