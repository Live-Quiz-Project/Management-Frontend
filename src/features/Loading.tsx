import ReactLoading from "react-loading";

export function Loading() {
  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 bg-main-white flex justify-center items-center z-[100] loading`}
    >
      <ReactLoading
        type="spinningBubbles"
        color="#FFCC70"
        height={100}
        width={100}
      />
    </div>
  );
}
