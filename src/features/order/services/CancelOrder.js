import { axiosInstance } from "../../../services/axios.config";

export const cancelOrder = async (orderId) => {
  try {
    const res = axiosInstance.put(`/order/cancel/${orderId}`);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
