import ReactLoading from "react-loading";

export function Loading() {
  return (
    <div className="flex justify-center loading">
      <ReactLoading
        type="spinningBubbles"
        color="#FFCC70"
        height={100}
        width={100}
      />
    </div>
  );
}
