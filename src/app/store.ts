import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "@/features/auth/store/slice";
import editorReducer from "@/features/library/store/slice";

const persistConfig = {
  timeout: 500,
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: authReducer,
    editor: editorReducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
