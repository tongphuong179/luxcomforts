import {
  axiosInstance,
  setAccessToken,
} from "../../../../../services/axios.config";
import { store } from "../../../../../store/store";

export const deleteCategory = async (categoryId) => {
  const isLoggedIn = store.getState().auth.isLogin;

  if (!isLoggedIn) {
    setAccessToken(null);
  }
  const token = store.getState().auth.currentUser.accessToken;
  setAccessToken(token);

  try {
    const res = await axiosInstance.delete(`/category/delete/${categoryId}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
