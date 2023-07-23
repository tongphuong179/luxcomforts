import axios from "axios";
import { axiosInstance, setAccessToken } from "../../../services/axios.config";
import { store } from "../../../store/store";
import { getCurrentUser } from "../../../services/getToken";

export const getProductById = async (productId) => {
  try {
    const res = await axiosInstance.get(`/products/product/${productId},`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
