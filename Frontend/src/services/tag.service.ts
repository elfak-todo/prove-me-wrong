import axios from "axios"
import { baseURL } from "../config"

export const getTags = () => {
    return axios.get(`${baseURL}/Tag/`);
}