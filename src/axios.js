import axios from "axios";
const api = axios.create({
  baseURL: "https://pro-manage.arkangroupbd.com/api",
});
export default api;
