import axios from "axios";
let baseURL = process.env.NEXT_PUBLIC_API_URL;

const Api = axios.create({
  baseURL: baseURL,
});

Api.interceptors.request.use((config) => {
  if (localStorage.getItem("token")) {
    const token = `Bearer ${localStorage.getItem("token")}`;
    // @ts-ignore
    config.headers.common["Authorization"] = token;
  }

  return config;
});

Api.interceptors.response.use(
  (res) => {
    return res;
  },
  function (err) {
    const status = err?.response?.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      // window.location.href = "/sign-in"; // TODO
    }
    return Promise.reject(err);
  },
);

export default Api;
