'use client';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useLang } from '@/hooks/useLang';

interface GenerationImageCardProps {
  enTitle: string;
  koTitle: string;
  src?: string;
}

export default function GenerationImageCard({ enTitle, koTitle, src }: GenerationImageCardProps) {
  const language = useLang();

  if (!src) return null;

  return (
    <div className="shadow-sm hover:shadow-md hover:animate-pulse mr-[10px] w-32 mb-3 rounded-md p-[10px]">
      <div className="w-28 h-28 flex justify-center items-center mx-auto">
        <LazyLoadImage src={src} alt={enTitle} />
      </div>
      <span className="text-xs text-center font-galmuri">
        {language === 'en' ? enTitle : koTitle}
      </span>
    </div>
  );
}
