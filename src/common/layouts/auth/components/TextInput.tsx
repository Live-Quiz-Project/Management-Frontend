import { FormEvent } from "react";

type Props = {
  type?: string;
  className?: string;
  label?: string;
  handleOnInput?: (e: FormEvent<HTMLInputElement>) => void;
  value?: string;
};

export default function TextInput({
  type = "text",
  className = "",
  label = "",
  handleOnInput,
  value,
}: Props) {
  return (
    <label className={`flex flex-col w-full ${className}`}>
      <p className="">{label}</p>
      <input
        type={type}
        onInput={handleOnInput}
        value={value}
        className="border border-dark-gray rounded-lg w-full h-10"
      />
    </label>
  );
}
