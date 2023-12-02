import "@/app/tailwind.css";
import { RouterProvider } from "react-router-dom";
import { router } from "@/app/routes";
import { Suspense } from "react";
import Loading from "@/features/Loading";
import { store, persistor } from "@/app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
      </PersistGate>
    </Provider>
  );
}

export default App;
