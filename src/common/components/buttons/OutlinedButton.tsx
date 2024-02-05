import { FormEvent } from "react";

type Props = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: (e: FormEvent<HTMLButtonElement>) => void;
  className?: string;
};

export default function OulinedButton({
  children = "",
  type = "submit",
  onClick,
  className,
}: Props) {
  return (
    <button
      className={`px-3 py-1.5 rounded-lg outline outline-1 -outline-offset-1 ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
