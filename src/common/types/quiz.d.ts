declare global {
  type Quiz = {
    id?: string;
    versionId: string;
    creatorId: string;
    creatorName: string;
    title: string;
    description: string;
    coverImg: string;
    visibility: string;
    timeLimit: string;
    haveTimeFactor: boolean;
    timeFactor: string;
    mark: string;
    caseSensitive: boolean;
    fontSize: number;
    questions: Question[];
  };

  type Question = {
    id?: string;
    isInPool: boolean;
    pool: number;
    poolRequired: boolean;
    type: string;
    order: number;
    content: string;
    note: string;
    mediaType: string;
    media: string;
    useTemplate: boolean;
    timeLimit: string;
    haveTimeFactor: boolean;
    timeFactor: string;
    fontSize: number;
    layout: number;
    selectMin: number;
    selectMax: number;
    caseSensitive: boolean;
    options: ChoiceOption[] | TextOption[] | MatchingOption[];
  };

  type ChoiceOption = {
    id?: string;
    order: number;
    content: string;
    mark: string;
    color: string;
    isCorrect: boolean;
  };

  type TextOption = {
    id?: string;
    order: number;
    content: string;
    mark: string;
    caseSensitive: boolean;
  };

  type MatchingOption =
    | MatchingOptionPrompt
    | MatchingOptionOption
    | MatchingOptionAnswer;
  type MatchingOptionPrompt = {
    id?: string;
    type: "MATCHING_PROMPT";
    content: string;
    color: "white";
    order: number;
    eliminate: false;
  };
  type MatchingOptionOption = {
    id?: string;
    type: "MATCHING_OPTION";
    content: string;
    color: string;
    order: number;
    eliminate: boolean;
  };
  type MatchingOptionAnswer = {
    id?: string;
    type: "MATCHING_ANSWER";
    promptOrder: number;
    optionOrder: number;
    mark: string;
  };
  type ParticipantQuestion = {
    id: string;
    type: string;
    order: number;
    content: string;
    answer: string;
    mark: number;
    use_time: number;
  };
  type QuestionType =
    | "CHOICE"
    | "TRUE_FALSE"
    | "PARAGRAPH"
    | "MATCHING"
    | "FILL_BLANK"
    | "POOL";
}

export {};
