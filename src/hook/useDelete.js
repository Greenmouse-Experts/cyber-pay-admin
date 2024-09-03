import { useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useDelete = () => {
  const handleDelete = useCallback(async (url, payload, type, success) => {
    try {
      const token = localStorage.getItem("cyber_token");
      if (!token) {
        toast.error("Unauthorized: No token provided.");
        return;
      }

      const config = {
        headers: {
          "Content-Type": type,
          Authorization: `Bearer ${token}`,
        },
        data: payload,
      };
     

      const res = await axios.delete(`${process.env.REACT_APP_API_URL}/${url}`, config);
      success();
    } catch (error) {
      if (error?.response?.data?.errors) {
        Object.entries(error?.response?.data?.errors).forEach(
          ([key, value]) => {
            toast.error(value[0]);
          }
        );
      } else {
        toast.error(error.message);
      }
    }
  }, []);

  return { handleDelete };
};

export default useDelete;
