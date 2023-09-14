import axiosClient from "@/app/api/axiosClient"
import customFetcher from "@/app/utils/fetch_instance"
import customPost from "@/app/utils/post_instance"

export const cardApi = {
    async insertCard({ title, columnId }: { title: string, columnId: string }) {
        const result = await customPost({ url: `/cards/c/${columnId}`, dataBoy: { title: title }, config: {} });
        console.log("result: ", result);
        return result;
    }
}



