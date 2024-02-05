import QuestionTypesEnum from "@/features/library/utils/enums/question-types";

const QUESTION_TYPES = [
  {
    label: "Multiple Choice",
    value: QuestionTypesEnum.CHOICE,
    icon: "/icons/question-types/choice.svg",
  },
  {
    label: "True/False",
    value: QuestionTypesEnum.TRUE_FALSE,
    icon: "/icons/question-types/true-false.svg",
  },
  {
    label: "Fill in the Blank",
    value: QuestionTypesEnum.FILL_BLANK,
    icon: "/icons/question-types/fill-blank.svg",
  },
  {
    label: "Paragraph",
    value: QuestionTypesEnum.PARAGRAPH,
    icon: "/icons/question-types/paragraph.svg",
  },
  {
    label: "Matching",
    value: QuestionTypesEnum.MATCHING,
    icon: "/icons/question-types/matching.svg",
  },
  {
    label: "Pool",
    value: QuestionTypesEnum.POOL,
    icon: "/icons/question-types/pool.svg",
  },
];

export default QUESTION_TYPES;
