'use client';
import { useParams } from 'next/navigation';
import type { Locale } from './i18n/config';

export const useLang = (): Locale => {
  const params = useParams();
  return (params?.lang as Locale) ?? 'ko';
};
