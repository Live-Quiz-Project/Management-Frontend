import BaseModal from "@/common/components/modals/BaseModal";
import TextInput from "@/common/layouts/auth/components/TextInput";
import { http } from "@/common/services/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [errorSubmitEmail, setErrorSubmitEmail] = useState<boolean>(false);

  async function handleOnSubmit() {
    if (!email) {
      setEmailError("Email is required");
    } else {
      setEmailError("");
    }

    if (email) {
      try {
        await http.post("/otp", {
          email: email,
        });
        navigate("/verify-otp");
      } catch (error) {
        console.error(error);
        setErrorSubmitEmail(error.response.data.error ? true : false);
      }
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-dscreen">
      {errorSubmitEmail ? (
        <BaseModal
          setIsOpen={setErrorSubmitEmail}
          className="!p-6 xl:!p-8 flex flex-col space-y-6 !rounded-3xl !bg-beige font-sans-serif"
        >
          <div className="flex justify-center">
            <CancelOutlinedIcon style={{ fontSize: 44, color: "red" }} />
          </div>
          <p className="text-header-3 truncate text-center font-semibold leading-tight text-wrap">
            Invalid email
          </p>
        </BaseModal>
      ) : (
        <></>
      )}
      <div className="w-1/2 flex flex-col items-center space-y-10">
        <h1 className="font-serif font-semibold text-xl">Forgot Password</h1>
        <div className="w-full flex flex-col justify-center items-start space-y-4 relative">
          <TextInput
            type="email"
            label="Email"
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
