import { store } from "@/app/store";

declare global {
  type StoreRootState = ReturnType<typeof store.getState>;
  type StoreDispatch = typeof store.dispatch;

  type ThemeStoreState = {
    theme: "light" | "dark";
  };
  type InitThemeStoreState = {
    value: ThemeStoreState;
  };

  type AuthStoreState = {
    token: string;
    user: User;
  };
  type InitAuthStoreState = {
    value: AuthStoreState;
  };

  type QuizEditorStoreState = {
    mode: "create" | "edit" | null;
    curPage: number;
    editing: boolean;
    sidebarExpanded: boolean;
    savable: boolean;
    error: string | null;
    quiz: Quiz | null;
  };
  type InitQuizEditorStoreState = {
    value: QuizEditorStoreState;
  };
}

export {};
