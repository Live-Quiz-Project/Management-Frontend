import TextInput from "@/common/layouts/auth/components/TextInput";
import { http } from "@/common/services/axios";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "./store/slice";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

export default function Login() {
  const dispatch = useDispatch<StoreDispatch>();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const { data, status: _ } = await http.post("/login", {
        email,
        password,
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
        <div className="w-full flex flex-col justify-center items-center space-y-4 relative">
          <TextInput
            type="email"
            label="Email"
            value={email}
            handleOnInput={(e) => setEmail(e.currentTarget.value)}
          />
          <TextInput
            type="password"
            label="Password"
            value={password}
            handleOnInput={(e) => setPassword(e.currentTarget.value)}
          />
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
        <GoogleOAuthProvider clientId="1048387093330-488nf8o6cm1ufh1g26lbs6456anjpgc9.apps.googleusercontent.com">
          <div className="flex-1 flex justify-center items-center">
            <div className="w-full max-w-xs">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  if (credentialResponse.credential) {
                    const decoded = jwtDecode(credentialResponse.credential);
                    console.log(decoded);
                    const googleId = decoded.sub;
                    console.log("Google ID:", googleId);
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
