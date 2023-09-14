import { cookies } from "next/headers";
import * as cookie from "cookie";
import axiosClient from "../api/axiosClient";
const customFetcher = async ({ url, config }: { url: string; config: any }) => {
  try {
    const res = await axiosClient.get(url);

    const data = await res.data;
    return data.data;
  } catch (error: any) {
    console.log("error", error);
    if (
      error.response.data.status === 401 &&
      error.response.data.message === "jwt expired"
    ) {
      const refreshToken = localStorage.getItem("refreshToken");
      console.log("refresh token: " + refreshToken);
      const response = await axiosClient.post("users/refresh-token", {
        refreshToken: refreshToken,
      });
      console.log("res1", response);
      const res = await axiosClient.get(url);
      console.log("response", res);
      if (res.data.status === 401) {
        return null;
      }
      const data = res.data;
      return data.data;
    }
  }
};

export default customFetcher;
