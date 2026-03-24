'use client';
import { createContext, useContext } from 'react';
import type { Dictionary } from '@/lib/i18n/dictionaries';

const DictionaryContext = createContext<Dictionary | null>(null);

export function DictionaryProvider({
  dictionary,
  children,
}: {
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  return <DictionaryContext.Provider value={dictionary}>{children}</DictionaryContext.Provider>;
}

export const useDictionary = (): ((key: keyof Dictionary) => string) => {
  const dict = useContext(DictionaryContext);
  return (key: keyof Dictionary) => {
    if (!dict) return key;
    return dict[key] || key;
  };
};
