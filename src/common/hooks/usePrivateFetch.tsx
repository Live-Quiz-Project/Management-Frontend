import { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { privateHttp } from "@/common/services/axios";
import useRefreshToken from "@/common/hooks/useRefreshToken";
import useTypedSelector from "@/common/hooks/useTypedSelector";
import { useEffect } from "react";

export default function usePrivateFetch() {
  const refresh = useRefreshToken();
  const auth = useTypedSelector((state) => state.auth);

  useEffect(() => {
    const reqIntercept = privateHttp.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth.value.token}`;
        }
        return config;
      },
      (err: AxiosError) => Promise.reject(err)
    );

    const resIntercept = privateHttp.interceptors.response.use(
      (res: AxiosResponse) => res,
      async (err: AxiosError) => {
        const prevReq = err.config;
        if (err.response?.status === 401 && prevReq) {
          const newToken = await refresh();
          prevReq.headers["Authorization"] = `Bearer ${newToken}`;
          return privateHttp(prevReq);
        }
        return Promise.reject(err);
      }
    );

    return () => {
      privateHttp.interceptors.request.eject(reqIntercept);
      privateHttp.interceptors.response.eject(resIntercept);
    };
  }, [auth.value.token, refresh]);

  return privateHttp;
}
