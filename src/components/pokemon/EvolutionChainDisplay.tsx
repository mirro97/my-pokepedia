'use client';

import { EvolutionChainLink, EvolutionChain, PokemonName } from '@/lib/types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Link from 'next/link';
import { usePokemon, usePokemonSpecies } from '@/lib/hooks';
import { useLocalizedList } from '@/lib/use-localized-list';
import { useLang } from '@/lib/use-lang';
import { extractIdFromUrl } from '@/lib/utils';

interface EvolutionBranchProps {
  evolutionLink: EvolutionChainLink;
}

const EvolutionBranch = ({ evolutionLink }: EvolutionBranchProps) => {
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
          {evolvesTo.map((nextEvolution, index) => (
            <EvolutionBranch key={index} evolutionLink={nextEvolution} />
          ))}
        </div>
      )}
    </div>
  );
};

interface EvolutionChainDisplayProps {
  evolutionChain: EvolutionChain;
}

const EvolutionChainDisplay = ({ evolutionChain }: EvolutionChainDisplayProps) => {
  if (!evolutionChain?.chain) return <p>No evolution data available.</p>;

  return (
    <div className="flex justify-center p-4">
      <EvolutionBranch evolutionLink={evolutionChain.chain} />
    </div>
  );
};

export default EvolutionChainDisplay;
