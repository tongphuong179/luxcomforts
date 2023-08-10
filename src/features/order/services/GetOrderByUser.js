import { axiosInstance } from "../../../services/axios.config";

export const getOrderByUser = async (id) => {
  try {
    const res = await axiosInstance.get(`/order/user/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
