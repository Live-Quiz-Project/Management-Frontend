import { Dispatch, SetStateAction, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";

type Props = {
  className?: string;
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
};

export default function SearchBar({
  className = "",
  keyword,
  setKeyword,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div className={`relative h-full ${className}`}>
      <button onClick={() => inputRef.current?.focus()}>
        <IoSearch
          className={`absolute top-1/2 left-3 -translate-y-1/2 h-5 w-5 ${
            isFocused ? "text-koromiko" : "text-quill-gray"
          }`}
        />
      </button>
      <input
        type="text"
        ref={inputRef}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search..."
        className={`rounded-lg border-2 pl-9 py-1.5 ${
          isFocused ? "border-koromiko" : "border-quill-gray"
        }`}
      />
    </div>
  );
}
