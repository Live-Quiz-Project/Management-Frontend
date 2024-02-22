type Props = {
  page?: string;
};

export default function LeftPanel({ page = "login" }: Props) {
  return (
    <div
      className={`h-dscreen ${page === "login" && "bg-koromiko"} ${
        page === "register" && "bg-denim"
      } ${(page === "forgot" || page === "reset") && "bg-jordy-blue"}`}
    ></div>
  );
}
