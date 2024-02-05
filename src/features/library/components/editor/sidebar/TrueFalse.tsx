import BaseInput from "@/common/components/inputs/BaseInput";
import useTypedSelector from "@/common/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { setQuestion } from "@/features/library/store/slice";
import { ChangeEvent, FocusEvent, FormEvent, useEffect } from "react";
import BaseSwitch from "@/common/components/switches/BaseSwitch";
import BaseCheckbox from "@/common/components/checkboxes/BaseCheckbox";
import EditableLabel from "@/common/components/inputs/EditableLabel";

export default function TrueFalse() {
  const dispatch = useDispatch<StoreDispatch>();
  const editor = useTypedSelector((state) => state.editor);

  useEffect(() => {
    if (
      (
        editor.value.quiz!.questions[editor.value.curPage - 1]
          .options as ChoiceOption[]
      ).length === 0
    ) {
      let newQuestion = editor.value.quiz!.questions[editor.value.curPage - 1];
      let newOptions = [...(newQuestion.options as ChoiceOption[])];
      newOptions = [
        {
          order: 1,
          color: "#C8E6C9",
          content: "True",
          mark: "0",
          isCorrect: false,
        } as ChoiceOption,
        {
          order: 2,
          color: "#FFCCBC",
          content: "False",
          mark: "0",
          isCorrect: false,
        } as ChoiceOption,
      ];
      newQuestion = {
        ...newQuestion,
        selectMax: 1,
        options: newOptions,
      };
      dispatch(setQuestion(newQuestion));
    }
  }, []);

  function onCheckCorrect(e: FormEvent<HTMLInputElement>, i: number) {
    let newOptions = [
      ...(editor.value.quiz!.questions[editor.value.curPage - 1]
        .options as ChoiceOption[]),
    ];
    newOptions.splice(i, 1, {
      ...newOptions[i],
      isCorrect: !newOptions[i].isCorrect,
    });

    if (e.currentTarget.checked) {
      let mostMark = newOptions[i].mark;
      for (let ii = 0; ii < newOptions.length; ii++) {
        if (ii !== i && newOptions[ii].mark > mostMark) {
          newOptions[ii] = {
            ...newOptions[ii],
            mark: mostMark,
          };
        }
      }
    }

    let newQuestion = {
      ...editor.value.quiz!.questions[editor.value.curPage - 1],
    };
    newQuestion = {
      ...newQuestion,
      options: newOptions,
    };
    dispatch(setQuestion(newQuestion));
  }

  function onInputMark(e: ChangeEvent<HTMLInputElement>, i: number) {
    e.preventDefault();
    if (!isNaN(+e.target.value) || e.target.value === "-") {
      let value = e.target.value;
      if (+value < -100) value = "-100";
      if (+value > 100) value = "100";
      if (
        editor.value.quiz!.questions[editor.value.curPage - 1].options.filter(
          (option) => (option as ChoiceOption).isCorrect
        ).length > 0
      ) {
        let mostMark = (
          editor.value.quiz!.questions[editor.value.curPage - 1].options.filter(
            (option) => (option as ChoiceOption).isCorrect
          )[0] as ChoiceOption
        ).mark;
        if (
          !(
            editor.value.quiz!.questions[editor.value.curPage - 1].options[
              i
            ] as ChoiceOption
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
      newOptions.splice(i, 1, {
        ...newOptions[i],
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
  }

  function onBlurMark(e: FocusEvent<HTMLInputElement, Element>, i: number) {
    e.preventDefault();
    const value =
      e.target.value === "-" || e.target.value === ""
        ? "0"
        : (+e.target.value).toString();
    let newOptions = [
      ...(editor.value.quiz!.questions[editor.value.curPage - 1]
        .options as ChoiceOption[]),
    ];
    newOptions.splice(i, 1, {
      ...newOptions[i],
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

  if (
    (
      editor.value.quiz!.questions[editor.value.curPage - 1]
        .options as ChoiceOption[] as ChoiceOption[]
    ).length > 0
  ) {
    return (
      <div className="py-5 md:py-6 px-4 md:px-8 space-y-6">
        <p className="truncate">Options</p>
        <div className="grid grid-cols-[auto_1fr_2fr] gap-x-2 gap-y-0.5 items-center">
          <BaseCheckbox
            id="true"
            className="text-apple mr-2"
            checked={
              (
                editor.value.quiz!.questions[editor.value.curPage - 1]
                  .options as ChoiceOption[] as ChoiceOption[]
              )[0].isCorrect
            }
            onChange={(e) => onCheckCorrect(e, 0)}
            disabled={
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .selectMax <=
                (
                  editor.value.quiz!.questions[editor.value.curPage - 1]
                    .options as ChoiceOption[]
                ).filter((option) => option.isCorrect).length &&
              !(
                editor.value.quiz!.questions[editor.value.curPage - 1]
                  .options as ChoiceOption[]
              )[0].isCorrect
            }
          />
          <p className="truncate">True</p>
          <p className="text-body-2 truncate">Mark</p>
          <BaseInput
            className="col-start-3"
            placeholder="Enter mark..."
            pattern="\\d*"
            value={
              (
                editor.value.quiz!.questions[editor.value.curPage - 1]
                  .options as ChoiceOption[]
              )[0].mark
            }
            onChange={(e) => onInputMark(e, 0)}
            onBlur={(e) => onBlurMark(e, 0)}
          />
        </div>
        <div className="grid grid-cols-[auto_1fr_2fr] gap-x-2 gap-y-0.5 items-center">
          <BaseCheckbox
            id="false"
            className="text-apple mr-2"
            checked={
              (
                editor.value.quiz!.questions[editor.value.curPage - 1]
                  .options as ChoiceOption[]
              )[1].isCorrect
            }
            onChange={(e) => onCheckCorrect(e, 1)}
            disabled={
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .selectMax <=
                (
                  editor.value.quiz!.questions[editor.value.curPage - 1]
                    .options as ChoiceOption[]
                ).filter((option) => option.isCorrect).length &&
              !(
                editor.value.quiz!.questions[editor.value.curPage - 1]
                  .options as ChoiceOption[]
              )[1].isCorrect
            }
          />
          <p className="truncate">False</p>
          <p className="text-body-2 truncate">Mark</p>
          <BaseInput
            className="col-start-3"
            placeholder="Enter mark..."
            pattern="\\d*"
            value={
              (
                editor.value.quiz!.questions[editor.value.curPage - 1]
                  .options as ChoiceOption[]
              )[1].mark
            }
            onChange={(e) => onInputMark(e, 1)}
            onBlur={(e) => onBlurMark(e, 1)}
          />
        </div>
        <div className="grid grid-cols-[auto_1fr_2fr] gap-2 items-center">
          <BaseCheckbox
            id="maybe"
            className="text-apple mr-2"
            checked={
              (
                editor.value.quiz!.questions[editor.value.curPage - 1]
                  .options as ChoiceOption[]
              )[2]?.isCorrect
            }
            onChange={(e) => onCheckCorrect(e, 2)}
            disabled={
              (
                editor.value.quiz!.questions[editor.value.curPage - 1]
                  .options as ChoiceOption[]
              ).length < 3
                ? true
                : editor.value.quiz!.questions[editor.value.curPage - 1]
                    .selectMax <=
                    (
                      editor.value.quiz!.questions[editor.value.curPage - 1]
                        .options as ChoiceOption[]
                    ).filter((option) => option.isCorrect).length &&
                  !(
                    editor.value.quiz!.questions[editor.value.curPage - 1]
                      .options as ChoiceOption[]
                  )[2].isCorrect
            }
          />
          <div className="col-span-2 flex justify-between space-x-2">
            <EditableLabel
              className="!p-0 [&:empty:before]:not-italic"
              placeholder="Maybe"
              value={
                (
                  editor.value.quiz!.questions[editor.value.curPage - 1]
                    .options as ChoiceOption[]
                ).length > 2
                  ? (
                      editor.value.quiz!.questions[editor.value.curPage - 1]
                        .options as ChoiceOption[]
                    )[2].content
                  : "Maybe"
              }
              onChange={(e) => {
                e.preventDefault();
                let newOptions = [
                  ...(editor.value.quiz!.questions[editor.value.curPage - 1]
                    .options as ChoiceOption[]),
                ];
                newOptions.splice(2, 1, {
                  ...newOptions[2],
                  content: e.currentTarget.innerText,
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
                (
                  editor.value.quiz!.questions[editor.value.curPage - 1]
                    .options as ChoiceOption[]
                ).length < 3
              }
              truncate
            />
            <BaseSwitch
              className="h-5 text-jordy-blue place-self-end"
              checked={
                (
                  editor.value.quiz!.questions[editor.value.curPage - 1]
                    .options as ChoiceOption[]
                ).length > 2
              }
              onChange={() => {
                let newQuestion =
                  editor.value.quiz!.questions[editor.value.curPage - 1];
                let newOptions = [...(newQuestion.options as ChoiceOption[])];
                if (newOptions.length > 2) {
                  newOptions = newOptions.slice(0, 2);
                } else {
                  newOptions = [
                    ...newOptions,
                    {
                      order: 3,
                      color: "#faf7ee",
                      content: "Maybe",
                      mark: "0",
                      isCorrect: false,
                    } as ChoiceOption,
                  ];
                }
                newQuestion = {
                  ...newQuestion,
                  options: newOptions,
                };
                dispatch(setQuestion(newQuestion));
              }}
            />
          </div>
          {(
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as ChoiceOption[]
          )[2] && (
            <>
              <p className="col-start-2 text-body-2 truncate">Mark</p>
              <BaseInput
                className="col-start-3"
                placeholder="Enter mark..."
                pattern="\\d*"
                value={
                  (
                    editor.value.quiz!.questions[editor.value.curPage - 1]
                      .options as ChoiceOption[]
                  )[2].mark
                }
                onChange={(e) => onInputMark(e, 2)}
                onBlur={(e) => onBlurMark(e, 2)}
              />
            </>
          )}
        </div>
      </div>
    );
  } else return null;
}
