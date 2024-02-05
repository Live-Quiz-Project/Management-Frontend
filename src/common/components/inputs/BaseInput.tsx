import { ChangeEvent, FocusEventHandler } from "react";

type Props = {
  className?: string;
  type?: string;
  placeholder?: string;
  value?: any;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  disabled?: boolean;
  pattern?: string;
  id?: string;
  max?: number;
  min?: number;
};

export default function BaseInput(props: Props) {
  return (
    <input
      {...props}
      value={props.value || ""}
      name="input"
      className={`w-full h-10 xl:h-12 text-body-1 text-left px-3 xl:px-4 py-1 border-regent-gray rounded-xl disabled:bg-regent-gray/25 disabled:text-regent-gray disabled:cursor-not-allowed transition-all duration-300 ${props.className}`}
    />
  );
}
