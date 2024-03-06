import { useEffect, useRef } from "react";
import { IoInformationCircleSharp } from "react-icons/io5";
import BaseDropdown from "@/common/components/dropdowns/BaseDropdown";
import BaseInput from "@/common/components/inputs/BaseInput";
import BaseSwitch from "@/common/components/switches/BaseSwitch";
import QUESTION_TYPES from "@/features/library/utils/constants/question-types";
import LAYOUTS from "@/features/library/utils/constants/layouts";
import QuestionTypesEnum from "@/features/library/utils/enums/question-types";
import FONT_SIZES from "@/features/library/utils/constants/font-sizes";
import Choice from "@/features/library/components/editor/sidebar/Choice";
import TrueFalse from "@/features/library/components/editor/sidebar/TrueFalse";
import Paragraph from "@/features/library/components/editor/sidebar/Paragraph";
import FillBlank from "@/features/library/components/editor/sidebar/FillBlank";
import Matching from "@/features/library/components/editor/sidebar/Matching";
import useTypedSelector from "@/common/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import {
  setEditing,
  setQuiz,
  setQuestion as setStoreQuestion,
} from "@/features/library/store/slice";
import VISIBILITY from "@/features/library/utils/constants/visibility";
import MEDIA_TYPES from "@/features/library/utils/constants/media-types";
import FileUploader from "@/features/library/components/editor/sidebar/FileUploader";
import BaseTextarea from "@/common/components/textareas/BaseTextarea";
import EquationInput from "@/common/components/inputs/EquationInput";
import MediaTypesEnum from "@/features/library/utils/enums/media-types";
import BLANK_IDENTIFIER from "@/features/library/utils/constants/blank-identifier";

type Props = {
  className?: string;
};

export default function Sidebar({ className }: Props) {
  const dispatch = useDispatch<StoreDispatch>();
  const editor = useTypedSelector((state) => state.editor);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        ref.current &&
        ref.current.contains(e.target as Node) &&
        !editor.value.editing
      )
        dispatch(setEditing(true));
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    if (
      editor.value.quiz!.questions.length > 0 &&
      editor.value.curPage > 0 &&
      editor.value.quiz!.questions[editor.value.curPage - 1].useTemplate
    ) {
      let newQuestion = editor.value.quiz!.questions[editor.value.curPage - 1];
      if (
        editor.value.quiz!.questions[editor.value.curPage - 1].type ===
        QuestionTypesEnum.PARAGRAPH
      ) {
        let newOptions = [...(newQuestion.options as TextOption[])];
        if (newOptions.length > 0) {
          newOptions = [
            {
              ...newOptions[0],
              mark: editor.value.quiz!.mark,
              caseSensitive: editor.value.quiz!.caseSensitive,
            },
          ];
        }
        newQuestion = {
          ...newQuestion,
          options: newOptions,
          timeLimit: editor.value.quiz!.timeLimit,
          haveTimeFactor: editor.value.quiz!.haveTimeFactor,
          timeFactor: editor.value.quiz!.timeFactor,
          fontSize: editor.value.quiz!.fontSize,
        };
      } else if (
        editor.value.quiz!.questions[editor.value.curPage - 1].type ===
        QuestionTypesEnum.FILL_BLANK
      ) {
        let newOptions = [...(newQuestion.options as TextOption[])];
        if (newOptions.length > 0) {
          newOptions = newOptions.map((option) => ({
            ...option,
            mark: editor.value.quiz!.mark,
            caseSensitive: editor.value.quiz!.caseSensitive,
          }));
        }
        newQuestion = {
          ...newQuestion,
          options: newOptions,
          timeLimit: editor.value.quiz!.timeLimit,
          haveTimeFactor: editor.value.quiz!.haveTimeFactor,
          timeFactor: editor.value.quiz!.timeFactor,
          fontSize: editor.value.quiz!.fontSize,
        };
      } else if (
        editor.value.quiz!.questions[editor.value.curPage - 1].type ===
        QuestionTypesEnum.MATCHING
      ) {
        let newOptions = [...(newQuestion.options as MatchingOption[])];
        let newOptionsPrompts = [...newOptions].filter(
          (o) => o.type === "MATCHING_PROMPT"
        ) as MatchingOptionPrompt[];
        let newOptionsOptions = [...newOptions].filter(
          (o) => o.type === "MATCHING_OPTION"
        ) as MatchingOptionOption[];
        let newOptionsAnswers = [...newOptions].filter(
          (o) => o.type === "MATCHING_ANSWER"
        ) as MatchingOptionAnswer[];
        if (newOptionsAnswers.length > 0) {
          newOptionsAnswers = newOptionsAnswers.map((option) => ({
            ...option,
            mark: editor.value.quiz!.mark,
          }));
        }
        newOptions = [
          ...newOptionsPrompts,
          ...newOptionsOptions,
          ...newOptionsAnswers,
        ];
        newQuestion = {
          ...newQuestion,
          options: newOptions,
          timeLimit: editor.value.quiz!.timeLimit,
          haveTimeFactor: editor.value.quiz!.haveTimeFactor,
          timeFactor: editor.value.quiz!.timeFactor,
          fontSize: editor.value.quiz!.fontSize,
        };
      }
      dispatch(setStoreQuestion(newQuestion));
    }
  }, [
    editor.value.quiz!.questions.length > 0 && editor.value.curPage > 0
      ? editor.value.quiz!.questions[editor.value.curPage - 1].useTemplate
      : null,
  ]);

  return (
    <div
      ref={ref}
      className={`divide-y divide-white overflow-auto text-body-1 ${className}`}
    >
      {editor.value.quiz!.questions.length === 0 ||
      editor.value.curPage === 0 ? (
        <>
          <div className="py-5 md:py-6 px-4 md:px-8 space-y-6">
            <div className="space-y-1">
              <p className="truncate">Title</p>
              <BaseInput
                value={editor.value.quiz!.title}
                onChange={(e) => {
                  e.preventDefault();
                  dispatch(
                    setQuiz({
                      ...editor.value.quiz!,
                      title: e.target.value,
                    })
                  );
                }}
                placeholder="Enter quiz title..."
              />
            </div>
            <div className="space-y-1">
              <p className="truncate">Description</p>
              <BaseInput
                value={editor.value.quiz!.description}
                onChange={(e) => {
                  e.preventDefault();
                  dispatch(
                    setQuiz({
                      ...editor.value.quiz!,
                      description: e.target.value,
                    })
                  );
                }}
                placeholder="Enter quiz description..."
              />
            </div>
            <div className="space-y-1">
              <p className="truncate">Cover image</p>
              <FileUploader
                folderName={editor.value.quiz!.coverImg}
                onChange={(file) => {
                  dispatch(
                    setQuiz({
                      ...editor.value.quiz!,
                      coverImg: file,
                    })
                  );
                }}
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1 2xl:space-x-2">
                <p className="truncate">Visibility</p>
                <div className="relative cursor-auto">
                  <IoInformationCircleSharp className="w-5 h-5 peer" />
                  <span className="absolute top-1/2 -translate-y-1/2 left-[110%] -z-1 w-40 px-3 py-1.5 leading-tight bg-beige/50 backdrop-blur-sm rounded-xl opacity-0 peer-active:opacity-100 peer-hover:opacity-100 peer-active:z-1 peer-hover:z-1 transition-all duration-300">
                    Let others discover your quiz
                  </span>
                </div>
              </div>
              <BaseDropdown
                className="bg-white"
                options={VISIBILITY}
                value={editor.value.quiz!.visibility}
                onChange={(e) => {
                  e.preventDefault();
                  dispatch(
                    setQuiz({
                      ...editor.value.quiz!,
                      visibility: e.currentTarget.value,
                    })
                  );
                }}
              />
            </div>
          </div>
          <div className="py-5 md:py-6 px-4 md:px-8 space-y-6">
            {/* todo: updates in questions when template is updated */}
            <p className="text-header-3">Template</p>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="space-y-1 w-[48%]">
                  <div className="relative flex space-x-1 2xl:space-x-2 items-center">
                    <p className="truncate">Time limit</p>
                    <div className="relative cursor-auto">
                      <IoInformationCircleSharp className="w-5 h-5 peer" />
                      <span className="absolute bottom-[110%] left-1/3 -z-1 w-40 xl:w-48 px-3 py-1.5 leading-tight bg-beige/50 backdrop-blur-sm rounded-xl rounded-bl-none opacity-0 peer-active:opacity-100 peer-hover:opacity-100 peer-active:z-1 peer-hover:z-1 transition-all duration-300">
                        Time limit for each question (Unit: second)
                      </span>
                    </div>
                  </div>
                  <BaseInput
                    pattern="\\d*"
                    placeholder="Enter time limit..."
                    value={editor.value.quiz!.timeLimit}
                    onChange={(e) => {
                      e.preventDefault();
                      if (!isNaN(+e.target.value)) {
                        const value =
                          +e.target.value > 1800 ? "1800" : e.target.value;
                        dispatch(
                          setQuiz({
                            ...editor.value.quiz!,
                            timeLimit: value,
                          })
                        );
                      }
                    }}
                    onBlur={(e) => {
                      e.preventDefault();
                      const value =
                        e.target.value === "" || +e.target.value < 1
                          ? "1"
                          : (+e.target.value).toString();
                      dispatch(
                        setQuiz({
                          ...editor.value.quiz!,
                          timeLimit: value,
                        })
                      );
                    }}
                  />
                </div>
                <div className="space-y-1 w-[48%] transition-all duration-300">
                  <div className="relative grid grid-cols-[auto_auto_1fr] items-center 2xl:space-x-2 space-x-1">
                    <p className="truncate">Time factor</p>
                    <div className="relative">
                      <IoInformationCircleSharp className="w-5 h-5 peer" />
                      <span className="absolute bottom-[110%] right-1/3 -z-1 w-44 sm:w-52 px-3 py-1.5 leading-tight bg-beige/50 backdrop-blur-sm rounded-xl rounded-br-none opacity-0 peer-active:opacity-100 peer-hover:opacity-100 peer-active:z-1 peer-hover:z-1  transition-all duration-300">
                        If checked, remaining time (by seconds) will be
                        multiplied by this factor
                      </span>
                    </div>
                    <BaseSwitch
                      checked={editor.value.quiz!.haveTimeFactor}
                      onChange={(e) => {
                        dispatch(
                          setQuiz({
                            ...editor.value.quiz!,
                            haveTimeFactor: e.currentTarget.checked,
                          })
                        );
                      }}
                      className="w-10 h-5 text-jordy-blue place-self-end self-center"
                    />
                  </div>
                  <BaseInput
                    pattern="\\d*"
                    placeholder="Enter time factor..."
                    value={editor.value.quiz!.timeFactor}
                    disabled={!editor.value.quiz!.haveTimeFactor}
                    onChange={(e) => {
                      e.preventDefault();
                      if (!isNaN(+e.target.value)) {
                        const value =
                          +e.target.value > 100
                            ? "100"
                            : +e.target.value < 0
                            ? "0"
                            : e.target.value;
                        dispatch(
                          setQuiz({
                            ...editor.value.quiz!,
                            timeFactor: value,
                          })
                        );
                      }
                    }}
                    onBlur={(e) => {
                      e.preventDefault();
                      const value =
                        e.target.value === "" || +e.target.value < 1
                          ? "0"
                          : (+e.target.value).toString();
                      dispatch(
                        setQuiz({
                          ...editor.value.quiz!,
                          timeFactor: value,
                        })
                      );
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center space-x-4">
                <div className="flex items-center space-x-1 2xl:space-x-2">
                  <p className="truncate">Mark</p>
                  <div className="relative cursor-auto">
                    <IoInformationCircleSharp className="w-5 h-5 peer" />
                    <span className="absolute top-1/2 -translate-y-1/2 left-[110%] -z-1 w-40 md:w-44 lg:w-56 px-3 py-1.5 leading-tight bg-beige/50 backdrop-blur-sm rounded-xl opacity-0 peer-active:opacity-100 peer-hover:opacity-100 peer-active:z-1 peer-hover:z-1 transition-all duration-300">
                      This will only be applied to Paragrah, Fill in the blank,
                      and Matching questions
                    </span>
                  </div>
                </div>
                <BaseInput
                  className="!w-[48%]"
                  placeholder="Enter mark..."
                  value={editor.value.quiz!.mark}
                  onChange={(e) => {
                    e.preventDefault();
                    if (!isNaN(+e.target.value) || e.target.value === "-") {
                      const value =
                        +e.target.value > 100
                          ? "100"
                          : +e.target.value < -100
                          ? "-100"
                          : e.target.value;
                      dispatch(
                        setQuiz({
                          ...editor.value.quiz!,
                          mark: value,
                        })
                      );
                    }
                  }}
                  onBlur={(e) => {
                    e.preventDefault();
                    const value =
                      e.target.value === "" || e.target.value === "-"
                        ? "0"
                        : (+e.target.value).toString();
                    dispatch(
                      setQuiz({
                        ...editor.value.quiz!,
                        mark: value,
                      })
                    );
                  }}
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-1 2xl:space-x-2">
                  <p className="truncate">Case sensitive</p>
                  <div className="relative cursor-auto">
                    <IoInformationCircleSharp className="w-5 h-5 peer" />
                    <span className="absolute top-1/2 -translate-y-1/2 left-[110%] -z-1 w-32 sm:w-52 md:w-auto lg:w-40 xl:w-52 px-3 py-1.5 leading-tight bg-beige/50 backdrop-blur-sm rounded-xl opacity-0 peer-active:opacity-100 peer-hover:opacity-100 peer-active:z-1 peer-hover:z-1 transition-all duration-300">
                      This will only be applied to Paragrah and Fill in the
                      blank questions
                    </span>
                  </div>
                </div>
                <BaseSwitch
                  checked={editor.value.quiz!.caseSensitive}
                  onChange={() => {
                    dispatch(
                      setQuiz({
                        ...editor.value.quiz!,
                        caseSensitive: !editor.value.quiz!.caseSensitive,
                      })
                    );
                  }}
                  className="h-5 text-jordy-blue"
                />
              </div>
              <div className="flex justify-between items-center">
                <p className="truncate transition-all duration-300">
                  Font size
                </p>
                <BaseDropdown
                  className="bg-white"
                  options={FONT_SIZES}
                  value={editor.value.quiz!.fontSize}
                  onChange={(e) => {
                    e.preventDefault();

                    dispatch(
                      setQuiz({
                        ...editor.value.quiz!,
                        fontSize: +e.currentTarget.value,
                      })
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="py-5 md:py-6 px-4 md:px-8 space-y-6">
            <div className="space-y-1">
              <p className="truncate">Question Type</p>
              <BaseDropdown
                className="bg-white"
                options={
                  editor.value.quiz!.questions[editor.value.curPage - 1]
                    .isInPool
                    ? QUESTION_TYPES.slice(0, -1)
                    : QUESTION_TYPES
                }
                value={
                  editor.value.quiz!.questions[editor.value.curPage - 1].type
                }
                onChange={(e) => {
                  e.preventDefault();
                  dispatch(
                    setStoreQuestion({
                      ...editor.value.quiz!.questions[editor.value.curPage - 1],
                      type: e.currentTarget.value,
                      layout: 0,
                      options: [],
                      content:
                        editor.value.quiz!.questions[editor.value.curPage - 1]
                          .type === QuestionTypesEnum.FILL_BLANK
                          ? editor.value.quiz!.questions[
                              editor.value.curPage - 1
                            ].content.includes(BLANK_IDENTIFIER)
                            ? editor.value
                                .quiz!.questions[
                                  editor.value.curPage - 1
                                ].content.split(BLANK_IDENTIFIER)
                                .join(" ")
                            : editor.value.quiz!.questions[
                                editor.value.curPage - 1
                              ].content
                          : editor.value.quiz!.questions[
                              editor.value.curPage - 1
                            ].content,
                    })
                  );
                }}
                disabled={
                  editor.value.quiz!.questions[editor.value.curPage - 1]
                    .type === QuestionTypesEnum.POOL
                }
              />
            </div>
            {editor.value.curPage <= 0 && (
              <div className="flex justify-between items-center">
                <p className="truncate">Use template</p>
                <BaseSwitch
                  checked={
                    editor.value.quiz!.questions[editor.value.curPage - 1]
                      .useTemplate
                  }
                  onChange={(e) => {
                    if (e.currentTarget.checked) {
                      let newQuestion = {
                        ...editor.value.quiz!.questions[
                          editor.value.curPage - 1
                        ],
                      };
                      let newOptions:
                        | ChoiceOption[]
                        | TextOption[]
                        | MatchingOption[];
                      if (
                        newQuestion.type === QuestionTypesEnum.PARAGRAPH ||
                        newQuestion.type === QuestionTypesEnum.FILL_BLANK
                      ) {
                        newOptions = [...(newQuestion.options as TextOption[])];
                        newOptions = newOptions.map((option) => ({
                          ...option,
                          mark: editor.value.quiz!.mark,
                          caseSensitive: editor.value.quiz!.caseSensitive,
                        }));
                      } else if (
                        newQuestion.type === QuestionTypesEnum.MATCHING
                      ) {
                        newOptions = [
                          ...(newQuestion.options as MatchingOption[]),
                        ];
                        let newOptionsPrompts = [...newOptions].filter(
                          (o) => o.type === "MATCHING_PROMPT"
                        );
                        let newOptionsOptions = [...newOptions].filter(
                          (o) => o.type === "MATCHING_OPTION"
                        );
                        let newOptionsAnswers = [...newOptions].filter(
                          (o) => o.type === "MATCHING_ANSWER"
                        );
                        if (newOptionsAnswers.length > 0) {
                          newOptionsAnswers = newOptionsAnswers.map(
                            (option) => ({
                              ...option,
                              mark: editor.value.quiz!.mark,
                            })
                          );
                        }
                        newOptions = [
                          ...newOptionsPrompts,
                          ...newOptionsOptions,
                          ...newOptionsAnswers,
                        ];
                      } else {
                        newOptions = [
                          ...(newQuestion.options as ChoiceOption[]),
                        ];
                      }
                      newQuestion = {
                        ...newQuestion,
                        useTemplate: true,
                        timeLimit: editor.value.quiz!.timeLimit,
                        haveTimeFactor: editor.value.quiz!.haveTimeFactor,
                        timeFactor: editor.value.quiz!.timeFactor,
                        fontSize: editor.value.quiz!.fontSize,
                        options: newOptions,
                      };
                      dispatch(setStoreQuestion(newQuestion));
                    } else {
                      dispatch(
                        setStoreQuestion({
                          ...editor.value.quiz!.questions[
                            editor.value.curPage - 1
                          ],
                          useTemplate: false,
                        })
                      );
                    }
                  }}
                  className="h-5 text-jordy-blue"
                />
              </div>
            )}
          </div>
          <div className="py-5 md:py-6 px-4 md:px-8 space-y-6">
            <div className="space-y-1">
              <p className="truncate">Question</p>
              {editor.value.quiz!.questions[editor.value.curPage - 1].type ===
              QuestionTypesEnum.FILL_BLANK ? (
                <div className="">
                  <BaseTextarea
                    value={
                      editor.value.quiz!.questions[
                        editor.value.curPage - 1
                      ].content.split(BLANK_IDENTIFIER)[0]
                    }
                    onChange={(e) => {
                      e.preventDefault();
                      let rest = editor.value
                        .quiz!.questions[
                          editor.value.curPage - 1
                        ].content.split(BLANK_IDENTIFIER)
                        .slice(1)
                        .join(BLANK_IDENTIFIER);
                      dispatch(
                        setStoreQuestion({
                          ...editor.value.quiz!.questions[
                            editor.value.curPage - 1
                          ],
                          content: `${e.currentTarget.value}${
                            rest ? BLANK_IDENTIFIER : ""
                          }${rest}`,
                        })
                      );
                    }}
                    placeholder="Enter question..."
                  />
                  {editor.value.quiz!.questions[editor.value.curPage - 1]
                    .options.length > 0 &&
                    (
                      editor.value.quiz!.questions[editor.value.curPage - 1]
                        .options as TextOption[]
                    ).map((_, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center w-full -mt-4"
                      >
                        <div className="flex items-center justify-center bg-beige w-11/12 h-10 xl:h-12 rounded-t-lg">
                          Blank&ensp;
                          <p className="flex items-center justify-center rounded-full border w-6 h-6">
                            {String.fromCharCode(65 + i)}
                          </p>
                        </div>
                        <BaseTextarea
                          value={
                            editor.value.quiz!.questions[
                              editor.value.curPage - 1
                            ].content.split(BLANK_IDENTIFIER)[i + 1]
                          }
                          onChange={(e) => {
                            e.preventDefault();
                            let before = editor.value
                              .quiz!.questions[
                                editor.value.curPage - 1
                              ].content.split(BLANK_IDENTIFIER)
                              .slice(0, i + 1)
                              .join(BLANK_IDENTIFIER);
                            let after = editor.value
                              .quiz!.questions[
                                editor.value.curPage - 1
                              ].content.split(BLANK_IDENTIFIER)
                              .slice(i + 2)
                              .join(BLANK_IDENTIFIER);
                            dispatch(
                              setStoreQuestion({
                                ...editor.value.quiz!.questions[
                                  editor.value.curPage - 1
                                ],
                                content: `${before}${BLANK_IDENTIFIER}${
                                  e.currentTarget.value
                                }${after ? BLANK_IDENTIFIER : ""}${after}`,
                              })
                            );
                          }}
                          placeholder="Enter question..."
                        />
                      </div>
                    ))}
                </div>
              ) : (
                <BaseTextarea
                  value={
                    editor.value.quiz!.questions[editor.value.curPage - 1]
                      .content
                  }
                  onChange={(e) => {
                    e.preventDefault();
                    dispatch(
                      setStoreQuestion({
                        ...editor.value.quiz!.questions[
                          editor.value.curPage - 1
                        ],
                        content: e.currentTarget.value,
                      })
                    );
                  }}
                  placeholder="Enter question..."
                />
              )}
            </div>
            <div className="space-y-1">
              <p className="truncate">Note</p>
              <BaseTextarea
                placeholder="Enter note..."
                value={
                  editor.value.quiz!.questions[editor.value.curPage - 1].note
                }
                onChange={(e) => {
                  e.preventDefault();
                  dispatch(
                    setStoreQuestion({
                      ...editor.value.quiz!.questions[editor.value.curPage - 1],
                      note: e.currentTarget.value,
                    })
                  );
                }}
              />
            </div>
            {!editor.value.quiz!.questions[editor.value.curPage - 1]
              .isInPool && (
              <>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="truncate">Media</p>
                    <BaseDropdown
                      className="bg-white w-[48%]"
                      options={[{ label: "None", value: "" }, ...MEDIA_TYPES]}
                      value={
                        editor.value.quiz!.questions[editor.value.curPage - 1]
                          .mediaType
                      }
                      onChange={(e) => {
                        e.preventDefault();
                        dispatch(
                          setStoreQuestion({
                            ...editor.value.quiz!.questions[
                              editor.value.curPage - 1
                            ],
                            mediaType: e.currentTarget.value,
                            media: "",
                          })
                        );
                      }}
                    />
                  </div>
                  {editor.value.quiz!.questions[editor.value.curPage - 1]
                    .mediaType &&
                    (editor.value.quiz!.questions[editor.value.curPage - 1]
                      .mediaType === MediaTypesEnum.EQUATION ? (
                      <EquationInput
                        latex={
                          editor.value.quiz!.questions[editor.value.curPage - 1]
                            .media
                        }
                        onChange={(mf) => {
                          dispatch(
                            setStoreQuestion({
                              ...editor.value.quiz!.questions[
                                editor.value.curPage - 1
                              ],
                              media: mf.latex(),
                            })
                          );
                        }}
                      />
                    ) : (
                      <FileUploader
                        folderName={
                          editor.value.quiz!.questions[editor.value.curPage - 1]
                            .media
                        }
                        acceptImage={
                          editor.value.quiz!.questions[editor.value.curPage - 1]
                            .mediaType === MediaTypesEnum.IMAGE
                        }
                        acceptAudio={
                          editor.value.quiz!.questions[editor.value.curPage - 1]
                            .mediaType === MediaTypesEnum.AUDIO
                        }
                        acceptVideo={
                          editor.value.quiz!.questions[editor.value.curPage - 1]
                            .mediaType === MediaTypesEnum.VIDEO
                        }
                        onChange={(file) => {
                          dispatch(
                            setStoreQuestion({
                              ...editor.value.quiz!.questions[
                                editor.value.curPage - 1
                              ],
                              media: file,
                            })
                          );
                        }}
                      />
                    ))}
                </div>
                <div className="flex justify-between">
                  <div className="space-y-2 w-[48%]">
                    <div
                      className={`flex space-x-1 2xl:space-x-2 items-center transition-all duration-300 ${
                        editor.value.quiz!.questions[editor.value.curPage - 1]
                          .useTemplate
                          ? "text-regent-gray"
                          : "text-black"
                      }`}
                    >
                      <p className="truncate">Time limit</p>
                      <div className="relative cursor-auto">
                        <IoInformationCircleSharp className="w-5 h-5 peer" />
                        <span className="absolute bottom-[110%] -z-1 left-1/3 w-40 xl:w-48 px-3 py-1.5 leading-tight bg-beige/50 backdrop-blur-sm rounded-xl rounded-bl-none opacity-0 peer-active:opacity-100 peer-hover:opacity-100 peer-active:z-1 peer-hover:z-1 transition-all duration-300">
                          Time limit for each question (Unit: second)
                        </span>
                      </div>
                    </div>
                    <BaseInput
                      pattern="\\d*"
                      placeholder="Enter time limit..."
                      value={
                        editor.value.quiz!.questions[editor.value.curPage - 1]
                          .useTemplate
                          ? editor.value.quiz!.timeLimit
                          : editor.value.quiz!.questions[
                              editor.value.curPage - 1
                            ].timeLimit
                      }
                      onChange={(e) => {
                        e.preventDefault();
                        if (!isNaN(+e.target.value)) {
                          const value =
                            +e.target.value > 1800 ? "1800" : e.target.value;
                          dispatch(
                            setStoreQuestion({
                              ...editor.value.quiz!.questions[
                                editor.value.curPage - 1
                              ],
                              timeLimit: value,
                            })
                          );
                        }
                      }}
                      onBlur={(e) => {
                        e.preventDefault();
                        const value =
                          e.target.value === "" || +e.target.value < 1
                            ? "1"
                            : (+e.target.value).toString();
                        dispatch(
                          setStoreQuestion({
                            ...editor.value.quiz!.questions[
                              editor.value.curPage - 1
                            ],
                            timeLimit: value,
                          })
                        );
                      }}
                      disabled={
                        editor.value.quiz!.questions[editor.value.curPage - 1]
                          .useTemplate
                      }
                    />
                  </div>
                  <div
                    className={`space-y-2 w-[48%] transition-all duration-300 ${
                      editor.value.quiz!.questions[editor.value.curPage - 1]
                        .useTemplate
                        ? "text-regent-gray"
                        : "text-black"
                    }`}
                  >
                    <div className="relative grid grid-cols-[auto_auto_1fr] items-center 2xl:space-x-2 space-x-1">
                      <p className="truncate">Time factor</p>
                      <div className="relative">
                        <IoInformationCircleSharp className="w-5 h-5 peer" />
                        <span className="absolute bottom-[110%] right-1/3 -z-1 w-44 sm:w-52 px-3 py-1.5 leading-tight bg-beige/50 backdrop-blur-sm rounded-xl rounded-br-none opacity-0 peer-active:opacity-100 peer-hover:opacity-100 peer-active:z-1 peer-hover:z-1  transition-all duration-300">
                          If checked, remaining time (by seconds) will be
                          multiplied by this factor
                        </span>
                      </div>
                      <BaseSwitch
                        checked={
                          editor.value.quiz!.questions[editor.value.curPage - 1]
                            .useTemplate
                            ? editor.value.quiz!.haveTimeFactor
                            : editor.value.quiz!.questions[
                                editor.value.curPage - 1
                              ].haveTimeFactor
                        }
                        onChange={(e) => {
                          dispatch(
                            setStoreQuestion({
                              ...editor.value.quiz!.questions[
                                editor.value.curPage - 1
                              ],
                              haveTimeFactor: e.currentTarget.checked,
                            })
                          );
                        }}
                        className="h-5 text-jordy-blue place-self-end self-center"
                        disabled={
                          editor.value.quiz!.questions[editor.value.curPage - 1]
                            .useTemplate
                        }
                      />
                    </div>
                    <BaseInput
                      pattern="\\d*"
                      placeholder="Enter time factor..."
                      value={
                        editor.value.quiz!.questions[editor.value.curPage - 1]
                          .useTemplate
                          ? editor.value.quiz!.timeFactor
                          : editor.value.quiz!.questions[
                              editor.value.curPage - 1
                            ].timeFactor
                      }
                      onChange={(e) => {
                        e.preventDefault();
                        if (!isNaN(+e.target.value)) {
                          const value =
                            +e.target.value > 100
                              ? "100"
                              : +e.target.value < 0
                              ? "0"
                              : e.target.value;
                          dispatch(
                            setStoreQuestion({
                              ...editor.value.quiz!.questions[
                                editor.value.curPage - 1
                              ],
                              timeFactor: value,
                            })
                          );
                        }
                      }}
                      onBlur={(e) => {
                        e.preventDefault();
                        const value =
                          e.target.value === "" || +e.target.value < 1
                            ? "0"
                            : (+e.target.value).toString();
                        dispatch(
                          setStoreQuestion({
                            ...editor.value.quiz!.questions[
                              editor.value.curPage - 1
                            ],
                            timeFactor: value,
                          })
                        );
                      }}
                      disabled={
                        editor.value.quiz!.questions[editor.value.curPage - 1]
                          .useTemplate ||
                        !(editor.value.quiz!.questions[editor.value.curPage - 1]
                          .useTemplate
                          ? editor.value.quiz!.haveTimeFactor
                          : editor.value.quiz!.questions[
                              editor.value.curPage - 1
                            ].haveTimeFactor)
                      }
                    />
                  </div>
                </div>
              </>
            )}
          </div>
          {editor.value.quiz!.questions[editor.value.curPage - 1].type ===
            QuestionTypesEnum.CHOICE && <Choice />}
          {editor.value.quiz!.questions[editor.value.curPage - 1].type ===
            QuestionTypesEnum.TRUE_FALSE && <TrueFalse />}
          {editor.value.quiz!.questions[editor.value.curPage - 1].type ===
            QuestionTypesEnum.FILL_BLANK && <FillBlank />}
          {editor.value.quiz!.questions[editor.value.curPage - 1].type ===
            QuestionTypesEnum.PARAGRAPH && <Paragraph />}
          {editor.value.quiz!.questions[editor.value.curPage - 1].type ===
            QuestionTypesEnum.MATCHING && <Matching />}
          {editor.value.quiz!.questions[editor.value.curPage - 1].isInPool &&
            editor.value.quiz!.questions[editor.value.curPage - 1].type !==
              QuestionTypesEnum.POOL && (
              <div className="py-5 md:py-6 px-4 md:px-8 space-y-6">
                <div className="flex justify-between items-center">
                  <p className="truncate">Required</p>
                  <BaseSwitch
                    checked={
                      editor.value.quiz!.questions[editor.value.curPage - 1]
                        .poolRequired
                    }
                    onChange={(e) => {
                      dispatch(
                        setStoreQuestion({
                          ...editor.value.quiz!.questions[
                            editor.value.curPage - 1
                          ],
                          poolRequired: e.currentTarget.checked,
                        })
                      );
                    }}
                    className="h-5 text-jordy-blue"
                  />
                </div>
              </div>
            )}
          <div className="py-5 md:py-6 px-4 md:px-8 space-y-6">
            <div className="space-y-2">
              <p className="truncate">Layout</p>
              <div className="grid grid-cols-2 gap-4">
                {LAYOUTS[
                  editor.value.quiz!.questions[editor.value.curPage - 1]
                    .type as keyof typeof LAYOUTS
                ].map((layout: string, i: number) => (
                  <div key={i} className="flex items-center justify-center">
                    <input
                      type="radio"
                      name="layout"
                      id={`layout-${i}`}
                      checked={
                        i ===
                        editor.value.quiz!.questions[editor.value.curPage - 1]
                          .layout
                      }
                      onChange={() => {
                        dispatch(
                          setStoreQuestion({
                            ...editor.value.quiz!.questions[
                              editor.value.curPage - 1
                            ],
                            layout: i,
                          })
                        );
                      }}
                      className="peer hidden"
                    />
                    <label
                      htmlFor={`layout-${i}`}
                      className="w-full aspect-[4/3] bg-quill-gray rounded-xl cursor-pointer peer-checked:ring-2 ring-jordy-blue"
                    >
                      <img
                        src={layout}
                        alt={
                          editor.value.quiz!.questions[editor.value.curPage - 1]
                            .type +
                          "-" +
                          i
                        }
                        className="object-cover text-note"
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p
                className={`truncate transition-all duration-300 ${
                  editor.value.quiz!.questions[editor.value.curPage - 1]
                    .useTemplate
                    ? "text-regent-gray"
                    : "text-black"
                }`}
              >
                Font size
              </p>
              <BaseDropdown
                className="bg-white"
                options={FONT_SIZES}
                value={
                  editor.value.quiz!.questions[editor.value.curPage - 1]
                    .useTemplate
                    ? editor.value.quiz!.fontSize
                    : editor.value.quiz!.questions[editor.value.curPage - 1]
                        .fontSize
                }
                onChange={(e) => {
                  e.preventDefault();
                  dispatch(
                    setStoreQuestion({
                      ...editor.value.quiz!.questions[editor.value.curPage - 1],
                      fontSize: +e.currentTarget.value,
                    })
                  );
                }}
                disabled={
                  editor.value.quiz!.questions[editor.value.curPage - 1]
                    .useTemplate
                }
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
