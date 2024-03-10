import App from "@/App";
import { store } from "@/redux/store.ts";
import { ConfigProvider, theme } from "antd";
import "antd/dist/reset.css";
import viVN from "antd/locale/vi_VN";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ReduxProvider store={store}>
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
            token: {
              // fontFamily: "SVNPoppins",
            },
          }}
          locale={viVN}>
          <App />
        </ConfigProvider>
      </ReduxProvider>
    </BrowserRouter>
  </StrictMode>
);
