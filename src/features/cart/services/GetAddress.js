import axios from "axios";
import { axiosInstance } from "../../../services/axios.config";

export const getProvinces = async () => {
  try {
    const res = await axios.get(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
      {
        headers: {
          Token: "6ab4fe69-fe4e-11ed-b678-22ca76951087",
        },
      }
    );
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getDistrict = async (provinceId) => {
  try {
    const res = await axios.get(
      `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${provinceId}`,
      {
        headers: {
          Token: "6ab4fe69-fe4e-11ed-b678-22ca76951087",
        },
      }
    );
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getWard = async (districtId) => {
  try {
    const res = await axios.get(
      `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}`,
      {
        headers: {
          Token: "6ab4fe69-fe4e-11ed-b678-22ca76951087",
        },
      }
    );
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
