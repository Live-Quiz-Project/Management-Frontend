import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initState = {
  value: {
    mode: null,
    curPage: 0,
    editing: false,
    sidebarExpanded: false,
    quiz: null,
  } as QuizEditorStoreState,
} as InitQuizEditorStoreState;

export const editor = createSlice({
  name: "editor",
  initialState: initState,
  reducers: {
    reset: (state) => {
      state.value = initState.value;
    },
    setMode: (state, action: PayloadAction<"create" | "edit" | null>) => {
      state.value.mode = action.payload;
    },
    setCurPage: (state, action: PayloadAction<number>) => {
      state.value.curPage = action.payload;
    },
    setEditing: (state, action: PayloadAction<boolean>) => {
      state.value.editing = action.payload;
    },
    setSideBarExpanded: (state, action: PayloadAction<boolean>) => {
      state.value.sidebarExpanded = action.payload;
    },
    setQuiz: (state, action: PayloadAction<Quiz | null>) => {
      state.value.quiz = action.payload;
    },
    addQuestion: (state, action: PayloadAction<any>) => {
      state.value.quiz?.questions.push(action.payload);
      state.value.curPage = state.value.quiz?.questions.length || 1;
    },
    addQuestionFromPool: (state, action: PayloadAction<Question>) => {
      const count = state.value.quiz?.questions
        .slice(action.payload.pool)
        .reduce(
          (acc, question) => {
            if (!question.isInPool) {
              acc.stop = true;
              return acc;
            }
            if (!acc.stop) acc.count++;
            return acc;
          },
          { count: 0, stop: false }
        ).count!;
      state.value.quiz?.questions.splice(
        action.payload.pool + count,
        0,
        action.payload
      );
      state.value.quiz?.questions.forEach((question, index) => {
        question.order = index + 1;
      });
      state.value.curPage = action.payload.pool + count + 1;
    },
    deleteQuestion: (state, action: PayloadAction<number>) => {
      state.value.quiz?.questions.splice(action.payload - 1, 1);
      state.value.quiz?.questions.forEach((question, index) => {
        question.order = index + 1;
      });
      if (state.value.curPage >= action.payload) {
        state.value.curPage -= 1;
      }
    },
    deleteQuestionPool: (state, action: PayloadAction<number>) => {
      const count = state.value.quiz?.questions
        .slice(action.payload)
        .filter((question) => !question.isInPool)
        .reduce((acc, question) => (question ? acc + 1 : acc), 0)!;
      state.value.quiz?.questions.splice(action.payload - 1, count + 1);
      state.value.quiz?.questions.forEach((question, index) => {
        question.order = index + 1;
      });
      if (state.value.curPage >= action.payload) {
        state.value.curPage = state.value.curPage - count - 1;
      }
    },
    setQuestion: (state, action: PayloadAction<Question>) => {
      state.value.quiz?.questions.splice(
        state.value.curPage - 1,
        1,
        action.payload
      );
    },
  },
});

export const {
  reset,
  setMode,
  setCurPage,
  setEditing,
  setSideBarExpanded,
  setQuiz,
  addQuestion,
  addQuestionFromPool,
  deleteQuestion,
  deleteQuestionPool,
  setQuestion,
} = editor.actions;
export default editor.reducer;
