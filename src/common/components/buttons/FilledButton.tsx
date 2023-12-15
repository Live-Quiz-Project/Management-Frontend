import { FormEvent } from "react";

type Props = {
  children: React.ReactNode;
  onClick?: (e: FormEvent<HTMLButtonElement>) => void;
  className?: string;
};

export default function FilledButton({
  children = "",
  onClick,
  className,
}: Props) {
  return (
    <button
      className={`font-sans-serif px-3 py-1.5 rounded-lg ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
