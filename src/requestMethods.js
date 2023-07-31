import axios from "axios";

const BASE_URL = "https://tictactoe-api-5jxw.onrender.com/api/";





export const publicRequest = axios.create({
    baseURL : BASE_URL,
});

