import { FormEvent } from "react";
import { IoClose } from "react-icons/io5";
import BaseDropdown from "@/common/components/dropdowns/BaseDropdown";
import BaseInput from "@/common/components/inputs/BaseInput";
import FilledButton from "@/common/components/buttons/FilledButton";
import useTypedSelector from "@/common/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { setQuestion } from "@/features/library/store/slice";
import BaseCheckbox from "@/common/components/checkboxes/BaseCheckbox";
import CHOICE_COLORS from "@/features/library/utils/constants/choice-colors";

export default function Choice() {
  const dispatch = useDispatch<StoreDispatch>();
  const editor = useTypedSelector((state) => state.editor);

  function randomColor() {
    let existingColors = (
      editor.value.quiz!.questions[editor.value.curPage - 1]
        .options as ChoiceOption[]
    ).map((option) => option.color);
    let color = "#ccccbb";

    while (true) {
      color = CHOICE_COLORS[Math.floor(Math.random() * CHOICE_COLORS.length)];
      if (!existingColors.includes(color)) {
        break;
      }
    }

    return color;
  }

  return (
    <div className="py-5 md:py-6 px-4 md:px-8 space-y-6">
      <div className="space-y-6">
        <p className="truncate">Options</p>
        {(
          editor.value.quiz!.questions[editor.value.curPage - 1]
            .options as ChoiceOption[]
        ).length > 0 &&
          (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as ChoiceOption[]
          ).map((option, i) => <Option key={i} option={option} index={i} />)}
        {(
          editor.value.quiz!.questions[editor.value.curPage - 1]
            .options as ChoiceOption[]
        ).length < 10 && (
          <FilledButton
            onClick={(e) => {
              e.preventDefault();
              let newQuestion =
                editor.value.quiz!.questions[editor.value.curPage - 1];
              let newOptions = [...(newQuestion.options as ChoiceOption[])];
              newOptions = [
                ...newOptions,
                {
                  order: newOptions.length + 1,
                  color: randomColor(),
                  content: "",
                  mark: "0",
                  isCorrect: false,
                } as ChoiceOption,
              ];

              if (
                editor.value.quiz!.questions[editor.value.curPage - 1]
                  .selectMax === 0
              ) {
                newQuestion = {
                  ...newQuestion,
                  selectMax: 1,
                  options: newOptions,
                };
              } else {
                newQuestion = {
                  ...newQuestion,
                  options: newOptions,
                };
              }
              dispatch(setQuestion(newQuestion));
            }}
            type="button"
            className="bg-jordy-blue w-full h-10 xl:h-12 rounded-xl"
          >
            + Add option
          </FilledButton>
        )}
      </div>
      <div className="space-y-2">
        {editor.value.quiz!.questions[editor.value.curPage - 1].selectMax >
          1 && (
          <div className="flex justify-between items-center">
            <p className="truncate">Select at least</p>
            <BaseDropdown
              className="bg-white"
              options={Array.from({
                length:
                  editor.value.quiz!.questions[editor.value.curPage - 1]
                    .selectMax,
              }).map((_, i) => ({
                value: i + 1,
                label: (i + 1).toString(),
              }))}
              value={
                editor.value.quiz!.questions[editor.value.curPage - 1].selectMin
              }
              onChange={(e) => {
                e.preventDefault();
                let newQuestion = {
                  ...editor.value.quiz!.questions[editor.value.curPage - 1],
                };
                newQuestion = {
                  ...newQuestion,
                  selectMin: +e.currentTarget.value,
                };
                dispatch(setQuestion(newQuestion));
              }}
            />
          </div>
        )}
        {editor.value.quiz!.questions[editor.value.curPage - 1].options.length >
          0 && (
          <div className="flex justify-between items-center">
            <p className="truncate">Select up to</p>
            <BaseDropdown
              className="bg-white"
              options={
                (
                  editor.value.quiz!.questions[editor.value.curPage - 1]
                    .options as ChoiceOption[]
                ).length > 0
                  ? (
                      editor.value.quiz!.questions[editor.value.curPage - 1]
                        .options as ChoiceOption[]
                    ).map((_, i) => ({
                      value: i + 1,
                      label: (i + 1).toString(),
                    }))
                  : []
              }
              value={
                editor.value.quiz!.questions[editor.value.curPage - 1].selectMax
              }
              onChange={(e) => {
                e.preventDefault();
                let newOptions = [
                  ...(editor.value.quiz!.questions[editor.value.curPage - 1]
                    .options as ChoiceOption[]),
                ];
                newOptions = newOptions.map((option) => ({
                  ...option,
                  isCorrect: false,
                }));
                let newQuestion = {
                  ...editor.value.quiz!.questions[editor.value.curPage - 1],
                };
                newQuestion = {
                  ...newQuestion,
                  selectMin:
                    newQuestion.selectMin > +e.currentTarget.value
                      ? +e.currentTarget.value
                      : newQuestion.selectMin,
                  selectMax: +e.currentTarget.value,
                  options: newOptions,
                };
                dispatch(setQuestion(newQuestion));
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function Option({ option, index }: { option: ChoiceOption; index: number }) {
  const dispatch = useDispatch<StoreDispatch>();
  const editor = useTypedSelector((state) => state.editor);

  function onRemoveOption(e: FormEvent<HTMLButtonElement>, i: number) {
    e.preventDefault();
    let newQuestion = editor.value.quiz!.questions[editor.value.curPage - 1];
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
  }

  return (
    <div className="grid grid-cols-[auto_auto_1fr_auto] gap-x-2 gap-y-2 items-center">
      <BaseCheckbox
        id={index.toString()}
        checked={
          (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as ChoiceOption[]
          )[index].isCorrect
        }
        onChange={() => {
          let newQuestion = {
            ...editor.value.quiz!.questions[editor.value.curPage - 1],
          };
          let newOptions = [
            ...(editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as ChoiceOption[]),
          ];
          newOptions.splice(index, 1, {
            ...newOptions[index],
            isCorrect: !newOptions[index].isCorrect,
          });
          newQuestion = {
            ...newQuestion,
            options: newOptions,
          };
          dispatch(setQuestion(newQuestion));
        }}
        disabled={
          editor.value.quiz!.questions[editor.value.curPage - 1].selectMax <=
            (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as ChoiceOption[]
            ).filter((option) => option.isCorrect).length &&
          !(
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as ChoiceOption[]
          )[index].isCorrect
        }
        className="mr-1 text-apple"
      />
      <p className="truncate">{String.fromCharCode(65 + index)}&#46;</p>
      <BaseInput
        placeholder="Enter option..."
        value={
          (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as ChoiceOption[]
          )[index].content
        }
        onChange={(e) => {
          e.preventDefault();
          let newOptions = [
            ...(editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as ChoiceOption[]),
          ];
          newOptions.splice(index, 1, {
            ...newOptions[index],
            content: e.target.value,
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
      />
      {(
        editor.value.quiz!.questions[editor.value.curPage - 1]
          .options as ChoiceOption[]
      ).length > 0 && (
        <button onClick={(e) => onRemoveOption(e, index)} type="button">
          <IoClose className="w-5 h-5" />
        </button>
      )}
      <div className="col-start-3 grid grid-cols-[1fr_auto] gap-x-4">
        <div className="space-y-0.5">
          <p className="truncate">Mark</p>
          <BaseInput
            pattern="//d*"
            placeholder="Enter mark..."
            value={option.mark}
            onChange={(e) => {
              e.preventDefault();
              if (!isNaN(+e.target.value) || e.target.value === "-") {
                let value = e.target.value;
                if (+value < -100) value = "-100";
                if (+value > 100) value = "100";
                if (
                  editor.value.quiz!.questions[
                    editor.value.curPage - 1
                  ].options.filter(
                    (option) => (option as ChoiceOption).isCorrect
                  ).length > 0
                ) {
                  let mostMark = (
                    editor.value.quiz!.questions[
                      editor.value.curPage - 1
                    ].options.filter(
                      (option) => (option as ChoiceOption).isCorrect
                    )[0] as ChoiceOption
                  ).mark;
                  if (
                    !(
                      editor.value.quiz!.questions[editor.value.curPage - 1]
                        .options[index] as ChoiceOption
                    ).isCorrect &&
                    value > mostMark
                  ) {
                    value = (+mostMark).toString();
                  }
                }

                let newOptions = [
                  ...(editor.value.quiz!.questions[editor.value.curPage - 1]
                    .options as ChoiceOption[]),
                ];
                newOptions.splice(index, 1, {
                  ...newOptions[index],
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
              let value;
              if (e.target.value === "-" || e.target.value === "") {
                value = "0";
              } else {
                value = (+e.target.value).toString();
              }
              let newOptions = [
                ...(editor.value.quiz!.questions[editor.value.curPage - 1]
                  .options as ChoiceOption[]),
              ];
              newOptions.splice(index, 1, {
                ...newOptions[index],
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
          />
        </div>
        <div className="space-y-0.5">
          <p className="truncate">Color</p>
          <label
            className="block h-10 xl:h-12 w-10 xl:w-12 rounded-xl relative border border-regent-gray/50"
            style={{ backgroundColor: option.color }}
          >
            <input
              type="color"
              value={option.color}
              onChange={(e) => {
                e.preventDefault();
                let newOptions = [
                  ...(editor.value.quiz!.questions[editor.value.curPage - 1]
                    .options as ChoiceOption[]),
                ];
                newOptions.splice(index, 1, {
                  ...newOptions[index],
                  color: e.target.value,
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
              className="w-full h-full opacity-0 cursor-pointer"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
