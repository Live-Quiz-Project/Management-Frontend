import { IoArrowBack } from "react-icons/io5";
import {
  IoInformationCircleOutline,
  IoInformationCircleSharp,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import FilledButton from "@/common/components/buttons/FilledButton";
import OutlinedButton from "@/common/components/buttons/OutlinedButton";
import EditableInput from "@/common/components/inputs/EditableInput";
import { RefObject, useState } from "react";
import useTypedSelector from "@/common/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { setCurType } from "@/features/library/store/slice";

type Props = {
  ref: RefObject<HTMLDivElement>;
};

export default function Topbar({ ref }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>("Untitled Quiz");
  const editor = useTypedSelector((state) => state.editor);

  return (
    <div
      ref={ref}
      className="w-full h-16 bg-white flex items-center justify-between px-4"
    >
      <div className="flex items-center justify-center space-x-4">
        <button onClick={() => navigate(-1)} className="">
          <IoArrowBack className="w-5 h-5" />
        </button>
        <EditableInput
          input={title}
          setInput={setTitle}
          placeholder="Enter quiz title..."
        />
        <button onClick={() => dispatch(setCurType("quiz"))} className="">
          {editor.value.curType === "quiz" ? (
            <IoInformationCircleSharp className="w-6 h-6" />
          ) : (
            <IoInformationCircleOutline className="w-6 h-6" />
          )}
        </button>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <OutlinedButton className="outline-pastel-orange">
          Cancel
        </OutlinedButton>
        <FilledButton className="bg-pastel-orange">Create</FilledButton>
        <FilledButton className="bg-orange !rounded-full">
          Start Quiz
        </FilledButton>
      </div>
    </div>
  );
}
