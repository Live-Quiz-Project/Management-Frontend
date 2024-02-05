import useTypedSelector from "@/common/hooks/useTypedSelector";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { BiSwim } from "react-icons/bi";
import { BsQuestionLg } from "react-icons/bs";
import { RiTimerLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setCurPage, setQuiz } from "@/features/library/store/slice";
import QuestionTypesEnum from "@/features/library/utils/enums/question-types";
import Choice from "@/features/library/components/editor/pagebar/Choice";
import TrueFalse from "@/features/library/components/editor/pagebar/TrueFalse";
import FillBlank from "@/features/library/components/editor/pagebar/FillBlank";
import Paragraph from "@/features/library/components/editor/pagebar/Paragraph";
import Matching from "@/features/library/components/editor/pagebar/Matching";
import {
  DragDropContext,
  Draggable,
  DropResult,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";
import { StrictModeDroppable } from "@/common/components/StrictModeDroppable";
import QUESTION_TYPES from "@/features/library/utils/constants/question-types";

type Props = {
  className?: string;
  question: Question;
  index: number;
  setPoolIndex: Dispatch<SetStateAction<number>>;
  setAddingQuestion: Dispatch<SetStateAction<boolean>>;
  onDelete?: (e: FormEvent<HTMLButtonElement>) => void;
  onDeleteSubquestion?: (e: FormEvent<HTMLButtonElement>) => void;
  dragHandleProps?: DraggableProvidedDragHandleProps | null | undefined;
  full?: boolean;
  disabled?: boolean;
};

export default function Pool({
  className = "",
  question,
  index,
  setPoolIndex,
  setAddingQuestion,
  onDelete,
  onDeleteSubquestion,
  dragHandleProps,
  full = false,
  disabled = false,
}: Props) {
  const dispatch = useDispatch<StoreDispatch>();
  const editor = useTypedSelector((state) => state.editor);
  const [subquestions, setSubquestions] = useState<Question[]>([]);

  useEffect(() => {
    let q = [];
    for (let i = question.order; i < editor.value.quiz!.questions.length; i++) {
      if (editor.value.quiz!.questions[i].isInPool) {
        q.push(editor.value.quiz!.questions[i]);
      } else {
        break;
      }
    }
    setSubquestions(q);
  }, [editor.value.quiz!.questions]);

  function onSort(res: DropResult) {
    if (!res.destination) return;

    let newQuestions = [...editor.value.quiz!.questions];
    let source = newQuestions[res.source.index];
    let destination = newQuestions[res.destination.index];
    newQuestions[res.source.index] = destination;
    newQuestions[res.destination.index] = source;
    newQuestions = newQuestions.map((question, i) => ({
      ...question,
      order: i + 1,
    }));
    let newQuiz = {
      ...editor.value.quiz!,
      questions: newQuestions,
    };
    dispatch(setQuiz(newQuiz));
    dispatch(setCurPage(destination.order));
  }

  return (
    <DragDropContext onDragEnd={onSort}>
      <div
        className={`relative bg-beige w-fit h-[7.25rem] sm:h-[9.25rem] md:h-[7.625rem] lg:h-[8.25rem] xl:h-[8.526rem] 2xl:h-[10.526rem] rounded-2xl p-2.5 xl:p-3 2xl:p-4 flex space-x-2.5 xl:space-x-3 2xl:space-x-4 ${className}`}
      >
        <label
          {...dragHandleProps}
          className={`relative rounded-xl min-h-full aspect-square flex flex-col justify-end items-end cursor-pointe ring-koromiko bg-white p-2 md:p-3 xl:p-4 ${
            editor.value.curPage === question.order ? "ring-2 text-denim" : ""
          }`}
        >
          <input
            type="radio"
            name="pages"
            checked={editor.value.curPage === question.order}
            onChange={() => dispatch(setCurPage(question.order))}
            id={editor.value.quiz!.title + "_" + question.order}
            className="hidden"
            disabled={disabled}
          />
          <div className="text-body-1 flex items-center space-x-1">
            <p>
              {
                editor.value.quiz!.questions.slice(question.order).reduce(
                  (acc, question) => {
                    if (!question.isInPool) {
                      acc.stop = true;
                      return acc;
                    }
                    if (!acc.stop) acc.count++;
                    return acc;
                  },
                  { count: 0, stop: false }
                ).count
              }
            </p>
            <BsQuestionLg className="w-5 h-5" />
          </div>
          <div className="text-body-1 flex items-center space-x-1">
            <p>{question.timeLimit}</p>
            <RiTimerLine className="w-5 h-5" />
          </div>
          <p className="absolute top-2 md:top-3 xl:top-4 text-body-3 text-regent-gray">
            {QUESTION_TYPES.find((type) => type.value === question.type)?.label}
          </p>
          <BiSwim className="absolute top-2 md:top-3 xl:top-4 left-2 md:left-3 xl:left-4 w-6 sm:w-9 md:w-8 2xl:w-10 h-6 sm:h-9 md:h-8 2xl:h-10" />
        </label>
        {subquestions.length > 0 && (
          <StrictModeDroppable
            droppableId={question.type + index}
            direction="horizontal"
          >
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex space-x-2 xl:space-x-3"
              >
                {subquestions.length > 0 &&
                  subquestions.map((subq, i) => (
                    <Draggable
                      key={question.type + i}
                      draggableId={question.type + i}
                      index={question.order + i}
                    >
                      {(prov) => (
                        <div
                          {...prov.draggableProps}
                          {...prov.dragHandleProps}
                          ref={prov.innerRef}
                          className="relative min-h-full aspect-[4/3]"
                        >
                          {subq.type === QuestionTypesEnum.CHOICE && (
                            <Choice
                              className={`!bg-white !ring-jordy-blue [&_p]:!leading-none`}
                              question={subq}
                              onDelete={onDeleteSubquestion}
                            />
                          )}
                          {subq.type === QuestionTypesEnum.TRUE_FALSE && (
                            <TrueFalse
                              className={`!bg-white !ring-jordy-blue [&_p]:!leading-none`}
                              question={subq}
                              onDelete={onDeleteSubquestion}
                            />
                          )}
                          {subq.type === QuestionTypesEnum.FILL_BLANK && (
                            <FillBlank
                              className={`!bg-white !ring-jordy-blue [&_p]:!leading-none`}
                              question={subq}
                              onDelete={onDeleteSubquestion}
                            />
                          )}
                          {subq.type === QuestionTypesEnum.PARAGRAPH && (
                            <Paragraph
                              className={`!bg-white !ring-jordy-blue [&_p]:!leading-none`}
                              question={subq}
                              onDelete={onDeleteSubquestion}
                            />
                          )}
                          {subq.type === QuestionTypesEnum.MATCHING && (
                            <Matching
                              className={`!bg-white !ring-jordy-blue [&_p]:!leading-none`}
                              question={subq}
                              onDelete={onDeleteSubquestion}
                            />
                          )}
                          <div className="absolute -bottom-0 -left-0 rounded-bl-xl rounded-tr-xl flex items-center justify-center w-10 lg:w-12 h-5 lg:h-6 bg-jordy-blue text-white text-body-2">
                            Q&nbsp;{index + 1}.{i + 1}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </StrictModeDroppable>
        )}
        {editor.value.quiz!.questions.slice(question.order).reduce(
          (acc, question) => {
            if (!question.isInPool) {
              acc.stop = true;
              return acc;
            }
            if (!acc.stop) acc.count++;
            return acc;
          },
          { count: 0, stop: false }
        ).count < 6 && (
          <button
            type="button"
            onClick={() => {
              setAddingQuestion(true);
              console.log(question.order);

              setPoolIndex(question.order);
            }}
            className="min-h-full aspect-[4/3] leading-tight border-[3px] border-dashed border-jordy-blue rounded-xl flex justify-center items-center text-body-1"
          >
            + Add Question
          </button>
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
      </div>
    </DragDropContext>
  );
}
