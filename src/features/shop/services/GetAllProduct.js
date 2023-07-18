import axios from "axios";

export const getAllProduct = async () => {
  try {
    const res = await axios.get("http://localhost:9090/api/products");
    return res.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
