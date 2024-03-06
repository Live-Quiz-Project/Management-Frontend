import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addQuestion,
  addQuestionFromPool,
  deleteQuestion,
  deleteQuestionPool,
  setCurPage,
  setQuiz,
} from "@/features/library/store/slice";
import { LuPanelBottomOpen, LuPanelBottomClose } from "react-icons/lu";
import { BiSwim } from "react-icons/bi";
import { BsQuestionLg } from "react-icons/bs";
import { RiTimerLine } from "react-icons/ri";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { StrictModeDroppable } from "@/common/components/StrictModeDroppable";
import useTypedSelector from "@/common/hooks/useTypedSelector";
import QUESTION_TYPES from "@/features/library/utils/constants/question-types";
import QuestionTypesEnum from "@/features/library/utils/enums/question-types";
import BaseModal from "@/common/components/modals/BaseModal";
import Choice from "@/features/library/components/editor/pagebar/Choice";
import TrueFalse from "@/features/library/components/editor/pagebar/TrueFalse";
import FillBlank from "@/features/library/components/editor/pagebar/FillBlank";
import Paragraph from "@/features/library/components/editor/pagebar/Paragraph";
import Matching from "@/features/library/components/editor/pagebar/Matching";
import Pool from "@/features/library/components/editor/pagebar/Pool";
import FilledButton from "@/common/components/buttons/FilledButton";

type Props = {
  className?: string;
  maxPage: number | false;
  curPage: number | "Q";
  subCurPage: number | false;
};

export default function Pagebar({
  className = "",
  maxPage,
  curPage,
  subCurPage,
}: Props) {
  const dispatch = useDispatch<StoreDispatch>();
  const editor = useTypedSelector((state) => state.editor);
  const [addingQuestion, setAddingQuestion] = useState<boolean>(false);
  const [addingQuestionFromPool, setAddingQuestionFromPool] =
    useState<boolean>(false);
  const [deletingQuestion, setDeletingQuestion] = useState<number | false>(
    false
  );
  const [deletingQuestionPool, setDeletingQuestionPool] = useState<
    number | false
  >(false);
  const [curPoolIndex, setCurPoolIndex] = useState<number>(0);
  const [isAllShown, setIsAllShown] = useState<boolean>(false);

  function onAddQuestion(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    let newQuestion =
      e.currentTarget.value === QuestionTypesEnum.POOL
        ? {
            pool: -1,
            isInPool: false,
            poolRequired: false,
            type: QuestionTypesEnum.POOL,
            order: editor.value.quiz!.questions.length + 1,
            content: "",
            note: "",
            mediaType: "",
            media: "",
            useTemplate: false,
            timeLimit: editor.value.quiz!.timeLimit,
            haveTimeFactor: editor.value.quiz!.haveTimeFactor,
            timeFactor: editor.value.quiz!.timeFactor,
            fontSize: editor.value.quiz!.fontSize,
            layout: 0,
            selectMin: 1,
            selectMax: 1,
            caseSensitive: editor.value.quiz!.caseSensitive,
            options: [],
          }
        : {
            pool: -1,
            isInPool: false,
            poolRequired: false,
            type: e.currentTarget.value,
            order: editor.value.quiz!.questions.length + 1,
            content: "",
            note: "",
            mediaType: "",
            media: "",
            useTemplate: false,
            timeLimit: editor.value.quiz!.timeLimit,
            haveTimeFactor: editor.value.quiz!.haveTimeFactor,
            timeFactor: editor.value.quiz!.timeFactor,
            fontSize: editor.value.quiz!.fontSize,
            layout: 0,
            selectMin: 1,
            selectMax: 1,
            caseSensitive: editor.value.quiz!.caseSensitive,
            options: [],
          };
    dispatch(addQuestion(newQuestion));
    setAddingQuestion(false);
  }

  function onAddQuestionFromPool(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(
      addQuestionFromPool({
        type: e.currentTarget.value,
        order: curPoolIndex,
        content: "",
        note: "",
        mediaType: "",
        media: "",
        useTemplate: false,
        timeLimit: "0",
        haveTimeFactor: false,
        timeFactor: "0",
        fontSize: editor.value.quiz!.fontSize,
        layout: 0,
        selectMin: 1,
        selectMax: 1,
        caseSensitive: editor.value.quiz!.caseSensitive,
        options: [],
        isInPool: true,
        pool: curPoolIndex,
        poolRequired: false,
      })
    );
    setAddingQuestionFromPool(false);
  }

  function onDeleteQuestion() {
    dispatch(deleteQuestion(+deletingQuestion));
    setDeletingQuestion(false);
  }

  function onDeleteQuestionPool() {
    dispatch(deleteQuestionPool(+deletingQuestionPool));
    setDeletingQuestionPool(false);
  }

  function onSort(res: DropResult) {
    if (!res.destination) return;

    let newQuestions = [...editor.value.quiz!.questions];
    let source = newQuestions.filter((q) => !q.isInPool)[res.source.index];
    let destination = newQuestions.filter((q) => !q.isInPool)[
      res.destination.index
    ];
    let srcCount = 1;
    let destCount = 0;
    if (source.type === QuestionTypesEnum.POOL) {
      for (let i = source.order; i < newQuestions.length; i++) {
        if (newQuestions[i].isInPool) {
          srcCount++;
        } else {
          break;
        }
      }
    }
    if (destination.type === QuestionTypesEnum.POOL) {
      for (let i = destination.order; i < newQuestions.length; i++) {
        if (newQuestions[i].isInPool) {
          destCount++;
        } else {
          break;
        }
      }
    }
    const removed = newQuestions.splice(source.order - 1, srcCount);
    newQuestions.splice(
      source.order < destination.order
        ? destination.order - srcCount + destCount
        : destination.order - 1,
      0,
      ...removed
    );
    let curPoolIndex = 0;
    newQuestions = newQuestions.map((question, i) => {
      if (question.type === QuestionTypesEnum.POOL) curPoolIndex = i + 1;
      if (!question.isInPool) {
        return {
          ...question,
          order: i + 1,
        };
      } else {
        return {
          ...question,
          order: i + 1,
          isInPool: true,
          pool: curPoolIndex,
        };
      }
    });
    let newQuiz = {
      ...editor.value.quiz!,
      questions: newQuestions,
    };
    dispatch(setQuiz(newQuiz));
    dispatch(
      setCurPage(
        source.order < destination.order
          ? destination.order - srcCount + destCount + 1
          : destination.order
      )
    );
  }

  return (
    <>
      <div
        className={`rounded-2xl md:rounded-3xl grid grid-rows-[1fr_auto] w-full ${
          isAllShown
            ? "absolute z-10 min-h-full !col-span-2 !col-start-1 !row-span-2 !row-start-1"
            : ""
        } ${className}`}
      >
        <>
          <DragDropContext onDragEnd={onSort}>
            <StrictModeDroppable droppableId="PAGES" direction="horizontal">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex gap-2.5 xl:gap-4 p-2.5 xl:p-4 md:pb-1 xl:pb-2 h-full w-full overflow-auto"
                >
                  {editor.value
                    .quiz!.questions.filter((q) => !q.isInPool)
                    .map((question, i) => (
                      <Draggable
                        key={question.type + i}
                        draggableId={question.type + i}
                        index={i}
                      >
                        {(prov) => {
                          if (question.type === QuestionTypesEnum.POOL) {
                            return (
                              <div
                                {...prov.draggableProps}
                                ref={prov.innerRef}
                                className="relative min-h-full"
                              >
                                <Pool
                                  dragHandleProps={prov.dragHandleProps}
                                  question={question}
                                  index={i}
                                  onDelete={(e) => {
                                    setDeletingQuestionPool(
                                      +e.currentTarget.value
                                    );
                                  }}
                                  onDeleteSubquestion={(e) =>
                                    setDeletingQuestion(+e.currentTarget.value)
                                  }
                                  setPoolIndex={setCurPoolIndex}
                                  setAddingQuestion={setAddingQuestionFromPool}
                                />
                                <div className="absolute bottom-0 left-0 rounded-bl-2xl rounded-tr-2xl flex items-center justify-center w-8 lg:w-10 h-5 lg:h-6 bg-koromiko text-white text-body-2">
                                  Q&#8202;{i + 1}
                                </div>
                              </div>
                            );
                          } else {
                            return (
                              <div
                                {...prov.draggableProps}
                                {...prov.dragHandleProps}
                                ref={prov.innerRef}
                                className="relative min-h-full aspect-[4/3]"
                              >
                                {question.type === QuestionTypesEnum.CHOICE && (
                                  <Choice
                                    question={question}
                                    onDelete={(e) =>
                                      setDeletingQuestion(
                                        +e.currentTarget.value
                                      )
                                    }
                                  />
                                )}
                                {question.type ===
                                  QuestionTypesEnum.TRUE_FALSE && (
                                  <TrueFalse
                                    question={question}
                                    onDelete={(e) =>
                                      setDeletingQuestion(
                                        +e.currentTarget.value
                                      )
                                    }
                                  />
                                )}
                                {question.type ===
                                  QuestionTypesEnum.FILL_BLANK && (
                                  <FillBlank
                                    question={question}
                                    onDelete={(e) =>
                                      setDeletingQuestion(
                                        +e.currentTarget.value
                                      )
                                    }
                                  />
                                )}
                                {question.type ===
                                  QuestionTypesEnum.PARAGRAPH && (
                                  <Paragraph
                                    question={question}
                                    onDelete={(e) =>
                                      setDeletingQuestion(
                                        +e.currentTarget.value
                                      )
                                    }
                                  />
                                )}
                                {question.type ===
                                  QuestionTypesEnum.MATCHING && (
                                  <Matching
                                    question={question}
                                    onDelete={(e) =>
                                      setDeletingQuestion(
                                        +e.currentTarget.value
                                      )
                                    }
                                  />
                                )}
                                <div className="absolute bottom-0 left-0 rounded-bl-2xl rounded-tr-2xl flex items-center justify-center w-8 lg:w-10 h-5 lg:h-6 bg-koromiko text-white text-body-2">
                                  Q&#8202;{i + 1}
                                </div>
                              </div>
                            );
                          }
                        }}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                  {editor.value.quiz!.questions.filter((q) => !q.isInPool)
                    .length < 20 && (
                    <button
                      type="button"
                      onClick={() => setAddingQuestion(true)}
                      className="bg-beige min-h-full aspect-[4/3] border-[3px] border-dashed border-koromiko rounded-xl text-regent-gray flex justify-center items-center text-body-1"
                    >
                      + Add Question
                    </button>
                  )}
                </div>
              )}
            </StrictModeDroppable>
          </DragDropContext>
          <div className="relative grid grid-cols-[1fr_auto] xl:grid-cols-3 pb-1 lg:pb-1.5 px-4 lg:px-5 xl:px-6">
            <p className="text-body-1">
              {maxPage ? (
                <>
                  Question:&emsp;
                  {curPage}
                  {subCurPage ? `.${subCurPage}` : ""}
                  &nbsp;/&nbsp;
                  {maxPage}
                </>
              ) : (
                "Add a question"
              )}
            </p>
            <p className="absolute xl:static invisible xl:visible mx-auto">
              Something to put here
            </p>
            <button
              type="button"
              className="bg-transparent hover:underline w-fit ml-auto"
              onClick={() => setIsAllShown(!isAllShown)}
            >
              {isAllShown ? (
                <LuPanelBottomClose className="w-5 h-5" />
              ) : (
                <LuPanelBottomOpen className="w-5 h-5" />
              )}
            </button>
          </div>
        </>
      </div>
      {addingQuestion && (
        <BaseModal
          setIsOpen={setAddingQuestion}
          className="!p-6 xl:!p-8 flex flex-col space-y-6 xl:space-y-10 !rounded-3xl !bg-beige font-sans-serif"
        >
          <p className="text-header-3 truncate text-center font-semibold leading-tight text-wrap">
            Select question type
          </p>
          <div className="grid grid-cols-6 gap-3 md:gap-4 justify-items-center">
            {QUESTION_TYPES.map((type, i) => (
              <button
                key={i}
                type="button"
                value={type.value}
                onClick={onAddQuestion}
                className="bg-karry rounded-2xl flex justify-center items-center w-24 h-24 md:w-28 md:h-28 xl:w-36 xl:h-36 col-span-3 md:col-span-2"
              >
                <p className="text-body-2 truncate">{type.label}</p>
              </button>
            ))}
          </div>
        </BaseModal>
      )}
      {addingQuestionFromPool && (
        <BaseModal
          setIsOpen={setAddingQuestionFromPool}
          className="!p-6 xl:!p-8 flex flex-col space-y-6 xl:space-y-10 !rounded-3xl !bg-beige font-sans-serif"
        >
          <p className="text-header-3 truncate text-center font-semibold leading-tight text-wrap">
            Select question type
          </p>
          <div className="grid grid-cols-6 gap-3 md:gap-4 justify-items-center">
            {QUESTION_TYPES.slice(0, -1).map((type, i) => (
              <button
                key={i}
                type="button"
                value={type.value}
                onClick={onAddQuestionFromPool}
                className="bg-quartz rounded-2xl flex justify-center items-center w-24 h-24 md:w-28 md:h-28 xl:w-36 xl:h-36 col-span-3 md:col-span-2 md:[&:nth-last-child(2)]:col-start-2 last:col-span-6 md:last:col-span-2"
              >
                <p className="text-body-2 truncate">{type.label}</p>
              </button>
            ))}
          </div>
        </BaseModal>
      )}
      {deletingQuestion && (
        <BaseModal
          setIsOpen={setDeletingQuestion}
          className="!p-6 md:!p-10 xl:!p-16 flex flex-col space-y-6 xl:space-y-10 !rounded-3xl !bg-beige font-sans-serif"
        >
          <p className="text-header-1 truncate text-center font-semibold text-wrap leading-tight">
            Are you sure you want to delete this question?
          </p>
          <div className="mx-auto">
            {editor.value.quiz!.questions[deletingQuestion - 1].type ===
              QuestionTypesEnum.CHOICE && (
              <Choice
                className="!ring-0 !cursor-default !bg-white h-32 sm:h-36 md:h-40 aspect-[4/3]"
                question={editor.value.quiz!.questions[deletingQuestion - 1]}
                disabled
                full
              />
            )}
            {editor.value.quiz!.questions[deletingQuestion - 1].type ===
              QuestionTypesEnum.TRUE_FALSE && (
              <TrueFalse
                className="!ring-0 !cursor-default !bg-white h-32 sm:h-36 md:h-40 aspect-[4/3]"
                question={editor.value.quiz!.questions[deletingQuestion - 1]}
                disabled
                full
              />
            )}
            {editor.value.quiz!.questions[deletingQuestion - 1].type ===
              QuestionTypesEnum.FILL_BLANK && (
              <FillBlank
                className="!ring-0 !cursor-default !bg-white h-32 sm:h-36 md:h-40 aspect-[4/3]"
                question={editor.value.quiz!.questions[deletingQuestion - 1]}
                disabled
                full
              />
            )}
            {editor.value.quiz!.questions[deletingQuestion - 1].type ===
              QuestionTypesEnum.PARAGRAPH && (
              <Paragraph
                className="!ring-0 !cursor-default !bg-white h-32 sm:h-36 md:h-40 aspect-[4/3]"
                question={editor.value.quiz!.questions[deletingQuestion - 1]}
                disabled
                full
              />
            )}
            {editor.value.quiz!.questions[deletingQuestion - 1].type ===
              QuestionTypesEnum.MATCHING && (
              <Matching
                className="!ring-0 !cursor-default !bg-white h-32 sm:h-36 md:h-40 aspect-[4/3]"
                question={editor.value.quiz!.questions[deletingQuestion - 1]}
                disabled
                full
              />
            )}
          </div>
          <div className="flex justify-center items-center space-x-2">
            <FilledButton
              type="button"
              onClick={() => setDeletingQuestion(false)}
              className="border border-regent-gray box-border"
            >
              <p className="text-body-1 truncate">Cancel</p>
            </FilledButton>
            <FilledButton
              type="button"
              onClick={onDeleteQuestion}
              className="bg-sienna text-white"
            >
              <p className="text-body-1 truncate">Delete</p>
            </FilledButton>
          </div>
        </BaseModal>
      )}
      {deletingQuestionPool && (
        <BaseModal
          setIsOpen={setDeletingQuestionPool}
          className="!p-6 md:!p-10 xl:!p-16 flex flex-col space-y-6 xl:space-y-10 !rounded-3xl !bg-beige font-sans-serif"
        >
          <p className="text-header-1 truncate text-center font-semibold text-wrap leading-tight">
            Are you sure you want to delete this question?
          </p>
          <div className="mx-auto p-5 bg-quartz rounded-2xl flex flex-col items-center space-y-4">
            <div className="relative rounded-xl h-24 sm:h-28 md:h-32 xl:h-40 aspect-square flex flex-col justify-end items-end cursor-pointe p-2 md:p-3 xl:p-4 bg-white">
              <div className="text-body-1 flex items-center space-x-1">
                <p>
                  {
                    editor.value
                      .quiz!.questions.slice(
                        editor.value.quiz!.questions[deletingQuestionPool - 1]
                          .order
                      )
                      .reduce(
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
                <p>
                  {
                    editor.value.quiz!.questions[deletingQuestionPool - 1]
                      .timeLimit
                  }
                </p>
                <RiTimerLine className="w-5 h-5" />
              </div>
              <p className="absolute top-2 md:top-3 xl:top-4 text-body-3 text-regent-gray">
                {
                  QUESTION_TYPES.find(
                    (type) =>
                      type.value ===
                      editor.value.quiz!.questions[deletingQuestionPool - 1]
                        .type
                  )?.label
                }
              </p>
              <BiSwim className="absolute top-2 md:top-3 xl:top-4 left-2 md:left-3 xl:left-4 w-6 sm:w-9 md:w-8 2xl:w-10 h-6 sm:h-9 md:h-8 2xl:h-10" />
            </div>
            <p className="w-24 sm:w-28 md:w-32 xl:w-40 leading-tight text-center text-body-1">
              And&nbsp;
              {
                editor.value
                  .quiz!.questions.slice(
                    editor.value.quiz!.questions[deletingQuestionPool - 1].order
                  )
                  .reduce(
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
              &nbsp;question
              {editor.value
                .quiz!.questions.slice(
                  editor.value.quiz!.questions[deletingQuestionPool - 1].order
                )
                .reduce(
                  (acc, question) => {
                    if (!question.isInPool) {
                      acc.stop = true;
                      return acc;
                    }
                    if (!acc.stop) acc.count++;
                    return acc;
                  },
                  { count: 0, stop: false }
                ).count > 1
                ? "s"
                : ""}
              &nbsp; in the pool
            </p>
          </div>
          <div className="flex justify-center items-center space-x-2">
            <FilledButton
              type="button"
              onClick={() => setDeletingQuestionPool(false)}
              className="border border-regent-gray box-border"
            >
              <p className="text-body-1 truncate">Cancel</p>
            </FilledButton>
            <FilledButton
              type="button"
              onClick={onDeleteQuestionPool}
              className="bg-sienna text-white"
            >
              <p className="text-body-1 truncate">Delete</p>
            </FilledButton>
          </div>
        </BaseModal>
      )}
    </>
  );
}
