import { IoArrowBack } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";

type Props = {
  children: React.ReactNode;
  backable?: boolean;
};

export default function Topbar({ children, backable = false }: Props) {
  return (
    <div className="flex-1 overflow-auto flex flex-col p-5 space-y-4  ">
      <div
        className={`flex items-center ${
          backable ? "justify-between" : "justify-end"
        }`}
      >
        {backable && (
          <button className="">
            <IoArrowBack className="w-6 h-6" />
          </button>
        )}
        <div className="flex items-center space-x-3">
          <button className="">
            <FaRegBell className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 bg-light-gray rounded-full"></div>
        </div>
      </div>
      {children}
    </div>
  );
}
