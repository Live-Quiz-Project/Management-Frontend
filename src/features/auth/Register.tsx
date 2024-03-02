import TextInput from "@/common/layouts/auth/components/TextInput";
import { http } from "@/common/services/axios";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "./store/slice";
import SuccessDialog from "../../common/components/dialogues/successfulDialog";

export default function Register() {
  const dispatch = useDispatch<StoreDispatch>();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [registrationSuccess, setRegistrationSuccess] =
    useState<boolean>(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
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

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password is required");
    } else {
      setConfirmPasswordError("");
    }

    if (!name) {
      setNameError("Name is required");
    } else {
      setNameError("");
    }

    if (
      email &&
      password &&
      confirmPassword &&
      password === confirmPassword &&
      name
    ) {
      try {
        const { data, status: _ } = await http.post("/users", {
          name,
          email,
          password,
        });
        console.log(data);
        dispatch(createUser(data));
        setRegistrationSuccess(true);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col justify-center items-center w-full h-dscreen"
    >
      {registrationSuccess ? (
        <SuccessDialog
          label="Registration Successful"
          onClose={() => {
            navigate("/login");
          }}
        />
      ) : (
        <div className="w-1/2 flex flex-col items-center space-y-10">
          <h1 className="">Register</h1>
          <div className="w-full flex flex-col justify-center items-start space-y-4 relative">
            <TextInput
              type="email"
              label="Email"
              value={email}
              onInput={(e) => setEmail(e.currentTarget.value)}
            />
            {emailError && <p className="text-red-600">{emailError}</p>}
            <TextInput
              label="Name"
              value={name}
              onInput={(e) => setName(e.currentTarget.value)}
            />
            {nameError && <p className="text-red-600">{nameError}</p>}
            <TextInput
              type="password"
              label="Password"
              value={password}
              onInput={(e) => setPassword(e.currentTarget.value)}
            />
            {passwordError && <p className="text-red-600">{passwordError}</p>}
            <TextInput
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onInput={(e) => setConfirmPassword(e.currentTarget.value)}
            />
            {confirmPasswordError && (
              <p className="text-red-600">{confirmPasswordError}</p>
            )}
            <div className="w-full flex flex-col justify-center items-center space-y-4 relative">
              <p className="">
                Already have an account?&nbsp;
                <Link className="hover:text-denim hover:underline" to="/login">
                  Log In
                </Link>
              </p>
            </div>
          </div>
          <button className="w-max py-2 px-8 bg-denim text-white rounded-lg">
            Register
          </button>
        </div>
      )}
    </form>
  );
}
