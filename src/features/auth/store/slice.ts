import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initState = {
  value: {
    token: "",
    user: {
      id: "",
      name: "",
      email: "",
      image: "",
    },
  } as AuthStoreState,
} as InitAuthStoreState;

export const auth = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    logOut: (state) => {
      state.value = initState.value;
    },
    logIn: (state, action: PayloadAction<AuthStoreState>) => {
      state.value = {
        token: action.payload.token,
        user: {
          id: action.payload.user.id,
          name: action.payload.user.name,
          email: action.payload.user.email,
          image: action.payload.user.image,
        },
      };
    },
    createUser: (state, action: PayloadAction<User>) => {
      state.value.user = action.payload;
    },
    refreshToken: (state, action: PayloadAction<string>) => {
      state.value.token = action.payload;
    },
  },
});

export const { logOut, logIn, createUser, refreshToken } = auth.actions;
export default auth.reducer;
