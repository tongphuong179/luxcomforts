import { store } from "../../../store/store";
import { axiosInstance, setAccessToken } from "../../../services/axios.config";

export const cancelOrder = async (orderId) => {
  const isLoggedIn = store.getState().auth.isLogin;

  if (!isLoggedIn) {
    setAccessToken(null);
  }
  const token = store.getState().auth.currentUser.accessToken;
  setAccessToken(token);
  try {
    const res = await axiosInstance.put(`/order/cancel/${orderId}`);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
