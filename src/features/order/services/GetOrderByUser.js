import { axiosInstance } from "../../../services/axios.config";

export const getOrderById = async (id) => {
  try {
    const res = await axiosInstance.get(`/order/user/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
