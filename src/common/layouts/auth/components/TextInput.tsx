import { FormEvent } from "react";

type Props = {
  type?: string;
  className?: string;
  label?: string;
  onInput?: (e: FormEvent<HTMLInputElement>) => void;
  value?: string;
};

export default function TextInput({
  type = "text",
  className = "",
  label = "",
  onInput: onInput,
  value,
}: Props) {
  return (
    <label className={`flex flex-col w-full ${className}`}>
      <p className="">{label}</p>
      <input
        type={type}
        onInput={onInput}
        value={value}
        className="pl-2 border border-regent-gray rounded-lg w-full h-10"
      />
    </label>
  );
}
