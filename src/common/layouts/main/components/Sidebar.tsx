import { TbHome, TbListDetails, TbHistory } from "react-icons/tb";
import { Link, RouteProps, matchRoutes, useLocation } from "react-router-dom";

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
  const routes = menus.map((menu) => ({
    path: menu.link,
  }));
  const [{ route }] = matchRoutes(routes, location) as { route: RouteProps }[];

  return (
    <div
      className={`flex flex-col h-full bg-light-gray p-2 rounded-xl justify-between text-body-1 ${className}`}
    >
      <ul className="space-y-1">
        {/* <img src="" alt="logo" className="" /> */}
        {menus.map((menu, i) => (
          <li key={i}>
            <Link
              to={menu.link}
              className={`flex items-center space-x-2 h-10 rounded-lg px-3 w-44 ${
                route?.path === "/" && i === 0 && "bg-peach"
              } ${route?.path === "/library" && i === 1 && "bg-peach"} ${
                route?.path === "/history" && i === 2 && "bg-peach"
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
