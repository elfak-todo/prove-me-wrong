import axios from "axios";
import { baseURL } from "../config";
import { UserRegisterData } from "../models/user";

export const registerUser = (data: UserRegisterData) => {
  return axios.post(`${baseURL}/User/register`, data);
};
