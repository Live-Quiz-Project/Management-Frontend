import TextInput from "@/common/layouts/auth/components/TextInput";
import { FormEvent, useState} from "react";

export default function NewPassword() {

  const [email, setEmail] = useState<string>("");

  async function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="flex flex-col justify-center items-center w-full h-dscreen"
    >
      <div className="w-1/2 flex flex-col items-center space-y-10">
        <h1 className="">Reset Password</h1>
        <div className="w-full flex flex-col justify-center items-start space-y-4 relative">
          <TextInput
            type="password"
            label="New Password"
            value={email}
            handleOnInput={(e) => setEmail(e.currentTarget.value)}
          />
          <TextInput
            type="password"
            label="Confirm Password"
            value={email}
            handleOnInput={(e) => setEmail(e.currentTarget.value)}
          />
          </div>
          <div className="w-full flex flex-col justify-center items-center space-y-4 relative">
          </div>   
        <button className="w-max py-2 px-8 bg-pastel-orange text-white rounded-lg">
          Submit
        </button>
      </div>
    </form>
  );
}
