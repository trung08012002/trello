import { cookies } from "next/headers";
import * as cookie from "cookie";
import axiosClient from "../api/axiosClient";
const customFetcher = async ({ url, config }: { url: string; config: any }) => {
  const res = await axiosClient.get(url);
  console.log("data", res.data);
  console.log("status ", res.status);
  if (res.data.status === 401 && res.data.message) {
  }
  const data = res.data;
  return data.data;
};

export default customFetcher;
