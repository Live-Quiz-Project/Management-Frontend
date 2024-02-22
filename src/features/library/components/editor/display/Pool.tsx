import useTypedSelector from "@/common/hooks/useTypedSelector";
import { setCurPage, setQuestion } from "@/features/library/store/slice";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineMessage, AiFillMessage } from "react-icons/ai";
import { MathJax } from "better-react-mathjax";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/common/services/firebase";
import { BiSwim } from "react-icons/bi";
import MediaTypesEnum from "@/features/library/utils/enums/media-types";
import BaseTextarea from "@/common/components/textareas/BaseTextarea";
import EditableLabel from "@/common/components/inputs/EditableLabel";
import QUESTION_TYPES from "@/features/library/utils/constants/question-types";
import QuestionTypesEnum from "@/features/library/utils/enums/question-types";
import BLANK_IDENTIFIER from "@/features/library/utils/constants/blank-identifier";

type Props = {
  className?: string;
  canvasSize: {
    width: number;
    height: number;
  };
};

export default function Pool({ className = "", canvasSize }: Props) {
  const editor = useTypedSelector((state) => state.editor);
  const dispatch = useDispatch<StoreDispatch>();
  const noteRef = useRef<HTMLDivElement>(null);
  const [imageURL, setImageURL] = useState<string>("");
  const [isNoteOpened, setIsNoteOpened] = useState<boolean>(false);
  const [mode, setMode] = useState<"Pool Question" | "Subquestions">(
    "Pool Question"
  );
  const subquestions = editor.value
    .quiz!.questions.slice(
      editor.value.quiz!.questions[editor.value.curPage - 1].order
    )
    .reduce(
      (acc, question) => {
        if (!question.isInPool) {
          acc.stop = true;
          return acc;
        }
        if (!acc.stop) acc.subq.push(question);
        return acc;
      },
      { subq: [] as Question[], stop: false }
    ).subq;
  const responsiveSpaceX =
    editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 0
      ? canvasSize.width * 0.025
      : editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 1
      ? canvasSize.width * 0.027
      : editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 2
      ? canvasSize.width * 0.03
      : editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 3
      ? canvasSize.width * 0.032
      : canvasSize.width * 0.035;
  const responsiveFontSize =
    editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 0
      ? canvasSize.width * 0.022
      : editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 1
      ? canvasSize.width * 0.027
      : editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 2
      ? canvasSize.width * 0.032
      : editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 3
      ? canvasSize.width * 0.035
      : canvasSize.width * 0.037;
  const noteIconSize =
    editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 0
      ? canvasSize.width * 0.022
      : editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 1
      ? canvasSize.width * 0.027
      : editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 2
      ? canvasSize.width * 0.032
      : editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 3
      ? canvasSize.width * 0.037
      : canvasSize.width * 0.042;
  const subquestionsContainerGridTemplate =
    editor.value.quiz!.questions[editor.value.curPage - 1].layout === 0 ||
    editor.value.quiz!.questions[editor.value.curPage - 1].layout === 1
      ? editor.value.quiz!.questions[editor.value.curPage - 1].media
        ? "grid-cols-2"
        : "grid-cols-1"
      : editor.value.quiz!.questions[editor.value.curPage - 1].layout === 2
      ? editor.value.quiz!.questions[editor.value.curPage - 1].media
        ? "grid-rows-[1fr_auto]"
        : "grid-rows-1"
      : editor.value.quiz!.questions[editor.value.curPage - 1].media
      ? "grid-rows-[auto_1fr]"
      : "grid-rows-1";
  const subquestionsContainerGridFormat =
    editor.value.quiz!.questions[editor.value.curPage - 1].layout === 0
      ? editor.value.quiz!.questions[editor.value.curPage - 1].media
        ? "col-start-2 row-start-1"
        : "col-start-1 row-start-1"
      : editor.value.quiz!.questions[editor.value.curPage - 1].layout === 1
      ? "col-start-1 row-start-1"
      : editor.value.quiz!.questions[editor.value.curPage - 1].layout === 2
      ? editor.value.quiz!.questions[editor.value.curPage - 1].media
        ? "row-start-2 col-start-1"
        : "row-start-1 col-start-1"
      : "row-start-1 col-start-1";
  const questionTextAlign = editor.value.quiz!.questions[
    editor.value.curPage - 1
  ].media
    ? editor.value.quiz!.questions[editor.value.curPage - 1].layout === 0
      ? "left"
      : editor.value.quiz!.questions[editor.value.curPage - 1].layout === 1
      ? "right"
      : "center"
    : "center";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (noteRef.current && !noteRef.current.contains(e.target as Node)) {
        setIsNoteOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (
      editor.value.quiz!.questions[editor.value.curPage - 1].media &&
      (editor.value.quiz!.questions[editor.value.curPage - 1].mediaType ===
        MediaTypesEnum.IMAGE ||
        editor.value.quiz!.questions[editor.value.curPage - 1].mediaType ===
          MediaTypesEnum.VIDEO ||
        editor.value.quiz!.questions[editor.value.curPage - 1].mediaType ===
          MediaTypesEnum.AUDIO)
    ) {
      (async () => {
        try {
          const url = await getDownloadURL(
            ref(
              storage,
              editor.value.quiz!.questions[editor.value.curPage - 1].media
            )
          );
          setImageURL(url);
        } catch (error) {
          alert(error);
        }
      })();
    }
  }, [editor.value.quiz!.questions[editor.value.curPage - 1].media]);

  return (
    <div
      className={`relative grid grid-rows-[auto_1fr] auto-rows-auto h-full w-full font-sans-serif p-[2%] bg-egg-sour ${className}`}
    >
      <div
        className={`grid grid-cols-3 items-center px-[2.5%] pt-[2%] pb-[1%] bg-quartz rounded-t-lg sm:rounded-t-xl lg:rounded-t-2xl 2xl:rounded-t-3xl ${
          editor.value.quiz!.questions[editor.value.curPage - 1].selectMax > 1
            ? "pb-[1%]"
            : ""
        }`}
        style={{ columnGap: responsiveSpaceX, rowGap: responsiveSpaceX * 0.1 }}
      >
        <BiSwim
          className="text-denim"
          style={{ width: noteIconSize * 1.2, height: noteIconSize * 1.2 }}
        />
        <div
          className={`place-self-center text-denim h-[2em] ${
            editor.value.quiz!.questions[editor.value.curPage - 1].fontSize ===
            0
              ? "w-[13.5em]"
              : editor.value.quiz!.questions[editor.value.curPage - 1]
                  .fontSize === 1
              ? "w-[16.5em]"
              : editor.value.quiz!.questions[editor.value.curPage - 1]
                  .fontSize === 2
              ? "w-[19.5em]"
              : editor.value.quiz!.questions[editor.value.curPage - 1]
                  .fontSize === 3
              ? "w-[21.5em]"
              : "w-[22.5em]"
          }`}
          style={{
            fontSize:
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .fontSize === 0
                ? responsiveFontSize * 0.7
                : editor.value.quiz!.questions[editor.value.curPage - 1]
                    .fontSize === 1
                ? responsiveFontSize * 0.58
                : editor.value.quiz!.questions[editor.value.curPage - 1]
                    .fontSize === 2
                ? responsiveFontSize * 0.48
                : editor.value.quiz!.questions[editor.value.curPage - 1]
                    .fontSize === 3
                ? responsiveFontSize * 0.44
                : responsiveFontSize * 0.42,
          }}
        >
          <div className="relative h-full w-full">
            <span
              className={`block absolute top-1/2 -translate-y-1/2 text-transparent px-[1em] py-[0.5em] leading-tight bg-beige rounded-full w-max h-fit ${
                mode === "Pool Question"
                  ? "left-0"
                  : "left-full -translate-x-full"
              } transition-all duration-300`}
              style={{ fontSize: responsiveFontSize * 0.6 }}
            >
              {mode}
            </span>
            <button
              type="button"
              className="absolute top-1/2 left-0 -translate-y-1/2 px-[1em] w-max h-full flex items-center justify-center"
              style={{ fontSize: responsiveFontSize * 0.6 }}
              onClick={() => setMode("Pool Question")}
            >
              Pool Question
            </button>
            <button
              type="button"
              className="absolute top-1/2 right-0 -translate-y-1/2 px-[1em] w-max h-full flex items-center justify-center"
              style={{ fontSize: responsiveFontSize * 0.6 }}
              onClick={() => setMode("Subquestions")}
            >
              Subquestions
            </button>
          </div>
        </div>
        <div className="relative place-self-end h-full flex items-center">
          <button onClick={() => setIsNoteOpened(!isNoteOpened)} type="button">
            {!isNoteOpened && (
              <AiOutlineMessage
                className="text-denim"
                style={{ width: noteIconSize, height: noteIconSize }}
              />
            )}
            {isNoteOpened && (
              <AiFillMessage
                className="text-denim"
                style={{ width: noteIconSize, height: noteIconSize }}
              />
            )}
          </button>
          {isNoteOpened && (
            <div
              ref={noteRef}
              className="absolute top-full right-1/4 backdrop-blur-[180px] bg-white/80 z-20"
              style={{
                borderRadius: `${canvasSize.width * 0.025}px 0 ${
                  canvasSize.width * 0.025
                }px ${canvasSize.width * 0.025}px`,
                width: canvasSize.width * 0.5,
                height: canvasSize.height * 0.5,
              }}
            >
              <MathJax className="!flex w-full h-full items-center">
                <BaseTextarea
                  className="!bg-transparent !w-full !h-full !px-[5%] !py-[3%]"
                  style={{
                    fontSize: responsiveFontSize * 0.75,
                    borderRadius: `${canvasSize.width * 0.025}px 0 ${
                      canvasSize.width * 0.025
                    }px ${canvasSize.width * 0.025}px`,
                  }}
                  value={
                    editor.value.quiz!.questions[editor.value.curPage - 1].note
                  }
                  onChange={(e) => {
                    let newQuestion =
                      editor.value.quiz!.questions[editor.value.curPage - 1];
                    newQuestion = {
                      ...newQuestion,
                      note: e.currentTarget.value,
                    };
                    dispatch(setQuestion(newQuestion));
                  }}
                  placeholder="Enter note..."
                />
              </MathJax>
            </div>
          )}
        </div>
      </div>
      {mode === "Pool Question" && (
        <div
          className={`overflow-auto p-[3%] pt-0 grid ${subquestionsContainerGridTemplate} bg-quartz rounded-b-lg sm:rounded-b-xl lg:rounded-b-2xl 2xl:rounded-b-3xl w-full h-full`}
          style={{
            rowGap: responsiveSpaceX * 0.2,
            columnGap: responsiveSpaceX,
          }}
        >
          {editor.value.quiz!.questions[editor.value.curPage - 1].media &&
            editor.value.quiz!.questions[editor.value.curPage - 1].mediaType ===
              MediaTypesEnum.IMAGE && (
              <div className="w-full h-full overflow-hidden">
                <img
                  src={imageURL}
                  alt="question-img"
                  className="bg-beige border rounded-3xl object-contain w-full h-full"
                />
                {/* todo: video, audio, equation */}
              </div>
            )}
          <div
            className={`flex flex-col justify-between w-full h-full overflow-auto ${subquestionsContainerGridFormat}`}
          >
            <MathJax className="!flex font-medium tracking-tight my-auto">
              <EditableLabel
                className="w-full h-full !overflow-auto"
                style={{
                  fontSize: responsiveFontSize,
                  textAlign: questionTextAlign,
                }}
                placeholder="Enter question..."
                value={
                  editor.value.quiz!.questions[editor.value.curPage - 1].content
                }
                onChange={(e) => {
                  let newQuestion =
                    editor.value.quiz!.questions[editor.value.curPage - 1];
                  newQuestion = {
                    ...newQuestion,
                    content: e.currentTarget.innerText,
                  };
                  dispatch(setQuestion(newQuestion));
                }}
                onKeyPress={(e) => {
                  if (
                    e.key !== "Backspace" &&
                    e.key !== "ArrowUp" &&
                    e.key !== "ArrowDown" &&
                    e.key !== "ArrowRight" &&
                    e.key !== "ArrowLeft" &&
                    editor.value.quiz!.questions[editor.value.curPage - 1]
                      .content.length >= 200
                  ) {
                    e.preventDefault();
                    e.currentTarget.textContent =
                      e.currentTarget.innerText.slice(0, 200);
                  }
                }}
              />
            </MathJax>
          </div>
        </div>
      )}
      {mode === "Subquestions" && (
        <div
          className={`grid grid-cols-6 auto-rows-fr overflow-auto p-[3%] pt-0 bg-quartz rounded-b-lg sm:rounded-b-xl lg:rounded-b-2xl 2xl:rounded-b-3xl w-full h-full`}
          style={{ gap: responsiveSpaceX * 0.6 }}
        >
          {subquestions.map((subquestion) => (
            <button
              type="button"
              key={subquestion.order}
              onClick={() => dispatch(setCurPage(subquestion.order))}
              className={`relative bg-beige border px-[10%] py-[7%] flex justify-between flex-col items-end text-right rounded-md sm:rounded-lg lg:rounded-xl 2xl:rounded-2xl ${
                subquestions.length === 1
                  ? "col-span-6"
                  : subquestions.length === 2
                  ? "col-span-3"
                  : subquestions.length === 3
                  ? "col-span-2"
                  : subquestions.length === 4
                  ? "col-span-2 [&:nth-child(4)]:col-start-3"
                  : subquestions.length === 5
                  ? "col-span-2 [&:nth-child(4)]:col-start-2"
                  : "col-span-2"
              }`}
            >
              <div className="w-full">
                <p
                  className="text-regent-gray"
                  style={{ fontSize: responsiveFontSize * 0.5 }}
                >
                  {
                    QUESTION_TYPES.find((q) => q.value === subquestion.type)
                      ?.label
                  }
                </p>
                {subquestion.content ? (
                  subquestion.type !== QuestionTypesEnum.FILL_BLANK ? (
                    <p
                      className="truncate"
                      style={{ fontSize: responsiveFontSize }}
                    >
                      {subquestion.content}
                    </p>
                  ) : (
                    <p
                      className="truncate"
                      style={{ fontSize: responsiveFontSize }}
                    >
                      {subquestion.content
                        .split(BLANK_IDENTIFIER)
                        .map((item, index) => (
                          <span key={index}>
                            {item}
                            {index < subquestion.options.length && (
                              <span className="text-koromiko mx-1">
                                &#40;{String.fromCharCode(65 + index)}&#41;
                              </span>
                            )}
                          </span>
                        ))}
                    </p>
                  )
                ) : (
                  <p
                    className="truncate text-regent-gray leading-tight"
                    style={{ fontSize: responsiveFontSize }}
                  >
                    Enter Quesion...
                  </p>
                )}
              </div>
              <div
                className="text-regent-gray"
                style={{ fontSize: responsiveFontSize * 0.5 }}
              >
                {(subquestion.type === QuestionTypesEnum.CHOICE ||
                  subquestion.type === QuestionTypesEnum.TRUE_FALSE) && (
                  <p className="leading-tight">
                    {subquestion.options.length}&nbsp;Choices
                  </p>
                )}
                {subquestion.type === QuestionTypesEnum.FILL_BLANK && (
                  <p className="leading-tight">
                    {subquestion.options.length}&nbsp;Blanks
                  </p>
                )}
                {subquestion.type === QuestionTypesEnum.PARAGRAPH &&
                  subquestion.options.length > 0 &&
                  (subquestion.options[0] as TextOption).caseSensitive && (
                    <p className="leading-tight">Case Sensitive</p>
                  )}
                {subquestion.type === QuestionTypesEnum.MATCHING && (
                  <>
                    <p className="leading-tight">
                      {
                        (subquestion.options as MatchingOption[]).filter(
                          (o) => o.type === "MATCHING_PROMPT"
                        ).length
                      }
                      &nbsp;Prompts
                    </p>
                    <p className="leading-tight">
                      {
                        (subquestion.options as MatchingOption[]).filter(
                          (o) => o.type === "MATCHING_OPTION"
                        ).length
                      }
                      &nbsp;Options
                    </p>
                  </>
                )}
                {subquestion.poolRequired && (
                  <p className="leading-tight">
                    <em>Required</em>
                  </p>
                )}
              </div>
              <div
                className="absolute"
                style={{
                  bottom: responsiveSpaceX * 0.8,
                  left: responsiveSpaceX * 0.8,
                  width: responsiveSpaceX * 1.2,
                  height: responsiveSpaceX * 1.2,
                }}
              >
                <img src="" alt="" className="h-full w-full object-contain" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
