import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { language } from "@/core/recoil/language";

export const useLanguageState = () => useRecoilState(language);

export const useLanguageValue = () => useRecoilValue(language);

export const useSetLanguage = () => useSetRecoilState(language);
