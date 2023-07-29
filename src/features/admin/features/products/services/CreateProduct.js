import {
  axiosInstance,
  setAccessToken,
} from "../../../../../services/axios.config";
import { store } from "../../../../../store/store";

export const createProduct = async (product) => {
  const isLoggedIn = store.getState().auth.isLogin;

  if (!isLoggedIn) {
    setAccessToken(null);
  }
  const token = store.getState().auth.currentUser.accessToken;
  setAccessToken(token);

  try {
    const res = await axiosInstance.post("/products", product);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
