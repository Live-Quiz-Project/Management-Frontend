import BaseDialogue from "@/common/components/dialogues/BaseDialogue";
import useTypedSelector from "@/common/hooks/useTypedSelector";
import { useState } from "react";
import { IoMdMore } from "react-icons/io";
import defaultImage from "@/common/assets/default_image.png";
import { useDispatch } from "react-redux";
import { setCurPage, setMode, setQuiz } from "@/features/library/store/slice";
import { useNavigate } from "react-router-dom";
import { privateHttp as http } from "@/common/services/axios";
import QuestionTypesEnum from "../../utils/enums/question-types";

type Props = {
  quiz: {
    id: string;
    title: string;
    description: string;
    creatorName: string;
    coverImg: string;
  };
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
      onClick: async () => {
        const { data } = await http.get(`/quizzes/${quiz.id}`);
        dispatch(setMode("edit"));
        dispatch(setCurPage(0));
        dispatch(
          setQuiz({
            id: data.id,
            title: data.title,
            description: data.description,
            creatorId: data.creator_id,
            creatorName: data.creator_name,
            coverImg: data.cover_image,
            caseSensitive: data.case_sensitive,
            fontSize: data.font_size,
            mark: data.mark.toString(),
            haveTimeFactor: data.have_time_factor,
            timeFactor: data.time_factor.toString(),
            timeLimit: data.time_limit.toString(),
            visibility: data.visibility,
            created_at: data.created_at,
            questions: data.questions
              ? data.questions.map((question: any) => ({
                  id: question.id,
                  isInPool: question.pool_order > -1,
                  pool: question.pool_order,
                  poolRequired: question.pool_required,
                  type: question.type,
                  order: question.order,
                  content: question.content,
                  note: question.note,
                  mediaType: question.media_type,
                  media: question.media,
                  useTemplate: question.use_template,
                  timeLimit: question.time_limit,
                  haveTimeFactor: question.have_time_factor,
                  timeFactor: question.time_factor,
                  fontSize: question.font_size,
                  layout: question.layout_idx,
                  selectMin: question.select_min,
                  selectMax: question.select_max,
                  caseSensitive: question.case_sensitive,
                  options: question.options
                    ? question.options.map((option: any) => {
                        if (
                          question.type === QuestionTypesEnum.CHOICE ||
                          question.type === QuestionTypesEnum.TRUE_FALSE
                        ) {
                          return {
                            id: option.id,
                            order: option.order,
                            color: option.color,
                            content: option.content,
                            mark: option.mark.toString(),
                            isCorrect: option.correct,
                          };
                        } else if (
                          question.type === QuestionTypesEnum.PARAGRAPH ||
                          question.type === QuestionTypesEnum.FILL_BLANK
                        ) {
                          return {
                            id: option.id,
                            order: option.order,
                            content: option.content,
                            mark: option.mark.toString(),
                            case_sensitive: option.case_sensitive,
                          };
                        } else if (
                          question.type === QuestionTypesEnum.MATCHING
                        ) {
                          if (
                            (option as MatchingOption).type ===
                            "MATCHING_PROMPT"
                          ) {
                            return {
                              id: option.id,
                              type: "MATCHING_PROMPT",
                              content: option.content,
                              color: option.color,
                              order: option.order,
                              eliminate: option.eliminate,
                            };
                          } else if (
                            (option as MatchingOption).type ===
                            "MATCHING_OPTION"
                          ) {
                            return {
                              id: option.id,
                              type: "MATCHING_OPTION",
                              content: option.content,
                              color: option.color,
                              order: option.order,
                              eliminate: option.eliminate,
                            };
                          } else if (
                            (option as MatchingOption).type ===
                            "MATCHING_ANSWER"
                          ) {
                            return {
                              id: option.id,
                              type: "MATCHING_ANSWER",
                              promptOrder: option.prompt_order,
                              optionOrder: option.option_order,
                              mark: option.mark.toString(),
                            };
                          }
                        }
                      })
                    : [],
                }))
              : [],
          })
        );
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
    <div className="grid grid-cols-[2fr_3fr_2fr_2fr] bg-egg-sour rounded-xl items-center h-40 text-body-1">
      <div className="w-full h-full overflow-hidden">
        <img
          src={getCoverImage(quiz.coverImg)}
          alt="Cover image"
          className="w-full h-full object-cover p-1 pr-8 rounded-2xl max-w-72"
        />
      </div>
      <h1>{quiz.title}</h1>
      <p>{quiz.creatorName}</p>
      <div className="flex justify-between">
        <p>
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
