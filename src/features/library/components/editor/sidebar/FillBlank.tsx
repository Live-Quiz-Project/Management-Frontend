import { FormEvent } from "react";
import { IoClose } from "react-icons/io5";
import BaseInput from "@/common/components/inputs/BaseInput";
import FilledButton from "@/common/components/buttons/FilledButton";
import useTypedSelector from "@/common/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { setQuestion } from "@/features/library/store/slice";
import BaseSwitch from "@/common/components/switches/BaseSwitch";
import BLANK_IDENTIFIER from "@/features/library/utils/constants/blank-identifier";

export default function FillBlank() {
  const dispatch = useDispatch<StoreDispatch>();
  const editor = useTypedSelector((state) => state.editor);

  function onAddBlank(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    let newQuestion = editor.value.quiz!.questions[editor.value.curPage - 1];
    let newOptions = [...(newQuestion.options as TextOption[])];
    newOptions = [
      ...newOptions,
      {
        order: newOptions.length + 1,
        content: "",
        mark: "1",
        caseSensitive: false,
      } as TextOption,
    ];
    newQuestion = {
      ...newQuestion,
      content: newQuestion.content + BLANK_IDENTIFIER,
      options: newOptions,
    };
    dispatch(setQuestion(newQuestion));
  }

  return (
    <div className="py-5 md:py-6 px-4 md:px-8 space-y-6">
      <div className="space-y-6">
        <p className="truncate">Blanks</p>
        {(
          editor.value.quiz!.questions[editor.value.curPage - 1]
            .options as TextOption[]
        ).length > 0 &&
          (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as TextOption[]
          ).map((option, i) => <Blank key={i} option={option} index={i} />)}
        {(
          editor.value.quiz!.questions[editor.value.curPage - 1]
            .options as TextOption[]
        ).length < 10 && (
          <FilledButton
            onClick={onAddBlank}
            type="button"
            className="bg-jordy-blue w-full h-10 xl:h-12 rounded-xl"
          >
            + Add blank
          </FilledButton>
        )}
      </div>
    </div>
  );
}

function Blank({ option, index }: { option: TextOption; index: number }) {
  const dispatch = useDispatch<StoreDispatch>();
  const editor = useTypedSelector((state) => state.editor);

  function onRemoveBlank(e: FormEvent<HTMLButtonElement>, i: number) {
    e.preventDefault();
    let newQuestion = editor.value.quiz!.questions[editor.value.curPage - 1];
    let newOptions = [...(newQuestion.options as TextOption[])];
    newOptions.splice(i, 1);
    newOptions = newOptions.map((option, index) => ({
      ...option,
      order: index + 1,
    }));
    let newContent = newQuestion.content;
    newContent = newContent
      .split(BLANK_IDENTIFIER)
      .map((content, ii) => {
        if (ii === i) {
          return `${content} ${newContent.split(BLANK_IDENTIFIER)[ii + 1]}`;
        }
        if (ii === i + 1) return null;
        return content;
      })
      .filter((content) => content !== null)
      .join(BLANK_IDENTIFIER);
    newQuestion = {
      ...newQuestion,
      options: newOptions,
      content: newContent,
    };
    dispatch(setQuestion(newQuestion));
  }

  return (
    <div className="grid grid-cols-[auto_1fr_auto] gap-x-2 gap-y-4 items-center">
      <p className="truncate mr-2">{String.fromCharCode(65 + index)}&#46;</p>
      <BaseInput
        placeholder="Enter correct answer..."
        value={
          (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as TextOption[]
          )[index].content
        }
        onChange={(e) => {
          e.preventDefault();
          let newOptions = [
            ...(editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as TextOption[]),
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
          .options as TextOption[]
      ).length > 0 && (
        <button onClick={(e) => onRemoveBlank(e, index)} type="button">
          <IoClose className="w-5 h-5" />
        </button>
      )}
      <div className="col-start-2 flex justify-between items-center">
        <p className="truncate">Mark</p>
        <BaseInput
          className="!w-[48%]"
          pattern="//d*"
          placeholder="Enter mark..."
          value={
            editor.value.quiz!.questions[editor.value.curPage - 1].useTemplate
              ? editor.value.quiz!.mark
              : option.mark
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
            const value =
              e.target.value === "-" || e.target.value === ""
                ? "0"
                : (+e.target.value).toString();
            let newOptions = [
              ...(editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as TextOption[]),
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
          disabled={
            editor.value.quiz!.questions[editor.value.curPage - 1].useTemplate
          }
        />
      </div>
      <div className="col-start-2 flex justify-between items-center">
        <p className="truncate">Case sensitive</p>
        <BaseSwitch
          checked={
            editor.value.quiz!.questions[editor.value.curPage - 1].useTemplate
              ? editor.value.quiz!.caseSensitive
              : option.caseSensitive
          }
          onChange={() => {
            let newQuestion =
              editor.value.quiz!.questions[editor.value.curPage - 1];
            let newOptions = [...(newQuestion.options as TextOption[])];
            newOptions.splice(index, 1, {
              ...newOptions[index],
              caseSensitive: !newOptions[index].caseSensitive,
            });
            newQuestion = {
              ...newQuestion,
              options: newOptions,
            };
            dispatch(setQuestion(newQuestion));
          }}
          disabled={
            editor.value.quiz!.questions[editor.value.curPage - 1].useTemplate
          }
          className="h-5 text-jordy-blue"
        />
      </div>
    </div>
  );
}
