import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import listenToAuthStateChange from "./features/auth/authActions.js";
import store, { history } from "./store/store.js";
import { HistoryRouter as HistoryRouter } from "redux-first-history/rr6";

store.dispatch(listenToAuthStateChange);
ReactDOM.createRoot(document.getElementById("root")).render(
  // disable react strict mode if u want view the article in dev mode
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={history}>
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
