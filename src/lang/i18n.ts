import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import EnText from "./translation/en.json";
import KoText from "./translation/ko.json";

const resources = {
  en: { translation: EnText },
  ko: { translation: KoText },
};

const LOCALSTORAGE_KEY = "netflix";

const getLanguage = (key: string) => {
  const loadedLang = localStorage.getItem(key);

  if (loadedLang) {
    const parsedLang = JSON.parse(loadedLang);
    return parsedLang.myLang;
  }
};

const localStorageLang = getLanguage(LOCALSTORAGE_KEY);
const userLanguage = window.navigator.language;

i18n.use(initReactI18next).init({
  resources,
  lng: localStorageLang || userLanguage || "ko",
  fallbackLng: "ko",
  keySeparator: ".",
  interpolation: {
    escapeValue: false, // not needed for react
  },
});

export default i18n;
