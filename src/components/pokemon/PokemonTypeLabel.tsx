'use client';

import { useRouter } from 'next/navigation';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { POKEMON_TYPE_BG, POKEMON_TYPE_LABELS_KO } from '@/constants/pokemon';
import { useLang } from '@/hooks/useLang';
import type { PokemonType } from '@/lib/types';

interface PokemonTypeLabelProps {
  typeData: PokemonType;
  onClick?: () => void;
}

export default function PokemonTypeLabel({ typeData, onClick }: PokemonTypeLabelProps) {
  const language = useLang();
  const router = useRouter();
  const typeName = typeData?.type?.name;
  const label = language === 'en' ? typeName : (POKEMON_TYPE_LABELS_KO[typeName] ?? typeName);

  return (
    <button
      type="button"
      onClick={onClick ?? (() => router.push(`/${language}/pokemon/type/${typeName}`))}
      className={`flex justify-center group-[.is-card]:flex-1 group-[.is-tab]:m-1 group-[.is-tab]:w-fit px-[26px] w-1/2 py-3px type-label mr-1 font-semibold ${
        typeName ? POKEMON_TYPE_BG[typeName] : ''
      }`}
      key={typeName}
    >
      {typeName !== 'unknown' && typeName !== 'shadow' && (
        <LazyLoadImage
          key={typeName}
          src={`/images/pokemon-type-images/${typeName}.svg`}
          alt={typeName}
          className="mr-1"
          width={20}
        />
      )}
      <span className="text-sm">{label}</span>
    </button>
  );
}
