import { store } from "../../../store/store";
import { axiosInstance, setAccessToken } from "../../../services/axios.config";

export const createAddressDelivery = async (userId, addressData) => {
  const isLoggedIn = store.getState().auth.isLogin;

  if (!isLoggedIn) {
    setAccessToken(null);
  }
  const token = store.getState().auth.currentUser.accessToken;

  setAccessToken(token);
  try {
    const res = await axiosInstance.post(
      `/delivery_address/add/${userId}`,
      addressData
    );
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
