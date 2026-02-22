import { useMemo } from "react";
import { useLanguageValue } from "@/shared/hooks/useLanguage";

interface LanguageEntry {
  language?: {
    name?: string;
  };
}

export const useLocalizedList = <T extends LanguageEntry>(items?: T[]) => {
  const lang = useLanguageValue();

  return useMemo(() => {
    if (!items?.length) return [] as T[];
    return items.filter((item) => item?.language?.name === lang);
  }, [items, lang]);
};
