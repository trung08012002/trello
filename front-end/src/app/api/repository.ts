import axios from "axios";

const url=process.env.NODE_ENV === "development" ?
process.env.NEXT_APP_DOMAIN:process.env.NEXT_APP_DOMAIN_PROD;

const axiosClient = axios.create({
    baseURL:url,
    headers: {
        "Content-Type": "application/json",
    },

})
axiosClient.interceptors.response.use(function(response){
    return response.data;
},function(error){
    return Promise.reject(error);
})
export default axiosClient