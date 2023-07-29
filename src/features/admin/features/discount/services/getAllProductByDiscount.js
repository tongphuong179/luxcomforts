import { axiosInstance } from "../../../../../services/axios.config";

export const getAllProductByDiscount = async (discountId) => {
  try {
    const res = await axiosInstance.get(`/discount/product/${discountId}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
