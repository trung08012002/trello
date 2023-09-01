import { SingninInput } from "model/Authentication.model";
import axiosClient from "../repository";

const urlAuth = "/auth/login";

export default {
  signin(signinData: SingninInput) {
    axiosClient.post(urlAuth, signinData);
  },
};
