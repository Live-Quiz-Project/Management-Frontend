import EditableLabel from "@/common/components/inputs/EditableLabel";
import useTypedSelector from "@/common/hooks/useTypedSelector";
import { setQuestion } from "@/features/library/store/slice";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineMessage, AiFillMessage } from "react-icons/ai";
import { MathJax } from "better-react-mathjax";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/common/services/firebase";
import MediaTypesEnum from "@/features/library/utils/enums/media-types";
import BaseTextarea from "@/common/components/textareas/BaseTextarea";
import ChoiceButton from "./ChoiceButton";

type Props = {
  className?: string;
  canvasSize: {
    width: number;
    height: number;
  };
};

export default function Matching({ className = "", canvasSize }: Props) {
  const editor = useTypedSelector((state) => state.editor);
  const dispatch = useDispatch<StoreDispatch>();
  const noteRef = useRef<HTMLDivElement>(null);
  const [imageURL, setImageURL] = useState<string>("");
  const [isNoteOpened, setIsNoteOpened] = useState<boolean>(false);
  const responsiveSpaceX =
    editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 0
      ? canvasSize.width * 0.025
      : editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 1
      ? canvasSize.width * 0.027
      : editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 2
      ? canvasSize.width * 0.03
      : editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 3
      ? canvasSize.width * 0.032
      : canvasSize.width * 0.035;
  const responsiveQuestionMarkSize =
    editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 0
      ? canvasSize.width * 0.032
      : editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 1
      ? canvasSize.width * 0.04
      : editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 2
      ? canvasSize.width * 0.045
      : editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 3
      ? canvasSize.width * 0.05
      : canvasSize.width * 0.057;
  const responsiveFontSize =
    editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 0
      ? canvasSize.width * 0.022
      : editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 1
      ? canvasSize.width * 0.027
      : editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 2
      ? canvasSize.width * 0.032
      : editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 3
      ? canvasSize.width * 0.035
      : canvasSize.width * 0.037;
  const noteIconSize =
    editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 0
      ? canvasSize.width * 0.022
      : editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 1
      ? canvasSize.width * 0.027
      : editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 2
      ? canvasSize.width * 0.032
      : editor.value.quiz!.questions[editor.value.curPage - 1].fontSize === 3
      ? canvasSize.width * 0.037
      : canvasSize.width * 0.042;
  const optionsContainerGridTemplate =
    editor.value.quiz!.questions[editor.value.curPage - 1].layout === 0 ||
    editor.value.quiz!.questions[editor.value.curPage - 1].layout === 1
      ? editor.value.quiz!.questions[editor.value.curPage - 1].media
        ? "grid-cols-[5fr_6fr]"
        : "grid-cols-1"
      : editor.value.quiz!.questions[editor.value.curPage - 1].media
      ? "grid-rows-2"
      : "grid-rows-1";
  const optionsContainerGridFormat =
    editor.value.quiz!.questions[editor.value.curPage - 1].layout === 0 ||
    editor.value.quiz!.questions[editor.value.curPage - 1].layout === 1
      ? (
          editor.value.quiz!.questions[editor.value.curPage - 1]
            .options as MatchingOption[]
        ).filter((q) => q.type === "MATCHING_PROMPT").length >
        (
          editor.value.quiz!.questions[editor.value.curPage - 1]
            .options as MatchingOption[]
        ).filter((q) => q.type === "MATCHING_OPTION").length
        ? `grid-rows-${
            (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as MatchingOption[]
            ).filter((q) => q.type === "MATCHING_PROMPT").length * 2
          } grid-flow-col`
        : `grid-rows-${
            (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as MatchingOption[]
            ).filter((q) => q.type === "MATCHING_OPTION").length * 2
          } grid-flow-col`
      : (
          editor.value.quiz!.questions[editor.value.curPage - 1]
            .options as MatchingOption[]
        ).filter((q) => q.type === "MATCHING_PROMPT").length >
        (
          editor.value.quiz!.questions[editor.value.curPage - 1]
            .options as MatchingOption[]
        ).filter((q) => q.type === "MATCHING_OPTION").length
      ? `grid-cols-${
          (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as MatchingOption[]
          ).filter((q) => q.type === "MATCHING_PROMPT").length * 2
        } grid-flow-row`
      : `grid-cols-${
          (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as MatchingOption[]
          ).filter((q) => q.type === "MATCHING_OPTION").length * 2
        } grid-flow-row`;
  const promptButtonGridFormat = `${
    editor.value.quiz!.questions[editor.value.curPage - 1].layout === 0
      ? "row-span-2 col-start-1"
      : editor.value.quiz!.questions[editor.value.curPage - 1].layout === 1
      ? "row-span-2 col-start-2"
      : editor.value.quiz!.questions[editor.value.curPage - 1].layout === 2
      ? "col-span-2 row-start-1"
      : "col-span-2 row-start-2"
  } ${
    editor.value.quiz!.questions[editor.value.curPage - 1].layout === 0 ||
    editor.value.quiz!.questions[editor.value.curPage - 1].layout === 1
      ? (
          editor.value.quiz!.questions[editor.value.curPage - 1]
            .options as MatchingOption[]
        ).filter((q) => q.type === "MATCHING_PROMPT").length <
        (
          editor.value.quiz!.questions[editor.value.curPage - 1]
            .options as MatchingOption[]
        ).filter((q) => q.type === "MATCHING_OPTION").length
        ? (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as MatchingOption[]
          ).filter((q) => q.type === "MATCHING_OPTION").length === 2
          ? "first:row-start-2"
          : (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as MatchingOption[]
            ).filter((q) => q.type === "MATCHING_OPTION").length === 3
          ? (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as MatchingOption[]
            ).filter((q) => q.type === "MATCHING_PROMPT").length === 1
            ? "first:row-start-3"
            : "first:row-start-2"
          : (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as MatchingOption[]
            ).filter((q) => q.type === "MATCHING_OPTION").length === 4
          ? (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as MatchingOption[]
            ).filter((q) => q.type === "MATCHING_PROMPT").length === 1
            ? "first:row-start-4"
            : (
                editor.value.quiz!.questions[editor.value.curPage - 1]
                  .options as MatchingOption[]
              ).filter((q) => q.type === "MATCHING_PROMPT").length === 2
            ? "first:row-start-3 [&:nth-child(2)]:row-start-5"
            : "first:row-start-2 [&:nth-child(2)]:row-start-4 [&:nth-child(3)]:row-start-6"
          : (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as MatchingOption[]
            ).filter((q) => q.type === "MATCHING_OPTION").length === 5
          ? (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as MatchingOption[]
            ).filter((q) => q.type === "MATCHING_PROMPT").length === 1
            ? "first:row-start-5"
            : (
                editor.value.quiz!.questions[editor.value.curPage - 1]
                  .options as MatchingOption[]
              ).filter((q) => q.type === "MATCHING_PROMPT").length === 2
            ? "first:row-start-4 [&:nth-child(2)]:row-start-6"
            : (
                editor.value.quiz!.questions[editor.value.curPage - 1]
                  .options as MatchingOption[]
              ).filter((q) => q.type === "MATCHING_PROMPT").length === 3
            ? "first:row-start-3 [&:nth-child(2)]:row-start-5 [&:nth-child(3)]:row-start-7"
            : "first:row-start-2 [&:nth-child(2)]:row-start-4 [&:nth-child(3)]:row-start-6 [&:nth-child(4)]:row-start-8"
          : (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as MatchingOption[]
            ).filter((q) => q.type === "MATCHING_PROMPT").length === 1
          ? "first:row-start-6"
          : (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as MatchingOption[]
            ).filter((q) => q.type === "MATCHING_PROMPT").length === 2
          ? "first:row-start-5 [&:nth-child(2)]:row-start-7"
          : (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as MatchingOption[]
            ).filter((q) => q.type === "MATCHING_PROMPT").length === 3
          ? "first:row-start-4 [&:nth-child(2)]:row-start-6 [&:nth-child(3)]:row-start-8"
          : (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as MatchingOption[]
            ).filter((q) => q.type === "MATCHING_PROMPT").length === 4
          ? "first:row-start-3 [&:nth-child(2)]:row-start-5 [&:nth-child(3)]:row-start-7 [&:nth-child(4)]:row-start-9"
          : "first:row-start-2 [&:nth-child(2)]:row-start-4 [&:nth-child(3)]:row-start-6 [&:nth-child(4)]:row-start-8 [&:nth-child(5)]:row-start-10"
        : ""
      : (
          editor.value.quiz!.questions[editor.value.curPage - 1]
            .options as MatchingOption[]
        ).filter((q) => q.type === "MATCHING_OPTION").length >
        (
          editor.value.quiz!.questions[editor.value.curPage - 1]
            .options as MatchingOption[]
        ).filter((q) => q.type === "MATCHING_PROMPT").length
      ? (
          editor.value.quiz!.questions[editor.value.curPage - 1]
            .options as MatchingOption[]
        ).filter((q) => q.type === "MATCHING_OPTION").length === 2
        ? "first:col-start-2"
        : (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as MatchingOption[]
          ).filter((q) => q.type === "MATCHING_OPTION").length === 3
        ? (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as MatchingOption[]
          ).filter((q) => q.type === "MATCHING_PROMPT").length === 1
          ? "first:col-start-3"
          : "first:col-start-2"
        : (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as MatchingOption[]
          ).filter((q) => q.type === "MATCHING_OPTION").length === 4
        ? (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as MatchingOption[]
          ).filter((q) => q.type === "MATCHING_PROMPT").length === 1
          ? "first:col-start-4"
          : (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as MatchingOption[]
            ).filter((q) => q.type === "MATCHING_PROMPT").length === 2
          ? "first:col-start-3 [&:nth-child(2)]:col-start-5"
          : "first:col-start-2 [&:nth-child(2)]:col-start-4 [&:nth-child(3))]:col-start-6"
        : (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as MatchingOption[]
          ).filter((q) => q.type === "MATCHING_OPTION").length === 5
        ? (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as MatchingOption[]
          ).filter((q) => q.type === "MATCHING_PROMPT").length === 1
          ? "first:col-start-5"
          : (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as MatchingOption[]
            ).filter((q) => q.type === "MATCHING_PROMPT").length === 2
          ? "first:col-start-4 [&:nth-child(2)]:col-start-6"
          : (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as MatchingOption[]
            ).filter((q) => q.type === "MATCHING_PROMPT").length === 3
          ? "first:col-start-3 [&:nth-child(2)]:col-start-5 [&:nth-child(3)]:col-start-7"
          : "first:col-start-2 [&:nth-child(2)]:col-start-4 [&:nth-child(3)]:col-start-6 [&:nth-child(4)]:col-start-8"
        : (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as MatchingOption[]
          ).filter((q) => q.type === "MATCHING_PROMPT").length === 1
        ? "first:col-start-6"
        : (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as MatchingOption[]
          ).filter((q) => q.type === "MATCHING_PROMPT").length === 2
        ? "first:col-start-5 [&:nth-child(2)]:col-start-7"
        : (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as MatchingOption[]
          ).filter((q) => q.type === "MATCHING_PROMPT").length === 3
        ? "first:col-start-4 [&:nth-child(2)]:col-start-6 [&:nth-child(3)]:col-start-8"
        : (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as MatchingOption[]
          ).filter((q) => q.type === "MATCHING_PROMPT").length === 4
        ? "first:col-start-3 [&:nth-child(2)]:col-start-5 [&:nth-child(3)]:col-start-7 [&:nth-child(4)]:col-start-9"
        : "first:col-start-2 [&:nth-child(2)]:col-start-4 [&:nth-child(3)]:col-start-6 [&:nth-child(4)]:col-start-8 [&:nth-child(5)]:col-start-10"
      : ""
  }`;
  const optionButtonGridFormat = `${
    editor.value.quiz!.questions[editor.value.curPage - 1].layout === 0
      ? "row-span-2 col-start-2"
      : editor.value.quiz!.questions[editor.value.curPage - 1].layout === 1
      ? "row-span-2 col-start-1"
      : editor.value.quiz!.questions[editor.value.curPage - 1].layout === 2
      ? "col-span-2 row-start-2"
      : "col-span-2 row-start-1"
  } ${
    editor.value.quiz!.questions[editor.value.curPage - 1].layout === 0 ||
    editor.value.quiz!.questions[editor.value.curPage - 1].layout === 1
      ? (
          editor.value.quiz!.questions[editor.value.curPage - 1]
            .options as MatchingOption[]
        ).filter((q) => q.type === "MATCHING_PROMPT").length >
        (
          editor.value.quiz!.questions[editor.value.curPage - 1]
            .options as MatchingOption[]
        ).filter((q) => q.type === "MATCHING_OPTION").length
        ? (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as MatchingOption[]
          ).filter((q) => q.type === "MATCHING_PROMPT").length === 2
          ? "[&:nth-child(3)]:row-start-2"
          : (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as MatchingOption[]
            ).filter((q) => q.type === "MATCHING_PROMPT").length === 3
          ? (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as MatchingOption[]
            ).filter((q) => q.type === "MATCHING_OPTION").length === 1
            ? "[&:nth-child(4)]:row-start-3"
            : "[&:nth-child(4)]:row-start-2"
          : (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as MatchingOption[]
            ).filter((q) => q.type === "MATCHING_PROMPT").length === 4
          ? (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as MatchingOption[]
            ).filter((q) => q.type === "MATCHING_OPTION").length === 1
            ? "[&:nth-child(5)]:row-start-4"
            : (
                editor.value.quiz!.questions[editor.value.curPage - 1]
                  .options as MatchingOption[]
              ).filter((q) => q.type === "MATCHING_OPTION").length === 2
            ? "[&:nth-child(5)]:row-start-3 [&:nth-child(6)]:row-start-5"
            : "[&:nth-child(5)]:row-start-2 [&:nth-child(6)]:row-start-4 [&:nth-child(7)]:row-start-6"
          : (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as MatchingOption[]
            ).filter((q) => q.type === "MATCHING_PROMPT").length === 5
          ? (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as MatchingOption[]
            ).filter((q) => q.type === "MATCHING_OPTION").length === 1
            ? "[&:nth-child(6)]:row-start-5"
            : (
                editor.value.quiz!.questions[editor.value.curPage - 1]
                  .options as MatchingOption[]
              ).filter((q) => q.type === "MATCHING_OPTION").length === 2
            ? "[&:nth-child(6)]:row-start-4 [&:nth-child(7)]:row-start-6"
            : (
                editor.value.quiz!.questions[editor.value.curPage - 1]
                  .options as MatchingOption[]
              ).filter((q) => q.type === "MATCHING_OPTION").length === 3
            ? "[&:nth-child(6)]:row-start-3 [&:nth-child(7)]:row-start-5 [&:nth-child(8)]:row-start-7"
            : "[&:nth-child(6)]:row-start-2 [&:nth-child(7)]:row-start-4 [&:nth-child(8)]:row-start-6 [&:nth-child(9)]:row-start-8"
          : (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as MatchingOption[]
            ).filter((q) => q.type === "MATCHING_OPTION").length === 1
          ? "[&:nth-child(7)]:row-start-6"
          : (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as MatchingOption[]
            ).filter((q) => q.type === "MATCHING_OPTION").length === 2
          ? "[&:nth-child(7)]:row-start-5 [&:nth-child(8)]:row-start-7"
          : (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as MatchingOption[]
            ).filter((q) => q.type === "MATCHING_OPTION").length === 3
          ? "[&:nth-child(7)]:row-start-4 [&:nth-child(8)]:row-start-6 [&:nth-child(9)]:row-start-8"
          : (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as MatchingOption[]
            ).filter((q) => q.type === "MATCHING_OPTION").length === 4
          ? "[&:nth-child(7)]:row-start-3 [&:nth-child(8)]:row-start-5 [&:nth-child(9)]:row-start-7 [&:nth-child(10)]:row-start-9"
          : "[&:nth-child(7)]:row-start-2 [&:nth-child(8)]:row-start-4 [&:nth-child(9)]:row-start-6 [&:nth-child(10)]:row-start-8 [&:nth-child(11)]:row-start-10"
        : ""
      : (
          editor.value.quiz!.questions[editor.value.curPage - 1]
            .options as MatchingOption[]
        ).filter((q) => q.type === "MATCHING_PROMPT").length >
        (
          editor.value.quiz!.questions[editor.value.curPage - 1]
            .options as MatchingOption[]
        ).filter((q) => q.type === "MATCHING_OPTION").length
      ? (
          editor.value.quiz!.questions[editor.value.curPage - 1]
            .options as MatchingOption[]
        ).filter((q) => q.type === "MATCHING_PROMPT").length === 2
        ? "[&:nth-child(3)]:col-start-2"
        : (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as MatchingOption[]
          ).filter((q) => q.type === "MATCHING_PROMPT").length === 3
        ? (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as MatchingOption[]
          ).filter((q) => q.type === "MATCHING_OPTION").length === 1
          ? "[&:nth-child(4)]:col-start-3"
          : "[&:nth-child(4)]:col-start-2"
        : (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as MatchingOption[]
          ).filter((q) => q.type === "MATCHING_PROMPT").length === 4
        ? (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as MatchingOption[]
          ).filter((q) => q.type === "MATCHING_OPTION").length === 1
          ? "[&:nth-child(5)]:col-start-4"
          : (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as MatchingOption[]
            ).filter((q) => q.type === "MATCHING_OPTION").length === 2
          ? "[&:nth-child(5)]:col-start-3 [&:nth-child(6)]:col-start-5"
          : "[&:nth-child(5)]:col-start-2 [&:nth-child(6)]:col-start-4 [&:nth-child(7)]:col-start-6"
        : (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as MatchingOption[]
          ).filter((q) => q.type === "MATCHING_PROMPT").length === 5
        ? (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as MatchingOption[]
          ).filter((q) => q.type === "MATCHING_OPTION").length === 1
          ? "[&:nth-child(6)]:col-start-5"
          : (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as MatchingOption[]
            ).filter((q) => q.type === "MATCHING_OPTION").length === 2
          ? "[&:nth-child(6)]:col-start-4 [&:nth-child(7)]:col-start-6"
          : (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as MatchingOption[]
            ).filter((q) => q.type === "MATCHING_OPTION").length === 3
          ? "[&:nth-child(6)]:col-start-3 [&:nth-child(7)]:col-start-5 [&:nth-child(8)]:col-start-7"
          : "[&:nth-child(6)]:col-start-2 [&:nth-child(7)]:col-start-4 [&:nth-child(8)]:col-start-6 [&:nth-child(9)]:col-start-8"
        : (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as MatchingOption[]
          ).filter((q) => q.type === "MATCHING_OPTION").length === 1
        ? "[&:nth-child(7)]:col-start-6"
        : (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as MatchingOption[]
          ).filter((q) => q.type === "MATCHING_OPTION").length === 2
        ? "[&:nth-child(7)]:col-start-5 [&:nth-child(8)]:col-start-7"
        : (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as MatchingOption[]
          ).filter((q) => q.type === "MATCHING_OPTION").length === 3
        ? "[&:nth-child(7)]:col-start-4 [&:nth-child(8)]:col-start-6 [&:nth-child(9)]:col-start-8"
        : (
            editor.value.quiz!.questions[editor.value.curPage - 1]
              .options as MatchingOption[]
          ).filter((q) => q.type === "MATCHING_OPTION").length === 4
        ? "[&:nth-child(7)]:col-start-3 [&:nth-child(8)]:col-start-5 [&:nth-child(9)]:col-start-7 [&:nth-child(10)]:col-start-9"
        : "[&:nth-child(7)]:col-start-2 [&:nth-child(8)]:col-start-4 [&:nth-child(9)]:col-start-6 [&:nth-child(10)]:col-start-8 [&:nth-child(11)]:col-start-10"
      : ""
  }`;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (noteRef.current && !noteRef.current.contains(e.target as Node)) {
        setIsNoteOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (
      editor.value.quiz!.questions[editor.value.curPage - 1].media &&
      (editor.value.quiz!.questions[editor.value.curPage - 1].mediaType ===
        MediaTypesEnum.IMAGE ||
        editor.value.quiz!.questions[editor.value.curPage - 1].mediaType ===
          MediaTypesEnum.VIDEO ||
        editor.value.quiz!.questions[editor.value.curPage - 1].mediaType ===
          MediaTypesEnum.AUDIO)
    ) {
      (async () => {
        try {
          const url = await getDownloadURL(
            ref(
              storage,
              editor.value.quiz!.questions[editor.value.curPage - 1].media
            )
          );
          setImageURL(url);
        } catch (error) {
          alert(error);
        }
      })();
    }
  }, [editor.value.quiz!.questions[editor.value.curPage - 1].media]);

  return (
    <div
      className={`relative grid grid-rows-[auto_1fr] auto-rows-auto h-full w-full font-sans-serif ${
        editor.value.quiz!.questions[editor.value.curPage - 1].isInPool
          ? "bg-quartz"
          : "bg-egg-sour"
      } ${className}`}
    >
      <div
        className={`grid grid-cols-[auto_1fr_auto] items-center px-[2.5%] py-[2%] ${
          editor.value.quiz!.questions[editor.value.curPage - 1].selectMax > 1
            ? "pb-[1%]"
            : ""
        }`}
        style={{ columnGap: responsiveSpaceX, rowGap: responsiveSpaceX * 0.1 }}
      >
        <p
          className={`w-fit h-fit -rotate-[25deg] leading-none font-serif ${
            editor.value.quiz!.questions[editor.value.curPage - 1].isInPool
              ? "text-denim"
              : "text-sienna"
          }`}
          style={{ fontSize: responsiveQuestionMarkSize }}
        >
          ?
        </p>
        <MathJax className="!flex font-medium tracking-tight">
          <EditableLabel
            className="w-full !overflow-auto"
            style={{
              fontSize: responsiveFontSize,
              maxHeight: canvasSize.width * 0.11,
            }}
            placeholder="Enter question..."
            value={
              editor.value.quiz!.questions[editor.value.curPage - 1].content
            }
            onChange={(e) => {
              let newQuestion =
                editor.value.quiz!.questions[editor.value.curPage - 1];
              newQuestion = {
                ...newQuestion,
                content: e.currentTarget.innerText,
              };
              dispatch(setQuestion(newQuestion));
            }}
            onKeyPress={(e) => {
              if (
                e.key !== "Backspace" &&
                e.key !== "ArrowUp" &&
                e.key !== "ArrowDown" &&
                e.key !== "ArrowRight" &&
                e.key !== "ArrowLeft" &&
                editor.value.quiz!.questions[editor.value.curPage - 1].content
                  .length >= 200
              ) {
                e.preventDefault();
                e.currentTarget.textContent = e.currentTarget.innerText.slice(
                  0,
                  200
                );
              }
            }}
          />
        </MathJax>
        {editor.value.quiz!.questions[editor.value.curPage - 1].selectMax >
          1 && (
          <p
            className="row-start-2 col-start-2 font-sans-serif"
            style={{ fontSize: responsiveFontSize * 0.5 }}
          >
            &#42;&nbsp;Select from&nbsp;
            {editor.value.quiz!.questions[editor.value.curPage - 1].selectMin}
            &nbsp;up to&nbsp;
            {editor.value.quiz!.questions[editor.value.curPage - 1].selectMax}
            &nbsp;choices
          </p>
        )}
        <div className="relative w-full h-full flex items-center">
          <button onClick={() => setIsNoteOpened(!isNoteOpened)} type="button">
            {!isNoteOpened && (
              <AiOutlineMessage
                style={{ width: noteIconSize, height: noteIconSize }}
              />
            )}
            {isNoteOpened && (
              <AiFillMessage
                style={{ width: noteIconSize, height: noteIconSize }}
              />
            )}
          </button>
          {isNoteOpened && (
            <div
              ref={noteRef}
              className="absolute top-full right-1/4 backdrop-blur-[180px] bg-dune/5 z-20"
              style={{
                borderRadius: `${canvasSize.width * 0.025}px 0 ${
                  canvasSize.width * 0.025
                }px ${canvasSize.width * 0.025}px`,
                width: canvasSize.width * 0.5,
                height: canvasSize.height * 0.5,
              }}
            >
              <MathJax className="!flex w-full h-full items-center">
                <BaseTextarea
                  className="!bg-transparent !w-full !h-full !px-[5%] !py-[3%]"
                  style={{
                    fontSize: responsiveFontSize * 0.75,
                    borderRadius: `${canvasSize.width * 0.025}px 0 ${
                      canvasSize.width * 0.025
                    }px ${canvasSize.width * 0.025}px`,
                  }}
                  value={
                    editor.value.quiz!.questions[editor.value.curPage - 1].note
                  }
                  onChange={(e) => {
                    let newQuestion =
                      editor.value.quiz!.questions[editor.value.curPage - 1];
                    newQuestion = {
                      ...newQuestion,
                      note: e.currentTarget.value,
                    };
                    dispatch(setQuestion(newQuestion));
                  }}
                  placeholder="Enter note..."
                />
              </MathJax>
            </div>
          )}
        </div>
      </div>
      <div
        className={`overflow-auto p-[3%] pt-0 grid ${optionsContainerGridTemplate} w-full h-full`}
        style={{ gap: responsiveSpaceX * 0.4 }}
      >
        {editor.value.quiz!.questions[editor.value.curPage - 1].media &&
          editor.value.quiz!.questions[editor.value.curPage - 1].mediaType ===
            MediaTypesEnum.IMAGE && (
            <img
              src={imageURL}
              alt="question-img"
              className="bg-beige border rounded-3xl object-contain w-full h-full"
            />
          )}
        {/* todo: video, audio, equation */}
        <div
          className={`overflow-auto grid auto-cols-fr auto-rows-fr justify-items-center ${optionsContainerGridFormat}`}
          style={{ gap: responsiveSpaceX * 0.3 }}
        >
          {(
            (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as MatchingOption[]
            ).filter(
              (q) => q.type === "MATCHING_PROMPT"
            ) as MatchingOptionPrompt[]
          ).map((option, i) => (
            <ChoiceButton
              key={i}
              className={`${promptButtonGridFormat} border-dashed !border-[3px] border-karry [&>label]:!cursor-default`}
              style={{
                backgroundColor: option.color,
                fontSize: responsiveFontSize,
              }}
            >
              <ChoiceButton.Icon>
                <p className="font-light">{i + 1}&#46;</p>
              </ChoiceButton.Icon>
              <ChoiceButton.Content>
                <MathJax className="!flex w-full items-center">
                  <EditableLabel
                    className="text-center !overflow-auto w-full font-sans-serif font-medium tracking-tight"
                    value={option.content}
                    placeholder="Enter prompt..."
                    onChange={(e) => {
                      let newOptions = [
                        ...(editor.value.quiz!.questions[
                          editor.value.curPage - 1
                        ].options as MatchingOption[]),
                      ];
                      let newOptionsPrompt = newOptions.filter(
                        (q) => q.type === "MATCHING_PROMPT"
                      ) as MatchingOptionPrompt[];
                      newOptionsPrompt[i] = {
                        ...newOptionsPrompt[i],
                        content: e.currentTarget.innerText,
                      };
                      newOptions = [
                        ...newOptionsPrompt,
                        ...newOptions.filter(
                          (q) => q.type === "MATCHING_OPTION"
                        ),
                        ...newOptions.filter(
                          (q) => q.type === "MATCHING_ANSWER"
                        ),
                      ];
                      let newQuestion =
                        editor.value.quiz!.questions[editor.value.curPage - 1];
                      newQuestion = {
                        ...newQuestion,
                        options: newOptions,
                      };
                      dispatch(setQuestion(newQuestion));
                    }}
                  />
                </MathJax>
              </ChoiceButton.Content>
            </ChoiceButton>
          ))}
          {(
            (
              editor.value.quiz!.questions[editor.value.curPage - 1]
                .options as MatchingOption[]
            ).filter(
              (q) => q.type === "MATCHING_OPTION"
            ) as MatchingOptionOption[]
          ).map((option, i) => (
            <ChoiceButton
              key={i}
              className={`${optionButtonGridFormat} [&>label]:!cursor-default`}
              style={{
                backgroundColor: option.color,
                fontSize: responsiveFontSize,
              }}
            >
              <ChoiceButton.Icon>
                <p className="font-light">{String.fromCharCode(65 + i)}&#46;</p>
              </ChoiceButton.Icon>
              <ChoiceButton.Content>
                <MathJax className="!flex w-full items-center">
                  <EditableLabel
                    className="text-center !overflow-auto w-full font-sans-serif font-medium tracking-tight"
                    value={option.content}
                    placeholder="Enter option..."
                    onChange={(e) => {
                      let newOptions = [
                        ...(editor.value.quiz!.questions[
                          editor.value.curPage - 1
                        ].options as MatchingOption[]),
                      ];
                      let newOptionsOption = newOptions.filter(
                        (q) => q.type === "MATCHING_OPTION"
                      ) as MatchingOptionOption[];
                      newOptionsOption[i] = {
                        ...newOptionsOption[i],
                        content: e.currentTarget.innerText,
                      };
                      newOptions = [
                        ...newOptions.filter(
                          (q) => q.type === "MATCHING_PROMPT"
                        ),
                        ...newOptionsOption,
                        ...newOptions.filter(
                          (q) => q.type === "MATCHING_ANSWER"
                        ),
                      ];
                      let newQuestion =
                        editor.value.quiz!.questions[editor.value.curPage - 1];
                      newQuestion = {
                        ...newQuestion,
                        options: newOptions,
                      };
                      dispatch(setQuestion(newQuestion));
                    }}
                  />
                </MathJax>
              </ChoiceButton.Content>
            </ChoiceButton>
          ))}
        </div>
      </div>
    </div>
  );
}
