'use client';

import { POKEMON_GENERATION_SECTIONS } from '@/constants/pokemon';
import { useLang } from '@/hooks/useLang';
import type { PokemonVersionsGeneration } from '@/lib/types';
import GenerationImageCard from './GenerationImageCard';

export default function PokemonGenerationGallery(
  generationImage: PokemonVersionsGeneration | undefined,
) {
  const language = useLang();

  return (
    <div className="mt-7">
      {POKEMON_GENERATION_SECTIONS.map((section) => {
        const sectionData = generationImage?.[section.id as keyof PokemonVersionsGeneration] as
          | Record<string, { front_default?: string }>
          | undefined;

        const itemsWithSprites = section.items.filter(
          (item) => !!sectionData?.[item.id]?.front_default,
        );

        if (!itemsWithSprites.length) return null;

        return (
          <div key={section.id} className="mb-7">
            <span className="font-bold mb-2">
              {language === 'en' ? section.label.en : section.label.ko}
            </span>
            <div className="flex flex-wrap">
              {itemsWithSprites.map((item) => (
                <GenerationImageCard
                  key={item.id}
                  enTitle={item.title.en}
                  koTitle={item.title.ko}
                  src={sectionData?.[item.id]?.front_default}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
