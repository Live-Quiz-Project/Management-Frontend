type Props = {
  page?: string;
};

export default function LeftPanel({ page = "login" }: Props) {
  return (
    <div
      className={`h-dscreen ${page === "login" && "bg-pastel-orange"} ${
        page === "register" && "bg-ocean-blue"
      } ${(page === "forgot" || page === "reset") && "bg-sky-blue"}`}
    ></div>
  );
}
