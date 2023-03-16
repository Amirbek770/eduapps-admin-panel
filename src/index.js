import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

import "./styles/index.css";
import { LoaderIcon } from "react-hot-toast";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ["en", "ru"],
    fallbackLng: "en",
    detection: {
      order: ["cookie", "htmlTag", "localStorage", "path", "subdomain"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "locales/{{lng}}/{{ns}}.json",
    },
  });

ReactDOM.render(
  <Suspense fallback={<LoaderIcon />}>
    <App />
  </Suspense>,
  document.getElementById("root")
);
