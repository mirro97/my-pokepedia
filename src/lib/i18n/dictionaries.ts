import type { Locale } from './config';

const dictionaries = {
  ko: () => import('./dictionaries/ko.json').then((m) => m.default),
  en: () => import('./dictionaries/en.json').then((m) => m.default),
};

export type Dictionary = Awaited<ReturnType<typeof dictionaries.ko>>;

export const getDictionary = async (lang: Locale): Promise<Dictionary> => {
  return dictionaries[lang]();
};
