import { FormEvent } from "react";

type Props = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: (e: FormEvent<HTMLButtonElement>) => void;
  className?: string;
};

export default function FilledButton({
  children = "",
  type = "submit",
  onClick,
  className,
}: Props) {
  return (
    <button
      className={`px-3 py-1.5 rounded-lg ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
