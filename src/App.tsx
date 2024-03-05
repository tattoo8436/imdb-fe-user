import { ConfigProvider } from "antd";
import { createContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import Layout from "./router/Layout";
import { Provider } from "react-redux";
import store from "./redux/store";
import { RecoilRoot } from "recoil";

export const ContextLocation = createContext({});

function App() {
  const [preLocation, setPreLocation] = useState("/");

  return (
    <ContextLocation.Provider value={{ preLocation, setPreLocation }}>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Segoe UI",
          },
        }}
      >
        <Provider store={store}>
          <RecoilRoot>
            <ToastContainer />
            <Layout />
          </RecoilRoot>
        </Provider>
      </ConfigProvider>
    </ContextLocation.Provider>
  );
}

export default App;
