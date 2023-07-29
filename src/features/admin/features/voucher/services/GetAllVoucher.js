import { axiosInstance } from "../../../../../services/axios.config";

export const getAllVoucher = async () => {
  try {
    const res = await axiosInstance.get("/vouchers");
    return res.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
