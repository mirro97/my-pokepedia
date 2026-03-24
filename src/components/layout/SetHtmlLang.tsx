'use client';

import { useEffect } from 'react';

export default function SetHtmlLang({ language }: { language: string }) {
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return null;
}
