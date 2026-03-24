'use client';

import { POKEMON_TYPE_LIST } from '@/constants/pokemon';
import type { PokemonType } from '@/lib/types';
import PokemonTypeLabel from './PokemonTypeLabel';

const typeListAll: PokemonType[] = POKEMON_TYPE_LIST.map((type) => ({
  slot: 0,
  type: { name: type, url: '' },
}));

export default function PokemonTypeNav() {
  return (
    <nav className="group is-tab sm:px-0 py-7 flex flex-wrap">
      {typeListAll.map((type: PokemonType) => (
        <PokemonTypeLabel key={type.type.name} typeData={type} />
      ))}
    </nav>
  );
}
