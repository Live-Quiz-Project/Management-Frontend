import BaseDialogue from "@/common/components/dialogues/BaseDialogue";
import useTypedSelector from "@/common/hooks/useTypedSelector";
import { useState } from "react";
import { IoMdMore } from "react-icons/io";
import defaultImage from "../../../../common/assets/default_image.png";
import { useDispatch } from "react-redux";
import { setCurPage, setMode, setQuiz } from "../../store/slice";
import { useNavigate } from "react-router-dom";
import { privateHttp as http } from "@/common/services/axios";

type Props = {
  quiz: Quiz;
};

export default function QuizCard({ quiz }: Props) {
  const dispatch = useDispatch<StoreDispatch>();
  const navigate = useNavigate();
  const auth = useTypedSelector((state) => state.auth);
  const [isDialogueOpen, setIsDialogueOpen] = useState<boolean>(false);
  const menus = [
    {
      label: "Start",
      onClick: () =>
        window.open(
          `${import.meta.env.VITE_LIVE_QUIZ_URL}?token=${
            auth.value.token
          }&qid=${quiz.id}`
        ),
    },
    {
      label: "Edit",
      onClick: () => {
        dispatch(setMode("create"));
        dispatch(setCurPage(0));
        dispatch(setQuiz(quiz));
        navigate(`/library/quiz/${quiz.id}`);
      },
    },
    {
      label: "Delete",
      onClick: async () => {
        try {
          await http.delete(`/quizzes/${quiz.id}`);
          navigate(0);
        } catch (error) {
          console.error(error);
        }
      },
    },
  ];

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
    <div className="grid grid-cols-12 bg-egg-sour rounded-xl items-center h-40">
      <img
        src={getCoverImage(quiz.coverImg)}
        alt="Cover image"
        className="col-span-2 w-full h-full object-cover p-1 pr-8 rounded-2xl"
      />
      <h1 className="text-header-2 col-span-4">{quiz.title}</h1>
      <p className="text-header-2 col-span-3">{quiz.creatorName}</p>
      <div className="text-header-2 col-span-3 flex justify-between">
        <p className="text-header-2">
          {quiz.description ? (
            quiz.description
          ) : (
            <em className="text-regent-gray">No description</em>
          )}
        </p>
        <div className="relative mr-2 flex items-center">
          <button onClick={() => setIsDialogueOpen((prev) => !prev)}>
            <IoMdMore className="w-6 h-6" />
          </button>
          <BaseDialogue
            className="right-0 top-full z-10"
            menus={menus}
            isOpen={isDialogueOpen}
            setIsOpen={setIsDialogueOpen}
          />
        </div>
      </div>
    </div>
  );
}
