import axios from "axios";
import { toast } from "react-toastify";

export const HandleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    var err = error.response;
    if (Array.isArray(err)) {
      for (let val of err) {
        toast.warning(val.description);
      }
    } else if (typeof err?.data.errors === "object") {
      for (let e in err?.data.errors) {
        toast.warning(err.data.errors[e][0]);
      }
    } else if (err?.status == 401) {
        toast.warning("Please Login")
        window.history.pushState({}, "/login")
    } 
    else if (err?.data) {
      toast.warning(err.data);
    } 
  }
};
