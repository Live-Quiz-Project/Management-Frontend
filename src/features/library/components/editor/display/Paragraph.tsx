import EditableLabel from "@/common/components/inputs/EditableLabel";
import BaseTextarea from "@/common/components/textareas/BaseTextarea";
import useTypedSelector from "@/common/hooks/useTypedSelector";
import { storage } from "@/common/services/firebase";
import { setQuestion } from "@/features/library/store/slice";
import MediaTypesEnum from "@/features/library/utils/enums/media-types";
import { MathJax } from "better-react-mathjax";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { AiFillMessage, AiOutlineMessage } from "react-icons/ai";
import { useDispatch } from "react-redux";

type Props = {
  className?: string;
  canvasSize: {
    width: number;
    height: number;
  };
};

export default function Paragraph({ className = "", canvasSize }: Props) {
  const editor = useTypedSelector((state) => state.editor);
  const dispatch = useDispatch<StoreDispatch>();
  const noteRef = useRef<HTMLDivElement>(null);
  const [imageURL, setImageURL] = useState<string>("");
  const [isNoteOpened, setIsNoteOpened] = useState<boolean>(false);
  const responsiveSpaceY =
    editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 0
      ? canvasSize.width * 0.05
      : editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 1
      ? canvasSize.width * 0.0075
      : editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 2
      ? canvasSize.width * 0.01
      : editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 3
      ? canvasSize.width * 0.0125
      : canvasSize.width * 0.015;
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
  const optionsContainerGridTemplate =
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
  const optionsContainerGridFormat =
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
      className={`relative h-full w-full grid grid-cols-[auto_1fr_auto] font-sans-serif px-[2.5%] py-[2%] ${
        editor.value.quiz!.questions[editor.value.curPage - 1].isInPool
          ? "bg-quartz"
          : "bg-egg-sour"
      } ${className}`}
      style={{ gap: responsiveSpaceY }}
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
      <div
        className={`overflow-auto p-[1%] pt-0 grid ${optionsContainerGridTemplate} w-full h-full`}
        style={{ gap: responsiveSpaceY * 2 }}
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
          className={`flex flex-col justify-between w-full h-full overflow-auto ${optionsContainerGridFormat}`}
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
        </div>
      </div>
      <div className="relative flex items-center h-fit">
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
  );
}
