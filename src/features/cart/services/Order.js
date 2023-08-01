import { axiosInstance } from "../../../services/axios.config";

export const order = async (orderData) => {
  try {
    const res = await axiosInstance.post("/order/place_order", orderData);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
