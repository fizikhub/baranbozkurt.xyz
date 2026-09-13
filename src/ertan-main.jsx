import React from "react";
import { createRoot } from "react-dom/client";
import { ErtanPage } from "./ertan/ErtanPage.jsx";
import "./ertan/ertan.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErtanPage />
  </React.StrictMode>,
);
