import { TbHome, TbListDetails, TbHistory } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import appLogo from "../../../assets/app_logo.png";

type Props = {
  className?: string;
};

export default function Sidebar({ className = "" }: Props) {
  const menus = [
    {
      icon: <TbHome className="h-5 w-5" />,
      label: "Home",
      link: "/",
    },
    {
      icon: <TbListDetails className="h-5 w-5" />,
      label: "Library",
      link: "/library",
    },
    {
      icon: <TbHistory className="h-5 w-5" />,
      label: "History",
      link: "/history",
    },
  ];

  const location = useLocation();

  if (
    !menus.reduce(
      (acc, menu) =>
        menu.link.slice(1) === location.pathname.split("/")[1]
          ? menu.link.slice(1) === location.pathname.split("/")[1]
          : acc,
      false
    )
  )
    return null;

  return (
    <div
      className={`flex flex-col h-full bg-quill-gray p-2 rounded-xl justify-between text-body-1 ${className}`}
    >
      <ul className="space-y-1">
        {/* <img src={appLogo} alt="logo" className="w-1/12" /> */}
        {menus &&
          menus.map((menu, i) => (
            <li key={i}>
              <Link
                to={menu.link}
                className={`flex items-center space-x-2 h-10 rounded-lg px-3 w-44 ${
                  location.pathname.split("/")[1] === "" &&
                  i === 0 &&
                  "bg-egg-sour"
                } ${
                  location.pathname.split("/")[1] === "library" &&
                  i === 1 &&
                  "bg-egg-sour"
                } ${
                  location.pathname.split("/")[1] === "history" &&
                  i === 2 &&
                  "bg-egg-sour"
                }`}
              >
                {menu.icon}
                <p className="">{menu.label}</p>
              </Link>
            </li>
          ))}
      </ul>
      <ul className="flex flex-col px-3 py-1 space-y-1">
        <li>
          <Link to="/help" className="w-min">
            Help
          </Link>
        </li>
        <li>
          <Link to="/setting" className="w-min">
            Setting
          </Link>
        </li>
      </ul>
    </div>
  );
}
