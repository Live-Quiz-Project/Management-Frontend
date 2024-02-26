import TextInput from "@/common/layouts/auth/components/TextInput";
import { http } from "@/common/services/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const [otpNumber, setOtpNumber] = useState<string>("");

  async function handleOnSubmit() {
    try {
      await http.post("/verify-otp", {
        otp: otpNumber,
      });
      navigate("/reset", { state: { otp: otpNumber } });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-dscreen">
      <div className="w-1/2 flex flex-col items-center space-y-10">
        <h1 className="">Verify OTP</h1>
        <div className="w-full flex flex-col justify-center items-start space-y-4 relative">
          <TextInput
            type="number"
            label="OTP"
            onInput={(e) => setOtpNumber(e.currentTarget.value)}
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
