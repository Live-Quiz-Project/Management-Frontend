import useTypedSelector from "@/common/hooks/useTypedSelector";
import { setCurPage } from "@/features/library/store/slice";
import QUESTION_TYPES from "@/features/library/utils/constants/question-types";
import { FormEvent } from "react";
import { IoClose } from "react-icons/io5";
import { RiTimerLine } from "react-icons/ri";
import { MdPlaylistAddCheck } from "react-icons/md";
import { TbLetterCase } from "react-icons/tb";
import { useDispatch } from "react-redux";

type Props = {
  className?: string;
  question: Question;
  onDelete?: (e: FormEvent<HTMLButtonElement>) => void;
  full?: boolean;
  disabled?: boolean;
};

export default function Paragraph({
  className = "",
  question,
  onDelete,
  full = false,
  disabled = false,
}: Props) {
  const dispatch = useDispatch<StoreDispatch>();
  const editor = useTypedSelector((state) => state.editor);

  return (
    <label
      className={`w-full aspect-[4/3] relative block py-2 px-3 xl:py-2.5 xl:px-4 2xl:p-5 bg-beige rounded-2xl cursor-pointer ring-koromiko ${
        editor.value.curPage === question.order ? "ring-2" : "ring-0"
      } ${className}`}
    >
      <input
        type="radio"
        name="pages"
        checked={editor.value.curPage === question.order}
        onChange={() => dispatch(setCurPage(question.order))}
        className="hidden"
        disabled={disabled}
      />
      {question.options && (
        <div className="relative flex flex-col justify-between h-full w-full space-y-1 active:cursor-grabbing [&_p]:leading-tight">
          <img
            src=""
            alt=""
            className={`absolute ${
              full ? "bottom-0" : "bottom-5 lg:bottom-6"
            } w-5 sm:w-6 h-5 sm:h-6`}
          />
          <div className="flex flex-col justify-center items-end">
            <p className="text-note text-regent-gray">
              {
                QUESTION_TYPES.find((type) => type.value === question.type)
                  ?.label
              }
            </p>
            {question.content ? (
              <p className="text-right text-header-2 truncate w-full">
                {question.content}
              </p>
            ) : (
              <p className="text-right text-header-2 text-regent-gray truncate w-full">
                Enter Question
              </p>
            )}
          </div>
          <div className="flex flex-col justify-center items-end space-y-1">
            <div className="text-body-1 flex items-center justify-end space-x-1.5 truncate w-3/4">
              {question.options.length > 0 ? (
                <>
                  {(question.options as TextOption[])[0].caseSensitive && (
                    <TbLetterCase className="min-w-4 min-h-4 text-sienna" />
                  )}
                  <p className="truncate">
                    {(question.options as TextOption[])[0].content}
                  </p>
                </>
              ) : (
                <p className="text-regent-gray">None</p>
              )}
              <MdPlaylistAddCheck className="min-w-5 min-h-5" />
            </div>
            {!question.isInPool && (
              <div className="text-body-1 flex items-center space-x-1.5">
                <p>{question.timeLimit}</p>
                <RiTimerLine className="min-w-4 min-h-4" />
                &nbsp;
              </div>
            )}
          </div>
        </div>
      )}
      {!full && (
        <button
          type="button"
          value={question.order}
          onClick={onDelete}
          className={`absolute top-0 -translate-y-1/3 right-0 translate-x-1/3 rounded-full bg-beige opacity-100 md:opacity-0 md:hover:opacity-100 transition-all duration-300`}
        >
          <IoClose className="w-4 h-4" />
        </button>
      )}
    </label>
  );
}
