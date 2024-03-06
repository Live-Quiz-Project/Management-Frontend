import useTypedSelector from "@/common/hooks/useTypedSelector";
import QuestionTypesEnum from "@/features/library/utils/enums/question-types";
import { useEffect, useRef, useState } from "react";
import Choice from "@/features/library/components/editor/display/Choice";
import TrueFalse from "@/features/library/components/editor/display/TrueFalse";
import FillBlank from "@/features/library/components/editor/display/FillBlank";
import Paragraph from "@/features/library/components/editor/display/Paragraph";
import Matching from "@/features/library/components/editor/display/Matching";
import Pool from "@/features/library/components/editor/display/Pool";
import { setCurPage, setEditing } from "@/features/library/store/slice";
import { useDispatch } from "react-redux";

type Props = {
  className?: string;
};

export default function Display({ className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const editor = useTypedSelector((state) => state.editor);
  const dispatch = useDispatch<StoreDispatch>();
  const [canvasSize, setCanvasSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  useEffect(() => {
    console.log(editor.value.curPage);

    function onClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        containerRef.current.contains(e.target as Node)
      ) {
        if (
          canvasRef.current &&
          !canvasRef.current.contains(e.target as Node)
        ) {
          dispatch(setCurPage(0));
        } else {
          dispatch(setEditing(!editor.value.editing));
        }
      }
      if (canvasRef.current && canvasRef.current.contains(e.target as Node))
        dispatch(setEditing(true));
    }
    function onResize() {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (container && canvas) {
        const { clientWidth, clientHeight } = container;
        const aspectRatio = 16 / 9;
        if (clientWidth / clientHeight > aspectRatio) {
          canvas.style.width = "auto";
          canvas.style.height = clientHeight + "px";
          canvas.style.borderLeft = "1px dashed";
          canvas.style.borderRight = "1px dashed";
          canvas.style.borderTop = "0px";
          canvas.style.borderBottom = "0px";
        } else {
          canvas.style.width = clientWidth + "px";
          canvas.style.height = "auto";
          canvas.style.borderLeft = "0px";
          canvas.style.borderRight = "0px";
          canvas.style.borderTop = "1px dashed";
          canvas.style.borderBottom = "1px dashed";
        }
        setCanvasSize({
          width: canvas.clientWidth,
          height: canvas.clientHeight,
        });
      }
    }
    window.addEventListener("resize", onResize);
    document.addEventListener("mousedown", onClickOutside);
    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [editor.value.curPage, editor.value.editing]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl md:rounded-3xl ${
        editor.value.curPage === 0 ? "cursor-auto" : "cursor-pointer"
      } ${className}`}
    >
      {editor.value.curPage === 0 && editor.value.quiz!.coverImg && (
        <img
          src={`${
            import.meta.env.VITE_FIREBASE_STORAGE_BASE_URL
          }/${encodeURIComponent(editor.value.quiz!.coverImg)}?alt=media`}
          alt="Empty"
          className="w-full h-full object-contain"
        />
      )}
      {editor.value.quiz!.questions.length > 0 && editor.value.curPage > 0 && (
        <>
          <div
            ref={canvasRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-auto !border-regent-gray w-full aspect-video overflow-auto transition-all duration-300"
          >
            <div className="w-full h-full">
              {editor.value.quiz!.questions[editor.value.curPage - 1].type ===
                QuestionTypesEnum.CHOICE && <Choice canvasSize={canvasSize} />}
              {editor.value.quiz!.questions[editor.value.curPage - 1].type ===
                QuestionTypesEnum.TRUE_FALSE && (
                <TrueFalse canvasSize={canvasSize} />
              )}
              {editor.value.quiz!.questions[editor.value.curPage - 1].type ===
                QuestionTypesEnum.FILL_BLANK && (
                <FillBlank canvasSize={canvasSize} />
              )}
              {editor.value.quiz!.questions[editor.value.curPage - 1].type ===
                QuestionTypesEnum.PARAGRAPH && (
                <Paragraph canvasSize={canvasSize} />
              )}
              {editor.value.quiz!.questions[editor.value.curPage - 1].type ===
                QuestionTypesEnum.MATCHING && (
                <Matching canvasSize={canvasSize} />
              )}
              {editor.value.quiz!.questions[editor.value.curPage - 1].type ===
                QuestionTypesEnum.POOL && <Pool canvasSize={canvasSize} />}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
