'use client';

import { PokemonBasic, PokemonType } from '@/lib/types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Link from 'next/link';
import PokemonTypeLabel from '@/components/pokemon/PokemonTypeLabel';
import { useLocalizedList } from '@/lib/use-localized-list';
import { usePokemon, usePokemonSpecies } from '@/lib/hooks';
import { useLang } from '@/lib/use-lang';
import { getAnimatedSpriteUrl, hasAnimatedSprite } from '@/lib/utils';

interface PokemonCardProps {
  pokemonIndex: string;
}

interface LocalizedName {
  language: PokemonBasic;
  name: string;
}

export const PokemonCard = ({ pokemonIndex }: PokemonCardProps) => {
  const language = useLang();
  const { data: pokemonInfo } = usePokemon(pokemonIndex);
  const { data: speciesInfo } = usePokemonSpecies(pokemonInfo?.species?.name);
  const pokemonId = pokemonInfo?.id ?? pokemonIndex;
  const localizedNames: LocalizedName[] = useLocalizedList(speciesInfo?.names);
  const spriteUrl = getAnimatedSpriteUrl(pokemonInfo);

  return (
    <Link
      href={`/${language}/pokemon/${pokemonId}`}
      className="flex flex-col p-5 w-full bg-[#fff] rounded-2xl shadow-md"
    >
      <div className="flex items-center text-base">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
          alt="포켓볼"
        />
        <span className="font-galmuri">{localizedNames[0]?.name}</span>
      </div>
      <span className="font-galmuri"># {pokemonInfo?.id ?? pokemonIndex}</span>
      <div className="p-5 h-[160px] flex items-center justify-center">
        <LazyLoadImage
          key={pokemonInfo?.id}
          src={spriteUrl}
          alt={pokemonInfo?.name}
          className="img-lazy"
          width={hasAnimatedSprite(pokemonInfo) ? 80 : 120}
          height={120}
        />
      </div>
      <div className="flex group is-card">
        {pokemonInfo?.types?.map((type: PokemonType, index: number) => (
          <PokemonTypeLabel key={index} typeData={type} />
        ))}
      </div>
    </Link>
  );
};
