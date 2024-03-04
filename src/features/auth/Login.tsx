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
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import BaseModal from "@/common/components/modals/BaseModal";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

export default function Login() {
  const dispatch = useDispatch<StoreDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, _] = useSearchParams();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [errorLoginFailed, setErrorLoginFailed] = useState<boolean>(false);
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email) {
      setEmailError("Email is required");
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
    } else {
      setPasswordError("");
    }

    if (email && password) {
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
              image: data.image,
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
        setErrorLoginFailed(error.response.data.error ? true : false);
      }
    }
  }

  async function handleOnGoogleLogin(token: string) {
    try {
      const { data } = await http.post("/google-signin", {
        token,
      });
      console.log(data);
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
      {errorLoginFailed ? (
        <BaseModal
          setIsOpen={setErrorLoginFailed}
          className="!p-6 xl:!p-8 flex flex-col space-y-6  !rounded-3xl !bg-beige font-sans-serif"
        >
          <div className="flex justify-center">
            <CancelOutlinedIcon style={{ fontSize: 44, color: "red" }} />
          </div>
          <p className="text-header-3 truncate text-center font-semibold leading-tight text-wrap">
            Invalid email or password
          </p>
        </BaseModal>
      ) : (
        <></>
      )}
      <div className="w-1/2 flex flex-col items-center space-y-10">
        <h1 className="font-serif font-semibold text-3xl">Log In</h1>
        <div className="w-full flex flex-col justify-center items-start space-y-4 relative">
          <TextInput
            type="email"
            label="Email"
            value={email}
            onInput={(e) => setEmail(e.currentTarget.value)}
          />
          {emailError && (
            <p
              style={{
                color: "red",
                fontSize: "12px",
                textAlign: "left",
                marginTop: "4px",
              }}
            >
              {emailError}
            </p>
          )}
          <TextInput
            type="password"
            label="Password"
            value={password}
            onInput={(e) => setPassword(e.currentTarget.value)}
          />
          {passwordError && (
            <p
              style={{
                color: "red",
                fontSize: "12px",
                textAlign: "left",
                marginTop: "4px",
              }}
            >
              {passwordError}
            </p>
          )}
        </div>
        <div className="w-full flex flex-col justify-center items-center space-y-4 relative">
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
        <GoogleOAuthProvider clientId={googleClientId}>
          <div className="flex-1 flex justify-center items-center">
            <div className="w-full max-w-xs">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  if (credentialResponse.credential) {
                    handleOnGoogleLogin(credentialResponse.credential);
                  } else {
                    console.log("No credentials received");
                  }
                }}
                onError={() => console.log("Login Failed")}
              />
            </div>
          </div>
        </GoogleOAuthProvider>
      </div>
    </form>
  );
}
