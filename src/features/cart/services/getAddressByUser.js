import { axiosInstance } from "../../../services/axios.config";

export const getAddressByUser = async (userId) => {
  try {
    const res = await axiosInstance.get(`/delivery_address/user/${userId}`);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
