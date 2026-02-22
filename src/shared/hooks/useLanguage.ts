import { useLanguageStore } from "../stores/languageStore";


export const useLanguageValue = () => useLanguageStore((state) => state.currentLanguage);
export const useSetLanguage = () => useLanguageStore((state) => state.setLanguage);
export const useLangNumGenera = () => useLanguageStore((state) => state.langNumGenera);
