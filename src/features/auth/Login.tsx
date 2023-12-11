import TextInput from "@/common/layouts/auth/components/TextInput";
import { http } from "@/common/services/axios";
import { FormEvent, useState} from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "./store/slice";
import { GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";

export default function Login() {
  const dispatch = useDispatch<StoreDispatch>();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

  async function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email) {
      setEmailError("Email is required");
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }

    if (email && password) {
      try {
        const { data, status: _ } = await http.post("/login", {
          email,
          password,
        });
        console.log(data);
        dispatch(
          logIn({
            token: data.accessToken,
            user: {
              id: data.id,
              name: data.name,
              email: data.email,
            },
          })
        );
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function handleOnGoogleLogin(token : string) {
    try {
      const { data, status: _ } = await http.post("/google-signin", {
        token
      });
      console.log(data)
      dispatch(
        logIn({
          token: data.accessToken,
          user: {
            id: data.id,
            name: data.name,
            email: data.email,
          },
        })
      );
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="flex flex-col justify-center items-center w-full h-dscreen"
    >
      <div className="w-1/2 flex flex-col items-center space-y-10">
        <h1 className="">Log In</h1>
        <div className="w-full flex flex-col justify-center items-start space-y-4 relative">
          <TextInput
            type="email"
            label="Email"
            value={email}
            handleOnInput={(e) => setEmail(e.currentTarget.value)}
          />
          {emailError && <p style={{ color: 'red', fontSize: '12px', textAlign: 'left', marginTop: '4px' }}>{emailError}</p>}
          <TextInput
            type="password"
            label="Password"
            value={password}
            handleOnInput={(e) => setPassword(e.currentTarget.value)}
          />{passwordError && <p style={{ color: 'red', fontSize: '12px', textAlign: 'left', marginTop: '4px'}}>{passwordError}</p>}
          <Link
            className="hover:text-pastel-orange hover:underline"
            to="/forgot"
          >
            Forgot password
          </Link>
          <p className="">
            Don't have an account?&nbsp;
            <Link
              className="hover:text-pastel-orange hover:underline"
              to="/register"
            >
              Create one
            </Link>
          </p>
        </div>
        <button className="w-max py-2 px-8 bg-pastel-orange text-white rounded-lg">
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
