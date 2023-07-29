import { axiosInstance } from "../../../services/axios.config";

export const applyVoucher = async (code, username) => {
  try {
    const res = axiosInstance.get(
      `/voucher/app?voucherCode=${code}&username=${username}`
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
