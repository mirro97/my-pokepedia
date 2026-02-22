import { PokemonVersionsGeneration } from "@/types";
import GenerationImageCard from "@/features/pokemon/components/GenerationImageCard";
import { useLanguageValue } from "@/shared/hooks/useLanguage";
import { POKEMON_GENERATION_SECTIONS } from "@/shared/constants/pokemon";

const PokemonGenerationGallery = (
  generationImage: PokemonVersionsGeneration | undefined
) => {
  const lang = useLanguageValue();

  return (
    <div className="mt-7">
      {POKEMON_GENERATION_SECTIONS.map((section) => {
        const sectionData = generationImage?.[
          section.id as keyof PokemonVersionsGeneration
        ] as Record<string, { front_default?: string }> | undefined;

        const itemsWithSprites = section.items.filter(
          (item) => !!sectionData?.[item.id]?.front_default
        );

        if (!itemsWithSprites.length) return null;

        return (
          <div key={section.id} className="mb-7">
            <span className="font-bold mb-2">
              {lang === "en" ? section.label.en : section.label.ko}
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
};

export default PokemonGenerationGallery;
