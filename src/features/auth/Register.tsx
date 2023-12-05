import TextInput from "@/common/layouts/auth/components/TextInput";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="flex flex-col justify-center items-center w-full h-dscreen"
    >
      <div className="w-1/2 flex flex-col items-center space-y-10">
        <h1 className="">Register</h1>
        <div className="w-full flex flex-col justify-center items-center space-y-4 relative">
          <TextInput
            type="email"
            label="Email"
            value={email}
            handleOnInput={(e) => setEmail(e.currentTarget.value)}
          />
          <TextInput
            label="Name"
            value={name}
            handleOnInput={(e) => setName(e.currentTarget.value)}
          />
          <TextInput
            type="password"
            label="Password"
            value={password}
            handleOnInput={(e) => setPassword(e.currentTarget.value)}
          />
          <TextInput
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            handleOnInput={(e) => setConfirmPassword(e.currentTarget.value)}
          />
          <p className="">
            Already have an account?&nbsp;
            <Link className="hover:text-ocean-blue hover:underline" to="/login">
              Log In
            </Link>
          </p>
        </div>
        <button className="w-max py-2 px-8 bg-ocean-blue text-white rounded-lg">
          Register
        </button>
      </div>
    </form>
  );
}
