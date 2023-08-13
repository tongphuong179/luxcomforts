import { axiosInstance } from "../../../services/axios.config";

export const getProductByCategory = async (categoryId) => {
  try {
    const res = await axiosInstance.get(`/products/category/${categoryId}`);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
