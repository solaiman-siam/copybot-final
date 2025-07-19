import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ConfigProvider } from "antd";
import { antdConfig } from "./styles/antdConfig.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <ConfigProvider theme={antdConfig.theme}>
        <App />
      </ConfigProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
