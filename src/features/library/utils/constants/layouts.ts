import QuestionTypesEnum from "@/features/library/utils/enums/question-types";

const LAYOUTS = {
  [QuestionTypesEnum.CHOICE]: [
    "/images/layouts/choice-1.png",
    "/images/layouts/choice-2.png",
    "/images/layouts/choice-3.png",
    "/images/layouts/choice-4.png",
  ],
  [QuestionTypesEnum.TRUE_FALSE]: [
    "/images/layouts/true-false-1.png",
    "/images/layouts/true-false-2.png",
  ],
  [QuestionTypesEnum.FILL_BLANK]: [
    "/images/layouts/fill-blank-1.png",
    "/images/layouts/fill-blank-2.png",
    "/images/layouts/fill-blank-1.png",
    "/images/layouts/fill-blank-2.png",
  ],
  [QuestionTypesEnum.PARAGRAPH]: [
    "/images/layouts/paragraph-1.png",
    "/images/layouts/paragraph-2.png",
    "/images/layouts/paragraph-1.png",
    "/images/layouts/paragraph-2.png",
  ],
  [QuestionTypesEnum.MATCHING]: [
    "/images/layouts/matching-1.png",
    "/images/layouts/matching-2.png",
    "/images/layouts/matching-3.png",
    "/images/layouts/matching-4.png",
  ],
  [QuestionTypesEnum.POOL]: [
    "/images/layouts/pool-1.png",
    "/images/layouts/pool-2.png",
    "/images/layouts/pool-3.png",
    "/images/layouts/pool-4.png",
  ],
};

export default LAYOUTS;
