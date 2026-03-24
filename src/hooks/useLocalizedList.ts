'use client';
import { useMemo } from 'react';
import { useLang } from '@/hooks/useLang';

interface LanguageEntry {
  language?: {
    name?: string;
  };
}

export const useLocalizedList = <T extends LanguageEntry>(items?: T[]) => {
  const language = useLang();
  return useMemo(() => {
    if (!items?.length) return [] as T[];
    return items.filter((item) => item?.language?.name === language);
  }, [items, language]);
};
