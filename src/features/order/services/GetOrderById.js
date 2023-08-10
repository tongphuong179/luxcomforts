import { axiosInstance } from "../../../services/axios.config";

export const getOrderById = async (orderId) => {
  try {
    const res = await axiosInstance.get(`order/${orderId}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
