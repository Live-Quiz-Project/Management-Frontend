import EditableLabel from "@/common/components/inputs/EditableLabel";
import useTypedSelector from "@/common/hooks/useTypedSelector";
import { setQuestion } from "@/features/library/store/slice";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineMessage, AiFillMessage } from "react-icons/ai";
import { FaXmark, FaCheck, FaQuestion } from "react-icons/fa6";
import { MathJax } from "better-react-mathjax";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/common/services/firebase";
import ChoiceButton from "@/features/library/components/editor/display/ChoiceButton";
import MediaTypesEnum from "@/features/library/utils/enums/media-types";
import BaseTextarea from "@/common/components/textareas/BaseTextarea";

type Props = {
  className?: string;
  canvasSize: {
    width: number;
    height: number;
  };
};

export default function TrueFalse({ className = "", canvasSize }: Props) {
  const editor = useTypedSelector((state) => state.editor);
  const dispatch = useDispatch<StoreDispatch>();
  const noteRef = useRef<HTMLDivElement>(null);
  const [imageURL, setImageURL] = useState<string>("");
  const [isNoteOpened, setIsNoteOpened] = useState<boolean>(false);
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
  const responsiveQuestionMarkSize =
    editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 0
      ? canvasSize.width * 0.032
      : editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 1
      ? canvasSize.width * 0.04
      : editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 2
      ? canvasSize.width * 0.045
      : editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 3
      ? canvasSize.width * 0.05
      : canvasSize.width * 0.057;
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
  const choicesContainerGridTemplate =
    editor.value.quiz!.questions[editor.value.curPage - 1].layout === 0
      ? editor.value.quiz!.questions[editor.value.curPage - 1].media
        ? "grid-cols-[8fr_3fr]"
        : "grid-cols-1"
      : editor.value.quiz!.questions[editor.value.curPage - 1].media
      ? "grid-rows-[2fr_1fr]"
      : "grid-rows-1";
  const choicesContainerGridFormat =
    editor.value.quiz!.questions[editor.value.curPage - 1].layout === 0
      ? `${
          (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as ChoiceOption[]
          ).length === 3
            ? "grid-rows-3"
            : (
                editor.value.quiz!.questions[editor.value.curPage - 1]
                  .options as ChoiceOption[]
              ).length === 4
            ? "grid-rows-4"
            : "grid-rows-10"
        } grid-flow-col auto-cols-fr ${
          (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as ChoiceOption[]
          ).length %
            5 ===
          1
            ? "[&>*:nth-last-child(1)]:row-start-5"
            : (
                editor.value.quiz!.questions[editor.value.curPage - 1]
                  .options as ChoiceOption[]
              ).length %
                5 ===
              2
            ? "[&>*:nth-last-child(2)]:row-start-4"
            : (
                editor.value.quiz!.questions[editor.value.curPage - 1]
                  .options as ChoiceOption[]
              ).length %
                5 ===
              3
            ? "[&>*:nth-last-child(3)]:row-start-3"
            : (
                editor.value.quiz!.questions[editor.value.curPage - 1]
                  .options as ChoiceOption[]
              ).length %
                5 ===
              4
            ? "[&>*:nth-last-child(4)]:row-start-2"
            : null
        }`
      : `${
          (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as ChoiceOption[]
          ).length === 3
            ? "grid-cols-3"
            : (
                editor.value.quiz!.questions[editor.value.curPage - 1]
                  .options as ChoiceOption[]
              ).length === 4
            ? "grid-cols-4"
            : "grid-cols-10"
        } auto-rows-fr ${
          (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as ChoiceOption[]
          ).length %
            5 ===
          1
            ? "[&>*:nth-last-child(1)]:col-start-5"
            : (
                editor.value.quiz!.questions[editor.value.curPage - 1]
                  .options as ChoiceOption[]
              ).length %
                5 ===
              2
            ? "[&>*:nth-last-child(2)]:col-start-4"
            : (
                editor.value.quiz!.questions[editor.value.curPage - 1]
                  .options as ChoiceOption[]
              ).length %
                5 ===
              3
            ? "[&>*:nth-last-child(3)]:col-start-3"
            : (
                editor.value.quiz!.questions[editor.value.curPage - 1]
                  .options as ChoiceOption[]
              ).length %
                5 ===
              4
            ? "[&>*:nth-last-child(4)]:col-start-2"
            : null
        }`;
  const choiceButtonGridFormat =
    editor.value.quiz!.questions[editor.value.curPage - 1].layout === 0
      ? `${
          (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as ChoiceOption[]
          ).length === 1
            ? "row-span-10 !row-start-1"
            : (
                editor.value.quiz!.questions[editor.value.curPage - 1]
                  .options as ChoiceOption[]
              ).length === 2
            ? "row-span-5 first:!row-start-1"
            : (
                editor.value.quiz!.questions[editor.value.curPage - 1]
                  .options as ChoiceOption[]
              ).length === 3
            ? "row-span-1 first:!row-start-1"
            : (
                editor.value.quiz!.questions[editor.value.curPage - 1]
                  .options as ChoiceOption[]
              ).length === 4
            ? "row-span-1 first:!row-start-1"
            : "row-span-2"
        }`
      : (
          editor.value.quiz!.questions[editor.value.curPage - 1]
            .options as ChoiceOption[]
        ).length === 1
      ? "col-span-10 !col-start-1"
      : (
          editor.value.quiz!.questions[editor.value.curPage - 1]
            .options as ChoiceOption[]
        ).length === 2
      ? "col-span-5 first:!col-start-1"
      : (
          editor.value.quiz!.questions[editor.value.curPage - 1]
            .options as ChoiceOption[]
        ).length === 3
      ? "col-span-1 first:!col-start-1"
      : (
          editor.value.quiz!.questions[editor.value.curPage - 1]
            .options as ChoiceOption[]
        ).length === 4
      ? "col-span-1 first:!col-start-1"
      : "col-span-2";

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
      className={`relative grid grid-rows-[auto_1fr] auto-rows-auto h-full w-full font-sans-serif ${
        editor.value.quiz!.questions[editor.value.curPage - 1].isInPool
          ? "bg-quartz"
          : "bg-egg-sour"
      } ${className}`}
    >
      <div
        className={`grid grid-cols-[auto_1fr_auto] items-center px-[2.5%] py-[2%] ${
          editor.value.quiz!.questions[editor.value.curPage - 1].selectMax > 1
            ? "pb-[1%]"
            : ""
        }`}
        style={{ columnGap: responsiveSpaceX, rowGap: responsiveSpaceX * 0.1 }}
      >
        <p
          className={`w-fit h-fit -rotate-[25deg] leading-none font-serif ${
            editor.value.quiz!.questions[editor.value.curPage - 1].isInPool
              ? "text-denim"
              : "text-sienna"
          }`}
          style={{ fontSize: responsiveQuestionMarkSize }}
        >
          ?
        </p>
        <MathJax className="!flex font-medium tracking-tight">
          <EditableLabel
            className="w-full !overflow-auto"
            style={{
              fontSize: responsiveFontSize,
              maxHeight: canvasSize.width * 0.11,
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
                editor.value.quiz!.questions[editor.value.curPage - 1].content
                  .length >= 200
              ) {
                e.preventDefault();
                e.currentTarget.textContent = e.currentTarget.innerText.slice(
                  0,
                  200
                );
              }
            }}
          />
        </MathJax>
        <div className="relative w-full h-full flex items-center">
          <button onClick={() => setIsNoteOpened(!isNoteOpened)} type="button">
            {!isNoteOpened && (
              <AiOutlineMessage
                style={{ width: noteIconSize, height: noteIconSize }}
              />
            )}
            {isNoteOpened && (
              <AiFillMessage
                style={{ width: noteIconSize, height: noteIconSize }}
              />
            )}
          </button>
          {isNoteOpened && (
            <div
              ref={noteRef}
              className="absolute top-full right-1/4 backdrop-blur-[180px] bg-dune/5 z-20"
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
      <div
        className={`overflow-auto p-[3%] pt-0 grid ${choicesContainerGridTemplate} w-full h-full`}
        style={{ gap: responsiveSpaceX * 0.4 }}
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
            </div>
          )}
        {/* todo: video, audio, equation */}
        <div
          className={`overflow-auto grid justify-items-center ${choicesContainerGridFormat}`}
          style={{ gap: responsiveSpaceX * 0.4 }}
        >
          {(
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as ChoiceOption[]
          ).map((option, i) => (
            <ChoiceButton
              key={i}
              className={choiceButtonGridFormat}
              style={{
                backgroundColor: option.color,
                fontSize: responsiveFontSize,
              }}
              checked={option.isCorrect}
              onChange={() => {
                let newOptions = [
                  ...(editor.value.quiz!.questions[editor.value.curPage - 1]
                    .options as ChoiceOption[]),
                ];
                newOptions[i] = {
                  ...newOptions[i],
                  isCorrect: !option.isCorrect,
                };
                let newQuestion = {
                  ...editor.value.quiz!.questions[editor.value.curPage - 1],
                };
                newQuestion = {
                  ...newQuestion,
                  options: newOptions,
                };
                dispatch(setQuestion(newQuestion));
              }}
              onDelete={(e) => {
                e.preventDefault();
                let newQuestion =
                  editor.value.quiz!.questions[editor.value.curPage - 1];
                let newOptions = [...(newQuestion.options as ChoiceOption[])];
                newOptions.splice(i, 1);
                newOptions = newOptions.map((option, i) => ({
                  ...option,
                  order: i + 1,
                }));
                newQuestion = {
                  ...newQuestion,
                  options: newOptions,
                };
                dispatch(setQuestion(newQuestion));
              }}
              disabled={
                editor.value.quiz!.questions[editor.value.curPage - 1]
                  .selectMax >= 1 &&
                (
                  editor.value.quiz!.questions[editor.value.curPage - 1]
                    .options as ChoiceOption[]
                ).filter((option) => option.isCorrect).length >=
                  editor.value.quiz!.questions[editor.value.curPage - 1]
                    .selectMax &&
                !option.isCorrect
              }
            >
              <ChoiceButton.Icon>
                {i === 0 && (
                  <FaCheck className="text-current w-[1em] h-[1em]" />
                )}
                {i === 1 && (
                  <FaXmark className="text-current w-[1em] h-[1em]" />
                )}
                {i === 2 && (
                  <FaQuestion className="text-current w-[1em] h-[1em]" />
                )}
                {option.isCorrect && (
                  <FaCheck className="absolute top-1/2 left-full -translate-y-1/2 w-full h-full text-apple" />
                )}
              </ChoiceButton.Icon>
              <ChoiceButton.Content>
                <MathJax className="!flex w-full items-center">
                  <EditableLabel
                    className="text-center !overflow-auto w-full font-sans-serif font-medium tracking-tight"
                    value={option.content}
                    placeholder="Enter option..."
                    onChange={(e) => {
                      let newOptions = [
                        ...(editor.value.quiz!.questions[
                          editor.value.curPage - 1
                        ].options as ChoiceOption[]),
                      ];
                      newOptions.splice(i, 1, {
                        ...newOptions[i],
                        content: e.currentTarget.innerText,
                      });
                      let newQuestion = {
                        ...editor.value.quiz!.questions[
                          editor.value.curPage - 1
                        ],
                      };
                      newQuestion = {
                        ...newQuestion,
                        options: newOptions,
                      };
                      dispatch(setQuestion(newQuestion));
                    }}
                  />
                </MathJax>
              </ChoiceButton.Content>
            </ChoiceButton>
          ))}
        </div>
      </div>
    </div>
  );
}
