import { logOut, refreshToken } from "@/features/auth/store/slice";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { store } from "@/app/store";

const http = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "",
  // baseURL: "https://backend.dev.livequizplatform.online/v1",
  withCredentials: true,
});

const privateHttp = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "",
  // baseURL: "https://backend.dev.livequizplatform.online/v1",
  withCredentials: true,
});

privateHttp.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${
        store.getState().auth.value.token
      }`;
    }
    return config;
  },
  (err: AxiosError) => Promise.reject(err)
);

privateHttp.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (err: AxiosError) => {
    const prevReq = err.config;
    if (err.response?.status === 401 && prevReq) {
      try {
        const {
          data: { token },
        } = await http.get("/refresh");
        store.dispatch(refreshToken(token));
        prevReq.headers["Authorization"] = `Bearer ${token}`;
        return privateHttp(prevReq);
      } catch (error) {
        await http.get("/logout");
        store.dispatch(logOut());
      }
    }
    return Promise.reject(err);
  }
);

export { http, privateHttp };
