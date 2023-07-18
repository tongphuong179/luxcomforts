import axios from "axios";

export const login = async (userData) => {
  try {
    const res = await axios.post(
      "http://localhost:9090/api/users/login",
      userData
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
