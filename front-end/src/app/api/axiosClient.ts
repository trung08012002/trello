import axios, { AxiosResponse } from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3002",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },
  function (error) {
    console.log(error);
  }
);
export default axiosClient;
