import appLogo from "../../../assets/app_logo.png";

type Props = {
  page?: string;
};

export default function LeftPanel({ page = "login" }: Props) {
  return (
    <div
      className={`h-dscreen flex items-center justify-center ${
        page === "login" && "bg-koromiko"
      } ${page === "register" && "bg-denim"} ${
        (page === "forgot" || page === "reset" || page === "verify-otp") &&
        "bg-jordy-blue"
      }`}
    >
      <div className="flex justify-center items-center w-2/3">
        <img src={appLogo} alt="App Logo" />
      </div>
    </div>
  );
}
