import { store } from "../../../../../store/store";
import {
  axiosInstance,
  setAccessToken,
} from "../../../../../services/axios.config";

export const getAllUser = async () => {
  const isLoggedIn = store.getState().auth.isLogin;

  if (!isLoggedIn) {
    setAccessToken(null);
  }
  const token = store.getState().auth.currentUser.accessToken;
  console.log(token);
  setAccessToken(token);
  try {
    const res = await axiosInstance.get("/users");
    return res.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
