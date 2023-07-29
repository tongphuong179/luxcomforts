import { axiosInstance } from "../../../../../services/axios.config";

export const getAllDiscount = async () => {
  try {
    const res = await axiosInstance.get("/discounts");
    return res.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
