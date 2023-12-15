declare global {
  type Quiz = {
    id: string;
    creatorId: string;
    title: string;
    description: string;
    coverImg: string;
    questions: Question[];
  };
}

export {};
