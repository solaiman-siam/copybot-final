import { RouterProvider } from "react-router";
import { routes } from "./routes/Router";
import { ConfigProvider } from "antd";
import { antdConfig } from "./styles/antdConfig";
import { Toaster } from "react-hot-toast";
import {Provider} from 'react-redux'
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <>
      <Provider store={store}>
        <ConfigProvider theme={antdConfig.theme}>
         <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={routes} />
         </PersistGate>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: "font-",
            duration: 2000,
            removeDelay: 1000,
            style: {
              background: "#000000",
              color: "#fff",
              fontFamily: "'Avantt TRIAL', 'sans-serif'"
            },
          }}
        />
      </ConfigProvider>
      </Provider>
    </>
  );
}

export default App;
