import defaultImage from "../../../common/assets/default_image.png";

type Props = {
  quiz: Quiz;
};

export default function RecentLiveCard({ quiz }: Props) {
  const getCoverImage = (coverImage: string) => {
    if (coverImage === null || coverImage === "") {
      return defaultImage;
    } else {
      return `${
        import.meta.env.VITE_FIREBASE_STORAGE_BASE_URL
      }/${encodeURIComponent(coverImage)}?alt=media`;
    }
  };

  return (
    <div className="flex flex-col items-center w-72 bg-karry rounded-xl px-1 py-1">
      <img
        src={defaultImage}
        alt="Cover image"
        className="w-full object-cover p-1 rounded-lg"
      />
      {quiz.title}
    </div>
  );
}
