import TextInput from "@/common/layouts/auth/components/TextInput";
import { http } from "@/common/services/axios";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createUser, logIn } from "@/features/auth/store/slice";
import SuccessDialog from "@/common/components/dialogues/successfulDialog";

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
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
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
      name &&
      password.length >= 8 &&
      confirmPassword.length >= 8
    ) {
      try {
        const { data, status: _ } = await http.post("/users", {
          name,
          email,
          password,
        });
        dispatch(
          logIn({
            token: data.accessToken,
            user: {
              id: data.id,
              name: data.name,
              email: data.email,
              image: data.image,
            },
          })
        );
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
      className="flex flex-col justify-center items-center w-full h-dscreen font-sans-serif"
    >
      {registrationSuccess ? (
        <SuccessDialog
          label="Registration Successful"
          onClose={() => {
            navigate("/");
          }}
        />
      ) : (
        <div className="w-1/2 flex flex-col items-center space-y-10">
          <h1 className="font-serif font-semibold text-2xl">Register</h1>
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
              label="Name"
              value={name}
              onInput={(e) => setName(e.currentTarget.value)}
            />
            {nameError && (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  textAlign: "left",
                  marginTop: "4px",
                }}
              >
                {nameError}
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
            <TextInput
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onInput={(e) => setConfirmPassword(e.currentTarget.value)}
            />
            {confirmPasswordError && (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  textAlign: "left",
                  marginTop: "4px",
                }}
              >
                {confirmPasswordError}
              </p>
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
