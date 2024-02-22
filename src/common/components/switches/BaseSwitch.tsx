import { FocusEventHandler, FormEvent } from "react";

type Props = {
  className?: string;
  checked?: boolean;
  onChange?: (e: FormEvent<HTMLInputElement>) => void;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  disabled?: boolean;
};

export default function BaseSwitch(props: Props) {
  return (
    <label
      className={`relative h-10 aspect-[2/1] rounded-full transition-all duration-300
      ${props.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
      ${props.checked ? "bg-current" : "bg-regent-gray/20"} ${props.className}`}
    >
      <input
        {...props}
        checked={props.checked === undefined ? false : props.checked}
        type="checkbox"
        className="hidden peer"
      />
      <span className="absolute top-0 block border-2 bg-white h-full rounded-full aspect-square transition-all duration-300 peer-checked:left-1/2 peer-checked:border-current left-0 border-regent-gray/40" />
    </label>
  );
}
