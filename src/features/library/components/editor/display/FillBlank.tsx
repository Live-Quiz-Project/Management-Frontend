import useTypedSelector from "@/common/hooks/useTypedSelector";
import { setQuestion } from "@/features/library/store/slice";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineMessage, AiFillMessage } from "react-icons/ai";
import { MathJax } from "better-react-mathjax";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/common/services/firebase";
import MediaTypesEnum from "@/features/library/utils/enums/media-types";
import BaseTextarea from "@/common/components/textareas/BaseTextarea";
import BLANK_IDENTIFIER from "@/features/library/utils/constants/blank-identifier";

type Props = {
  className?: string;
  canvasSize: {
    width: number;
    height: number;
  };
};

export default function FillBlank({ className = "", canvasSize }: Props) {
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
  const optionsContainerGridFotmat =
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
        <p
          className="font-medium tracking-tight"
          style={{ fontSize: responsiveFontSize }}
        >
          Fill in the blanks.
        </p>
        {editor.value.quiz!.questions[editor.value.curPage - 1].selectMax >
          1 && (
          <p
            className="row-start-2 col-start-2 font-sans-serif"
            style={{ fontSize: responsiveFontSize * 0.5 }}
          >
            &#42;&nbsp;Select from&nbsp;
            {editor.value.quiz!.questions[editor.value.curPage - 1].selectMin}
            &nbsp;up to&nbsp;
            {editor.value.quiz!.questions[editor.value.curPage - 1].selectMax}
            &nbsp;choices
          </p>
        )}
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
        className={`overflow-auto p-[3%] pt-0 grid ${optionsContainerGridTemplate} w-full h-full`}
        style={{ gap: responsiveSpaceX }}
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
          className={`inline tracking-wide leading-[2.5] w-full my-auto ${optionsContainerGridFotmat}`}
          style={{
            gap: responsiveSpaceX * 0.4,
            fontSize: responsiveFontSize * 0.75,
            textAlign: questionTextAlign,
          }}
        >
          {editor.value
            .quiz!.questions[editor.value.curPage - 1].content.split(
              BLANK_IDENTIFIER
            )
            .map((option, i) => (
              <p
                key={option + i}
                className="inline"
                style={{ gap: responsiveSpaceX * 0.4 }}
              >
                {option}&nbsp;
                {editor.value.quiz!.questions[
                  editor.value.curPage - 1
                ].content.split(BLANK_IDENTIFIER).length -
                  1 !==
                  i && (
                  <span className="inline-flex items-center justify-center min-w-[2em] max-h-[2em] rounded-full bg-beige border">
                    {String.fromCharCode(65 + i)}
                  </span>
                )}
                &nbsp;
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}
