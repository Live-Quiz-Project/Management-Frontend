import TextInput from "@/common/layouts/auth/components/TextInput";
import { http } from "@/common/services/axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [passsword, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const otp: string = location.state ? location.state.otp : "";

  async function handleOnSubmit() {
    try {
      await http.post("/reset-password", {
        otp: otp,
        email: email,
        password: confirmPassword,
      });
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-dscreen">
      <div className="w-1/2 flex flex-col items-center space-y-10">
        <h1 className="">Reset Password</h1>
        <div className="w-full flex flex-col justify-center items-start space-y-4 relative">
          <TextInput
            type="string"
            label="Email"
            value={email}
            onInput={(e) => setEmail(e.currentTarget.value)}
          />
          <TextInput
            type="password"
            label="New Password"
            value={passsword}
            onInput={(e) => setPassword(e.currentTarget.value)}
          />
          <TextInput
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onInput={(e) => setConfirmPassword(e.currentTarget.value)}
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center space-y-4 relative"></div>
        <button
          className="w-max py-2 px-8 bg-pastel-orange text-white rounded-lg"
          onClick={handleOnSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
