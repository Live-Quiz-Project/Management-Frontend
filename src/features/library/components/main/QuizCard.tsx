import BaseDialogue from "@/common/components/dialogues/BaseDialogue";
import useTypedSelector from "@/common/hooks/useTypedSelector";
import { useState } from "react";
import { IoMdMore } from "react-icons/io";

type Props = {
  quiz: Quiz;
};

export default function QuizCard({ quiz }: Props) {
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
      onClick: () => console.log("Edit"),
    },
    {
      label: "History",
      onClick: () => console.log("history"),
    },
    {
      label: "Delete",
      onClick: () => console.log("Delete"),
    },
  ];

  return (
    <div className="grid grid-cols-12 bg-peach rounded-xl items-center">
      <img
        src=""
        alt=""
        className="col-span-2 w-full aspect-video object-cover p-1 pr-8 rounded-lg"
      />
      <h1 className="col-span-4">{quiz.title}</h1>
      <p className="col-span-3">{quiz.creatorId}</p>
      <div className="col-span-3 flex justify-between">
        <p className="">{quiz.description}</p>
        <div className="relative mr-2 flex items-center">
          <button onClick={() => setIsDialogueOpen((prev) => !prev)}>
            <IoMdMore className="w-6 h-6" />
          </button>
          <BaseDialogue
            className="right-0 top-full"
            menus={menus}
            isOpen={isDialogueOpen}
            setIsOpen={setIsDialogueOpen}
          />
        </div>
      </div>
    </div>
  );
}
