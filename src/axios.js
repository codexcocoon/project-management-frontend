import axios from "axios";
const api = axios.create({
  baseURL: "https://lara-react-full.test/api",
});
export default api;
