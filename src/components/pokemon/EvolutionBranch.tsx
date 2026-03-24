'use client';

import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useLang } from '@/hooks/useLang';
import { useLocalizedList } from '@/hooks/useLocalizedList';
import { usePokemon, usePokemonSpecies } from '@/hooks/useQueries';
import type { EvolutionChainLink, PokemonName } from '@/lib/types';
import { extractIdFromUrl } from '@/lib/utils';

interface EvolutionBranchProps {
  evolutionLink: EvolutionChainLink;
}

export default function EvolutionBranch({ evolutionLink }: EvolutionBranchProps) {
  const language = useLang();
  const { species, evolves_to: evolvesTo, evolution_details: evolutionDetails } = evolutionLink;
  const { data: pokemonData } = usePokemon(species.name);
  const { data: speciesData } = usePokemonSpecies(species.name);
  const localizedNames = useLocalizedList(speciesData?.names) as PokemonName[];

  const pokemonId = pokemonData?.id ?? extractIdFromUrl(species.url);

  return (
    <div className="flex flex-col items-center">
      <Link href={`/${language}/pokemon/${pokemonId}`}>
        <div className="flex flex-col items-center p-2 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
          <LazyLoadImage
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
            alt={species.name}
            className="w-20 h-20"
          />
          <span className="capitalize font-semibold text-sm mt-1">
            {localizedNames[0]?.name || species.name}
          </span>
        </div>
      </Link>
      {evolutionDetails.length > 0 && (
        <div className="text-xs text-gray-500 mt-1">
          {evolutionDetails.map((detail, index) => (
            <span key={index}>
              {detail.min_level ? `Lv ${detail.min_level}` : ''}
              {detail.trigger?.name === 'trade' && 'Trade'}
            </span>
          ))}
        </div>
      )}
      {evolvesTo.length > 0 && (
        <div className="flex mt-4 space-x-4">
          {evolvesTo.map((nextEvolution) => (
            <EvolutionBranch key={nextEvolution.species.name} evolutionLink={nextEvolution} />
          ))}
        </div>
      )}
    </div>
  );
}
