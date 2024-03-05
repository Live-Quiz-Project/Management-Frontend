import { FormEvent } from "react";
import { IoClose } from "react-icons/io5";
import BaseInput from "@/common/components/inputs/BaseInput";
import FilledButton from "@/common/components/buttons/FilledButton";
import useTypedSelector from "@/common/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { setQuestion } from "@/features/library/store/slice";
import BaseSwitch from "@/common/components/switches/BaseSwitch";
import BaseDropdown from "@/common/components/dropdowns/BaseDropdown";
import CHOICE_COLORS from "@/features/library/utils/constants/choice-colors";

export default function Matching() {
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

  function onAddOption(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    let newQuestion = editor.value.quiz!.questions[editor.value.curPage - 1];
    let newOptions = [...(newQuestion.options as MatchingOption[])];
    let newOptionsOptions = [...newOptions].filter(
      (o) => o.type === "MATCHING_OPTION"
    ) as MatchingOptionOption[];
    let newOptionsPrompts = [...newOptions].filter(
      (o) => o.type === "MATCHING_PROMPT"
    ) as MatchingOptionPrompt[];
    let newOptionsAnswers = [...newOptions].filter(
      (o) => o.type === "MATCHING_ANSWER"
    ) as MatchingOptionAnswer[];

    newOptionsOptions = [
      ...newOptionsOptions,
      {
        type: "MATCHING_OPTION",
        order: newOptionsPrompts.length + newOptionsOptions.length + 1,
        color: randomColor(),
        content: "",
        eliminate: false,
      } as MatchingOptionOption,
    ];
    newOptions = [
      ...newOptionsPrompts,
      ...newOptionsOptions,
      ...newOptionsAnswers,
    ];
    newQuestion = {
      ...newQuestion,
      options: newOptions,
    };
    dispatch(setQuestion(newQuestion));
  }

  function onAddPrompt(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    let newQuestion = editor.value.quiz!.questions[editor.value.curPage - 1];
    let newOptions = [...(newQuestion.options as MatchingOption[])];
    let newOptionsOptions = [...newOptions].filter(
      (o) => o.type === "MATCHING_OPTION"
    ) as MatchingOptionOption[];
    let newOptionsPrompts = [...newOptions].filter(
      (o) => o.type === "MATCHING_PROMPT"
    ) as MatchingOptionPrompt[];
    let newOptionsAnswers = [...newOptions].filter(
      (o) => o.type === "MATCHING_ANSWER"
    ) as MatchingOptionAnswer[];

    newOptionsPrompts = [
      ...newOptionsPrompts,
      {
        type: "MATCHING_PROMPT",
        order: newOptionsPrompts.length + 1,
        content: "",
        color: "white",
        eliminate: false,
      } as MatchingOptionPrompt,
    ];
    newOptionsAnswers = [
      ...newOptionsAnswers,
      {
        type: "MATCHING_ANSWER",
        promptOrder: newOptionsPrompts.length,
        optionOrder: 0,
        mark: editor.value.quiz!.mark,
      } as MatchingOptionAnswer,
    ];
    newOptionsOptions = newOptionsOptions.map((o, i) => ({
      ...o,
      order: newOptionsPrompts.length + 1 + i,
    }));
    newOptions = [
      ...newOptionsPrompts,
      ...newOptionsOptions,
      ...newOptionsAnswers,
    ];
    newQuestion = {
      ...newQuestion,
      options: newOptions,
    };
    dispatch(setQuestion(newQuestion));
  }

  return (
    <div className="py-5 md:py-6 px-4 md:px-8 space-y-10">
      <div className="space-y-6">
        <p className="truncate">Prompts</p>
        {(
          (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as MatchingOption[]
          ).filter(
            (o) => o.type === "MATCHING_PROMPT"
          ) as MatchingOptionPrompt[]
        ).length > 0 &&
          (
            (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as MatchingOption[]
            ).filter(
              (o) => o.type === "MATCHING_PROMPT"
            ) as MatchingOptionPrompt[]
          ).map((option, i) => <Prompt key={i} prompt={option} index={i} />)}
        {(
          (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as MatchingOption[]
          ).filter(
            (o) => o.type === "MATCHING_PROMPT"
          ) as MatchingOptionPrompt[]
        ).length < 6 && (
          <FilledButton
            onClick={onAddPrompt}
            type="button"
            className="bg-jordy-blue w-full h-10 xl:h-12 rounded-xl"
          >
            + Add prompt
          </FilledButton>
        )}
      </div>
      <div className="space-y-6">
        <p className="truncate">Options</p>
        {(
          (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as MatchingOption[]
          ).filter(
            (o) => o.type === "MATCHING_OPTION"
          ) as MatchingOptionOption[]
        ).length > 0 &&
          (
            (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as MatchingOption[]
            ).filter(
              (o) => o.type === "MATCHING_OPTION"
            ) as MatchingOptionOption[]
          ).map((option, i) => (
            <Option key={i} option={option as MatchingOptionOption} index={i} />
          ))}
        {(
          (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as MatchingOption[]
          ).filter(
            (o) => o.type === "MATCHING_OPTION"
          ) as MatchingOptionOption[]
        ).length < 6 && (
          <FilledButton
            onClick={onAddOption}
            type="button"
            className="bg-jordy-blue w-full h-10 xl:h-12 rounded-xl"
          >
            + Add option
          </FilledButton>
        )}
      </div>
    </div>
  );
}

function Option({
  option,
  index,
}: {
  option: MatchingOptionOption;
  index: number;
}) {
  const dispatch = useDispatch<StoreDispatch>();
  const editor = useTypedSelector((state) => state.editor);

  function onRemoveOption(e: FormEvent<HTMLButtonElement>, i: number) {
    e.preventDefault();
    let newQuestion = editor.value.quiz!.questions[editor.value.curPage - 1];
    let newOptions = [...(newQuestion.options as MatchingOption[])];
    let newOptionsOptions = [...newOptions].filter(
      (o) => o.type === "MATCHING_OPTION"
    ) as MatchingOptionOption[];
    let newOptionsPrompts = [...newOptions].filter(
      (o) => o.type === "MATCHING_PROMPT"
    ) as MatchingOptionPrompt[];
    let newOptionsAnswers = [...newOptions].filter(
      (o) => o.type === "MATCHING_ANSWER"
    ) as MatchingOptionAnswer[];

    newOptionsOptions.splice(i, 1);
    newOptionsOptions = newOptionsOptions.map((o, i) => ({
      ...o,
      order: newOptionsPrompts.length + i + 1,
    }));
    newOptions = [
      ...newOptionsPrompts,
      ...newOptionsOptions,
      ...newOptionsAnswers,
    ];
    newQuestion = {
      ...newQuestion,
      options: newOptions,
    };
    dispatch(setQuestion(newQuestion));
  }

  return (
    <div className="grid grid-cols-[auto_1fr_auto] gap-x-2 gap-y-3 items-center">
      <p className="truncate mr-2">{String.fromCharCode(65 + index)}&#46;</p>
      <BaseInput
        placeholder="Enter option..."
        value={
          (
            (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as MatchingOption[]
            ).filter(
              (o) => o.type === "MATCHING_OPTION"
            ) as MatchingOptionOption[]
          )[index].content
        }
        onChange={(e) => {
          e.preventDefault();
          let newQuestion =
            editor.value.quiz!.questions[editor.value.curPage - 1];
          let newOptions = [...(newQuestion.options as MatchingOption[])];
          let newOptionsOptions = [...newOptions].filter(
            (o) => o.type === "MATCHING_OPTION"
          ) as MatchingOptionOption[];

          newOptionsOptions.splice(index, 1, {
            ...newOptionsOptions[index],
            content: e.target.value,
          });
          newOptions = [
            ...newOptions.filter((o) => o.type === "MATCHING_PROMPT"),
            ...newOptionsOptions,
            ...newOptions.filter((o) => o.type === "MATCHING_ANSWER"),
          ];
          newQuestion = {
            ...newQuestion,
            options: newOptions,
          };
          dispatch(setQuestion(newQuestion));
        }}
      />
      {(
        (
          editor.value.quiz!.questions[editor.value.curPage - 1]
            .options as MatchingOption[]
        ).filter((o) => o.type === "MATCHING_OPTION") as MatchingOptionOption[]
      ).length > 0 && (
        <button onClick={(e) => onRemoveOption(e, index)} type="button">
          <IoClose className="w-5 h-5" />
        </button>
      )}
      <div className="col-start-2 flex justify-between items-center">
        <p className="truncate">Eliminate after select</p>
        <BaseSwitch
          checked={option.eliminate}
          onChange={(e) => {
            let newQuestion =
              editor.value.quiz!.questions[editor.value.curPage - 1];
            let newOptions = [...(newQuestion.options as MatchingOption[])];
            let newOptionsOptions = [...newOptions].filter(
              (o) => o.type === "MATCHING_OPTION"
            ) as MatchingOptionOption[];
            let newOptionsAnswers = [...newOptions].filter(
              (o) => o.type === "MATCHING_ANSWER"
            ) as MatchingOptionAnswer[];

            newOptionsOptions.splice(index, 1, {
              ...newOptionsOptions[index],
              eliminate: e.currentTarget.checked,
            });
            newOptionsAnswers = newOptionsAnswers.map((o) =>
              o.optionOrder === index + 1
                ? {
                    ...o,
                    optionOrder: e.currentTarget.checked ? 0 : o.optionOrder,
                  }
                : { ...o }
            );
            newOptions = [
              ...newOptions.filter((o) => o.type === "MATCHING_PROMPT"),
              ...newOptionsOptions,
              ...newOptionsAnswers,
            ];
            newQuestion = {
              ...newQuestion,
              options: newOptions,
            };
            dispatch(setQuestion(newQuestion));
          }}
          className="h-5 text-jordy-blue"
        />
      </div>
      <div className="col-start-2 flex justify-between items-center">
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
              let newQuestion =
                editor.value.quiz!.questions[editor.value.curPage - 1];
              let newOptions = [...(newQuestion.options as MatchingOption[])];
              let newOptionsOptions = [...newOptions].filter(
                (o) => o.type === "MATCHING_OPTION"
              ) as MatchingOptionOption[];

              newOptionsOptions.splice(index, 1, {
                ...newOptionsOptions[index],
                color: e.currentTarget.value,
              });
              newOptions = [
                ...newOptions.filter((o) => o.type === "MATCHING_PROMPT"),
                ...newOptionsOptions,
                ...newOptions.filter((o) => o.type === "MATCHING_ANSWER"),
              ];
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
  );
}

function Prompt({ index }: { prompt: MatchingOptionPrompt; index: number }) {
  const dispatch = useDispatch<StoreDispatch>();
  const editor = useTypedSelector((state) => state.editor);

  function onRemovePrompt(e: FormEvent<HTMLButtonElement>, i: number) {
    e.preventDefault();
    let newQuestion = editor.value.quiz!.questions[editor.value.curPage - 1];
    let newOptions = [...(newQuestion.options as MatchingOption[])];
    let newOptionsOptions = [...newOptions].filter(
      (o) => o.type === "MATCHING_OPTION"
    ) as MatchingOptionOption[];
    let newOptionsPrompts = [...newOptions].filter(
      (o) => o.type === "MATCHING_PROMPT"
    ) as MatchingOptionPrompt[];
    let newOptionsAnswers = [...newOptions].filter(
      (o) => o.type === "MATCHING_ANSWER"
    ) as MatchingOptionAnswer[];

    newOptionsPrompts.splice(i, 1);
    newOptionsPrompts = newOptionsPrompts.map((o, i) => ({
      ...o,
      order: i + 1,
    }));
    newOptionsAnswers = newOptionsAnswers.filter(
      (o) => o.promptOrder !== i + 1
    );
    newOptionsAnswers = newOptionsAnswers.map((o, i) => ({
      ...o,
      promptOrder: i + 1,
    }));
    newOptionsOptions = newOptionsOptions.map((o, i) => ({
      ...o,
      order: newOptionsPrompts.length + i + 1,
    }));
    newOptions = [
      ...newOptionsPrompts,
      ...newOptionsOptions,
      ...newOptionsAnswers,
    ];
    newQuestion = {
      ...newQuestion,
      options: newOptions,
    };
    dispatch(setQuestion(newQuestion));
  }

  return (
    <div className="grid grid-cols-[auto_1fr_auto] gap-x-2 gap-y-2 items-center">
      <p className="truncate mr-2">{index + 1}&#46;</p>
      <BaseInput
        placeholder="Enter prompt..."
        value={
          (
            (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as MatchingOption[]
            ).filter(
              (p) => p.type === "MATCHING_PROMPT"
            ) as MatchingOptionPrompt[]
          )[index].content
        }
        onChange={(e) => {
          e.preventDefault();
          let newQuestion =
            editor.value.quiz!.questions[editor.value.curPage - 1];
          let newOptions = [...(newQuestion.options as MatchingOption[])];
          let newOptionsPrompts = [...newOptions].filter(
            (o) => o.type === "MATCHING_PROMPT"
          ) as MatchingOptionPrompt[];

          newOptionsPrompts.splice(index, 1, {
            ...newOptionsPrompts[index],
            content: e.target.value,
          });
          newOptions = [
            ...newOptionsPrompts,
            ...newOptions.filter((o) => o.type === "MATCHING_OPTION"),
            ...newOptions.filter((o) => o.type === "MATCHING_ANSWER"),
          ];
          newQuestion = {
            ...newQuestion,
            options: newOptions,
          };
          dispatch(setQuestion(newQuestion));
        }}
      />
      {(
        (
          editor.value.quiz!.questions[editor.value.curPage - 1]
            .options as MatchingOption[]
        ).filter((p) => p.type === "MATCHING_PROMPT") as MatchingOptionPrompt[]
      ).length > 0 && (
        <button onClick={(e) => onRemovePrompt(e, index)} type="button">
          <IoClose className="w-5 h-5" />
        </button>
      )}
      <div className="col-start-2 space-y-0.5">
        <p className="truncate">Correct answer</p>
        <BaseDropdown
          className="w-full bg-white"
          options={[{ label: "Select none", value: 0, eliminate: false }]
            .concat(
              (
                (
                  editor.value.quiz!.questions[editor.value.curPage - 1]
                    .options as MatchingOption[]
                ).filter(
                  (p) => p.type === "MATCHING_OPTION"
                ) as MatchingOptionOption[]
              ).map((o, i) => ({
                label: String.fromCharCode(65 + i) + ". " + o.content,
                value:
                  (
                    (
                      editor.value.quiz!.questions[editor.value.curPage - 1]
                        .options as MatchingOption[]
                    ).filter(
                      (p) => p.type === "MATCHING_PROMPT"
                    ) as MatchingOptionPrompt[]
                  ).length +
                  i +
                  1,
                eliminate: o.eliminate,
              }))
            )
            .filter((o) => {
              let answers = [
                ...((
                  editor.value.quiz!.questions[editor.value.curPage - 1]
                    .options as MatchingOption[]
                ).filter(
                  (p) => p.type === "MATCHING_ANSWER"
                ) as MatchingOptionAnswer[]),
              ];
              for (const ii in answers) {
                if (
                  o.eliminate &&
                  answers[ii].optionOrder === o.value &&
                  +ii !== index
                ) {
                  return false;
                }
              }
              return true;
            })}
          value={
            (
              (
                editor.value.quiz!.questions[editor.value.curPage - 1]
                  .options as MatchingOption[]
              ).filter(
                (p) => p.type === "MATCHING_ANSWER"
              ) as MatchingOptionAnswer[]
            )[index].optionOrder
          }
          onChange={(e) => {
            let newQuestion =
              editor.value.quiz!.questions[editor.value.curPage - 1];
            let newOptions = [...(newQuestion.options as MatchingOption[])];
            let newOptionsPrompts = [...newOptions].filter(
              (o) => o.type === "MATCHING_PROMPT"
            ) as MatchingOptionPrompt[];
            let newOptionsAnswers = [...newOptions].filter(
              (o) => o.type === "MATCHING_ANSWER"
            ) as MatchingOptionAnswer[];

            newOptionsAnswers.splice(index, 1, {
              ...newOptionsAnswers[index],
              optionOrder: +e.currentTarget.value,
            });
            newOptionsAnswers = newOptionsAnswers.map((o, i) => ({
              ...o,
              promptOrder: i + 1,
            }));
            newOptions = [
              ...newOptionsPrompts,
              ...newOptions.filter((o) => o.type === "MATCHING_OPTION"),
              ...newOptionsAnswers,
            ];
            newQuestion = {
              ...newQuestion,
              options: newOptions,
            };
            dispatch(setQuestion(newQuestion));
          }}
        />
      </div>
      <div className="col-start-2 grid grid-cols-2 items-center mt-2">
        <p className="truncate">Mark</p>
        <BaseInput
          className="!w-full"
          pattern="//d*"
          placeholder="Enter mark..."
          value={
            (
              (
                editor.value.quiz!.questions[editor.value.curPage - 1]
                  .options as MatchingOption[]
              ).filter(
                (p) => p.type === "MATCHING_ANSWER"
              ) as MatchingOptionAnswer[]
            )[index].mark
          }
          onChange={(e) => {
            e.preventDefault();
            if (!isNaN(+e.target.value) || e.target.value === "-") {
              let value = e.target.value;
              if (+value < -100) value = "-100";
              if (+value > 100) value = "100";

              let newQuestion =
                editor.value.quiz!.questions[editor.value.curPage - 1];
              let newOptions = [...(newQuestion.options as MatchingOption[])];
              let newOptionsPrompts = [...newOptions].filter(
                (o) => o.type === "MATCHING_PROMPT"
              ) as MatchingOptionPrompt[];
              let newOptionsAnswers = [...newOptions].filter(
                (o) => o.type === "MATCHING_ANSWER"
              ) as MatchingOptionAnswer[];
              newOptionsAnswers.splice(index, 1, {
                ...newOptionsAnswers[index],
                mark: value,
              });
              newOptions = [
                ...newOptionsPrompts,
                ...newOptions.filter((o) => o.type === "MATCHING_OPTION"),
                ...newOptionsAnswers,
              ];
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
            let newQuestion =
              editor.value.quiz!.questions[editor.value.curPage - 1];
            let newOptions = [...(newQuestion.options as MatchingOption[])];
            let newOptionsPrompts = [...newOptions].filter(
              (o) => o.type === "MATCHING_PROMPT"
            ) as MatchingOptionPrompt[];
            let newOptionsAnswers = [...newOptions].filter(
              (o) => o.type === "MATCHING_ANSWER"
            ) as MatchingOptionAnswer[];
            newOptionsAnswers.splice(index, 1, {
              ...newOptionsAnswers[index],
              mark: value,
            });
            newOptions = [
              ...newOptionsPrompts,
              ...newOptions.filter((o) => o.type === "MATCHING_OPTION"),
              ...newOptionsAnswers,
            ];
            newQuestion = {
              ...newQuestion,
              options: newOptions,
            };
            dispatch(setQuestion(newQuestion));
          }}
          disabled={
            editor.value.quiz!.questions[editor.value.curPage - 1].useTemplate
          }
        />
      </div>
    </div>
  );
}
