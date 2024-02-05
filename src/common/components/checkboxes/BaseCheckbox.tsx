import { FocusEventHandler, FormEvent } from "react";
import { FaCheck } from "react-icons/fa6";

type Props = {
  className?: string;
  id?: string;
  checked?: boolean;
  onChange?: (e: FormEvent<HTMLInputElement>) => void;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  disabled?: boolean;
};

export default function BaseCheckbox(props: Props) {
  return (
    <div
      className={`w-6 aspect-square rounded-full border-regent-gray transition-all duration-300 ${
        props.disabled
          ? "bg-regent-gray/25 cursor-not-allowed"
          : "bg-white cursor-pointer"
      } ${props.className ? props.className : ""}`}
    >
      <input {...props} type="checkbox" className="hidden peer" />
      <label
        htmlFor={props.id}
        className="block w-full h-full p-1 peer-checked:opacity-100 opacity-0 cursor-pointer peer-disabled:cursor-not-allowed transition-all duration-300"
      >
        <FaCheck className="w-full h-full text-current" />
      </label>
    </div>
  );
}
