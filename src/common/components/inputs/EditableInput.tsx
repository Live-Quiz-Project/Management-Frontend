import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

type Props = {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  placeholder?: string;
};

export default function EditableInput({
  input,
  setInput,
  placeholder = "",
}: Props) {
  const inputRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    inputRef.current!.textContent = input;
  }, [input]);

  return (
    <div
      ref={inputRef}
      contentEditable
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onInput={(e) => setInput(e.currentTarget.innerText)}
      className={`px-2 bg-transparent text-center rounded-lg border-pastel-orange ${
        isFocused ? "border-2 border-dashed" : "border-none"
      }`}
      placeholder={placeholder}
    />
  );
}
