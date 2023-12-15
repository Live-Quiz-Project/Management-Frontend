declare global {
  type StoreRootState = ReturnType<typeof store.getState>;
  type StoreDispatch = typeof store.dispatch;

  type AuthStoreState = {
    token: string;
    user: User;
  };
  type InitAuthStoreState = {
    value: AuthStoreState;
  };

  type QuizEditorStoreState = {
    curPage: number;
    curType: string;
    quiz: Quiz | null;
  };
  type InitQuizEditorStoreState = {
    value: QuizEditorStoreState;
  };
}

export {};
