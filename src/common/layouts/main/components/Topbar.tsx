import { http } from "@/common/services/axios";
import { IoArrowBack } from "react-icons/io5";
import LogoutIcon from "@mui/icons-material/Logout";
import useOutsideClick from "@/common/hooks/useOutSideClick";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "@/features/auth/store/slice";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  backable?: boolean;
};

export default function Topbar({ children, backable = false }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

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
          <div
            className="w-14 h-14 bg-quill-gray rounded-full cursor-pointer relative border-2 border-transparent hover:border-pastel-orange"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            <ExpandedUserDropdown
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
            />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

interface IExpandedUserDropdown {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

function ExpandedUserDropdown({
  isExpanded,
  setIsExpanded,
}: IExpandedUserDropdown) {
  const dispatch = useDispatch<StoreDispatch>();
  const navigate = useNavigate();

  async function logout() {
    try {
      await http.get("/logout");
      dispatch(logOut());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }

  const handleClickOutside = () => {
    setIsExpanded(false);
  };
  const ref = useOutsideClick(handleClickOutside);
  if (!isExpanded) {
    return <></>;
  }

  return (
    <div
      ref={ref}
      className="w-[150px] bg-main-white rounded-md shadow-md absolute top-12 right-0 overflow-clip"
    >
      <div
        className="w-full flex justify-start items-center px-4 py-3 gap-2 bg-main-white hover:bg-light-gray"
        onClick={logout}
      >
        <LogoutIcon />
        <div className="font-semibold">Logout</div>
      </div>
    </div>
  );
}
