import { axiosInstance } from "../../../services/axios.config";

export const createAddressDelivery = async (addressData) => {
  try {
    const res = await axiosInstance.post("/delivery_address/add", addressData);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
