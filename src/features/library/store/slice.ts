import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initState = {
  value: {
    curPage: 0,
    curType: "",
    quiz: null,
  } as QuizEditorStoreState,
} as InitQuizEditorStoreState;

export const editor = createSlice({
  name: "editor",
  initialState: initState,
  reducers: {
    setCurPage: (state, action: PayloadAction<number>) => {
      state.value.curPage = action.payload;
    },
    setCurType: (state, action: PayloadAction<string>) => {
      state.value.curType = action.payload;
    },
    setQuiz: (state, action: PayloadAction<Quiz>) => {
      state.value.quiz = action.payload;
    },
  },
});

export const { setCurPage, setCurType, setQuiz } = editor.actions;
export default editor.reducer;
