import useTypedSelector from "@/common/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import BaseTextarea from "@/common/components/textareas/BaseTextarea";
import BaseSwitch from "@/common/components/switches/BaseSwitch";
import { FormEvent } from "react";
import { setQuestion } from "@/features/library/store/slice";
import BaseInput from "@/common/components/inputs/BaseInput";

export default function Paragraph() {
  const dispatch = useDispatch<StoreDispatch>();
  const editor = useTypedSelector((state) => state.editor);

  function onToggleCorrectAnswer(e: FormEvent<HTMLInputElement>) {
    let newQuestion = editor.value.quiz!.questions[editor.value.curPage - 1];
    let newOptions = [...(newQuestion.options as TextOption[])];
    if (e.currentTarget.checked) {
      newOptions = [
        {
          content: "",
          order: 1,
          mark: editor.value.quiz!.mark,
          caseSensitive: editor.value.quiz!.caseSensitive,
        },
      ];
      newQuestion = {
        ...newQuestion,
        options: newOptions,
      };
    } else {
      newQuestion = {
        ...newQuestion,
        options: [],
      };
    }
    dispatch(setQuestion(newQuestion));
  }

  return (
    <div className="py-5 md:py-6 px-4 md:px-8 space-y-6">
      <div className="flex justify-between items-center">
        <p>Correct answer</p>
        <BaseSwitch
          className="h-5 text-jordy-blue"
          checked={
            (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as TextOption[]
            ).length > 0
          }
          onChange={onToggleCorrectAnswer}
        />
      </div>
      {(
        editor.value.quiz!.questions[editor.value.curPage - 1]
          .options as TextOption[]
      ).length > 0 && (
        <div className="space-y-2">
          <BaseTextarea
            placeholder="Enter correct answer..."
            value={
              (
                editor.value.quiz!.questions[editor.value.curPage - 1]
                  .options as TextOption[]
              )[0].content
            }
            onChange={(e) => {
              let newQuestion =
                editor.value.quiz!.questions[editor.value.curPage - 1];
              let newOptions = [...(newQuestion.options as TextOption[])];
              newOptions = [
                {
                  ...newOptions[0],
                  content: e.currentTarget.value,
                },
              ];
              newQuestion = {
                ...newQuestion,
                options: newOptions,
              };
              dispatch(setQuestion(newQuestion));
            }}
          />
          <div className="col-start-2 flex justify-between items-center">
            <p className="truncate">Mark</p>
            <BaseInput
              className="!w-[48%]"
              pattern="//d*"
              placeholder="Enter mark..."
              value={
                editor.value.quiz!.questions[editor.value.curPage - 1]
                  .useTemplate
                  ? editor.value.quiz!.mark
                  : (
                      editor.value.quiz!.questions[editor.value.curPage - 1]
                        .options[0] as TextOption
                    ).mark
              }
              onChange={(e) => {
                e.preventDefault();
                if (!isNaN(+e.target.value) || e.target.value === "-") {
                  let value = e.target.value;
                  if (+value < -100) value = "-100";
                  if (+value > 100) value = "100";
                  let newOptions = [
                    ...(editor.value.quiz!.questions[editor.value.curPage - 1]
                      .options as TextOption[]),
                  ];
                  newOptions.splice(0, 1, {
                    ...newOptions[0],
                    mark: value,
                  });
                  let newQuestion = {
                    ...editor.value.quiz!.questions[editor.value.curPage - 1],
                  };
                  newQuestion = {
                    ...newQuestion,
                    options: newOptions,
                  };
                  dispatch(setQuestion(newQuestion));
                }
              }}
              onBlur={(e) => {
                e.preventDefault();
                const value =
                  e.target.value === "-" || e.target.value === ""
                    ? "0"
                    : (+e.target.value).toString();
                let newOptions = [
                  ...(editor.value.quiz!.questions[editor.value.curPage - 1]
                    .options as ChoiceOption[]),
                ];
                newOptions.splice(0, 1, {
                  ...newOptions[0],
                  mark: value,
                });
                let newQuestion = {
                  ...editor.value.quiz!.questions[editor.value.curPage - 1],
                };
                newQuestion = {
                  ...newQuestion,
                  options: newOptions,
                };
                dispatch(setQuestion(newQuestion));
              }}
              disabled={
                editor.value.quiz!.questions[editor.value.curPage - 1]
                  .useTemplate
              }
            />
          </div>
          <div className="flex justify-between items-center">
            <p>Case sensitive</p>
            <BaseSwitch
              className="h-5 text-jordy-blue"
              checked={
                editor.value.quiz!.questions[editor.value.curPage - 1]
                  .useTemplate
                  ? editor.value.quiz!.caseSensitive
                  : (
                      editor.value.quiz!.questions[editor.value.curPage - 1]
                        .options as TextOption[]
                    )[0].caseSensitive
              }
              onChange={() => {
                let newQuestion =
                  editor.value.quiz!.questions[editor.value.curPage - 1];
                let newOptions = [...(newQuestion.options as TextOption[])];
                newOptions = [
                  {
                    ...newOptions[0],
                    caseSensitive: !newOptions[0].caseSensitive,
                  },
                ];
                newQuestion = {
                  ...newQuestion,
                  options: newOptions,
                };
                dispatch(setQuestion(newQuestion));
              }}
              disabled={
                editor.value.quiz!.questions[editor.value.curPage - 1]
                  .useTemplate
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
