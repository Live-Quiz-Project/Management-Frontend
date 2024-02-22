import {
  CSSProperties,
  Children,
  MouseEvent as ReactMouseEvent,
  ReactElement,
  ReactNode,
} from "react";
import { IoClose } from "react-icons/io5";

type ComponentProps = {
  className?: string;
  style?: CSSProperties;
  checked?: boolean;
  onChange?: () => void;
  onDelete?: (e: ReactMouseEvent<HTMLButtonElement>) => void;
  deletable?: boolean;
  disabled?: boolean;
  children: ReactNode;
};

type ChildProps = {
  children: ReactNode;
};

export default function ChoiceButton({
  className,
  style,
  checked = false,
  onChange = () => {},
  onDelete,
  disabled,
  deletable = true,
  children,
}: ComponentProps) {
  return (
    <div
      className={`relative flex items-center justify-center w-full h-full text-dune rounded-md sm:rounded-lg lg:rounded-xl 2xl:rounded-2xl ${
        checked ? "border-[3px] sm:border-4 border-apple" : "border"
      } ${className}`}
      style={style}
    >
      <label
        className={`absolute top-0 left-0 w-full h-full ${
          disabled ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <input
          type="checkbox"
          className="hidden"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
      </label>
      {Children.map(children, (child) => {
        if (checkNamespace(child, "icon")) {
          return (
            <div className="absolute top-[0.5em] left-[0.5em] transition-all duration-300 text-[0.5em] leading-none backdrop-blur-3xl rounded-full z-10">
              {child}
            </div>
          );
        }
        if (checkNamespace(child, "content")) {
          return (
            <div className="opacity-100 text-[0.75em] overflow-auto h-fit transition-all duration-300 px-[0.5em] z-1">
              {child}
            </div>
          );
        }
        return null;
      })}
      {deletable && (
        <button
          type="button"
          onClick={onDelete}
          className="absolute top-[0.1em] right-[0.1em] z-1 rounded-full opacity-100 md:opacity-0 hover:opacity-100 transition-all duration-300"
        >
          <IoClose className="w-[0.6em] h-[0.6em]" />
        </button>
      )}
    </div>
  );
}

ChoiceButton.Icon = ({ children }: ChildProps) => <>{children}</>;

ChoiceButton.Content = ({ children }: ChildProps) => <>{children}</>;

function checkNamespace(
  child: any,
  namespace: string
): child is ReactElement<ChildProps> {
  if (namespace === "icon") {
    return child.type === ChoiceButton.Icon;
  } else {
    return child.type === ChoiceButton.Content;
  }
}
