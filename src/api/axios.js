import axios from "axios";

const instance = axios.create({
  baseURL: "https://be7-team4.r-e.kr",
});
export default instance;
