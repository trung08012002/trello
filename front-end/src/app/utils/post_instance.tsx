import { cookies } from "next/headers";
import * as cookie from "cookie";
import axiosClient from "../api/axiosClient";
import { AxiosRequestConfig } from "axios";
import { Console } from "console";
const customPost = async ({
    url,
    dataBoy,
    config,
}: {
    url: string;
    dataBoy: any;
    config: AxiosRequestConfig<any> | undefined;
}) => {
    try {
        const res = await axiosClient.post(url, dataBoy, config);

        const data = res.data;

        return data.data;
    } catch (error: any) {
        console.log("error", error);
        if (
            error.response.data.status === 401 &&
            error.response.data.message === "jwt expired"
        ) {
            const refreshToken = localStorage.getItem("refreshToken");

            const response = await axiosClient.post("users/refresh-token", {
                refreshToken: refreshToken,
            });
            console.log("response:", response)
            const res = await axiosClient.post(url, dataBoy);

            if (res.data.status === 401) {
                return null;
            }
            const data = res.data;
            return data.data;
        }
    }
};

export default customPost;
