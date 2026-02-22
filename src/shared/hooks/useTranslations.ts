import { useLanguageValue } from "./useLanguage";
import { translations } from "../locales";

type TranslationKey = keyof typeof translations.en; // Assuming all languages have the same keys

export const useTranslations = () => {
  const lang = useLanguageValue();

  return (key: TranslationKey) => {
    // Fallback to English if translation for current language or key is missing
    return translations[lang]?.[key] || translations.en[key] || key;
  };
};