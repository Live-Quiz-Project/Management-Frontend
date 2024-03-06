import QuestionTypesEnum from "@/features/library/utils/enums/question-types";
import layoutA from "../../../../common/assets/layoutA.png";
import layoutB from "../../../../common/assets/layoutB.png";
import layoutC from "../../../../common/assets/layoutC.png";
import layoutD from "../../../../common/assets/layoutD.png";
import layoutE from "../../../../common/assets/layoutE.png";
import layoutF from "../../../../common/assets/layoutF.png";
import layoutG from "../../../../common/assets/layoutG.png";
import layoutH from "../../../../common/assets/layoutH.png";

const LAYOUTS = {
  [QuestionTypesEnum.CHOICE]: [layoutA, layoutB, layoutC, layoutD],
  [QuestionTypesEnum.TRUE_FALSE]: [layoutA, layoutB],
  [QuestionTypesEnum.FILL_BLANK]: [layoutA, layoutB, layoutC, layoutD],
  [QuestionTypesEnum.PARAGRAPH]: [layoutA, layoutB, layoutC, layoutD],
  [QuestionTypesEnum.MATCHING]: [layoutH, layoutG, layoutF, layoutE],
  [QuestionTypesEnum.POOL]: [
    "/images/layouts/pool-1.png",
    "/images/layouts/pool-2.png",
    "/images/layouts/pool-3.png",
    "/images/layouts/pool-4.png",
  ],
};

export default LAYOUTS;
