import { PokemonBasic, PokemonType } from "@/types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import PokemonTypeLabel from "@/features/pokemon/components/PokemonTypeLabel";
import { useLocalizedList } from "@/shared/hooks/useLocalizedList";
import { usePokemon, usePokemonSpecies } from "@/features/pokemon/hooks";

interface pokemonProps {
  pokemonIndex: string;
}

interface nameTextType {
  language: PokemonBasic;
  name: string;
}

export const PokemonCard = ({ pokemonIndex }: pokemonProps) => {
  const { data: pokemonInfo } = usePokemon(pokemonIndex);
  const { data: pokemonSpeciesInfo } = usePokemonSpecies(
    pokemonInfo?.species?.name
  );
  const pokemonId = pokemonInfo?.id ?? pokemonIndex;

  // 포켓몬 설명 언어 변환
  const nameText: nameTextType[] = useLocalizedList(
    pokemonSpeciesInfo?.names
  );

  return (
    <Link
      to={`/pokemon/${pokemonId}`}
      className="flex flex-col p-5 w-full bg-[#fff] rounded-2xl shadow-md"
    >
      <div className="flex items-center text-base">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
          alt="포켓볼"
        />
        <span className="font-galmuri">{nameText && nameText[0]?.name}</span>
      </div>
      <span className="font-galmuri"># {pokemonInfo?.id ?? pokemonIndex}</span>

      <div className="p-5 h-[160px] flex items-center justify-center">
        <LazyLoadImage
          key={pokemonInfo?.id}
          src={
            pokemonInfo?.sprites?.versions?.["generation-v"]?.["black-white"]
              ?.animated?.front_default || pokemonInfo?.sprites?.front_default
          }
          alt={pokemonInfo?.name}
          className="img-lazy"
          width={
            pokemonInfo?.sprites?.versions?.["generation-v"]?.["black-white"]
              ?.animated?.front_default
              ? 80
              : 120
          }
          height={120}
        />
      </div>

      <div className="flex group is-card">
        {pokemonInfo?.types?.map((type: PokemonType, index: number) => {
          return <PokemonTypeLabel key={index} typeData={type} />;
        })}
      </div>
    </Link>
  );
};
