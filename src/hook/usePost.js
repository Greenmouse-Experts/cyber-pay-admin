import { useCallback,  } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const usePostHook = () => {
    const handlePost = useCallback(async(url, payload, type, success) => {
      try {
        const config = {
          headers: {
            "Content-Type": type,
            authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        };
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/${url}`,payload, config);
        success()
      } catch (error) {
          Object.entries(error?.response?.data?.errors).forEach(([key, value]) => {
            toast.error(value[0]);
          });}
      }
    }, [])
    return {handlePost}
};
export default usePostHook;
