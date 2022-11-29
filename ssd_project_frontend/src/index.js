import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Layout from "./Layout";
import reportWebVitals from "./reportWebVitals";

import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(
  "ORg4AjUWIQA/Gnt2VVhhQlFaclhJWHxMYVF2R2FJeFRycF9FaEwgOX1dQl9hSXpTcEVmWn9feHVRQWY="
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>
);
reportWebVitals();
