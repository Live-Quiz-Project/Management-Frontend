import defaultImage from "../../../common/assets/default_image.png";

type Props = {
  quiz: Quiz;
};

export default function MyQuizCard({ quiz }: Props) {
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
    <div className="grid grid-rows-[auto_auto] items-center w-72 h-full bg-karry rounded-xl px-1 py-1 overflow-hidden">
      <img
        src={getCoverImage(quiz.coverImg)}
        alt="Cover image"
        className="w-full aspect-video object-cover p-1 rounded-lg"
      />
      {quiz.title}
    </div>
  );
}
