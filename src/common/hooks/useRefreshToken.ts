import { useDispatch } from "react-redux";
import { refreshToken } from "@/features/auth/store/slice";
import { http } from "@/common/services/axios";

export default function useRefreshToken() {
  const dispatch = useDispatch();

  return async () => {
    try {
      const { data } = await http.get("/refresh", {
        withCredentials: true,
      });

      dispatch(refreshToken(data.token));
    } catch (error) {
      console.error(error);
    }
  };
}
