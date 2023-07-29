import {
  axiosInstance,
  setAccessToken,
} from "../../../../../services/axios.config";
import { store } from "../../../../../store/store";

export const updateDiscount = async (discountId, discount) => {
  const isLoggedIn = store.getState().auth.isLogin;

  if (!isLoggedIn) {
    setAccessToken(null);
  }
  const token = store.getState().auth.currentUser.accessToken;
  setAccessToken(token);

  try {
    const res = await axiosInstance.put(
      `/discount/update/${discountId}`,
      discount
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
