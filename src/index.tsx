import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { App } from "./app";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
