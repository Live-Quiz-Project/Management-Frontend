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
}

export {};
