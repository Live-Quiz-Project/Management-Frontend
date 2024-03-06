import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from "react";

type Props = {
  className?: string;
  menus: Menu[];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

type Menu = {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
};

export default function BaseDialogue({
  className = "",
  menus,
  isOpen,
  setIsOpen,
}: Props) {
  const dialogueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        dialogueRef.current &&
        !dialogueRef.current.contains(e.target as Node)
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

  if (!isOpen) return null;

  return (
    <div
      ref={dialogueRef}
      className={`bg-white rounded-md flex flex-col space-y-2 text-center py-2 px-2 absolute ${className}`}
    >
      {menus.map((menu) => (
        <button
          key={menu.label}
          onClick={() => {
            menu.onClick();
            setIsOpen(false);
          }}
          className="px-4"
        >
          {menu.icon}
          <p>{menu.label}</p>
        </button>
      ))}
    </div>
  );
}
