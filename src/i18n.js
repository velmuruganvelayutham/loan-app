import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// Importing translation files

import translationEN from "./locales/en/translation.json";
import translationTA from "./locales/ta/translation.json";


//Creating object with the variables of imported translation files
const resources = {
  en: {
    translation: translationEN,
  },
  ta: {
    translation: translationTA,
  },
};

//i18N Initialization

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng:"ta", //default language
    fallbackLng: 'en', // fallback language if the translation is missing
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;