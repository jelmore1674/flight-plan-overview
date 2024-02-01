import { checkUpdate } from "@tauri-apps/api/updater";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import routes from "./routes";
import { persistor, store } from "./store";

const ONE_HOUR = 3600000;

function App() {
  useEffect(() => {
    checkUpdate().then(info => console.log({info})).catch((e) => console.log({ e }));
    const checkForUpdate = setInterval(async () => {
      try {
        await checkUpdate();
      } catch (e) {
        console.error({ e });
      }
    }, ONE_HOUR);

    return () => clearInterval(checkForUpdate);
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={routes} />
      </PersistGate>
    </Provider>
  );
}

export default App;
