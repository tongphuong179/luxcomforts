import axios from "axios";

export const RegisterUser = async (userRegisterData) => {
  try {
    const res = await axios.post(
      "http://localhost:9090/api/users/add",
      userRegisterData
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
