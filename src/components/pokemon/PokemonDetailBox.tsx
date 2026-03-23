'use client';

import { PokemonBasic, PokemonDetailType, PokemonSpecies, PokemonType } from '@/lib/types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Label from '@/components/ui/Label';
import PokemonGenerationGallery from './PokemonGenerationGallery';
import PokemonTypeLabel from './PokemonTypeLabel';
import ImageShadowWrap from '@/components/ui/ImageShadowWrap';
import { useLang } from '@/lib/use-lang';
import { useLocalizedList } from '@/lib/use-localized-list';
import { POKEMON_IMAGE_KEYS } from '@/constants/pokemon';
import { useEvolutionChain } from '@/lib/hooks';
import EvolutionChainDisplay from './EvolutionChainDisplay';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { getAnimatedSpriteUrl } from '@/lib/utils';

interface PokemonDetailBoxProps {
  pokemonInfo: PokemonDetailType;
  pokemonSpeciesInfo?: PokemonSpecies;
}

interface LocalizedFlavorText {
  flavor_text: string | undefined;
  language: PokemonBasic;
  version: PokemonBasic;
}

interface LocalizedName {
  language: PokemonBasic;
  name: string;
}

const PokemonDetailBox = ({ pokemonInfo, pokemonSpeciesInfo }: PokemonDetailBoxProps) => {
  const language = useLang();
  const translate = useDictionary();
  const spriteUrl = getAnimatedSpriteUrl(pokemonInfo);

  const {
    data: evolutionChainData,
    isLoading: isEvolutionLoading,
    isError: isEvolutionError,
  } = useEvolutionChain(pokemonSpeciesInfo?.evolution_chain?.url);

  const localizedFlavorTexts: LocalizedFlavorText[] = useLocalizedList(pokemonSpeciesInfo?.flavor_text_entries);
  const localizedNames: LocalizedName[] = useLocalizedList(pokemonSpeciesInfo?.names);
  const genus = pokemonSpeciesInfo?.genera.find(genera => genera.language.name === language)?.genus;

  return (
    <div className="flex flex-col p-10 items-center bg-[#fff] rounded-2xl shadow-xl">
      <div className="p-9">
        <div className="max-w-[180px]">
          <LazyLoadImage src={spriteUrl} width={120} height={120} />
        </div>
      </div>
      <span className="font-bold text-gray-100"># {pokemonInfo?.id}</span>
      <span className="text-2xl font-bold">{localizedNames[0]?.name}</span>
      <div className="flex w-full justify-center group is-tab mt-3">
        {pokemonInfo?.types.map((type: PokemonType, index: number) => (
          <PokemonTypeLabel key={index} typeData={type} />
        ))}
      </div>
      <div className="mt-3 text-lg font-bold text-gray-100">{genus}</div>
      <div className="mt-3 text-center">
        <span>{localizedFlavorTexts[0]?.flavor_text}</span>
      </div>
      <div className="flex mt-10">
        <div className="flex flex-col items-center mr-5">
          <Label text={translate('height')} />
          <span className="mt-3">{pokemonInfo?.height / 10} m</span>
        </div>
        <div className="flex flex-col items-center">
          <Label text={translate('weight')} />
          <span className="mt-3">{pokemonInfo?.weight / 10} kg</span>
        </div>
      </div>
      <div className="mt-10 max-w-3xl w-full flex flex-wrap justify-around">
        {POKEMON_IMAGE_KEYS.map(
          (imageKey, index) =>
            pokemonInfo?.sprites[imageKey] && (
              <ImageShadowWrap key={index}>
                <LazyLoadImage src={pokemonInfo?.sprites[imageKey]} alt={imageKey} />
              </ImageShadowWrap>
            ),
        )}
      </div>
      <div className="mt-10">
        <Label text={translate('evolutionForm')} />
        {isEvolutionLoading && <p>Loading evolution chain...</p>}
        {isEvolutionError && <p>Failed to load evolution chain.</p>}
        {evolutionChainData && <EvolutionChainDisplay evolutionChain={evolutionChainData} />}
      </div>
      <div className="mt-10">
        <Label text={translate('pokemonAppearanceTransformationBySeries')} />
        <PokemonGenerationGallery {...pokemonInfo?.sprites?.versions} />
      </div>
    </div>
  );
};

export default PokemonDetailBox;
