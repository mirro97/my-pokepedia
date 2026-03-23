'use client';
import { useMemo } from 'react';
import { useLang } from './use-lang';

interface LanguageEntry {
  language?: {
    name?: string;
  };
}

export const useLocalizedList = <T extends LanguageEntry>(items?: T[]) => {
  const lang = useLang();
  return useMemo(() => {
    if (!items?.length) return [] as T[];
    return items.filter((item) => item?.language?.name === lang);
  }, [items, lang]);
};
