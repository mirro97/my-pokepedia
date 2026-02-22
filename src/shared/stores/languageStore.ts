import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type LanguageState = {
  currentLanguage: 'ko' | 'en';
  langNumGenera: number; // New property
  setLanguage: (lang: 'ko' | 'en') => void;
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      currentLanguage: 'ko', // Default language
      langNumGenera: 1, // Default value for 'ko'
      setLanguage: (lang) => set((state) => {
        const langNumGenera = lang === 'en' ? 7 : 1; // Map 'en' to 7, 'ko' to 1
        return { currentLanguage: lang, langNumGenera };
      }),
    }),
    {
      name: 'language-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
