import {
  axiosInstance,
  setAccessToken,
} from "../../../../../services/axios.config";
import { store } from "../../../../../store/store";

export const updateProduct = async (productId, product) => {
  const isLoggedIn = store.getState().auth.isLogin;

  if (!isLoggedIn) {
    setAccessToken(null);
  }
  const token = store.getState().auth.currentUser.accessToken;
  setAccessToken(token);

  try {
    const res = await axiosInstance.put(`/products/save/${productId}`, product);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
