import axios from "axios";

export const getProductById = async (productId) => {
  try {
    const res = await axios.get(
      `http://localhost:9090/api/products/product/${productId}`
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
