import axios from "axios";

export const getAllCategory = async () => {
  try {
    const res = await axios.get("http://localhost:9090/api/categories");
    return res.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
