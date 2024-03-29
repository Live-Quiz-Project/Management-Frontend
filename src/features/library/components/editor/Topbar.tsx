import {
  IoArrowBack,
  IoInformationCircleOutline,
  IoInformationCircleSharp,
  IoChevronDown,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { privateHttp as http } from "@/common/services/axios";
import FilledButton from "@/common/components/buttons/FilledButton";
import EditableLabel from "@/common/components/inputs/EditableLabel";
import useTypedSelector from "@/common/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import {
  setCurPage,
  setError,
  setQuiz,
  setSavable,
} from "@/features/library/store/slice";
import { FormEvent, useState } from "react";
import QuestionTypesEnum from "@/features/library/utils/enums/question-types";
import BaseModal from "@/common/components/modals/BaseModal";

type Props = {
  className?: string;
};

export default function Topbar({ className = "" }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch<StoreDispatch>();
  const auth = useTypedSelector((state) => state.auth);
  const editor = useTypedSelector((state) => state.editor);
  const [isCanceling, setIsCanceling] = useState<boolean>(false);
  const [isButtonsExpanded, setIsButtonsExpanded] = useState<boolean>(false);

  async function onSubmit(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (editor.value.quiz!.title === "") {
      dispatch(setError("Please enter title"));
      return;
    }

    if (editor.value.quiz!.questions.length <= 0) {
      dispatch(setError("Please add at least one question"));
      return;
    }

    let nah = false;
    editor.value.quiz!.questions.forEach((question, i) => {
      if (question.content === "") {
        dispatch(setError(`Please enter content for question ${i + 1}`));
        nah = true;
      }
      if (
        question.type !== QuestionTypesEnum.PARAGRAPH &&
        question.options.length < 0
      ) {
        dispatch(
          setError(`Please add at least one option for question ${i + 1}`)
        );
        nah = true;
      }
      if (
        question.type === QuestionTypesEnum.CHOICE ||
        question.type === QuestionTypesEnum.TRUE_FALSE
      ) {
        let haveCorrectAnswer = false;
        question.options.forEach((option) => {
          if ((option as ChoiceOption).content === "") {
            dispatch(
              setError(
                `Please enter content for option ${i + 1} in question ${i + 1}`
              )
            );
            nah = true;
          }
          if ((option as ChoiceOption).isCorrect) {
            haveCorrectAnswer = true;
          }
        });
        if (!haveCorrectAnswer) {
          dispatch(
            setError(`Please select correct answer for question ${i + 1}`)
          );
          nah = true;
        }
      }
      if (question.type === QuestionTypesEnum.MATCHING) {
        let optionsPrompts = [...(question.options as MatchingOption[])].filter(
          (o) => o.type === "MATCHING_PROMPT"
        ) as MatchingOptionPrompt[];
        let optionsOptions = [...(question.options as MatchingOption[])].filter(
          (o) => o.type === "MATCHING_OPTION"
        ) as MatchingOptionOption[];
        let optionsAnswers = [...(question.options as MatchingOption[])].filter(
          (o) => o.type === "MATCHING_ANSWER"
        ) as MatchingOptionAnswer[];

        if (optionsPrompts.length < 1) {
          dispatch(
            setError(`Please add at least one prompt for question ${i + 1}`)
          );
          nah = true;
        }
        if (optionsOptions.length < 1) {
          dispatch(
            setError(`Please add at least one option for question ${i + 1}`)
          );
          nah = true;
        }
        optionsPrompts.forEach((prompt, j) => {
          if (prompt.content === "") {
            dispatch(
              setError(
                `Please enter content for prompt ${j + 1} in question ${i + 1}`
              )
            );
            nah = true;
          }
        });
        optionsOptions.forEach((option, j) => {
          if (option.content === "") {
            dispatch(
              setError(
                `Please enter content for option ${j + 1} in question ${i + 1}`
              )
            );
            nah = true;
          }
        });
        optionsAnswers.forEach((answer) => {
          if (answer.optionOrder < 1) {
            dispatch(
              setError(
                `Please select matched option for prompt ${
                  answer.promptOrder
                } in question ${i + 1}`
              )
            );
            nah = true;
          }
        });
      }
    });
    if (nah) return;

    dispatch(setSavable(true));
    dispatch(setError(null));

    const submittedQuiz = {
      id: editor.value.quiz!.id,
      title: editor.value.quiz!.title,
      description: editor.value.quiz!.description,
      cover_image: editor.value.quiz!.coverImg,
      visibility: editor.value.quiz!.visibility,
      time_limit: +editor.value.quiz!.timeLimit,
      have_time_factor: editor.value.quiz!.haveTimeFactor,
      time_factor: +editor.value.quiz!.timeFactor,
      font_size: editor.value.quiz!.fontSize,
      mark: +editor.value.quiz!.mark,
      case_sensitive: editor.value.quiz!.caseSensitive ? true : false,
      questions: editor.value.quiz!.questions.map((question) => {
        return {
          id: question.id || null,
          is_in_pool: question.isInPool,
          pool_order: question.pool,
          pool_required: question.poolRequired,
          type: question.type,
          order: question.order,
          content: question.content,
          note: question.note,
          media_type: question.mediaType,
          media: question.media,
          use_template: question.useTemplate,
          time_limit: +question.timeLimit,
          have_time_factor: question.haveTimeFactor,
          time_factor: +question.timeFactor,
          font_size: question.fontSize,
          layout_idx: question.layout,
          select_min: question.selectMin,
          select_max: question.selectMax,
          options: question.options.map((option) => {
            if (
              question.type === QuestionTypesEnum.CHOICE ||
              question.type === QuestionTypesEnum.TRUE_FALSE
            ) {
              return {
                id: (option as ChoiceOption).id || null,
                order: (option as ChoiceOption).order,
                color: (option as ChoiceOption).color,
                content: (option as ChoiceOption).content,
                mark: +(option as ChoiceOption).mark,
                correct: (option as ChoiceOption).isCorrect,
              };
            } else if (
              question.type === QuestionTypesEnum.PARAGRAPH ||
              question.type === QuestionTypesEnum.FILL_BLANK
            ) {
              return {
                id: (option as TextOption).id || null,
                order: (option as TextOption).order,
                content: (option as TextOption).content,
                mark: +(option as TextOption).mark,
                case_sensitive: (option as TextOption).caseSensitive
                  ? true
                  : false,
              };
            } else if (question.type === QuestionTypesEnum.MATCHING) {
              if ((option as MatchingOption).type === "MATCHING_PROMPT") {
                return {
                  id: (option as MatchingOptionPrompt).id || null,
                  type: "MATCHING_PROMPT",
                  content: (option as MatchingOptionPrompt).content,
                  color: (option as MatchingOptionPrompt).color,
                  order: (option as MatchingOptionPrompt).order,
                  eliminate: (option as MatchingOptionPrompt).eliminate,
                };
              } else if (
                (option as MatchingOption).type === "MATCHING_OPTION"
              ) {
                return {
                  id: (option as MatchingOptionOption).id || null,
                  type: "MATCHING_OPTION",
                  content: (option as MatchingOptionOption).content,
                  color: (option as MatchingOptionOption).color,
                  order: (option as MatchingOptionOption).order,
                  eliminate: (option as MatchingOptionOption).eliminate,
                };
              } else if (
                (option as MatchingOption).type === "MATCHING_ANSWER"
              ) {
                return {
                  id: (option as MatchingOptionAnswer).id || null,
                  type: "MATCHING_ANSWER",
                  prompt: (option as MatchingOptionAnswer).promptOrder,
                  option: (option as MatchingOptionAnswer).optionOrder,
                  mark: +(option as MatchingOptionAnswer).mark,
                };
              }
            }
          }),
        };
      }),
    };

    if (editor.value.mode === "edit") {
      try {
        http.put(`/quizzes/${editor.value.quiz!.id}`, submittedQuiz);
        navigate("/library", { replace: true });
      } catch (error) {
        alert(error);
      }
    } else {
      try {
        http.post("/quizzes", submittedQuiz);
        navigate("/library", { replace: true });
      } catch (error) {
        alert(error);
      }
    }
  }

  async function onStart(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      await onSubmit(e);
    } catch (error) {
      console.log(error);
    }

    window.open(
      `${import.meta.env.VITE_LIVE_QUIZ_URL}?token=${auth.value.token}&qid=${
        editor.value.quiz!.id
      }`
    );
  }

  async function onCancel(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(setCurPage(0));
    dispatch(setQuiz(null));
    setIsCanceling(false);
    navigate("/library", { replace: true });
  }

  return (
    <>
      <div
        className={`w-full h-12 md:h-16 flex items-center justify-between px-4 space-x-2 ${className}`}
      >
        <div className="flex items-center justify-center space-x-2 md:space-x-4 truncate relative">
          <button
            onClick={() => setIsCanceling(true)}
            type="button"
            className=""
          >
            <IoArrowBack className="w-4 md:w-5 h-4 md:h-5" />
          </button>
          <EditableLabel
            className="flex-1 text-header-2"
            value={editor.value.quiz!.title}
            onChange={(e) => {
              e.preventDefault();
              dispatch(
                setQuiz({
                  ...editor.value.quiz!,
                  title: e.currentTarget.innerText,
                })
              );
            }}
            placeholder="Enter quiz title..."
            truncate
          />
          <button
            onClick={() => dispatch(setCurPage(0))}
            type="button"
            className=""
          >
            {editor.value.curPage === 0 ? (
              <IoInformationCircleSharp className="w-6 h-6" />
            ) : (
              <IoInformationCircleOutline className="w-6 h-6" />
            )}
          </button>
        </div>
        <button
          className="block md:hidden"
          onClick={() => setIsButtonsExpanded(!isButtonsExpanded)}
        >
          <IoChevronDown
            className={`w-4 md:w-5 h-4 md:h-5 transition-all duration-300 ${
              isButtonsExpanded ? "rotate-180" : ""
            }`}
          />
        </button>
        <div
          className={`${
            isButtonsExpanded ? "grid" : "hidden"
          } bg-sienna/10 md:bg-transparent z-10 md:z-auto rounded-xl backdrop-blur-md md:backdrop-blur-0 absolute top-10 right-2.5 p-2 md:p-0 space-y-2 md:space-y-0 md:static md:flex items-center justify-center space-x-0 md:space-x-2`}
        >
          {editor.value.error && (
            <p className="text-red-500 text-header-3 text-scarlet animate-bounce">
              {editor.value.error}
            </p>
          )}
          <FilledButton
            type="button"
            onClick={onSubmit}
            className="bg-koromiko w-full md:w-max"
          >
            {editor.value.mode === "create" ? "Create" : "Save"}
          </FilledButton>
          <FilledButton
            type="button"
            onClick={onStart}
            className="text-white bg-sienna !px-4 !rounded-full w-full md:w-max"
          >
            Start Quiz
          </FilledButton>
        </div>
      </div>
      {isCanceling && (
        <BaseModal
          setIsOpen={setIsCanceling}
          className="!p-6 md:!p-10 xl:!p-16 flex flex-col space-y-6 xl:space-y-10 !rounded-3xl !bg-beige font-sans-serif z-20"
        >
          <p className="text-header-1 truncate text-center font-semibold text-wrap leading-tight">
            Are you sure you want to cancel&nbsp;
            {editor.value.mode === "create"
              ? "creating quiz"
              : "editing quiz"}{" "}
            this question?
          </p>
          <div className="flex justify-center items-center space-x-2">
            <FilledButton
              type="button"
              onClick={() => setIsCanceling(false)}
              className="border border-regent-gray box-border"
            >
              <p className="text-body-1 truncate">Not now</p>
            </FilledButton>
            <FilledButton
              type="button"
              onClick={onCancel}
              className="bg-sienna text-white"
            >
              <p className="text-body-1 truncate">
                Cancel&nbsp;
                {editor.value.mode === "create"
                  ? "creating quiz"
                  : "editing quiz"}
              </p>
            </FilledButton>
          </div>
        </BaseModal>
      )}
    </>
  );
}
