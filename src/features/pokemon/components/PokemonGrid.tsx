import React from "react";
import { PokemonBasic } from "@/types";
import { PokemonCard } from "@/features/pokemon/components/PokemonCard";

interface PokemonCardListProps {
  pokemons: PokemonBasic[];
}

interface PokemonGridProps {
  children: React.ReactNode;
  sentinelRef?: React.Ref<HTMLDivElement>;
}

export const PokemonCardList = ({ pokemons }: PokemonCardListProps) => {
  return (
    <>
      {pokemons.map((pokemon: PokemonBasic) => (
        <PokemonCard key={pokemon.url} pokemonIndex={pokemon.name} />
      ))}
    </>
  );
};

export const PokemonGrid = ({ children, sentinelRef }: PokemonGridProps) => {
  return (
    <div className="w-full mt-4 grid grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
      {children}
      {sentinelRef ? <div ref={sentinelRef} /> : null}
    </div>
  );
};
