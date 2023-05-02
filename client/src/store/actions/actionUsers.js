import { baseUrl } from "./actionType";
import Swal from "sweetalert2";
import axios from "axios";

export const login = (input) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.post(`${baseUrl}/login`, input);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("name", data.name);
      localStorage.setItem("role", data.role);

      Swal.fire({
        icon: "success",
        title: "Congrats...",
        text: "Login success!",
      });
      return { msg: "Success" };
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };
};
