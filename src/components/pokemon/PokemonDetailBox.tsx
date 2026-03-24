'use client';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import Label from '@/components/ui/Label';
import { POKEMON_IMAGE_KEYS } from '@/constants/pokemon';
import { useLang } from '@/hooks/useLang';
import { useLocalizedList } from '@/hooks/useLocalizedList';
import { useEvolutionChain } from '@/hooks/useQueries';
import type {
  PokemonDetailType,
  PokemonFlavorTextEntry,
  PokemonName,
  PokemonSpecies,
  PokemonType,
} from '@/lib/types';
import { getAnimatedSpriteUrl } from '@/lib/utils';
import EvolutionBranch from './EvolutionBranch';
import PokemonGenerationGallery from './PokemonGenerationGallery';
import PokemonTypeLabel from './PokemonTypeLabel';

interface PokemonDetailBoxProps {
  pokemonInfo: PokemonDetailType;
  pokemonSpeciesInfo?: PokemonSpecies;
}

export default function PokemonDetailBox({
  pokemonInfo,
  pokemonSpeciesInfo,
}: PokemonDetailBoxProps) {
  const language = useLang();
  const translate = useDictionary();
  const spriteUrl = getAnimatedSpriteUrl(pokemonInfo);

  const {
    data: evolutionChainData,
    isLoading: isEvolutionLoading,
    isError: isEvolutionError,
  } = useEvolutionChain(pokemonSpeciesInfo?.evolution_chain?.url);

  const localizedFlavorTexts: PokemonFlavorTextEntry[] = useLocalizedList(
    pokemonSpeciesInfo?.flavor_text_entries,
  );
  const localizedNames: PokemonName[] = useLocalizedList(pokemonSpeciesInfo?.names);
  const genus = pokemonSpeciesInfo?.genera.find(
    (genera) => genera.language.name === language,
  )?.genus;

  return (
    <div className="flex flex-col p-10 items-center bg-white rounded-2xl shadow-xl">
      <div className="p-9">
        <div className="max-w-[180px]">
          <LazyLoadImage src={spriteUrl} width={120} height={120} />
        </div>
      </div>
      <span className="font-bold text-muted"># {pokemonInfo?.id}</span>
      <span className="text-2xl font-bold">{localizedNames[0]?.name}</span>
      <div className="flex w-full justify-center group is-tab mt-3">
        {pokemonInfo?.types.map((type: PokemonType) => (
          <PokemonTypeLabel key={type.type.name} typeData={type} />
        ))}
      </div>
      <div className="mt-3 text-lg font-bold text-muted">{genus}</div>
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
          (imageKey) =>
            pokemonInfo?.sprites[imageKey] && (
              <div
                key={imageKey}
                className="shadow-sm hover:shadow-md hover:animate-pulse rounded-md mb-7"
              >
                <LazyLoadImage src={pokemonInfo?.sprites[imageKey]} alt={imageKey} />
              </div>
            ),
        )}
      </div>
      <div className="mt-10">
        <Label text={translate('evolutionForm')} />
        {isEvolutionLoading && <p>{translate('loadingEvolutionChain')}</p>}
        {isEvolutionError && <p>{translate('failedToLoadEvolutionChain')}</p>}
        {evolutionChainData?.chain && (
          <div className="flex justify-center p-4">
            <EvolutionBranch evolutionLink={evolutionChainData.chain} />
          </div>
        )}
      </div>
      <div className="mt-10">
        <Label text={translate('pokemonAppearanceTransformationBySeries')} />
        <PokemonGenerationGallery {...pokemonInfo?.sprites?.versions} />
      </div>
    </div>
  );
}
