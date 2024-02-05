import {
  MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { IoIosArrowDown } from "react-icons/io";

type Props = {
  className?: string;
  options?: Option[];
  value?: any;
  onChange?: (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
  disabled?: boolean;
};

type Option = {
  label: string;
  value: any;
};

export default function BaseDropdown({
  className = "",
  options = [],
  value,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const labelRef = useRef<HTMLButtonElement>(null);
  const dialogueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        dialogueRef.current &&
        labelRef.current &&
        !dialogueRef.current.contains(e.target as Node) &&
        !labelRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const checkOverflow = () => {
      if (dialogueRef.current) {
        const spaceAbove = dialogueRef.current.getBoundingClientRect().top;
        const spaceBelow =
          window.innerHeight -
          dialogueRef.current.getBoundingClientRect().bottom;
        if (spaceAbove <= spaceBelow) {
          dialogueRef.current.style.top = "";
          dialogueRef.current.style.borderBottomLeftRadius = ".5rem";
          dialogueRef.current.style.borderBottomRightRadius = ".5rem";
        } else {
          dialogueRef.current.style.top = `-${dialogueRef.current.clientHeight}px`;
          dialogueRef.current.style.borderTopLeftRadius = ".5rem";
          dialogueRef.current.style.borderTopRightRadius = ".5rem";
        }
      }
    };
    checkOverflow();

    window.addEventListener("resize", checkOverflow);
    document.addEventListener("mousedown", onClickOutside);

    return () => {
      window.removeEventListener("resize", checkOverflow);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [dialogueRef, isOpen]);

  return (
    <div
      className={`relative rounded-xl border-regent-gray text-body-1 ${
        disabled ? "!bg-regent-gray/25" : ""
      } ${className}`}
    >
      <button
        ref={labelRef}
        type="button"
        value={value}
        onClick={() => setIsOpen(!isOpen)}
        onFocus={onFocus}
        onBlur={onBlur}
        className="relative w-full h-10 xl:h-12 text-left pl-3 xl:pl-4 pr-10 xl:pr-12 py-1 rounded-xl disabled:text-regent-gray disabled:cursor-not-allowed truncate transition-all duration-300"
        disabled={disabled}
      >
        {!value ? (
          <p>{options.length > 0 ? options[0].label : ""}</p>
        ) : (
          options.length > 0 &&
          options.map((option, i) => {
            if (option.value === value) {
              return <p key={i}>{option.label}</p>;
            }
          })
        )}
        <IoIosArrowDown
          className={`absolute right-2 xl:right-4 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-regent-gray transition-all duration-300 ${
            isOpen && "transform rotate-180"
          }`}
        />
      </button>
      {isOpen && (
        <div
          ref={dialogueRef}
          className="absolute left-1/2 -translate-x-1/2 w-[calc(100%-1rem)] px-2 xl:px-3 flex flex-col border border-quill-gray divide-y divide-quill-gray bg-white z-10"
        >
          {options.length > 1 ? (
            options.map((option, i) => {
              if (option.value !== value) {
                return (
                  <button
                    key={i}
                    type="button"
                    value={option.value}
                    onClick={(e) => {
                      if (onChange) onChange(e);
                      setIsOpen(false);
                    }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    className="w-full h-10 xl:h-12 text-left"
                  >
                    {option.label}
                  </button>
                );
              }
            })
          ) : (
            <button className="h-10" onClick={() => setIsOpen(false)}></button>
          )}
        </div>
      )}
    </div>
  );
}
