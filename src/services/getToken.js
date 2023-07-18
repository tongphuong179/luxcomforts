import { useSelector } from "react-redux";

export const getCurrentUser = () => {
  const currentUser = useSelector((state) => state.auth);
  if (currentUser.isLogin) {
    const token = currentUser?.currentUser?.accessToken;
    return token;
  }
  return null;
};
