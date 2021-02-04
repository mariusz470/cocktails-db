import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "font-awesome/css/font-awesome.css";
import { CocktailsProvider } from "./context/CocktailContext";

ReactDOM.render(
  <React.StrictMode>
    <CocktailsProvider>
      <App />
    </CocktailsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
