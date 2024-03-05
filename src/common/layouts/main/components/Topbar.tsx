import { http } from "@/common/services/axios";
import { IoArrowBack } from "react-icons/io5";
import LogoutIcon from "@mui/icons-material/Logout";
import useOutsideClick from "@/common/hooks/useOutSideClick";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "@/features/auth/store/slice";
import { useNavigate } from "react-router-dom";
import useTypedSelector from "@/common/hooks/useTypedSelector";
import defaultProfile from "../../../assets/default_profile.png";

type Props = {
  children: React.ReactNode;
  backable?: boolean;
  title?: string;
  backFunction?: () => void;
};

export default function Topbar({
  children,
  backable = false,
  title,
  backFunction,
}: Props) {
  const auth = useTypedSelector((state) => state.auth);
  const [isExpanded, setIsExpanded] = useState(false);

  const getProfileImage = (image: string) => {
    if (image === null || image === "") {
      return defaultProfile;
    } else {
      return `${
        import.meta.env.VITE_FIREBASE_STORAGE_BASE_URL
      }/${encodeURIComponent(image)}?alt=media`;
    }
  };

  return (
    <div className="flex-1 overflow-auto flex flex-col p-5 space-y-4">
      <div
        className={`flex items-center ${
          backable ? "justify-between" : "justify-end"
        } ${title ? "justify-between" : "justify-end"}`}
      >
        {backable && (
          <button className="" onClick={backFunction}>
            <IoArrowBack className="w-6 h-6" />
          </button>
        )}
        <p className="font-sans-serif text-4xl font-medium">{title}</p>
        <div className="flex bg-denim rounded-full justify-end">
          <div className="flex flex-col pl-6">
            <p className="pr-2 font-sans-serif text-white">
              {auth.value.user.name}
            </p>
            <p className="pr-2 font-sans-serif text-white text-sm">
              {auth.value.user.email}
            </p>
          </div>
          <div
            className="w-14 h-14 bg-quill-gray rounded-full cursor-pointer relative border-2 border-transparent hover:border-pastel-orange"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            <img
              src={getProfileImage(auth.value.user.image)}
              className="w-full h-full object-cover rounded-full"
            />
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
  const auth = useTypedSelector((state) => state.auth);
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
      className="w-[150px] bg-white rounded-md shadow-md absolute top-14 right-0 overflow-clip z-10"
    >
      <div className="w-full flex-col justify-start items-center px-4 py-3 gap-2 bg-main-white">
        <div className="font-light">{auth.value.user.name}</div>
      </div>
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
