import { useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const usePostRead = () => {
  const handlePost = useCallback(async (url, type, success) => {
    try {
      const config = {
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/${url}`,
        headers: {
          "Content-Type": type,
          authorization: `Bearer ${localStorage.getItem("cyber_token")}`,
        },
      };
      const res = await axios(config);
      success();
    } catch (error) {
      Object.entries(error.response.data.errors).forEach(([key, value]) => {
        toast.error(value[0]);
      });
    }
  }, []);
  return { handlePost };
};

export default usePostRead;
