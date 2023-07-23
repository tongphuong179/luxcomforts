import axios from "axios";
import { axiosInstance } from "../../../services/axios.config";

export const login = async (userData) => {
  try {
    const res = await axiosInstance.post("/users/login", userData);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
