import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "./style/index.css";

import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // Provider è un HOC - Higher Order Component, che riceve lo stato globale, e si occuperà di fornire le logiche per leggerlo/scriverlo
  // al nostro componente App, e a tutti i suoi figli
  <Provider store={store}>
    <App />
  </Provider>
);
