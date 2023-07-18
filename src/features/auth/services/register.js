import axios from "axios";

export const register = async (userRegisterData) => {
  try {
    const res = await axios.post(
      "http://localhost:9090/api/users/login",
      userRegisterData
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
