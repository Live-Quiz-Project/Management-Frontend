import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initState = {
  value: {
    theme: "light",
  } as ThemeStoreState,
} as InitThemeStoreState;

export const editor = createSlice({
  name: "theme",
  initialState: initState,
  reducers: {
    reset: (state) => {
      state.value = initState.value;
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.value.theme = action.payload;
    },
  },
});

export const { reset, setTheme } = editor.actions;
export default editor.reducer;
