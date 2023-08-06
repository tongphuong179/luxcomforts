import { axiosInstance } from "../../../services/axios.config";

export const checkout = async (checkoutData) => {
  try {
    const res = await axiosInstance.post("/order/checkout", checkoutData);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
