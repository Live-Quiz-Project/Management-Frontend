import "@/app/global.css";
import { RouterProvider } from "react-router-dom";
import router from "@/app/router";
import { Suspense } from "react";
import { store, persistor } from "@/app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { MathJaxContext } from "better-react-mathjax";
import { Loading } from "@/features/Loading";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Suspense fallback={<Loading />}>
          <MathJaxContext>
            <RouterProvider router={router} />
          </MathJaxContext>
        </Suspense>
      </PersistGate>
    </Provider>
  );
}

export default App;
