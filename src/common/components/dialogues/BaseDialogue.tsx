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
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dialogueRef.current &&
        !dialogueRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dialogueRef]);

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
