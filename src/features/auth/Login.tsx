import TextInput from "@/common/layouts/auth/components/TextInput";
import { http } from "@/common/services/axios";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { logIn } from "@/features/auth/store/slice";

export default function Login() {
  const dispatch = useDispatch<StoreDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, _] = useSearchParams();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const { data, status: _ } = await http.post("/login", {
        email,
        password,
      });
      dispatch(
        logIn({
          token: data.token,
          user: {
            id: data.id,
            name: data.name,
            email: data.email,
          },
        })
      );
      if (searchParams.get("code")) {
        window.location.href = `${import.meta.env.VITE_LIVE_QUIZ_URL}?token=${
          data.token
        }&code=${searchParams.get("code")}`;
        return;
      }
      if (location.state?.from?.pathname) {
        navigate(location.state?.from?.pathname);
        return;
      }
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col justify-center items-center w-full h-dscreen"
    >
      <div className="w-1/2 flex flex-col items-center space-y-10">
        <h1 className="">Log In</h1>
        <div className="w-full flex flex-col justify-center items-center space-y-4 relative">
          <TextInput
            type="email"
            label="Email"
            value={email}
            onInput={(e) => setEmail(e.currentTarget.value)}
          />
          <TextInput
            type="password"
            label="Password"
            value={password}
            onInput={(e) => setPassword(e.currentTarget.value)}
          />
          <Link className="hover:text-koromiko hover:underline" to="/forgot">
            Forgot password
          </Link>
          <p className="">
            Don't have an account?&nbsp;
            <Link
              className="hover:text-koromiko hover:underline"
              to="/register"
            >
              Create one
            </Link>
          </p>
        </div>
        <button className="w-max py-2 px-8 bg-koromiko text-white rounded-lg">
          Log In
        </button>
        {/* google login here */}
      </div>
    </form>
  );
}
